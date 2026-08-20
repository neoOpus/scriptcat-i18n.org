---
title: Skripte mit VSCode entwickeln
---

ScriptCat bietet eine VSCode-Erweiterung, mit der Sie Benutzerskripte direkt in VSCode schreiben können. Nach dem Speichern werden Änderungen automatisch mit ScriptCat im Browser synchronisiert — kein manuelles Kopieren und Einfügen mehr nötig, was die Entwicklungseffizienz erheblich steigert.

## Voraussetzungen

Sie müssen die folgenden beiden Tools installieren:

1. **Installieren Sie die ScriptCat-Erweiterung in Ihrem Browser** — Falls noch nicht geschehen, folgen Sie dem [Schnellstart](/docs/use/use/)-Leitfaden
2. **Installieren Sie die ScriptCat-Erweiterung in VSCode** — Suchen Sie im VSCode-Erweiterungsmarktplatz nach „[scriptcat-vscode](https://marketplace.visualstudio.com/items?itemName=CodFrm.scriptcat-vscode)" oder laden Sie sie aus dem [GitHub-Repository](https://github.com/scriptscat/scriptcat-vscode) herunter

## Eine Verbindung herstellen

Nach der Installation müssen Sie die ScriptCat-Erweiterung im Browser mit VSCode verbinden:

1. Klicken Sie im Browser auf das ScriptCat-Symbol, um das Verwaltungspanel zu öffnen
2. Gehen Sie zu **Extras > Entwicklertools**
3. Suchen Sie **Automatisch mit dem VSCode-Dienst verbinden**, aktivieren Sie es und klicken Sie auf **Verbinden**

Sobald die Verbindung hergestellt ist, besteht ein Echtzeitkanal zwischen VSCode und ScriptCat.

## Skripte synchronisieren

Nachdem die Verbindung hergestellt ist, können Sie eine von zwei Möglichkeiten zur Skriptsynchronisierung wählen:

### Option 1: Automatischer Erkennungsmodus (empfohlen)

1. Drücken Sie in VSCode `Ctrl + Shift + P` (`Cmd + Shift + P` auf dem Mac), um die Befehlspalette zu öffnen
2. Geben Sie `scriptcat.autoTarget` ein und wählen Sie es aus
3. Von nun an wird jede geöffnete oder gespeicherte `.user.js`-Datei automatisch mit ScriptCat synchronisiert

### Option 2: Bestimmter Skriptmodus

1. Drücken Sie in VSCode `Ctrl + Shift + P` (`Cmd + Shift + P` auf dem Mac), um die Befehlspalette zu öffnen
2. Geben Sie `scriptcat.target` ein und wählen Sie es aus
3. Geben Sie den Pfad der zu synchronisierenden Skriptdatei an

## Entwicklungsworkflow

Nach der Einrichtung ist der Entwicklungsworkflow sehr einfach:

1. Schreiben oder bearbeiten Sie Ihr `.user.js`-Skript in VSCode
2. Drücken Sie `Ctrl + S`, um die Datei zu speichern
3. Das Skript wird automatisch mit ScriptCat im Browser synchronisiert
4. Wechseln Sie zum Browser und aktualisieren Sie die Seite, um das Ergebnis zu sehen

Der gesamte Prozess erfordert keine manuellen Schritte — Speichern wirkt sofort.

## Häufig gestellte Fragen

### Was, wenn keine Verbindung zustande kommt?

- Stellen Sie sicher, dass die ScriptCat-Erweiterung in Ihrem Browser läuft
- Stellen Sie sicher, dass die ScriptCat-Erweiterung in VSCode installiert und aktiviert ist
- Überprüfen Sie den Verbindungsstatus auf der Seite „Entwicklertools" im ScriptCat-Verwaltungspanel

### Das Skript wird nach dem Speichern nicht aktualisiert?

- Stellen Sie sicher, dass der Dateiname auf `.user.js` endet
- Stellen Sie sicher, dass Sie den Befehl `scriptcat.autoTarget` oder `scriptcat.target` ausgeführt haben
- Prüfen Sie das Ausgabefenster von VSCode auf Fehlermeldungen

### Muss ich nach einem Neustart von VSCode erneut verbinden?

Wenn „Automatisch mit dem VSCode-Dienst verbinden" aktiviert ist, verbindet sich VSCode nach einem Neustart automatisch neu — keine manuellen Schritte erforderlich.
