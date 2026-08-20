---
title: Häufig gestellte Fragen
---

## Entwicklermodus / Benutzerskript-Berechtigungen

#### F: ScriptCat zeigt „Entwicklermodus nicht aktiviert" an und Skripte laufen nicht?

Ab Chrome 120+ und neueren Edge-Versionen verlangen Browser, dass Benutzer Berechtigungen für die Ausführung von Skripten manuell aktivieren. Anweisungen zur Einrichtung finden Sie unter [Browser-Unterstützung für Benutzerskripte aktivieren](/docs/use/open-dev/).

Wenn die Warnung trotz Aktivierung weiterhin angezeigt wird, versuchen Sie, den Browser neu zu starten oder die Erweiterung neu zu laden.

## Skripte funktionieren nicht

#### F: Ein Skript wurde installiert, hat aber keine Wirkung?

1. **„Benutzerskripte zulassen" nicht aktiviert** — Siehe [Browser-Unterstützung für Benutzerskripte aktivieren](/docs/use/open-dev/)
2. **Kaltstart** — Skripte werden möglicherweise nicht sofort geladen, wenn der Browser zum ersten Mal geöffnet wird. Versuchen Sie, die Seite zu aktualisieren
3. **Erweiterungskonflikte** — Werbeblocker (z. B. uBlock Origin) können Skriptfehler verursachen

#### F: Das Skript funktioniert in Tampermonkey, aber nicht in ScriptCat?

ScriptCat und Tampermonkey unterscheiden sich in einigen Aspekten der API-Implementierung. Bitte aktualisieren Sie auf die neueste Version. Wenn das Problem weiterhin besteht, reichen Sie ein Issue auf [GitHub](https://github.com/scriptscat/scriptcat/issues) ein.

## Probleme mit der Cloud-Synchronisierung

> Zur grundlegenden Synchronisierungsnutzung siehe [Synchronisierung und Backup](/docs/use/sync/).

#### F: Probleme mit OneDrive / Google Drive / WebDAV-Synchronisierung?

1. **Gelöschte Skripte erscheinen wieder** — Stellen Sie sicher, dass „Synchronisierung von Löschungen" auf allen Geräten aktiviert ist

## Probleme bei der Skriptinstallation

> Informationen zur Installation von Skripten finden Sie unter [Skripte installieren](/docs/use/script_installation/).

## Probleme mit der Cookie-Autorisierung

#### F: GM_cookie kann keine Cookies abrufen?

1. **Autorisierungs-Popup erscheint nicht** — Stellen Sie sicher, dass `GM_cookie` ordnungsgemäß im `@grant` des Skripts deklariert ist, und deklarieren Sie mit `@connect` die Domains, auf die zugegriffen werden muss

## Verlust von Skriptdaten

#### F: Nach dem Öffnen des Browsers sind alle Skripte verschwunden?

1. **Initialisierungsverzögerung** — ScriptCat lädt die Daten beim Browserstart möglicherweise noch. Warten Sie einige Sekunden oder starten Sie den Browser neu
2. **Bereinigungssoftware** — Tools wie 360 Security Guard oder CCleaner können Erweiterungsdaten löschen. Schließen Sie Browser-Erweiterungsdaten in den Bereinigungseinstellungen aus
3. **Regelmäßige Backups empfohlen** — Nutzen Sie die Exportfunktion oder [Cloud-Synchronisierung](/docs/use/sync/), um Skripte und Einstellungen regelmäßig zu sichern
