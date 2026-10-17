# 09 · Recht, Datenschutz & Compliance

> **Keine Rechtsberatung.** Dieses Dokument ist ein Überblick zur Vorbereitung auf Gespräche mit Fachleuten (Datenschutz- und IT-Recht, Wettbewerbsrecht, Makler- und Gewerberecht, Markenrecht). Stand der Recherche: Oktober 2026.

Recht ist für immocrush keine Fußnote. Profiling, KI-Bilder, Diskriminierungsschutz und Maklerrecht berühren den Kern des Produkts. Wer das sauber löst, gewinnt Vertrauen – bei Nutzern, Maklern und Investoren.

## 1. Datenschutz (DSGVO, BDSG, TDDDG)

| Thema | Anforderung | Umsetzung bei immocrush |
|---|---|---|
| Rechtsgrundlagen | Art. 6 DSGVO: Vertrag für Kernfunktionen, Einwilligung für optionale Angaben, Partnerkontakte und Tracking, berechtigtes Interesse für Sicherheit und Betrugsabwehr | Zweck und Rechtsgrundlage pro Datenfeld dokumentieren; Einwilligungen versioniert speichern |
| Freiwilligkeit | Art. 7 Abs. 4 DSGVO (Kopplungsverbot) | Kernfunktionen funktionieren ohne optionale Angaben |
| Besondere Kategorien | Art. 9 DSGVO: Gesundheit, Religion, ethnische Herkunft u. a. nur mit ausdrücklicher Einwilligung | nicht abfragen; Barrierefreiheit als Wohnbedarf erfassen; religiöse Einrichtungen nur mit ausdrücklicher Einwilligung; keine Gesichtserkennung (das Verpixeln von Gesichtern erkennt, identifiziert aber niemanden) |
| Profiling und automatisierte Entscheidungen | Art. 22 DSGVO: keine ausschließlich automatisierte Entscheidung mit erheblicher Wirkung. Nach dem SCHUFA-Urteil des EuGH (C-634/21, Dezember 2023) kann schon ein Wert darunter fallen, auf den sich Dritte maßgeblich stützen. | Der Verkäufer entscheidet und sieht den vollständigen Steckbrief, der Match-Wert ist nur eine Hilfe. „Warum passt das?“ erklärt die Logik (Art. 13 Abs. 2 lit. f). Käufer können Angaben ergänzen und erhalten Hinweise, wie sich ihr Wert verbessert. |
| Datenschutz-Folgenabschätzung | Art. 35 DSGVO: Pflicht bei umfangreichem Profiling und neuen Technologien wie KI | in Sprint 0 beginnen, vor dem Launch abschließen |
| Datenschutzbeauftragter | § 38 BDSG: Pflicht, sobald eine Folgenabschätzung erforderlich ist – unabhängig von der Zahl der Mitarbeitenden | externen Datenschutzbeauftragten benennen und der Aufsichtsbehörde melden |
| Datenschutz durch Technik | Art. 25 DSGVO | Sichtbarkeitsregeln pro Feld, anonym bis zum Match, Voreinstellungen datensparsam |
| Dienstleister und Drittländer | Art. 28 DSGVO (Auftragsverarbeitung), Art. 44 ff. (Übermittlung in Drittländer, z. B. USA über das EU-US Data Privacy Framework oder Standardvertragsklauseln) | EU-Regionen nutzen (Supabase Frankfurt, Railway EU, PostHog EU), Verträge mit allen Dienstleistern, KI-Anbieter ohne Training mit unseren Daten |
| Rechte der Nutzer | Auskunft, Berichtigung, Löschung, Datenübertragbarkeit, Widerspruch | Datenschutz-Cockpit mit Export, Löschen und Sichtbarkeitseinstellungen |
| Endgeräte-Zugriff | § 25 TDDDG: Einwilligung für nicht notwendige Cookies, SDKs und Tracking | Einwilligungsbanner auf der Website; in den Apps keine Tracking-SDKs ohne Einwilligung |
| Sicherheit und Datenpannen | Art. 32–34 DSGVO | Verschlüsselung, Zugriffsrechte, Penetrationstest; Meldung an die Behörde innerhalb von 72 Stunden |
| Dokumentation | Art. 30 DSGVO (Verzeichnis der Verarbeitungstätigkeiten) | vor dem Launch anlegen und laufend pflegen |
| Mindestalter | – | Nutzung ab 18 Jahren |

## 2. Gleichbehandlung und Fair Matching (AGG)

- Wer Wohnraum öffentlich anbietet, darf Interessenten nicht wegen ihrer ethnischen Herkunft oder aus rassistischen Gründen benachteiligen (§ 19 Abs. 2 in Verbindung mit § 2 Abs. 1 Nr. 8 AGG). Bei Massengeschäften gilt das Verbot auch für Geschlecht, Religion, Behinderung, Alter und sexuelle Identität (§ 19 Abs. 1 AGG). Betroffene können Schadensersatz und Entschädigung verlangen (§ 21 AGG).
- Auch wenn die Entscheidung beim Verkäufer liegt: Unsere Plattform darf Diskriminierung nicht erleichtern. Das ist rechtlich geboten, ethisch richtig und ein Vertrauensargument.

**Umsetzung**

- Keine geschützten Merkmale als Filter, Sortierung oder Ranking-Faktor
- Fotos, Namen und Kontaktdaten erst nach dem Match
- Alter nur optional, als Altersgruppe und nie für Verkäufer filterbar
- Freitext-Wünsche von Verkäufern („Wem würde ich am liebsten verkaufen?“) werden auf diskriminierende Aussagen geprüft und gegebenenfalls nicht übernommen
- Ablehnungen sind ohne Begründung möglich; vorformulierte Gründe sind sachlich (Zeitplan, Finanzierung, Passung)
- regelmäßige Fairness-Prüfung des Rankings, zum Beispiel ob Haushaltstypen systematisch benachteiligt werden

## 3. KI-Verordnung (AI Act)

| Pflicht | Seit | Bedeutung für immocrush |
|---|---|---|
| KI-Kompetenz (Art. 4) | 2. Februar 2025 | Schulung aller, die KI-Systeme entwickeln oder einsetzen; dokumentieren |
| Verbotene Praktiken (Art. 5) | 2. Februar 2025 | keine manipulativen Techniken; unsere spielerischen Elemente bleiben transparent und freiwillig |
| Hinweis bei KI-Interaktion (Art. 50 Abs. 1) | 2. August 2026 | ein KI-Assistent im Chat muss als KI erkennbar sein |
| Maschinenlesbare Kennzeichnung (Art. 50 Abs. 2) | 2. August 2026 | erzeugte oder wesentlich veränderte Bilder, Videos und Texte maschinenlesbar markieren (z. B. C2PA). Ausgenommen ist reine Standardbearbeitung wie Belichtung oder Begradigung, die den Inhalt nicht wesentlich verändert. |
| Offenlegung von Deepfakes (Art. 50 Abs. 4) | 2. August 2026 | Virtuelles Home Staging oder entfernte Gegenstände in Fotos echter Räume können als „Deepfake“ gelten (Art. 3 Nr. 60). Wer sie veröffentlicht, muss sie offenlegen. Wir setzen das Label automatisch. |

- **Übergangsfrist:** Die Frist bis 2. Dezember 2026 gilt nur für Systeme, die vor dem 2. August 2026 auf den Markt kamen. Verschoben wurden durch den „Digital Omnibus“ nur die Regeln für Hochrisiko-Systeme. Für immocrush gilt Art. 50 also ab dem ersten Tag.
- **Hochrisiko vermeiden:** Eine eigene Kreditwürdigkeitsprüfung natürlicher Personen wäre ein Hochrisiko-System (Anhang III Nr. 5 lit. b) mit umfangreichen Pflichten. Den Finanzierungs-Check überlassen wir deshalb erlaubten Partnern (Banken, Finanzierungsvermittler). Wir zeigen nur das Ergebnis als Badge an, mit Einwilligung des Käufers.
- **Matching** von Käufern und Immobilien ist nach aktuellem Stand kein Hochrisiko-System. Das sollte im Rahmen der Folgenabschätzung bestätigt werden.

## 4. Werbung, Irreführung und Rankings (UWG, P2B-Verordnung)

- **Irreführung (§ 5 UWG):** KI-Bilder dürfen keine falschen Vorstellungen über die Immobilie wecken. Daher unsere Leitplanken „Verschönern ja, verfälschen nein“, die Kennzeichnung und der Schalter „Original / KI-Version“.
- **Selbst erzeugte Inhalte:** Texte und Videos aus dem KI-Studio sind nicht mehr nur fremde Nutzerinhalte. Wir könnten für Fehler mitverantwortlich sein. Deshalb gibt es den automatischen Faktencheck, und der Verkäufer muss jedes Inserat vor der Veröffentlichung prüfen und freigeben.
- **Wesentliche Informationen (§ 5a UWG):** Bei Makler-Inseraten ist die Käuferprovision Pflichtfeld. Das Badge „provisionsfrei“ erscheint nur, wenn es stimmt.
- **Bezahlte Platzierung:** muss gekennzeichnet sein (§ 5a Abs. 4 UWG). Bezahlte Rankings ohne Hinweis sind immer unzulässig (Nr. 11a des Anhangs zum UWG).
- **Ranking-Transparenz:** Die Hauptparameter des Rankings müssen erklärt werden – gegenüber Verbrauchern (§ 5b Abs. 2 UWG) und gegenüber Maklern als gewerblichen Nutzern (Art. 5 P2B-Verordnung). Dafür gibt es eine öffentliche Seite „So funktioniert unser Matching“.
- **Vergleichende Werbung (§ 6 UWG):** Aussagen wie „kostenlos statt 399 €“ nur sachlich, nachprüfbar und aktuell.

## 5. Gebäudeenergiegesetz (GEG)

- **Pflichtangaben in Anzeigen (§ 87 GEG):** Liegt beim Inserieren ein Energieausweis vor, muss die Anzeige bei Wohngebäuden Folgendes enthalten:
  - Art des Ausweises (Bedarf oder Verbrauch)
  - Endenergiebedarf bzw. -verbrauch
  - wesentlicher Energieträger der Heizung
  - Baujahr laut Ausweis
  - Energieeffizienzklasse
- Verpflichtet sind Verkäufer und Makler. Fehlende Angaben werden häufig abgemahnt, unter anderem von Umweltverbänden.
- **Liegt noch kein Ausweis vor,** entfällt die Anzeigenpflicht. Der Ausweis muss aber spätestens bei der Besichtigung vorgelegt werden (§ 80 Abs. 4 GEG).
- **Umsetzung:** Energieausweis-Scan, Pflichtangaben-Check vor der Veröffentlichung, Hinweis und Partnerangebot, falls kein Ausweis vorliegt.

## 6. Digital Services Act (DSA) und Digitale-Dienste-Gesetz (DDG)

immocrush ist eine Online-Plattform im Sinne des DSA, weil Inserate öffentlich verbreitet werden.

| Pflicht | Gilt für uns |
|---|---|
| Kontaktstellen für Behörden und Nutzer (Art. 11, 12) | ja |
| AGB mit Angaben zur Moderation (Art. 14) | ja |
| Melde- und Abhilfeverfahren für rechtswidrige Inhalte (Art. 16) | ja |
| Begründung von Moderationsentscheidungen (Art. 17) | ja |
| Meldung des Verdachts auf schwere Straftaten (Art. 18) | ja |
| Haftungsprivileg (Art. 6) | nur, wenn wir nach Kenntnis rechtswidriger Inhalte zügig handeln |
| Transparenzberichte, internes Beschwerdesystem, Verbot von Dark Patterns, Werbe- und Empfehlungstransparenz, Nachverfolgbarkeit von Unternehmern (Art. 15, 20–32) | Kleinst- und Kleinunternehmen sind weitgehend ausgenommen. Die Ausnahme endet zwölf Monate nach Überschreiten der Schwellen. |

Auch wenn wir anfangs ausgenommen sind: Dark Patterns sind ohnehin nach UWG und DSGVO problematisch, und Ranking-Transparenz verlangen UWG und P2B-Verordnung. Wir setzen diese Punkte deshalb von Beginn an um.

**Impressum** nach § 5 DDG auf Website und in den Apps.

## 7. Makler-, Gewerbe- und Finanzierungsrecht

| Thema | Regel | Konsequenz |
|---|---|---|
| Maklererlaubnis (§ 34c GewO) | erforderlich für den Nachweis oder die Vermittlung von Kaufverträgen über Immobilien | Als Plattform mit festen Preisen brauchen wir sie nicht. Für Eigentümer-Kontakte (Lead-Verkauf an Makler) und erfolgsabhängige Modelle rechtlich prüfen. Concierge nur mit Erlaubnis. |
| Maklerverträge mit Verbrauchern (§§ 656a ff. BGB) | Textform; bei Wohnungen und Einfamilienhäusern teilen sich Käufer und Verkäufer die Provision höchstens hälftig | Wir verlangen von Käufern keine Erfolgsprovision. Concierge bezahlt allein der Verkäufer zum Festpreis. |
| Finanzierungsvermittlung (§ 34i GewO) | Erlaubnispflicht für die Vermittlung und Beratung zu Immobiliardarlehen | nur als Tippgeber: Kontakt mit Einwilligung weitergeben, keine Beratung, keine konkreten Angebote oder Konditionen. Der Budget-Rechner bleibt allgemein. |
| Versicherungen (§ 34d GewO) | entsprechend | nur Tippgeber-Modell |
| Geldwäschegesetz | Immobilienmakler sind verpflichtet (Identifizierung, Risikomanagement) | betrifft uns erst, wenn wir selbst vermitteln (Concierge) |
| Rechtsdienstleistungen (RDG) | Rechtsberatung im Einzelfall ist Anwälten und Notaren vorbehalten | Verkaufsfahrplan und KI-Assistent geben allgemeine Informationen und verweisen auf Notar oder Anwalt |

**Interessenkonflikt, wenn Gründer auch als Makler tätig sind**

- Keine bevorzugte Platzierung eigener oder verbundener Objekte
- Kein privilegierter Zugang zu Käuferdaten für verbundene Maklerbüros
- Offenlegung der Verbindung in den AGB; die P2B-Verordnung verlangt das ohnehin, wenn eigene Angebote anders behandelt werden (Art. 7)
- gleiche Konditionen für alle Makler, Kontrolle durch den Makler-Beirat

Für das Vertrauen der Makler ist das entscheidend. Ihre größte Sorge wird sein, dass die Plattform ihre Daten nutzt, um selbst zu vermitteln.

## 8. Urheberrecht und fremde Daten

- **Kein Einsammeln fremder Inserate (Scraping).** Der Ausgangstext schlägt vor, „die Angebote permanent zu durchforsten“. Die Datenbanken der Portale sind geschützt (§§ 87a ff. UrhG), Fotos sind es ebenfalls (§ 72 UrhG), und die Portale untersagen das in ihren Nutzungsbedingungen. Die Ausnahme für Text- und Data-Mining (§ 44b UrhG) greift nicht, wenn Rechteinhaber maschinenlesbar widersprechen – und die Portale tun das.
- **Stattdessen:** eigenes Inventar von Privatverkäufern und Maklern, OpenImmo-Schnittstellen mit klaren Nutzungsrechten, lizenzierte Marktdaten von Datenanbietern und öffentliche Quellen (Gutachterausschüsse, Statistikämter).
- **Nutzungsrechte an Medien:** Verkäufer und Makler räumen uns in den AGB einfache Nutzungsrechte an ihren Fotos ein – für das Inserat, die KI-Bearbeitung und die Bewerbung des Inserats auf Social Media.
- **Musik in Videos:** nur Musik mit Lizenz für kommerzielle Nutzung inklusive Social Media.
- **KI-Ergebnisse** sind oft nicht urheberrechtlich geschützt. Für uns ist das kein Problem, weil unser Wert im Netzwerk liegt und nicht in einzelnen Videos.
- **Persönlichkeitsrechte:** Gesichter, Familienfotos, Hausnummern und Kennzeichen werden automatisch verpixelt.

## 9. Barrierefreiheit (BFSG)

- Das Barrierefreiheitsstärkungsgesetz gilt seit dem 28. Juni 2025 unter anderem für Dienstleistungen im elektronischen Geschäftsverkehr, also für Websites und Apps, über die Verbraucher Verträge schließen.
- Kleinstunternehmen (unter 10 Beschäftigte und höchstens 2 Mio. € Jahresumsatz oder Bilanzsumme) sind als Dienstleister ausgenommen. Wir wachsen aber schnell über diese Schwelle hinaus.
- **Umsetzung:** von Anfang an WCAG 2.1 AA, Barrierefreiheitserklärung, sobald das Gesetz für uns gilt. Nachrüsten ist teurer als gleich richtig bauen.

## 10. Verbraucherrecht

- **Bestell-Button** mit der Aufschrift „zahlungspflichtig bestellen“ oder gleichwertig (§ 312j BGB)
- **Kündigungs-Button** für Abos, die online abgeschlossen werden (§ 312k BGB)
- **Widerrufsrecht** von 14 Tagen und die Regeln für das vorzeitige Erlöschen bei digitalen Leistungen
- **Preisangaben** als Endpreise inklusive Umsatzsteuer (Preisangabenverordnung)
- **AGB-Recht** (§§ 305 ff. BGB): verständlich, keine überraschenden Klauseln
- **Hinweis zur Verbraucherschlichtung** nach § 36 VSBG, sobald wir mehr als zehn Beschäftigte haben

## 11. App-Store-Regeln

Konto löschen in der App, Sign in with Apple als gleichwertiger Login, Moderation von Nutzerinhalten, Datenschutzangaben, Regeln für In-App-Käufe. Details stehen im [Entwicklungsplan](08-anwendungsentwicklungsplan.md), Abschnitt 14.

## 12. Checkliste vor dem Launch

1. Markenrecherche abgeschlossen, Marke angemeldet (DPMA, gegebenenfalls EUIPO)
2. Gesellschaft gegründet, Impressum nach § 5 DDG
3. Datenschutzerklärung, Einwilligungsmanagement, Verzeichnis der Verarbeitungstätigkeiten
4. Datenschutz-Folgenabschätzung abgeschlossen, Datenschutzbeauftragter benannt und gemeldet
5. Auftragsverarbeitungsverträge mit allen Dienstleistern, Drittlandübermittlungen geprüft
6. AGB für Käufer, Verkäufer und Makler, inklusive Nutzungsrechten an Medien, Moderationsregeln, Neutralitätsregeln und Melde- und Abhilfeverfahren
7. Transparenzseite zu Ranking und Matching, KI-Kennzeichnung mit C2PA, Schulung zur KI-Kompetenz
8. Pflichtangaben-Check nach GEG im Inserat-Assistenten
9. Fair-Matching-Konzept geprüft: keine geschützten Merkmale im Ranking, Prüfung von Freitexten
10. Erlösmodelle rechtlich geprüft (§ 34c und § 34i GewO, Tippgeber, Verkauf von Kontakten)
11. Barrierefreiheit nach WCAG 2.1 AA getestet
12. Store-Anforderungen erfüllt und Penetrationstest bestanden

## 13. Externe Unterstützung

| Thema | Wen fragen | Wann |
|---|---|---|
| Marke | Markenanwalt | sofort (Phase 0) |
| Datenschutz, Folgenabschätzung | externer Datenschutzbeauftragter, Kanzlei für IT- und Datenschutzrecht | Erstberatung in Phase 0, Begleitung ab Sprint 0 |
| AGB, Wettbewerbsrecht, KI-Verordnung | Kanzlei für IT- und Wettbewerbsrecht | Phase 1, vor der Beta |
| Makler- und Finanzierungsrecht | Kanzlei mit Immobilienschwerpunkt, IHK | vor dem Start der Erlösmodelle |
| Gesellschaft, Beteiligungen | Kanzlei für Gesellschaftsrecht, Notar, Steuerberatung | vor der Gründung bzw. der Pre-Seed-Runde |

Für die rechtliche Prüfung bis zum Launch sollten grob 10–20 Tsd. € eingeplant werden. Sie sind in den einmaligen Kosten im [Entwicklungsplan](08-anwendungsentwicklungsplan.md) enthalten.
