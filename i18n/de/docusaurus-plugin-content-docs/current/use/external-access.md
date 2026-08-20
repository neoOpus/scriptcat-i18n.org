---
title: Externer Zugriff (CLI und KI-Clients)
sidebar_label: Externer Zugriff
---

**Externer Zugriff** ermöglicht lokalen Kommandozeilenprogrammen und [MCP](https://modelcontextprotocol.io/)-fähigen KI-Clients,
Skripte in ScriptCat über [sctl](https://github.com/scriptscat/sctl) zu verwalten.

```text
AI client ── stdio MCP ──▶ sctl mcp ── local control API ──▶ sctl serve ── WebSocket ──▶ ScriptCat
CLI ────────────────────────────────────────────────────────▲
```

`sctl serve` ist ein separater lokaler Daemon, den Sie explizit starten müssen. `sctl mcp` und Anfragebefehle starten
ihn niemals automatisch. Die Richtlinien von ScriptCat und die Browser-Bestätigungsoberfläche entscheiden stets, ob die
Offenlegung von Quellcode oder ein Schreibzugriff erlaubt ist; ein externes Programm kann seine eigene Anfrage nicht genehmigen.

:::warning Der Listener ist standardmäßig lokal
sctl lauscht standardmäßig auf `127.0.0.1`. Nur wenn `--listen-address` explizit übergeben wird, lauscht es auf einer
anderen Schnittstelle. `ws://` verschlüsselt den Geschäftsverkehr nicht und es gibt keine Trennung zwischen Remote-Clients,
verwenden Sie eine Nicht-Standard-Adresse daher nur in einem vertrauenswürdigen Netzwerk. Erweiterung und Daemon etablieren
dennoch einen langfristigen Schlüssel über einen einmaligen Kopplungscode und verwenden bei späteren Verbindungen gegenseitige Authentifizierung.
:::

## 1. sctl installieren

Installieren Sie die neueste Version mit einem Befehl — macOS und Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.sh | sh
```

oder Windows PowerShell:

```powershell
irm https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.ps1 | iex
```

Das Installationsprogramm lädt das mit Bindestrich benannte Release-Archiv `sctl-<version>-<os>-<arch>.<ext>` für Ihre
Plattform herunter, prüft dessen sha256 gegen `checksums.txt` aus demselben Release und installiert `sctl` in `~/.local/bin`
(macOS/Linux) oder `%LOCALAPPDATA%\sctl\bin` (Windows). `SCTL_VERSION` legt eine bestimmte Version fest; `SCTL_INSTALL_DIR`
überschreibt das Installationsverzeichnis. Wenn das Installationsverzeichnis nicht in Ihrem `PATH` liegt, gibt das
Installationsprogramm den genauen `PATH`-Hinweis für Ihre Plattform aus — es bearbeitet niemals Ihr Shell-Profil oder den
Benutzer-`PATH` für Sie.

sctl ist eine einzelne ausführbare Datei. Wenn [GitHub Releases](https://github.com/scriptscat/sctl/releases) ein
veröffentlichtes Archiv für Ihre Plattform enthält, können Sie es auch herunterladen und entpacken und dann `sctl`
(`sctl.exe` unter Windows) in den `PATH` aufnehmen.

```bash
sctl version
```

Ein reiner Quellcode-Build meldet `0.0.0-dev`, um ihn von einem Release-Build mit eingebetteter Version, Commit und
Build-Zeit-Metadaten zu unterscheiden; dies verhindert nicht die Verbindung zu ScriptCat. Wenn kein Release verfügbar ist,
können Mitwirkende es aus dem [sctl-Repository](https://github.com/scriptscat/sctl) erstellen.

## 2. Daemon starten und anmelden

Die Anmeldung ist ein einmaliger Schritt. Danach teilen sich die CLI und jeder MCP-Client den vertrauenswürdigen
Erweiterung-zu-Daemon-Kanal; sie koppeln nicht separat.

### 2.1 Ein Datenverzeichnis wählen

Der Daemon, die CLI und der MCP-Prozess müssen dasselbe Datenverzeichnis verwenden. Es speichert den langfristigen
Kopplungsschlüssel, das lokale Steuerungs-Token und Protokolle. Wählen Sie einen absoluten Pfad, der für den aktuellen
Benutzer privat ist:

```text
/absolute/path/to/sctl-data
```

Setzen Sie dieselbe Umgebungsvariable für jeden sctl-Prozess:

```bash
export SCTL_DATA_DIR=/absolute/path/to/sctl-data
sctl serve
sctl status
sctl mcp
```

Ein explizites `--data-dir` hat Vorrang vor der Umgebungsvariable.

Wenn weder `--data-dir` noch `SCTL_DATA_DIR` gesetzt ist, verwendet sctl das plattformspezifische Standardverzeichnis für
Benutzeranwendungsdaten. Legen Sie das Datenverzeichnis nicht in ein Repository oder einen gemeinsamen Synchronisierungsordner
und geben Sie niemals `pairing.key` oder `control.token` an ein KI-Modell weiter.

### 2.2 Den Daemon starten

Führen Sie dies in einem Terminal aus und halten Sie den Prozess am Leben:

```bash
sctl serve
```

Die Standardadresse ist `ws://127.0.0.1:8643`. Der Daemon wird niemals automatisch von `connect`, `status`, einem anderen
CLI-Befehl oder `sctl mcp` gestartet. Für die dauerhafte Nutzung führen Sie den obigen Befehl mit dem
Benutzerdienstmanager Ihres Betriebssystems aus.

Um explizit auf jeder Netzwerkschnittstelle zu lauschen, führen Sie aus:

```bash
sctl --listen-address 0.0.0.0:8643 serve
```

Übergeben Sie auf dem Daemon-Host dieselbe `--listen-address` an `connect`, `status`, andere CLI-Befehle und `sctl mcp`.
Geben Sie in der **sctl-Adresse**-Einstellung von ScriptCat eine Adresse ein, die die Erweiterung tatsächlich erreichen kann,
z. B. `ws://192.168.1.10:8643`; geben Sie nicht `0.0.0.0` ein.

### 2.3 In ScriptCat aktivieren und koppeln

1. Öffnen Sie in ScriptCat **Einstellungen → Extras → Externer Zugriff** und schalten Sie den Schalter ein.
2. Bestätigen Sie, dass die **sctl-Adresse** mit dem Daemon übereinstimmt; behalten Sie normalerweise die Standardadresse `ws://127.0.0.1:8643` bei.
3. Lassen Sie `sctl serve` laufen und führen Sie in einem anderen Terminal aus:

   ```bash
   sctl connect
   ```

4. Geben Sie den 8-stelligen Terminalcode im Dialog „sctl anmelden" ein.
5. Überprüfen Sie die Verbindung:

   ```bash
   sctl status
   ```

Der Status sollte eine verbundene Erweiterung und die Daemon-Version anzeigen.

:::warning Der Kopplungscode ist nur im Terminal sichtbar
Der Code sieht aus wie `A1B2-C3D4`, läuft nach 2 Minuten ab und funktioniert nur einmal. Er wird nicht über den WebSocket
an die Erweiterung gesendet. Fügen Sie ihn niemals in einen KI-Chat, ein Issue, ein Protokoll oder eine MCP-Konfiguration ein;
führen Sie `connect` erneut aus, wenn er abläuft.
:::

## 3. Berechtigungen und Bestätigung {#permissions}

| Fähigkeit | Standardverhalten |
|---|---|
| Skripte auflisten und Metadaten lesen | Direkt zurückgeben |
| Skriptquellcode lesen oder durchsuchen | Der Richtlinie **Quellcode lesen** folgen |
| Skript installieren, bearbeiten, aktivieren, deaktivieren oder löschen | Der Richtlinie **Schreiben** folgen |

Beide Richtlinien bieten „Genehmigung erforderlich" (Standard) und „Direkt erlauben".

Bei „Genehmigung erforderlich" öffnen Anfragen eine Browser-Bestätigungsseite. Sie können ablehnen, einmal erlauben oder
„Für diese Sitzung erlauben" wählen. Sitzungsfreigaben sind nach Skript und Vorgangsart geschlüsselt und werden gelöscht,
wenn der Browser neu startet, die Erweiterung neu geladen wird oder der externe Zugriff beendet wird. Eine Anfrage läuft nach
5 Minuten ohne Entscheidung ab; die Trennung des Anforderers oder `Ctrl-C` macht sie ebenfalls ungültig.

„Direkt erlauben" überspringt die Bestätigungsseite für diese Vorgangsklasse. Quellcode kann API-Schlüssel, Cookies und
andere Geheimnisse enthalten, während Schreibvorgänge Skripte direkt ändern können — aktivieren Sie dies nur, wenn Sie
dieses Risiko akzeptieren.

## 4. Befehlszeilennutzung

```bash
sctl get                         # Skripte auflisten
sctl get <uuid>                  # Metadaten lesen
sctl get <uuid> -o source        # Vollständigen Quellcode ausgeben
sctl get <uuid> -o source --lines 20-80
sctl grep <uuid> "fetch("         # Wörtliche Quellcodesuche
sctl grep <uuid> "pattern" -E    # Regulärer Ausdruck
sctl install <url|file>
sctl edit <uuid> --replace OLD --with NEW
sctl enable <uuid>
sctl disable <uuid>
sctl delete <uuid>
sctl status
```

`grep` ist standardmäßig wörtlich; `-E` aktiviert reguläre Ausdrücke, `-i` ignoriert Groß-/Kleinschreibung, `-C N` fügt
Kontext hinzu und `-m N` begrenzt Treffer. Kein Treffer gilt als erfolgreich und wird mit Code 0 beendet.

`edit` ist inhaltsverankert, niemals zeilennummernbasiert. Jeder `oldText` muss standardmäßig genau einmal vorkommen;
`--replace-all` ersetzt jeden Treffer. Sie können auch ein `{oldText,newText,replaceAll?}`-Array mit `-f <file>` übergeben.
An die Erweiterung werden nur die Änderungen gesendet; der gesamte Quellcode muss nicht zuerst gelesen oder hochgeladen werden.

Schreibvorgänge und Quellcode-Offenlegung warten auf eine Browserentscheidung. CLI-Exitcodes:

| Exitcode | Bedeutung |
|---|---|
| `0` | Genehmigt und erfolgreich, oder ein Lesebefehl wurde normal abgeschlossen |
| `1` | Der Benutzer hat die Anfrage abgelehnt |
| `2` | Anfrage abgelaufen, mit `Ctrl-C` abgebrochen oder die Erweiterung getrennt |
| `3` | Andere Fehler wie Argumente, Verbindung oder fehlendes Skript |

Führen Sie `sctl <command> --help` für jede Option aus.

## 5. Einen KI-Client verbinden (MCP)

Stellen Sie zunächst sicher, dass `sctl serve` läuft und `status` eine verbundene Erweiterung meldet. Konfigurieren Sie dann
den MCP-Client so, dass er einen separaten `sctl mcp`-Prozess startet. Verwenden Sie in GUI-Clients absolute Binär- und
Datenpfade:

```json
{
  "mcpServers": {
    "scriptcat": {
      "command": "/absolute/path/to/sctl",
      "env": {
        "SCTL_DATA_DIR": "/absolute/path/to/sctl-data"
      },
      "args": [
        "mcp",
        "--name",
        "my-ai-client"
      ]
    }
  }
}
```

Viele GUI-Anwendungen erweitern `~`, `$HOME` oder Shell-Ausdrücke nicht. `--name` ist ein Prüf-Label, keine authentifizierte
Identität oder Autorisierungsgrenze. MCP-Stdout ist für Protokollrahmen reserviert; umhüllen Sie sctl nicht mit einem Skript,
das einen Banner auf stdout ausgibt.

Aktuelle Tools:

| Tool | Zweck | Bestätigungsrichtlinie |
|---|---|---|
| `scripts_list` | Skriptzusammenfassungen auflisten | Keine |
| `scripts_metadata_get` | Metadaten eines Skripts lesen | Keine |
| `scripts_source_get` | Quellcode nach uuid und optionalem Zeilenfenster lesen | Richtlinie Quellcode lesen |
| `scripts_source_grep` | Quellcode durchsuchen und passende Zeilen zurückgeben | Richtlinie Quellcode lesen |
| `scripts_install_request` | Skriptinstallation anfordern | Schreibrichtlinie |
| `scripts_edit_request` | Eine inhaltsverankerte Bearbeitung anfordern | Schreibrichtlinie |
| `scripts_toggle_request` | Aktivieren oder Deaktivieren anfordern | Schreibrichtlinie |
| `scripts_delete_request` | Löschung anfordern | Schreibrichtlinie |

## 6. Prüfung und Widerruf

- „Prüfprotokoll anzeigen" in der Karte „Externer Zugriff" öffnet die Protokollseite, gefiltert auf diese Quelle.
- `sctl status` zeigt Daemon-Version, Erweiterungskonnektivität und aktuelle Sicherheitsereignisse; `-o json` gibt vollständige Ereignisse zurück.
- „Externen Zugriff beenden" trennt die Verbindung, löscht den erweiterungsseitigen Kopplungszustand und löscht Sitzungsfreigaben. Danach ist eine erneute Anmeldung erforderlich.
- Um nur einen KI-Client zu deaktivieren, entfernen Sie sctl aus der MCP-Konfiguration dieses Clients; dies widerruft nicht den Zugriff anderer CLI- oder Clients.

## 7. Fehlerbehebung {#troubleshooting}

**Der Daemon ist nicht erreichbar**

Führen Sie zuerst `sctl serve` aus. Anforderungsbefehle starten den Daemon niemals automatisch.

**Die Authentifizierung des Steuerungskanals schlägt fehl**

Bestätigen Sie, dass `serve`, CLI-Befehle und der MCP-Prozess auf dasselbe absolute Datenverzeichnis verweisen. Prüfen Sie
sowohl `SCTL_DATA_DIR` als auch jedes explizite `--data-dir` und starten Sie dann den MCP-Client neu.

**Der Status meldet „Verbindung fehlgeschlagen"**

Bestätigen Sie, dass der Daemon läuft, die Erweiterungsadresse mit ihm übereinstimmt und lokale Sicherheitssoftware
`127.0.0.1:8643` nicht blockiert.

**Ein Befehl kehrt nicht zurück**

Prüfen Sie den Browser auf eine Quellcode-Offenlegungs- oder Schreibbestätigungsseite. Drücken Sie `Ctrl-C`, um die Anfrage
ungültig zu machen.

**Protokolle finden**

Protokolle befinden sich unter `<data-dir>/logs/`. Wenn weder `--data-dir` noch `SCTL_DATA_DIR` gesetzt ist, gelten die
Standardeinstellungen:

| Plattform | Protokollverzeichnis |
|---|---|
| macOS | `~/Library/Application Support/sctl/logs/` |
| Windows | `%LOCALAPPDATA%\sctl\logs\` |
| Linux | `~/.config/sctl/logs/` |
