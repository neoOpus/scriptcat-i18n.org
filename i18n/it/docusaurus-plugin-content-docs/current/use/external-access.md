---
title: Accesso esterno (CLI e client AI)
sidebar_label: Accesso esterno
---

**Accesso esterno** consente ai programmi locali da riga di comando e ai client AI con capacità
[MCP](https://modelcontextprotocol.io/) di gestire gli script in ScriptCat tramite [sctl](https://github.com/scriptscat/sctl).

```text
AI client ── stdio MCP ──▶ sctl mcp ── local control API ──▶ sctl serve ── WebSocket ──▶ ScriptCat
CLI ────────────────────────────────────────────────────────▲
```

`sctl serve` è un daemon locale separato che dovete avviare esplicitamente. `sctl mcp` e i comandi di richiesta non lo
avviano mai automaticamente. Le policy di ScriptCat e l'interfaccia di conferma del browser decidono sempre se la
divulgazione del codice sorgente o una scrittura è consentita; un programma esterno non può approvare la propria richiesta.

:::warning Il listener è locale per impostazione predefinita
sctl è in ascolto su `127.0.0.1` per impostazione predefinita. Ascolta su un'altra interfaccia solo quando `--listen-address`
viene passato esplicitamente. `ws://` non crittografa il traffico applicativo e non esiste isolamento per-client remoto,
quindi usate un indirizzo non predefinito solo su una rete affidabile. L'estensione e il daemon stabiliscono comunque una
chiave a lungo termine tramite un codice di associazione monouso e usano l'autenticazione reciproca sulle connessioni successive.
:::

## 1. Installare sctl

Installate l'ultima versione con un comando — macOS e Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.sh | sh
```

o Windows PowerShell:

```powershell
irm https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.ps1 | iex
```

Il programma di installazione scarica l'archivio della release con il nome a trattini `sctl-<version>-<os>-<arch>.<ext>`
per la vostra piattaforma, ne verifica lo sha256 rispetto a `checksums.txt` della stessa release e installa `sctl` in
`~/.local/bin` (macOS/Linux) o `%LOCALAPPDATA%\sctl\bin` (Windows). `SCTL_VERSION` fissa una versione specifica;
`SCTL_INSTALL_DIR` sovrascrive la directory di installazione. Se la directory di installazione non è nel vostro `PATH`,
il programma di installazione stampa il suggerimento esatto per il `PATH` della vostra piattaforma — non modifica mai il
vostro profilo di shell o il `PATH` utente per voi.

sctl è un singolo eseguibile. Se [GitHub Releases](https://github.com/scriptscat/sctl/releases) ha un archivio pubblicato
per la vostra piattaforma, potete anche scaricarlo ed estrarlo, quindi mettere `sctl` (`sctl.exe` su Windows) nel `PATH`.

```bash
sctl version
```

Una build dal sorgente riporta `0.0.0-dev` per distinguerla da una build di release con versione, commit e metadati di
build iniettati; questo non le impedisce di connettersi a ScriptCat. Se non è disponibile alcuna release, i contributori
possono compilarla dal [repository sctl](https://github.com/scriptscat/sctl).

## 2. Avviare il daemon e registrarsi

La registrazione è un passaggio unico. In seguito, la CLI e ogni client MCP condividono il canale affidabile
estensione-daemon; non si associano separatamente.

### 2.1 Scegliere una directory dati

Il daemon, la CLI e il processo MCP devono usare la stessa directory dati. Memorizza la chiave di associazione a lungo
termine, il token di controllo locale e i log. Scegliete un percorso assoluto privato per l'utente corrente:

```text
/absolute/path/to/sctl-data
```

Impostate la stessa variabile d'ambiente per ogni processo sctl:

```bash
export SCTL_DATA_DIR=/absolute/path/to/sctl-data
sctl serve
sctl status
sctl mcp
```

Un `--data-dir` esplicito ha la precedenza sulla variabile d'ambiente.

Se non sono impostati né `--data-dir` né `SCTL_DATA_DIR`, sctl usa la directory dati applicativa predefinita per utente
della piattaforma. Non mettete la directory dati in un repository o in una cartella di sincronizzazione condivisa e non
consegnate mai il suo `pairing.key` o `control.token` a un modello AI.

### 2.2 Avviare il daemon

Eseguite questo comando in un terminale e tenete il processo attivo:

```bash
sctl serve
```

L'indirizzo predefinito è `ws://127.0.0.1:8643`. Il daemon non viene mai avviato automaticamente da `connect`, `status`,
un altro comando CLI o `sctl mcp`. Per un uso persistente, eseguite il comando precedente con il gestore dei servizi
utente del vostro sistema operativo.

Per ascoltare esplicitamente su ogni interfaccia di rete, eseguite:

```bash
sctl --listen-address 0.0.0.0:8643 serve
```

Sull'host del daemon, passate lo stesso `--listen-address` a `connect`, `status`, agli altri comandi CLI e a `sctl mcp`.
Nell'impostazione **indirizzo sctl** di ScriptCat, inserite un indirizzo che l'estensione possa raggiungere realmente, ad
esempio `ws://192.168.1.10:8643`; non inserite `0.0.0.0`.

### 2.3 Attivare e associare in ScriptCat

1. Aprite **Impostazioni → Strumenti → Accesso esterno** in ScriptCat e attivate l'interruttore.
2. Confermate che l'**indirizzo sctl** corrisponda al daemon; normalmente mantenete il predefinito `ws://127.0.0.1:8643`.
3. Tenete `sctl serve` in esecuzione ed eseguite in un altro terminale:

   ```bash
   sctl connect
   ```

4. Inserite il codice di terminale di 8 caratteri nella finestra di dialogo «Registra sctl».
5. Verificate la connessione:

   ```bash
   sctl status
   ```

Lo stato dovrebbe indicare un'estensione connessa e mostrare la versione del daemon.

:::warning Il codice di associazione è disponibile solo nel terminale
Il codice ha l'aspetto `A1B2-C3D4`, scade dopo 2 minuti e funziona una sola volta. Non viene inviato all'estensione tramite
il WebSocket. Non incollatelo mai in una chat AI, in un issue, in un log o in una configurazione MCP; eseguite `connect`
di nuovo se scade.
:::

## 3. Autorizzazioni e conferma {#permissions}

| Capacità | Comportamento predefinito |
|---|---|
| Elencare gli script e leggere i metadati | Restituire direttamente |
| Leggere o cercare il codice sorgente dello script | Seguire la policy di **lettura del codice sorgente** |
| Installare, modificare, attivare, disattivare o eliminare uno script | Seguire la policy di **scrittura** |

Entrambe le policy offrono «Richiedi approvazione» (predefinito) e «Consenti direttamente».

Con «Richiedi approvazione», le richieste aprono una pagina di conferma nel browser. Potete rifiutare, consentire una volta
o scegliere «Consenti per questa sessione». I permessi di sessione sono associati per script e tipo di operazione e vengono
cancellati quando il browser si riavvia, l'estensione viene ricaricata o l'Accesso esterno si interrompe. Una richiesta scade
dopo 5 minuti senza una decisione; anche la disconnessione del richiedente o `Ctrl-C` la annulla.

«Consenti direttamente» salta la pagina di conferma per quella classe di operazione. Il codice sorgente può contenere chiavi
API, cookie e altri segreti, mentre le scritture possono modificare direttamente gli script, quindi attivatelo solo se
accettate quel rischio.

## 4. Utilizzo da riga di comando

```bash
sctl get                         # Elenca gli script
sctl get <uuid>                  # Legge i metadati
sctl get <uuid> -o source        # Stampa il codice sorgente completo
sctl get <uuid> -o source --lines 20-80
sctl grep <uuid> "fetch("         # Ricerca letterale nel codice sorgente
sctl grep <uuid> "pattern" -E    # Espressione regolare
sctl install <url|file>
sctl edit <uuid> --replace OLD --with NEW
sctl enable <uuid>
sctl disable <uuid>
sctl delete <uuid>
sctl status
```

`grep` è letterale per impostazione predefinita; `-E` abilita le espressioni regolari, `-i` ignora le maiuscole, `-C N`
aggiunge contesto e `-m N` limita le corrispondenze. Nessuna corrispondenza è considerata riuscita ed esce con codice 0.

`edit` è ancorato al contenuto, mai basato sui numeri di riga. Ogni `oldText` deve comparire esattamente una volta per
impostazione predefinita; `--replace-all` sostituisce ogni corrispondenza. Potete anche passare un array
`{oldText,newText,replaceAll?}` con `-f <file>`. All'estensione vengono inviate solo le modifiche; non è necessario leggere
o caricare prima l'intero codice sorgente.

Le scritture e la divulgazione del codice sorgente attendono una decisione del browser. Codici di uscita della CLI:

| Codice di uscita | Significato |
|---|---|
| `0` | Approvato e riuscito, oppure un comando di lettura completato normalmente |
| `1` | L'utente ha rifiutato la richiesta |
| `2` | La richiesta è scaduta, è stata annullata con `Ctrl-C` o l'estensione si è disconnessa |
| `3` | Altri errori come argomenti, connessione o script mancante |

Eseguite `sctl <command> --help` per ogni opzione.

## 5. Collegare un client AI (MCP)

Prima assicuratevi che `sctl serve` sia in esecuzione e che `status` indichi un'estensione connessa. Quindi configurate il
client MCP per avviare un processo `sctl mcp` separato. Usate percorsi assoluti di binario e dati nei client GUI:

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

Molte applicazioni GUI non espandono `~`, `$HOME` o espressioni di shell. `--name` è un'etichetta di audit, non
un'identità autenticata o un confine di autorizzazione. Lo stdout di MCP è riservato ai frame di protocollo; non avvolgete
sctl in uno script che stampa un banner su stdout.

Strumenti attuali:

| Strumento | Scopo | Policy di conferma |
|---|---|---|
| `scripts_list` | Elencare i riepiloghi degli script | Nessuna |
| `scripts_metadata_get` | Leggere i metadati di uno script | Nessuna |
| `scripts_source_get` | Leggere il codice sorgente per uuid e finestra di righe opzionale | Policy di lettura del codice sorgente |
| `scripts_source_grep` | Cercare nel codice sorgente e restituire le righe corrispondenti | Policy di lettura del codice sorgente |
| `scripts_install_request` | Richiedere l'installazione di uno script | Policy di scrittura |
| `scripts_edit_request` | Richiedere una modifica ancorata al contenuto | Policy di scrittura |
| `scripts_toggle_request` | Richiedere l'attivazione o la disattivazione | Policy di scrittura |
| `scripts_delete_request` | Richiedere l'eliminazione | Policy di scrittura |

## 6. Audit e revoca

- «Visualizza registro di audit» nella scheda Accesso esterno apre la pagina dei log filtrata su questa fonte.
- `sctl status` mostra la versione del daemon, la connettività dell'estensione e gli eventi di sicurezza recenti; `-o json` restituisce gli eventi completi.
- «Interrompi accesso esterno» disconnette, elimina lo stato di associazione lato estensione e cancella i permessi di sessione. Dopo è necessaria una nuova registrazione.
- Per disabilitare un solo client AI, rimuovete sctl dalla configurazione MCP di quel client; questo non revoca l'accesso di altri client o della CLI.

## 7. Risoluzione dei problemi {#troubleshooting}

**Il daemon non è raggiungibile**

Eseguite prima `sctl serve`. I comandi di richiesta non avviano mai automaticamente il daemon.

**L'autenticazione del canale di controllo fallisce**

Confermate che `serve`, i comandi CLI e il processo MCP risolvano la stessa directory dati assoluta. Verificate sia
`SCTL_DATA_DIR` che qualsiasi `--data-dir` esplicito, quindi riavviate il client MCP.

**Lo stato indica «Connessione fallita»**

Confermate che il daemon sia in esecuzione, che l'indirizzo dell'estensione corrisponda e che il software di sicurezza
locale non stia bloccando `127.0.0.1:8643`.

**Un comando non restituisce risultati**

Controllate nel browser se è presente una pagina di conferma per la divulgazione del codice sorgente o per la scrittura.
Premete `Ctrl-C` per annullare la richiesta.

**Trovare i log**

I log si trovano in `<data-dir>/logs/`. Se non sono impostati né `--data-dir` né `SCTL_DATA_DIR`, i valori predefiniti
sono:

| Piattaforma | Directory dei log |
|---|---|
| macOS | `~/Library/Application Support/sctl/logs/` |
| Windows | `%LOCALAPPDATA%\sctl\logs\` |
| Linux | `~/.config/sctl/logs/` |
