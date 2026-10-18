#!/usr/bin/env node
/**
 * Render a concept document to a typeset A4 PDF, including Mermaid diagrams.
 *
 * From the repository root, after `npm install` in this directory:
 *   node scripts/pdf/render.mjs
 *   node scripts/pdf/render.mjs docs/08-anwendungsentwicklungsplan.md
 *   node scripts/pdf/render.mjs docs/08-anwendungsentwicklungsplan.md -o plan.pdf
 *   node scripts/pdf/render.mjs --all
 *   node scripts/pdf/render.mjs --book
 */

import { createRequire } from "node:module";
import { createServer } from "node:http";
import { existsSync, mkdirSync } from "node:fs";
import { readFile, writeFile, rm, readdir, stat } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { pathToFileURL, fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import puppeteer from "puppeteer-core";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const docsDir = path.join(repoRoot, "docs");

const MM = 96 / 25.4;
const MARGIN = { top: 22, right: 16, bottom: 18, left: 16 };
const CONTENT_WIDTH_PX = Math.round((210 - MARGIN.left - MARGIN.right) * MM);
const CONTENT_HEIGHT_PX = Math.round((297 - MARGIN.top - MARGIN.bottom) * MM);

const FONT_STYLES = [
  ["@fontsource-variable/fraunces/full.css", "@fontsource-variable/fraunces/wght.css"],
  ["@fontsource-variable/fraunces/full-italic.css", "@fontsource-variable/fraunces/wght-italic.css"],
  "@fontsource/source-serif-4/latin-400.css",
  "@fontsource/source-serif-4/latin-400-italic.css",
  "@fontsource/source-serif-4/latin-600.css",
  "@fontsource/source-serif-4/latin-700.css",
  "@fontsource/source-sans-3/latin-400.css",
  "@fontsource/source-sans-3/latin-500.css",
  "@fontsource/source-sans-3/latin-600.css",
  "@fontsource/source-sans-3/latin-700.css",
  "@fontsource/jetbrains-mono/latin-400.css",
];

const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textOf(node) {
  if (!node) return "";
  if (node.type === "text") return node.value;
  if (node.value && !node.children) return String(node.value);
  if (!node.children) return "";
  return node.children.map(textOf).join("");
}

function resolveFirst(specs) {
  const list = Array.isArray(specs) ? specs : [specs];
  for (const spec of list) {
    try {
      return require.resolve(spec);
    } catch {
      // try the next candidate
    }
  }
  throw new Error(`Keine Schrift gefunden (${list.join(", ")}). Bitte npm install in scripts/pdf ausführen.`);
}

function remarkMermaid() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "mermaid" || !parent) return;
      parent.children[index] = {
        type: "html",
        value: `<figure class="diagram"><div class="mermaid">${escapeHtml(node.value)}</div></figure>`,
      };
    });
  };
}

function rehypeDocument(baseDir) {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "img") {
        const src = node.properties?.src;
        if (typeof src === "string" && src && !/^[a-z]+:/i.test(src) && !src.startsWith("//")) {
          node.properties.src = pathToFileURL(path.resolve(baseDir, src)).href;
        }
        return;
      }

      if (node.tagName === "a") {
        const href = String(node.properties?.href ?? "");
        if (href.endsWith(".md") || href.startsWith("#") || href.startsWith("./") || href.startsWith("../")) {
          node.tagName = "span";
          node.properties = { className: ["xref"] };
        }
        return;
      }

      if (node.tagName === "pre") {
        const code = node.children?.find((child) => child.tagName === "code");
        const classes = code?.properties?.className ?? [];
        const lang = classes.find((name) => String(name).startsWith("language-"));
        if (lang === "language-ts" || lang === "language-typescript") {
          node.properties = { ...node.properties, className: ["lang-ts"] };
        }
        return;
      }

      if (!["h2", "h3", "h4"].includes(node.tagName)) return;
      const plain = (node.children ?? []).every((child) => child.type === "text");
      if (!plain) return;
      const match = textOf(node).match(/^(\d+(?:\.\d+)*)\.\s+([\s\S]+)$/);
      if (!match) return;
      node.children = [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["num"] },
          children: [{ type: "text", value: match[1] }],
        },
        { type: "text", value: ` ${match[2]}` },
      ];
    });
  };
}

function processorFor(baseDir) {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMermaid)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeDocument, baseDir)
    .use(rehypeStringify, { allowDangerousHtml: true });
}

async function renderTree(processor, tree) {
  const transformed = await processor.run(tree);
  return String(processor.stringify(transformed));
}

async function buildArticle(markdown, baseDir) {
  const processor = processorFor(baseDir);
  const tree = processor.parse(markdown);
  const children = tree.children ?? [];

  let fullTitle = "immocrush";
  if (children[0]?.type === "heading" && children[0].depth === 1) {
    fullTitle = textOf(children[0]).trim() || fullTitle;
    children.shift();
  }

  let leadHtml = "";
  if (children[0]?.type === "blockquote") {
    const leadTree = { type: "root", children: children[0].children ?? [] };
    leadHtml = await renderTree(processor, leadTree);
    children.shift();
  }

  tree.children = children;
  const bodyHtml = await renderTree(processor, tree);
  const numbered = fullTitle.match(/^(\d+)\s·\s(.+)$/);

  return {
    fullTitle,
    number: numbered?.[1] ?? "",
    title: numbered?.[2] ?? fullTitle,
    leadHtml,
    bodyHtml,
  };
}

function fontLinks() {
  return FONT_STYLES.map((spec) => {
    const file = resolveFirst(spec);
    const rel = path.relative(here, file).split(path.sep).join("/");
    return `<link rel="stylesheet" href="/vendor/${rel}">`;
  }).join("\n");
}

function standLabel(date) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function htmlDocument(title, inner) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  ${fontLinks()}
  <style>${css}</style>
</head>
<body>
  ${inner}
  <script type="module">
    import mermaid from "/vendor/node_modules/mermaid/dist/mermaid.esm.min.mjs";

    const maxDiagramHeight = ${CONTENT_HEIGHT_PX - 36};
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      fontFamily: "Source Sans 3, sans-serif",
      themeVariables: {
        fontFamily: "Source Sans 3, sans-serif",
        fontSize: "15px",
        textColor: "#1c1917",
        primaryColor: "#f8eeeb",
        primaryTextColor: "#1c1917",
        primaryBorderColor: "#c9aea6",
        secondaryColor: "#f4efe9",
        secondaryTextColor: "#1c1917",
        secondaryBorderColor: "#ddd2c8",
        tertiaryColor: "#f7f3ee",
        tertiaryTextColor: "#1c1917",
        tertiaryBorderColor: "#ddd2c8",
        lineColor: "#8d7f76",
        background: "#faf6f2",
        mainBkg: "#f8eeeb",
        nodeBorder: "#c9aea6",
        clusterBkg: "#fbf7f4",
        clusterBorder: "#e0d4cb",
        titleColor: "#1c1917",
        edgeLabelBackground: "#faf6f2",
        nodeTextColor: "#1c1917",
        sectionBkgColor: "#f8eeeb",
        altSectionBkgColor: "#f6f1ec",
        gridColor: "#e5dbd2",
        todayLineColor: "#9d3140",
        taskBkgColor: "#9d3140",
        taskBorderColor: "#7c2633",
        taskTextColor: "#ffffff",
        taskTextLightColor: "#ffffff",
        taskTextDarkColor: "#1c1917",
        taskTextOutsideColor: "#1c1917",
        activeTaskBkgColor: "#1c1917",
        activeTaskBorderColor: "#1c1917",
        doneTaskBkgColor: "#a39890",
        doneTaskBorderColor: "#8d827a",
        milestoneBkgColor: "#1c1917",
        milestoneBorderColor: "#1c1917",
        critBkgColor: "#9d3140",
        critBorderColor: "#7c2633",
        attributeBackgroundColorOdd: "#ffffff",
        attributeBackgroundColorEven: "#faf6f2",
        quadrant1Fill: "#f8eeeb",
        quadrant2Fill: "#f6f1ec",
        quadrant3Fill: "#f3eee8",
        quadrant4Fill: "#f8eeeb",
        quadrantPointFill: "#9d3140",
        quadrantPointTextFill: "#1c1917",
        quadrantXAxisTextFill: "#3c342f",
        quadrantYAxisTextFill: "#3c342f",
        quadrantTitleFill: "#1c1917",
        quadrantInternalBorderStrokeFill: "#e5dbd2",
        quadrantExternalBorderStrokeFill: "#c9aea6"
      },
      flowchart: {
        curve: "basis",
        padding: 12,
        nodeSpacing: 24,
        rankSpacing: 32,
        htmlLabels: true,
        useMaxWidth: true
      },
      er: { useMaxWidth: true, fontSize: 13 },
      gantt: {
        useMaxWidth: true,
        barHeight: 20,
        barGap: 5,
        topPadding: 36,
        fontSize: 12,
        sectionFontSize: 12
      }
    });

    function fitSvg(svg, host) {
      const box = svg.viewBox?.baseVal;
      let width = box?.width || svg.width?.baseVal?.value;
      let height = box?.height || svg.height?.baseVal?.value;
      if (!width || !height) return;
      if (!svg.getAttribute("viewBox")) svg.setAttribute("viewBox", "0 0 " + width + " " + height);
      const maxWidth = Math.max(120, host.clientWidth - 4);
      const scale = Math.min(1, maxWidth / width, maxDiagramHeight / height);
      const nextWidth = Math.round(width * scale);
      const nextHeight = Math.round(height * scale);
      svg.setAttribute("width", String(nextWidth));
      svg.setAttribute("height", String(nextHeight));
      svg.style.width = nextWidth + "px";
      svg.style.height = nextHeight + "px";
      svg.style.maxWidth = "100%";
      if (scale < 1 && height * (maxWidth / width) > maxDiagramHeight) {
        host.closest("figure")?.classList.add("allow-break");
      }
    }

    const errors = [];
    try {
      await document.fonts.ready;
      const nodes = [...document.querySelectorAll(".mermaid")];
      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];
        const source = node.textContent ?? "";
        try {
          const { svg } = await mermaid.render("diagram-" + index, source);
          node.innerHTML = svg;
          const drawn = node.querySelector("svg");
          if (drawn) fitSvg(drawn, node);
        } catch (error) {
          errors.push(error instanceof Error ? error.message : String(error));
          node.innerHTML = "<pre>" + source.replaceAll("&", "&amp;").replaceAll("<", "&lt;") + "</pre>";
        }
      }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
    window.__pdfErrors = errors;
    document.documentElement.dataset.rendered = "1";
  </script>
</body>
</html>`;
}

function pageHtml(article, stand) {
  const titleHtml = article.number
    ? `<p class="index">${escapeHtml(article.number)}</p><h1>${escapeHtml(article.title)}</h1>`
    : `<h1 class="solo">${escapeHtml(article.title)}</h1>`;
  const lead = article.leadHtml ? `<div class="lead">${article.leadHtml}</div>` : `<div class="lead"></div>`;

  return htmlDocument(article.fullTitle, `<header class="cover">
    <div class="cover-top">
      <p class="brand">immocrush</p>
      <p class="kicker">Konzeptdokument</p>
    </div>
    ${titleHtml}
    <div class="rule"></div>
    ${lead}
    <div class="cover-meta">
      <span>Stand ${escapeHtml(stand)}</span>
      <span>Liebe auf den ersten Swipe.</span>
    </div>
  </header>
  <main class="prose">
    ${article.bodyHtml}
  </main>`);
}

function chapterId(article) {
  if (article.number) return `doc-${article.number}`;
  return `doc-${article.title.toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}`;
}

function chapterHtml(article) {
  const index = article.number ? `<p class="index">${escapeHtml(article.number)}</p>` : "";
  const lead = article.leadHtml ? `<div class="lead">${article.leadHtml}</div>` : "";
  return `<section class="chapter" id="${chapterId(article)}">
    <header class="chapter-open">
      ${index}
      <h1>${escapeHtml(article.title)}</h1>
      <div class="rule"></div>
      ${lead}
    </header>
    <div class="prose">${article.bodyHtml}</div>
  </section>`;
}

function bookHtml(articles, stand, pageById = new Map()) {
  const contents = articles
    .map((article) => {
      const id = chapterId(article);
      const page = pageById.get(id);
      return `<li><a href="#${id}"><span class="num">${escapeHtml(article.number || "–")}</span><span class="title">${escapeHtml(article.title)}</span><span class="page">${page ? escapeHtml(String(page)) : ""}</span></a></li>`;
    })
    .join("\n");

  return htmlDocument(
    "immocrush · Konzept",
    `<header class="cover">
    <div class="cover-top">
      <p class="brand">immocrush</p>
      <p class="kicker">Konzeptdokumente</p>
    </div>
    <h1 class="solo">Konzept</h1>
    <div class="rule"></div>
    <div class="lead">
      <p>Die Dokumente von der ursprünglichen Idee bis zur Roadmap: Markt, Produkt, Motivation, Geschäftsmodell, Marke, Go-to-Market, Entwicklung und Recht.</p>
    </div>
    <div class="cover-meta">
      <span>Stand ${escapeHtml(stand)}</span>
      <span>Liebe auf den ersten Swipe.</span>
    </div>
  </header>
  <nav class="contents">
    <h2>Inhalt</h2>
    <ol>${contents}</ol>
  </nav>
  ${articles.map(chapterHtml).join("\n")}`,
  );
}

function headerTemplate(article) {
  const label = article.number ? `${article.number}  ·  ${article.title}` : article.title;
  // Kept short and aligned to the top of the margin, so the rule sits well above the text.
  return `<div style="font-size:8px; line-height:1.2; font-family:Helvetica, Arial, sans-serif; color:#73695f; width:100%; box-sizing:border-box; padding:3mm 16mm 0;">
    <div style="display:flex; justify-content:space-between; gap:16px; align-items:baseline; border-bottom:0.6pt solid #e5dbd2; padding-bottom:1.6mm;">
      <span style="font-weight:700; letter-spacing:0.16em;">IMMOCRUSH</span>
      <span style="font-weight:500; max-width:115mm; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${escapeHtml(label)}</span>
    </div>
  </div>`;
}

function footerTemplate(article, stand) {
  const left = article.number ? `${article.number}  ·  Konzeptphase  ·  ${stand}` : `Konzeptphase  ·  ${stand}`;
  return `<div style="font-size:8px; line-height:1.2; font-family:Helvetica, Arial, sans-serif; color:#73695f; width:100%; box-sizing:border-box; padding:4mm 16mm 0;">
    <div style="display:flex; justify-content:space-between; align-items:baseline; border-top:0.6pt solid #e5dbd2; padding-top:1.6mm;">
      <span>${escapeHtml(left)}</span>
      <span class="pageNumber"></span>
    </div>
  </div>`;
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".map": "application/json",
};

function startServer(htmlPath) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      let filePath;
      if (url.pathname === "/render.html") {
        filePath = htmlPath;
      } else if (url.pathname.startsWith("/vendor/")) {
        const rel = decodeURIComponent(url.pathname.slice("/vendor/".length));
        filePath = path.resolve(here, rel);
        if (filePath !== here && !filePath.startsWith(here + path.sep)) {
          res.writeHead(403).end();
          return;
        }
      } else {
        res.writeHead(404).end();
        return;
      }
      const body = await readFile(filePath);
      const type = MIME[path.extname(filePath)] ?? "application/octet-stream";
      res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, port: address.port });
    });
  });
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

async function readChapterPages(pdfPath) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(await readFile(pdfPath));
  const doc = await pdfjs.getDocument({ data, disableWorker: true, isEvalSupported: false }).promise;
  const links = [];
  try {
    for (let index = 1; index <= doc.numPages; index += 1) {
      const page = await doc.getPage(index);
      const annots = await page.getAnnotations();
      for (const annot of annots) {
        if (annot.subtype !== "Link" || annot.dest == null) continue;
        let dest = annot.dest;
        const name = typeof dest === "string" ? dest : "";
        if (typeof dest === "string") dest = await doc.getDestination(dest);
        if (!Array.isArray(dest) || dest[0] == null) continue;
        const target = (await doc.getPageIndex(dest[0])) + 1;
        const top = Array.isArray(annot.rect) ? annot.rect[3] : 0;
        links.push({ name, target, source: index, top });
      }
    }
  } finally {
    if (typeof doc.destroy === "function") await doc.destroy();
  }

  const pages = new Map();
  for (const link of links) {
    if (link.name.startsWith("doc-")) pages.set(link.name, link.target);
  }
  if (pages.size) return pages;

  const ordered = links.sort((a, b) => a.source - b.source || b.top - a.top);
  return ordered;
}

async function renderPdf(browser, port, htmlPath, article, stand, outputPath, timeout = 60000) {
  const page = await browser.newPage();
  page.setDefaultTimeout(timeout);
  page.on("console", (msg) => {
    const text = msg.text();
    if (text.startsWith("diagram") || msg.type() === "error") console.log(text);
  });
  page.on("pageerror", (error) => console.error(String(error)));
  await page.emulateMediaType("print");
  await page.setViewport({ width: CONTENT_WIDTH_PX, height: CONTENT_HEIGHT_PX, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${port}/render.html`, { waitUntil: "load", timeout });
  await page.waitForFunction(() => document.documentElement.dataset.rendered === "1", { timeout });
  const errors = await page.evaluate(() => window.__pdfErrors ?? []);
  if (errors.length) {
    await page.close();
    throw new Error(errors.join("\n"));
  }
  await page.evaluate(() => document.fonts.ready);

  mkdirSync(path.dirname(outputPath), { recursive: true });
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: false,
    displayHeaderFooter: true,
    headerTemplate: headerTemplate(article),
    footerTemplate: footerTemplate(article, stand),
    margin: {
      top: `${MARGIN.top}mm`,
      right: `${MARGIN.right}mm`,
      bottom: `${MARGIN.bottom}mm`,
      left: `${MARGIN.left}mm`,
    },
  });
  await page.close();
}

function defaultOutput(inputPath) {
  const base = `${path.basename(inputPath, path.extname(inputPath))}.pdf`;
  const dir = path.dirname(path.resolve(inputPath));
  if (path.basename(dir) === "docs") return path.join(dir, "pdf", base);
  return path.join(dir, base);
}

async function listDocs() {
  const entries = await readdir(docsDir);
  const files = [];
  for (const entry of entries) {
    if (!entry.endsWith(".md")) continue;
    const full = path.join(docsDir, entry);
    const info = await stat(full);
    if (info.isFile()) files.push(full);
  }
  return files.sort();
}

function printHelp() {
  console.log(`Usage: node scripts/pdf/render.mjs [file.md ...] [-o output.pdf]
       node scripts/pdf/render.mjs --all
       node scripts/pdf/render.mjs --book [-o output.pdf]

With no files, renders docs/08-anwendungsentwicklungsplan.md.
--all writes one PDF per document. --book binds every document into one PDF.
PDFs land in docs/pdf/ unless -o is set.`);
}

async function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      out: { type: "string", short: "o" },
      all: { type: "boolean", default: false },
      book: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
    allowPositionals: true,
    strict: true,
  });

  if (values.help) {
    printHelp();
    return;
  }

  let inputs;
  if (values.book || values.all) {
    inputs = positionals.length ? positionals.map((file) => path.resolve(file)) : await listDocs();
  } else if (positionals.length) {
    inputs = positionals.map((file) => path.resolve(file));
  } else {
    inputs = [path.join(docsDir, "08-anwendungsentwicklungsplan.md")];
  }

  if (values.out && !values.book && inputs.length !== 1) {
    throw new Error("-o gilt nur für genau eine Eingabedatei. Für ein gemeinsames PDF --book verwenden.");
  }

  for (const input of inputs) {
    if (!existsSync(input)) throw new Error(`Datei nicht gefunden: ${input}`);
  }

  if (values.book) {
    inputs = inputs.filter((file) => path.basename(file) !== "00-ausgangstext.md");
    if (!inputs.length) throw new Error("Keine Dokumente für das Konzept-PDF.");
  }

  const chrome = findChrome();
  if (!chrome) {
    throw new Error("Google Chrome wurde nicht gefunden. Pfad über CHROME_PATH setzen.");
  }

  const htmlPath = path.join(os.tmpdir(), `immocrush-pdf-${process.pid}.html`);
  const { server, port } = await startServer(htmlPath);
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: true,
    args: ["--font-render-hinting=none", "--force-color-profile=srgb"],
  });
  const stand = standLabel(new Date());

  try {
    if (values.book) {
      const articles = [];
      for (const input of inputs) {
        const markdown = await readFile(input, "utf8");
        articles.push(await buildArticle(markdown, path.dirname(input)));
      }
      const output = values.out ? path.resolve(values.out) : path.join(docsDir, "pdf", "immocrush-konzept.pdf");
      const book = { number: "", title: "Konzept", fullTitle: "immocrush · Konzept" };
      const probePath = path.join(os.tmpdir(), `immocrush-pdf-${process.pid}-probe.pdf`);
      await writeFile(htmlPath, bookHtml(articles, stand), "utf8");
      await renderPdf(browser, port, htmlPath, book, stand, probePath, 180000);
      const located = await readChapterPages(probePath);
      const pageById = located instanceof Map ? located : new Map();
      if (!(located instanceof Map)) {
        articles.forEach((article, index) => {
          if (located[index]) pageById.set(chapterId(article), located[index].target);
        });
      }
      const missing = articles.filter((article) => !pageById.has(chapterId(article)));
      if (missing.length) {
        throw new Error(`Seitenzahlen fehlen für: ${missing.map((article) => article.title).join(", ")}`);
      }
      await writeFile(htmlPath, bookHtml(articles, stand, pageById), "utf8");
      await renderPdf(browser, port, htmlPath, book, stand, output, 180000);
      await rm(probePath, { force: true });
      console.log(path.relative(process.cwd(), output) || output);
    } else {
      for (const input of inputs) {
        const markdown = await readFile(input, "utf8");
        const article = await buildArticle(markdown, path.dirname(input));
        await writeFile(htmlPath, pageHtml(article, stand), "utf8");
        const output = values.out ? path.resolve(values.out) : defaultOutput(input);
        await renderPdf(browser, port, htmlPath, article, stand, output);
        console.log(path.relative(process.cwd(), output) || output);
      }
    }
  } finally {
    await browser.close();
    server.close();
    await rm(htmlPath, { force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
