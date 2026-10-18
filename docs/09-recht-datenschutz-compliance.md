# 09 · Recht, Datenschutz & Compliance

> **Keine Rechtsberatung.** Dieses Dokument ist ein Überblick zur Vorbereitung auf Gespräche mit Fachleuten (Datenschutz- und IT-Recht, Miet- und Maklerrecht, Wettbewerbs- und Werberecht, Urheber- und Markenrecht). Stand der Recherche: Oktober 2026.

Recht ist für immocrush keine Fußnote. Profiling, Mieterauswahl, KI-Bilder, hochgeladene Videos, Werbung und Diskriminierungsschutz berühren den Kern des Produkts. Wer das sauber löst, gewinnt Vertrauen – bei Suchenden, Anbietern und Werbekunden.

## 1. Datenschutz (DSGVO, BDSG, TDDDG)

| Thema | Anforderung | Umsetzung bei immocrush |
|---|---|---|
| Rechtsgrundlagen | Art. 6 DSGVO: Vertrag für Kernfunktionen, Einwilligung für optionale Angaben, Partnerkontakte, personalisierte Werbung und Tracking, berechtigtes Interesse für Sicherheit und Betrugsabwehr | Zweck und Rechtsgrundlage pro Datenfeld dokumentieren; Einwilligungen versioniert speichern |
| Freiwilligkeit | Art. 7 Abs. 4 DSGVO (Kopplungsverbot) | Kernfunktionen funktionieren ohne optionale Angaben und ohne Einwilligung in Werbung |
| Besondere Kategorien | Art. 9 DSGVO: Gesundheit, Religion, ethnische Herkunft u. a. nur mit ausdrücklicher Einwilligung | nicht abfragen; Barrierefreiheit als Wohnbedarf erfassen; religiöse Einrichtungen nur mit ausdrücklicher Einwilligung; keine Gesichtserkennung (das Verpixeln von Gesichtern erkennt, identifiziert aber niemanden) |
| Profiling und automatisierte Entscheidungen | Art. 22 DSGVO: keine ausschließlich automatisierte Entscheidung mit erheblicher Wirkung. Nach dem SCHUFA-Urteil des EuGH (C-634/21, Dezember 2023) kann schon ein Wert darunter fallen, auf den sich Dritte maßgeblich stützen. | Der Anbieter entscheidet und sieht den Steckbrief, der Match-Wert ist nur eine Hilfe. „Warum passt das?“ erklärt die Logik (Art. 13 Abs. 2 lit. f). Suchende können Angaben ergänzen und erhalten Hinweise, wie sich ihr Wert verbessert. |
| Rollenverteilung | Wer ist für Steckbrief und Inbox verantwortlich: immocrush, der Anbieter oder beide gemeinsam (Art. 26 DSGVO)? | rechtlich klären und in AGB und Datenschutzerklärung abbilden; Anbieter erhalten klare Regeln, was sie mit Bewerbungen tun dürfen |
| Datenschutz-Folgenabschätzung | Art. 35 DSGVO: Pflicht bei umfangreichem Profiling und neuen Technologien wie KI | in Sprint 0 beginnen, vor dem Launch abschließen; Vermietung als eigener Schwerpunkt |
| Datenschutzbeauftragter | § 38 BDSG: Pflicht, sobald eine Folgenabschätzung erforderlich ist – unabhängig von der Zahl der Mitarbeitenden | externen Datenschutzbeauftragten benennen und der Aufsichtsbehörde melden |
| Datenschutz durch Technik | Art. 25 DSGVO | Sichtbarkeitsstufen pro Feld, anonym bis zum Match, Dokumenten-Tresor, Voreinstellungen datensparsam |
| Dienstleister und Drittländer | Art. 28 DSGVO (Auftragsverarbeitung), Art. 44 ff. (Übermittlung in Drittländer, z. B. USA über das EU-US Data Privacy Framework oder Standardvertragsklauseln) | EU-Regionen nutzen (Supabase Frankfurt, Railway EU, PostHog EU), Verträge mit allen Dienstleistern, KI-Anbieter ohne Training mit unseren Daten |
| Rechte der Nutzer | Auskunft, Berichtigung, Löschung, Datenübertragbarkeit, Widerspruch | Datenschutz-Cockpit mit Export, Löschen und Sichtbarkeitseinstellungen |
| Endgeräte-Zugriff | § 25 TDDDG: Einwilligung für nicht notwendige Cookies, SDKs und Tracking | Einwilligungs-Management auf der Website und in den Apps; ohne Einwilligung nur notwendige Technik und kontextbezogene Werbung |
| Sicherheit und Datenpannen | Art. 32–34 DSGVO | Verschlüsselung, Zugriffsrechte, Penetrationstest; Meldung an die Behörde innerhalb von 72 Stunden |
| Dokumentation | Art. 30 DSGVO (Verzeichnis der Verarbeitungstätigkeiten) | vor dem Launch anlegen und laufend pflegen |
| Mindestalter | – | Konto ab 18 Jahren; Anschauen im Gastmodus ohne Konto |

## 2. Vermietung: Mieterauswahl, Wohnungsvermittlung, Miethöhe

### 2.1 Selbstauskunft nach den Regeln der Datenschutzbehörden

Die Datenschutzkonferenz (DSK) hat im Januar 2026 ihre Orientierungshilfe zur Selbstauskunft von Mietinteressenten neu gefasst (Version 2.0). Sie legt fest, welche Angaben Vermieter, Makler und Hausverwaltungen in welcher Phase verlangen dürfen. Unser Steckbrief folgt diesen Stufen (Details im [Produktkonzept](03-produktkonzept.md)).

| Phase laut DSK | Erlaubte Angaben (Auszug) | Bei immocrush |
|---|---|---|
| Besichtigungstermin | Name, Vorname, Anschrift; bei Sozialwohnungen: Wohnberechtigungsschein vorhanden, genehmigte Fläche und Zimmerzahl | Stufe 1: anonym mit Match-Wert und Angaben zum Wohnberechtigungsschein; Name und Kontakt kommen mit dem Match |
| Erklärung, die Wohnung mieten zu wollen | Zahl der Personen, Beruf und Arbeitgeber, ob das Einkommen für die Miete reicht, Haustiere, laufendes Insolvenzverfahren, Räumungstitel der letzten 5 Jahre | Stufe 2: Bewerbung, weiterhin ohne Namen bis zum Match |
| Entscheidung für eine Person | Einkommensnachweis (nicht nötige Angaben geschwärzt), Bonitätsauskunft für Mietzwecke, ggf. Nachweis der Mietübernahme durch eine öffentliche Stelle | Stufe 3: Freigabe aus dem Dokumenten-Tresor |

**Wichtige Regeln**

- **Einwilligung ist keine Grundlage.** Vermieter dürfen Angaben nicht per Einwilligung „absichern“. Erlaubt ist nur, was für die Auswahl erforderlich ist (Art. 6 Abs. 1 lit. b oder f DSGVO). Wird der Mietvertrag von einer Einwilligung in nicht erforderliche Angaben abhängig gemacht, ist sie unwirksam.
- **Nie abfragen:** Religion, ethnische Herkunft, Staatsangehörigkeit, Vorstrafen, Heiratsabsichten, Schwangerschaft, Kinderwunsch, Partei- oder Mietervereins-Mitgliedschaft, Dauer des Arbeitsverhältnisses, frühere Vermieter. Eine Mietschuldenfreiheitsbescheinigung darf nicht verlangt werden. Diese Felder gibt es bei uns nicht.
- **Löschen:** Daten nicht ausgewählter Bewerber sind zu löschen, sobald sie nicht mehr gebraucht werden, wegen möglicher Ansprüche nach § 21 AGG regelmäßig spätestens nach 6 Monaten. Makler und Hausverwaltungen müssen spätestens löschen, wenn ein Mietvertrag mit jemand anderem geschlossen wurde. Bei uns endet der Zugriff automatisch.
- **Keine schwarzen Listen:** Listen „auffälliger“ Mietinteressenten und der Abgleich mit solchen Beständen sind grundsätzlich unzulässig. Deshalb gibt es bei immocrush keine Bewertungen von Mietern und keine Warnlisten.
- **Kontakt für weitere Wohnungen:** Ein Vermieter darf Kontaktdaten länger behalten, wenn der Mietsuchende einwilligt, über andere frei werdende Wohnungen informiert zu werden. Das bieten wir als freiwillige Option an.

### 2.2 Wohnungsvermittlung (WoVermittG)

- **Bestellerprinzip (§ 2 Abs. 1a WoVermittG):** Mietsuchende zahlen keine Maklerprovision, es sei denn, der Makler sucht ausschließlich in ihrem Auftrag. Für immocrush heißt das: Von Mietsuchenden nehmen wir kein Geld – kein Abo, keine Gebühr.
- **Auftrag erforderlich (§ 6 Abs. 1 WoVermittG):** Makler dürfen Wohnungen nur anbieten, wenn sie einen Auftrag des Vermieters haben. Makler bestätigen das beim Inserieren.
- **Pflichtangaben (§ 6 Abs. 2 WoVermittG):** Makler müssen öffentlich ihren Namen, die Bezeichnung als Wohnungsvermittler und den Mietpreis angeben und darauf hinweisen, ob Nebenleistungen extra kosten. Das sind bei uns Pflichtfelder in Makler-Mietinseraten.
- **Sind wir selbst Wohnungsvermittler?** Solange wir weder von Mietsuchenden noch erfolgsabhängig Geld nehmen, sprechen gute Gründe dagegen. Das lassen wir trotzdem bestätigen.

### 2.3 Miethöhe, Kaution, Wohnberechtigungsschein

- **Mietpreisbremse (§§ 556d ff. BGB):** In Gebieten mit angespanntem Wohnungsmarkt darf die Miete bei Neuvermietung grundsätzlich höchstens 10 % über der ortsüblichen Vergleichsmiete liegen. Die Länder-Verordnungen dürfen nach der Verlängerung von 2025 bis Ende 2029 gelten. Verantwortlich ist der Vermieter. Wir zeigen beim Inserieren einen Hinweis, wo die Mietpreisbremse gilt, und bieten in V1 ein Feld für die vorvertragliche Auskunft über Ausnahmen (§ 556g Abs. 1a BGB).
- **Kaution:** höchstens drei Monatsmieten ohne Betriebskosten (§ 551 BGB). Der Inserat-Assistent prüft das auf Plausibilität.
- **Wohnberechtigungsschein (§ 27 WoFG bzw. Landesrecht):** Bei Sozialwohnungen dürfen Vermieter danach fragen; dafür gibt es einen erlaubten Filter.

## 3. Gleichbehandlung und Fair Matching (AGG)

- **Für alle Anbieter:** Wer Wohnraum öffentlich anbietet, darf Interessenten nicht wegen ihrer ethnischen Herkunft oder aus rassistischen Gründen benachteiligen (§ 19 Abs. 2 in Verbindung mit § 2 Abs. 1 Nr. 8 AGG).
- **Bei Massengeschäften** gilt das Verbot auch für Geschlecht, Religion, Behinderung, Alter und sexuelle Identität (§ 19 Abs. 1 AGG). Bei der Vermietung ist das in der Regel der Fall, wenn jemand mehr als 50 Wohnungen vermietet (§ 19 Abs. 5 Satz 3 AGG) – also bei Wohnungsunternehmen und vielen Hausverwaltungen.
- **Ausnahmen:** besonderes Nähe- oder Vertrauensverhältnis, etwa Wohnraum auf demselben Grundstück (§ 19 Abs. 5 AGG), und eingeschränkt die Schaffung sozial stabiler Bewohnerstrukturen (§ 19 Abs. 3 AGG).
- **Folgen:** Betroffene können Beseitigung, Schadensersatz und Entschädigung verlangen (§ 21 AGG).
- **Unsere Regel:** Wir wenden den strengsten Maßstab auf alle an, unabhängig von der Größe des Anbieters. Unsere Plattform darf Diskriminierung nicht erleichtern. Das ist rechtlich geboten, ethisch richtig und ein Vertrauensargument.

**Umsetzung**

- Keine geschützten Merkmale als Filter, Sortierung oder Ranking-Faktor; auch keine Ersatzmerkmale wie Sprache, Kinder ja oder nein oder Beruf als Ausschlusskriterium
- Fotos, Namen und Kontaktdaten erst nach dem Match
- Alter nur optional, als Altersgruppe und nie für Anbieter sichtbar oder filterbar
- Freitext-Wünsche von Anbietern werden auf diskriminierende Aussagen geprüft und gegebenenfalls nicht übernommen
- Ablehnungen sind ohne Begründung möglich; vorformulierte Gründe sind sachlich (Zeitplan, Finanzierung, Passung)
- regelmäßige Fairness-Prüfung des Rankings, zum Beispiel ob Haushaltstypen systematisch benachteiligt werden

## 4. KI-Verordnung (AI Act)

| Pflicht | Seit | Bedeutung für immocrush |
|---|---|---|
| KI-Kompetenz (Art. 4) | 2. Februar 2025 | Schulung aller, die KI-Systeme entwickeln oder einsetzen; dokumentieren |
| Verbotene Praktiken (Art. 5) | 2. Februar 2025 | keine manipulativen Techniken; unsere spielerischen Elemente bleiben transparent und freiwillig |
| Hinweis bei KI-Interaktion (Art. 50 Abs. 1) | 2. August 2026 | ein KI-Assistent im Chat muss als KI erkennbar sein |
| Maschinenlesbare Kennzeichnung (Art. 50 Abs. 2) | 2. August 2026 | erzeugte oder wesentlich veränderte Bilder, Videos und Texte maschinenlesbar markieren (z. B. C2PA). Ausgenommen ist reine Standardbearbeitung wie Belichtung oder Begradigung, die den Inhalt nicht wesentlich verändert. |
| Offenlegung von Deepfakes (Art. 50 Abs. 4) | 2. August 2026 | Virtuelles Home Staging oder entfernte Gegenstände in Fotos echter Räume können als „Deepfake“ gelten (Art. 3 Nr. 60). Wer sie veröffentlicht, muss sie offenlegen. Wir setzen das Label automatisch. |

- **Übergangsfrist:** Die Frist bis 2. Dezember 2026 gilt nur für Systeme, die vor dem 2. August 2026 auf den Markt kamen. Verschoben wurden durch den „Digital Omnibus“ nur die Regeln für Hochrisiko-Systeme. Für immocrush gilt Art. 50 also ab dem ersten Tag.
- **Hochrisiko vermeiden:** Eine eigene Kreditwürdigkeitsprüfung natürlicher Personen wäre ein Hochrisiko-System (Anhang III Nr. 5 lit. b) mit umfangreichen Pflichten. Finanzierungs-Checks und Bonitätsnachweise überlassen wir deshalb erlaubten Partnern. Wir zeigen nur das Ergebnis als Badge oder Dokument, auf Wunsch der Suchenden.
- **Matching** von Suchenden und Immobilien ist nach aktuellem Stand kein Hochrisiko-System. Das sollte im Rahmen der Folgenabschätzung bestätigt werden – gerade für die Vermietung.

## 5. Werbung, Extras und Rankings (UWG, P2B-Verordnung, DSA)

### 5.1 Kennzeichnung und Rankings

- **Irreführung (§ 5 UWG):** KI-Bilder dürfen keine falschen Vorstellungen über die Immobilie wecken. Daher unsere Leitplanken „Verschönern ja, verfälschen nein“, die Kennzeichnung und der Schalter „Original / KI-Version“.
- **Selbst erzeugte Inhalte:** Texte und Filme aus dem Producer sind nicht mehr nur fremde Nutzerinhalte. Wir könnten für Fehler mitverantwortlich sein. Deshalb gibt es den automatischen Faktencheck, und der Anbieter muss jedes Inserat vor der Veröffentlichung prüfen und freigeben.
- **Wesentliche Informationen (§ 5a UWG):** Bei Makler-Inseraten ist die Käuferprovision Pflichtfeld. Das Badge „provisionsfrei“ erscheint nur, wenn es stimmt.
- **Extras und Werbung kennzeichnen:** Bezahlte Platzierungen und Anzeigen müssen als solche erkennbar sein (§ 5a Abs. 4 UWG). Bezahlte Rankings in Suchergebnissen ohne Hinweis sind immer unzulässig (Nr. 11a des Anhangs zum UWG). Bei uns heißen sie „Gesponsert“ bzw. „Anzeige“.
- **Ranking-Transparenz:** Die Hauptparameter des Rankings müssen erklärt werden – gegenüber Verbrauchern (§ 5b Abs. 2 UWG) und gegenüber gewerblichen Anbietern (Art. 5 P2B-Verordnung). Dafür gibt es eine öffentliche Seite „So funktionieren Feed, Matching und Extras“. Dort steht auch: Extras wirken nie in der Inbox der Anbieter.

### 5.2 „Kostenlos“ richtig bewerben

- „Kostenlos“, „gratis“ oder „umsonst“ darf nur heißen, was wirklich nichts kostet (Nr. 20 des Anhangs zum UWG). Das Basisangebot muss also vollständig nutzbar sein, ohne dass ein Extra nötig wird.
- Grenzen des kostenlosen Angebots, z. B. bis zu 3 aktive Inserate für private Anbieter, müssen in der Werbung klar und nah am Wort „kostenlos“ stehen.
- Auch kostenlose Verträge, bei denen Nutzer Daten bereitstellen, unterliegen dem Verbraucherrecht (§ 312 Abs. 1a BGB).

### 5.3 Personalisierte Werbung und Einwilligung

- **Personalisierte Werbung braucht in der Praxis eine Einwilligung.** Der EuGH hat 2023 entschieden, dass sie sich nicht mit der Erforderlichkeit für den Vertrag rechtfertigen lässt (C-252/21, Meta gegen Bundeskartellamt). Für Cookies und SDKs gilt zusätzlich § 25 TDDDG.
- **Standard bei uns:** kontextbezogene Werbung nach Region, Kauf oder Miete, Objektart und Thema – ohne Profil. Personalisierte Werbung nur mit Einwilligung, nie auf Basis sensibler Daten.
- **DSA (Art. 26 und 28):** Online-Plattformen müssen bei jeder Anzeige zeigen, dass es Werbung ist, für wen sie läuft und nach welchen Hauptparametern sie ausgespielt wird. Werbung auf Basis besonderer Kategorien (Art. 9 DSGVO) ist verboten, ebenso profilbasierte Werbung an Minderjährige. Kleinunternehmen sind anfangs ausgenommen; wir setzen das trotzdem von Beginn an um. Im Gastmodus, wo wir das Alter nicht kennen, gibt es nur kontextbezogene Werbung.
- **Keine Werbung an sensiblen Stellen:** nie im Steckbrief, in der Inbox, im Chat oder in Match-Benachrichtigungen.

### 5.4 E-Mail, Newsletter und Partner-Kontakte

- **Werbe-E-Mails** brauchen eine vorherige ausdrückliche Einwilligung (§ 7 Abs. 2 Nr. 2 UWG), in der Praxis per Double-Opt-in. Die Ausnahme für Bestandskunden (§ 7 Abs. 3 UWG) ist eng.
- **Match-Benachrichtigungen und Alerts**, die Nutzer selbst einrichten, sind Service-Nachrichten. Sie bleiben werbefrei, damit das so bleibt. Der Newsletter „Haus der Woche“ mit Sponsor-Platz geht nur an Abonnenten mit Einwilligung.
- **Partner-Angebote im Umzugsplaner:** Daten gehen nur mit ausdrücklicher Einwilligung im Einzelfall an einen namentlich genannten Partner. Will ein Partner anrufen, braucht er eine ausdrückliche Einwilligung in Telefonwerbung (§ 7 Abs. 2 Nr. 1 UWG), die er dokumentieren muss (§ 7a UWG).
- **Werbung für Kredite:** Nennt eine Bank in ihrer Anzeige Zinsen, sind Pflichtangaben wie ein repräsentatives Beispiel nötig (§ 17 PAngV). Verantwortlich ist der Werbekunde; wir prüfen Anzeigen vor dem Start.

### 5.5 Creator und Influencer

- Bezahlte Beiträge von Creatorn müssen als Werbung gekennzeichnet sein (§ 5a Abs. 4 UWG, § 22 Medienstaatsvertrag). Das schreiben wir in jeden Creator-Vertrag und prüfen es.
- Auch unsere eigenen Kanäle kennzeichnen Kooperationen, z. B. mit Werbekunden.
- Honorare an Creator, Designer, Fotografen und Videografen können künstlersozialabgabepflichtig sein. Das plant die Buchhaltung von Anfang an ein.

### 5.6 Google-Anzeigen auf Markennamen der Wettbewerber

- Markennamen wie „ImmoScout24“ oder „immowelt“ als Suchbegriff für eigene Anzeigen zu buchen, ist grundsätzlich erlaubt (EuGH, Google France, C-236/08 bis C-238/08; Interflora, C-323/09).
- Voraussetzung: Die Anzeige macht klar, dass sie von immocrush stammt, erweckt keinen Eindruck einer Verbindung und nennt die fremde Marke nicht im Anzeigentext.

### 5.7 Vergleichende Werbung

- Vergleiche mit Wettbewerbern sind erlaubt, wenn sie sachlich, nachprüfbar und aktuell sind (§ 6 UWG). „Bei ohne-makler.net ab 129 €, bei uns 0 €“ geht, wenn der Preis zum Zeitpunkt der Werbung stimmt und vergleichbare Leistungen gegenübergestellt werden. Preise regelmäßig prüfen und mit Datum dokumentieren.
- Herabsetzen ist verboten (§ 6 Abs. 2 Nr. 5 und § 4 Nr. 1 UWG). Was intern stimmen mag – „die Seite ist echt boring“ – gehört nicht in die Werbung.

### 5.8 Spiele mit Preisen

Wenn es bei „Preis raten“ oder Duellen etwas zu gewinnen gibt: klare Teilnahmebedingungen, keine Kopplung an einen Kauf oder an Einwilligungen in Werbung.

## 6. Gebäudeenergiegesetz (GEG)

- **Pflichtangaben in Anzeigen (§ 87 GEG):** Liegt beim Inserieren zum Verkauf oder zur Vermietung ein Energieausweis vor, muss die Anzeige bei Wohngebäuden Folgendes enthalten:
  - Art des Ausweises (Bedarf oder Verbrauch)
  - Endenergiebedarf bzw. -verbrauch
  - wesentlicher Energieträger der Heizung
  - Baujahr laut Ausweis
  - Energieeffizienzklasse
- Verpflichtet sind Verkäufer, Vermieter und Makler. Fehlende Angaben werden häufig abgemahnt, unter anderem von Umweltverbänden.
- **Liegt noch kein Ausweis vor,** entfällt die Anzeigenpflicht. Der Ausweis muss aber spätestens bei der Besichtigung vorgelegt werden (§ 80 Abs. 4 GEG).
- **Umsetzung:** Pflichtangaben-Check vor der Veröffentlichung, ab V1 Energieausweis-Scan, Hinweis und Partnerangebot, falls kein Ausweis vorliegt. Das gilt auch für hochgeladene Videos: Die Pflichtangaben stehen im Inserat daneben.

## 7. Digital Services Act (DSA) und Digitale-Dienste-Gesetz (DDG)

immocrush ist eine Online-Plattform im Sinne des DSA, weil Inserate und Videos öffentlich verbreitet werden.

| Pflicht | Gilt für uns |
|---|---|
| Kontaktstellen für Behörden und Nutzer (Art. 11, 12) | ja |
| AGB mit Angaben zur Moderation (Art. 14) | ja |
| Melde- und Abhilfeverfahren für rechtswidrige Inhalte (Art. 16) | ja, auch für Urheberrechtsverletzungen in Videos |
| Begründung von Moderationsentscheidungen (Art. 17) | ja |
| Meldung des Verdachts auf schwere Straftaten (Art. 18) | ja |
| Haftungsprivileg (Art. 6) | nur, wenn wir nach Kenntnis rechtswidriger Inhalte zügig handeln |
| Transparenzberichte, internes Beschwerdesystem, Verbot von Dark Patterns, Werbe- und Empfehlungstransparenz, Nachverfolgbarkeit von Unternehmern (Art. 15, 20–32) | Kleinst- und Kleinunternehmen sind weitgehend ausgenommen. Die Ausnahme endet zwölf Monate nach Überschreiten der Schwellen. |

Auch wenn wir anfangs ausgenommen sind: Dark Patterns sind ohnehin nach UWG und DSGVO problematisch, Werbekennzeichnung verlangt das UWG, Ranking-Transparenz verlangen UWG und P2B-Verordnung. Wir setzen diese Punkte deshalb von Beginn an um. Die Nachverfolgbarkeit von Unternehmern (Art. 30) ist bei Maklern, Bauträgern und Hausverwaltungen ohnehin sinnvoll: Wer gewerblich inseriert, hinterlegt Firmendaten.

**Impressum** nach § 5 DDG auf Website und in den Apps.

## 8. Makler-, Gewerbe- und Finanzierungsrecht

immocrush ist Plattform, kein Makler. Wir vermitteln nicht selbst und nehmen keine Erfolgsprovision.

| Thema | Regel | Konsequenz |
|---|---|---|
| Maklererlaubnis (§ 34c GewO) | erforderlich für den Nachweis oder die Vermittlung von Kauf- und Mietverträgen über Wohnraum | Als Plattform mit festen Preisen für Extras und Werbung brauchen wir sie nicht. Für Eigentümer-Kontakte (Weitergabe an Makler) und jedes erfolgsabhängige Modell rechtlich prüfen. |
| Maklerverträge beim Kauf (§§ 656a ff. BGB) | Textform; bei Wohnungen und Einfamilienhäusern teilen sich Käufer und Verkäufer die Provision höchstens hälftig | Käuferprovision ist Pflichtfeld im Makler-Inserat |
| Wohnungsvermittlung (WoVermittG) | Bestellerprinzip, Auftrag des Vermieters, Pflichtangaben | siehe Abschnitt 2.2 |
| Finanzierungsvermittlung (§ 34i GewO) | Erlaubnispflicht für die Vermittlung und Beratung zu Immobiliardarlehen | nur als Tippgeber: Kontakt mit Einwilligung weitergeben, keine Beratung, keine konkreten Angebote oder Konditionen. Der Budget-Rechner bleibt allgemein. |
| Versicherungen (§ 34d GewO) | entsprechend | nur Tippgeber-Modell |
| Strom, Internet, Umzug | keine besondere Erlaubnis für Werbung und Kontaktweitergabe | Einwilligung und Kennzeichnung wie bei aller Werbung |
| Geldwäschegesetz | Immobilienmakler sind verpflichtet (Identifizierung, Risikomanagement) | betrifft uns nicht, solange wir nicht selbst vermitteln |
| Rechtsdienstleistungen (RDG) | Rechtsberatung im Einzelfall ist Anwälten und Notaren vorbehalten | Verkaufs- und Vermietungsfahrplan und KI-Assistent geben allgemeine Informationen und verweisen auf Notar, Anwalt oder Mieter- und Eigentümervereine |

**Interessenkonflikt, wenn Gründer auch als Makler tätig sind**

- Keine bevorzugte Platzierung eigener oder verbundener Objekte
- Kein privilegierter Zugang zu Daten von Suchenden für verbundene Maklerbüros
- Offenlegung der Verbindung in den AGB; die P2B-Verordnung verlangt das ohnehin, wenn eigene Angebote anders behandelt werden (Art. 7)
- gleiche Konditionen für alle Makler, Kontrolle durch den Beirat

Für das Vertrauen der Makler ist das entscheidend. Ihre größte Sorge wird sein, dass die Plattform ihre Daten nutzt, um selbst zu vermitteln.

## 9. Urheberrecht, Persönlichkeitsrechte und hochgeladene Videos

**Fremde Inserate**

- **Kein Einsammeln fremder Inserate (Scraping).** Der Ausgangstext schlägt vor, „die Angebote permanent zu durchforsten“. Die Datenbanken der Portale sind geschützt (§§ 87a ff. UrhG), Fotos sind es ebenfalls (§ 72 UrhG), und die Portale untersagen das in ihren Nutzungsbedingungen. Die Ausnahme für Text- und Data-Mining (§ 44b UrhG) greift nicht, wenn Rechteinhaber maschinenlesbar widersprechen – und die Portale tun das.
- **Stattdessen:** eigenes Inventar von privaten und gewerblichen Anbietern, OpenImmo-Schnittstellen mit klaren Nutzungsrechten, lizenzierte Marktdaten und öffentliche Quellen (Gutachterausschüsse, Statistikämter).

**Hochgeladene Videos und Fotos**

| Thema | Risiko | Umsetzung |
|---|---|---|
| Musik | Musik aus Instagram oder TikTok ist meist nur innerhalb dieser Plattformen lizenziert | Rechte-Bestätigung beim Upload; Knopf „Musik ersetzen“ mit lizenzierter Musik oder Ton aus |
| Videograf und Fotograf | Wer das Video gedreht hat, hat die Urheberrechte. Makler brauchen Nutzungsrechte, die auch die Veröffentlichung bei uns abdecken. | Anbieter bestätigen ihre Rechte; AGB mit Freistellung; Vorlage für Verträge mit Videografen im Ratgeber |
| Abgebildete Personen | Recht am eigenen Bild (§§ 22, 23 KUG) und Datenschutz | Bestätigung beim Upload; automatisches Verpixeln von Gesichtern im KI-Weg; Melden-Funktion |
| Bewohnte Wohnungen | Privatsphäre der aktuellen Mieter | Upload fragt die Zustimmung der Mieter ab |
| Logos und Wasserzeichen anderer Plattformen | Marken- und Nutzungsbedingungen | Hinweis, das Original ohne Logo hochzuladen |
| Haftung | Als Plattform haften wir ab Kenntnis | Melde- und Abhilfeverfahren nach DSA, Erkennung doppelter Medien, Sperre bei wiederholten Verstößen |

- **Urheberrechts-Diensteanbieter-Gesetz (UrhDaG):** Es verpflichtet Plattformen, deren Hauptzweck das Teilen großer Mengen urheberrechtlich geschützter Nutzerinhalte ist, zu Lizenzen und Filtern. Online-Marktplätze sind ausdrücklich ausgenommen (§ 3 UrhDaG). Ob das auch für unseren Unterhaltungs-Feed trägt, lassen wir prüfen.
- **Nutzungsrechte an Medien:** Anbieter räumen uns in den AGB einfache Nutzungsrechte ein – für das Inserat, die Bearbeitung im Producer und die Bewerbung des Inserats auf unseren Kanälen und Social Media, jederzeit mit dem Inserat widerrufbar.
- **Musik in unseren Filmen:** nur Musik mit Lizenz für kommerzielle Nutzung inklusive Social Media.
- **KI-Ergebnisse** sind oft nicht urheberrechtlich geschützt. Für uns ist das kein Problem, weil unser Wert im Netzwerk liegt und nicht in einzelnen Filmen.

**Privatsphäre privater Anbieter**

- Gesichter, Familienfotos, Hausnummern und Kennzeichen werden im KI-Weg automatisch verpixelt.
- Die genaue Adresse privater Anbieter erscheint erst nach dem Match; im Feed und auf der Karte nur die ungefähre Lage.

## 10. Barrierefreiheit (BFSG)

- Das Barrierefreiheitsstärkungsgesetz gilt seit dem 28. Juni 2025 unter anderem für Dienstleistungen im elektronischen Geschäftsverkehr, also für Websites und Apps, über die Verbraucher Verträge schließen.
- Kleinstunternehmen (unter 10 Beschäftigte und höchstens 2 Mio. € Jahresumsatz oder Bilanzsumme) sind als Dienstleister ausgenommen. Wir wachsen aber schnell über diese Schwelle hinaus.
- **Umsetzung:** von Anfang an WCAG 2.1 AA, Untertitel für alle Videos, Barrierefreiheitserklärung, sobald das Gesetz für uns gilt. Nachrüsten ist teurer als gleich richtig bauen.

## 11. Verbraucherrecht

- **Bestell-Button** mit der Aufschrift „zahlungspflichtig bestellen“ oder gleichwertig (§ 312j BGB), auch für Extras
- **Kündigungs-Button** für Abos und Monatspakete, die online abgeschlossen werden (§ 312k BGB)
- **Widerrufsrecht** von 14 Tagen und die Regeln für das vorzeitige Erlöschen bei digitalen Leistungen, z. B. wenn eine Top-Platzierung sofort startet
- **Preisangaben** als Endpreise inklusive Umsatzsteuer (Preisangabenverordnung); Firmenkunden erhalten Rechnungen mit ausgewiesener Umsatzsteuer
- **AGB-Recht** (§§ 305 ff. BGB): verständlich, keine überraschenden Klauseln
- **Hinweis zur Verbraucherschlichtung** nach § 36 VSBG, sobald wir mehr als zehn Beschäftigte haben

## 12. App-Store-Regeln

Konto löschen in der App, Sign in with Apple als gleichwertiger Login, Moderation von Nutzerinhalten, Datenschutzangaben, Regeln für In-App-Käufe. Details stehen im [Entwicklungsplan](08-anwendungsentwicklungsplan.md), Abschnitt 14.

## 13. Checkliste vor dem Launch

1. Markenrecherche abgeschlossen, Marke angemeldet (DPMA, gegebenenfalls EUIPO)
2. Gesellschaft gegründet, Impressum nach § 5 DDG
3. Datenschutzerklärung, Einwilligungs-Management, Verzeichnis der Verarbeitungstätigkeiten
4. Datenschutz-Folgenabschätzung abgeschlossen (mit Schwerpunkt Vermietung), Datenschutzbeauftragter benannt und gemeldet
5. Rollenverteilung für Steckbrief und Inbox geklärt; Stufenmodell für die Vermietung mit der Datenschutzberatung abgestimmt
6. Auftragsverarbeitungsverträge mit allen Dienstleistern, Drittlandübermittlungen geprüft
7. AGB für Suchende, private und gewerbliche Anbieter und Werbekunden, inklusive Nutzungsrechten an Medien, Rechte-Bestätigung für Uploads, Moderationsregeln, Neutralitätsregeln und Melde- und Abhilfeverfahren
8. Transparenzseite zu Feed, Matching, Extras und Werbung; KI-Kennzeichnung mit C2PA; Schulung zur KI-Kompetenz
9. Pflichtangaben-Check nach GEG und WoVermittG im Inserat-Assistenten
10. Fair-Matching-Konzept geprüft: keine geschützten Merkmale oder Ersatzmerkmale in Filtern und Ranking, Prüfung von Freitexten, automatische Löschfristen
11. Werbung geprüft: Kennzeichnung, Einwilligungen für personalisierte Werbung und E-Mails, Werbeformulierungen wie „kostenlos“ und Preisvergleiche, Creator-Verträge
12. Erlösmodelle rechtlich geprüft (§ 34c, § 34d und § 34i GewO, WoVermittG, Tippgeber, Weitergabe von Kontakten)
13. Musikbibliothek lizenziert
14. Barrierefreiheit nach WCAG 2.1 AA getestet
15. Store-Anforderungen erfüllt und Penetrationstest bestanden

## 14. Externe Unterstützung

| Thema | Wen fragen | Wann |
|---|---|---|
| Marke | Markenanwalt | sofort (Warm-up) |
| Datenschutz, Folgenabschätzung, Vermietung | externer Datenschutzbeauftragter, Kanzlei für IT- und Datenschutzrecht | Erstberatung im Warm-up, Begleitung ab Sprint 0 |
| AGB, Werbe- und Wettbewerbsrecht, KI-Verordnung, Urheberrecht an Uploads | Kanzlei für IT-, Medien- und Wettbewerbsrecht | Phase 1, vor der Beta; Werbeformulierungen vor jeder großen Kampagne |
| Miet-, Makler- und Finanzierungsrecht | Kanzlei mit Immobilienschwerpunkt, IHK | vor der Beta |
| Gesellschaft und Finanzierung ohne Investoren (Förderkredite, Crowdinvesting, Media-for-Revenue) | Steuerberatung, Kanzlei für Gesellschafts- und Kapitalmarktrecht | vor der Gründung bzw. vor Abschluss |

Für die rechtliche Prüfung bis zum Launch sollten grob 10–20 Tsd. € eingeplant werden. Sie sind in den einmaligen Kosten im [Entwicklungsplan](08-anwendungsentwicklungsplan.md) enthalten.

## Quellen

- Datenschutzkonferenz: [Orientierungshilfe zur Einholung von Selbstauskünften bei Mietinteressent:innen, Version 2.0 (Januar 2026)](https://www.datenschutzkonferenz-online.de/media/oh/OH_Einholung_von_Selbstauskuenften_Mietinteressenten_V2.pdf)
- [Gesetz zur Verlängerung der Mietpreisbremse, BGBl. 2025 I Nr. 163](https://www.recht.bund.de/bgbl/1/2025/163/VO.html)
- [BMJV zur Mietpreisbremse](https://www.bmjv.de/SharedDocs/Gesetzgebungsverfahren/DE/2025_Mietpreisbremse.html)
