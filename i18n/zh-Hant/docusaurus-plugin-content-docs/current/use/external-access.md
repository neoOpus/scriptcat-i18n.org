---
title: 外部存取（CLI 與 AI 客戶端）
sidebar_label: 外部存取
---

**外部存取** 讓本機命令列程式和具備 [MCP](https://modelcontextprotocol.io/) 能力的 AI
客戶端，可以透過 [sctl](https://github.com/scriptscat/sctl) 管理 ScriptCat 中的腳本。

```text
AI client ── stdio MCP ──▶ sctl mcp ── local control API ──▶ sctl serve ── WebSocket ──▶ ScriptCat
CLI ────────────────────────────────────────────────────────▲
```

`sctl serve` 是一個獨立的本地守護程序，您必須明確啟動它。`sctl mcp` 和請求命令永遠不會自動啟動它。是否允許公開原始碼
或執行寫入操作，一律由 ScriptCat 的原則和瀏覽器確認介面決定；外部程式無法自行批准自己的請求。

:::warning 監聽器預設為本機
sctl 預設監聽 `127.0.0.1`。只有明確傳遞 `--listen-address` 時，它才會在其他介面上監聽。`ws://` 不會加密業務流量，
且沒有按遠端客戶端隔離，因此請僅在可信網路上使用非預設位址。擴充功能與守護程序仍會透過一次性配對碼建立長期金鑰，
並在後續連線中使用相互認證。
:::

## 1. 安裝 sctl

使用一條命令安裝最新版本 — macOS 和 Linux：

```bash
curl -fsSL https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.sh | sh
```

或 Windows PowerShell：

```powershell
irm https://raw.githubusercontent.com/scriptscat/sctl/main/scripts/install.ps1 | iex
```

安裝程式會下載適用於您平台的、以連字號命名的發布版壓縮檔 `sctl-<version>-<os>-<arch>.<ext>`，針對同一發布版的
`checksums.txt` 驗證其 sha256，並將 `sctl` 安裝到 `~/.local/bin`（macOS/Linux）或 `%LOCALAPPDATA%\sctl\bin`（Windows）。
`SCTL_VERSION` 可鎖定特定版本；`SCTL_INSTALL_DIR` 可覆寫安裝目錄。如果安裝目錄不在您的 `PATH` 中，安裝程式會列印適用於
您平台的確切 `PATH` 提示 — 它絕不會替您編輯 Shell 設定檔或使用者 `PATH`。

sctl 是單一可執行檔。如果 [GitHub Releases](https://github.com/scriptscat/sctl/releases) 有適用於您平台的已發布
壓縮檔，您也可以下載並解壓縮，然後將 `sctl`（Windows 上為 `sctl.exe`）放入 `PATH`。

```bash
sctl version
```

直接從原始碼建置會回報 `0.0.0-dev`，以區別於注入版本、提交和建置時間中繼資料的發布版建置；這不會阻止它連線到
ScriptCat。如果沒有可用的發布版，貢獻者可以從 [sctl 儲存庫](https://github.com/scriptscat/sctl)建置。

## 2. 啟動守護程序並註冊

註冊是一次性步驟。之後，CLI 和每個 MCP 用戶端共用受信任的擴充功能到守護程序通道；它們不會單獨配對。

### 2.1 選擇資料目錄

守護程序、CLI 和 MCP 程序必須使用相同的資料目錄。它儲存長期配對金鑰、本地控制權杖和日誌。請選擇對目前使用者私有的
絕對路徑：

```text
/absolute/path/to/sctl-data
```

為每個 sctl 程序設定相同的環境變數：

```bash
export SCTL_DATA_DIR=/absolute/path/to/sctl-data
sctl serve
sctl status
sctl mcp
```

明確的 `--data-dir` 優先於環境變數。

如果既未設定 `--data-dir` 也未設定 `SCTL_DATA_DIR`，sctl 會使用平台預設的每位使用者應用程式資料目錄。請勿將資料目錄
放在儲存庫或共用同步資料夾中，也永遠不要將其中的 `pairing.key` 或 `control.token` 交給 AI 模型。

### 2.2 啟動守護程序

在終端機中執行此命令並保持程序運行：

```bash
sctl serve
```

預設位址是 `ws://127.0.0.1:8643`。守護程序絕不會由 `connect`、`status`、其他 CLI 命令或 `sctl mcp` 自動啟動。若要
長期使用，請使用作業系統的使用者服務管理功能執行上述命令。

若要明確監聽所有網路介面，請執行：

```bash
sctl --listen-address 0.0.0.0:8643 serve
```

在守護程序主機上，請將相同的 `--listen-address` 傳遞給 `connect`、`status`、其他 CLI 命令和 `sctl mcp`。在 ScriptCat
的 **sctl 位址** 設定中，輸入擴充功能實際可以連線的位址，例如 `ws://192.168.1.10:8643`；請勿輸入 `0.0.0.0`。

### 2.3 在 ScriptCat 中啟用並配對

1. 在 ScriptCat 中開啟 **設定 → 工具 → 外部存取** 並打開開關。
2. 確認 **sctl 位址** 與守護程序一致；通常保持預設的 `ws://127.0.0.1:8643`。
3. 保持 `sctl serve` 運行，並在另一個終端機中執行：

   ```bash
   sctl connect
   ```

4. 在「註冊 sctl」對話框中輸入 8 位元字元的終端機代碼。
5. 驗證連線：

   ```bash
   sctl status
   ```

狀態應顯示已連線的擴充功能並顯示守護程序版本。

:::warning 配對碼僅限終端機
代碼看起來像 `A1B2-C3D4`，2 分鐘後過期，且只能使用一次。它不會透過 WebSocket 傳送給擴充功能。切勿將其貼到 AI 聊天、
Issue、日誌或 MCP 設定中；如果過期，請重新執行 `connect`。
:::

## 3. 權限與確認 {#permissions}

| 能力 | 預設行為 |
|---|---|
| 列出腳本並讀取中繼資料 | 直接返回 |
| 讀取或搜尋腳本原始碼 | 遵循**原始碼讀取**原則 |
| 安裝、編輯、啟用、停用或刪除腳本 | 遵循**寫入**原則 |

兩項原則都提供「需要核准」（預設）和「直接允許」。

使用「需要核准」時，請求會開啟瀏覽器確認頁面。您可以拒絕、允許一次，或選擇「允許本次工作階段」。工作階段允許依腳本
和操作類型鍵入，並在瀏覽器重新啟動、擴充功能重新載入或外部存取停止時清除。請求在 5 分鐘內沒有決定即過期；請求端斷開
連線或按下 `Ctrl-C` 也會使其失效。

「直接允許」會跳過該類操作的確認頁面。原始碼可能包含 API 金鑰、Cookie 和其他機密，而寫入操作可以直接變更腳本，因此
僅在您接受該風險時才啟用它。

## 4. 命令列用法

```bash
sctl get                         # 列出腳本
sctl get <uuid>                  # 讀取中繼資料
sctl get <uuid> -o source        # 輸出完整原始碼
sctl get <uuid> -o source --lines 20-80
sctl grep <uuid> "fetch("         # 原始碼字面搜尋
sctl grep <uuid> "pattern" -E    # 正規表示式
sctl install <url|file>
sctl edit <uuid> --replace OLD --with NEW
sctl enable <uuid>
sctl disable <uuid>
sctl delete <uuid>
sctl status
```

`grep` 預設為字面搜尋；`-E` 啟用正規表示式，`-i` 忽略大小寫，`-C N` 加入上下文，`-m N` 限制相符數目。沒有相符結果
視為成功，並以代碼 0 結束。

`edit` 以內容為錨點，絕不基於行號。預設情況下，每個 `oldText` 必須恰好出現一次；`--replace-all` 會取代所有相符項目。
您也可以使用 `-f <file>` 傳遞 `{oldText,newText,replaceAll?}` 陣列。只有編輯內容會傳送給擴充功能；無需先讀取或上傳
整個原始碼。

寫入和原始碼公開會等待瀏覽器決定。CLI 結束代碼：

| 結束代碼 | 含義 |
|---|---|
| `0` | 已核准且成功，或讀取命令正常完成 |
| `1` | 使用者拒絕了請求 |
| `2` | 請求過期、以 `Ctrl-C` 取消，或擴充功能斷開連線 |
| `3` | 其他錯誤，例如引數、連線或缺少腳本 |

執行 `sctl <command> --help` 查看每個選項。

## 5. 連線 AI 用戶端（MCP）

首先確保 `sctl serve` 正在運行，且 `status` 回報已連線的擴充功能。然後設定 MCP 用戶端啟動一個獨立的 `sctl mcp`
程序。在 GUI 用戶端中使用絕對的二進位和資料路徑：

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

許多 GUI 應用程式不會展開 `~`、`$HOME` 或 Shell 運算式。`--name` 是稽核標籤，不是經過驗證的身分或授權邊界。MCP 的
stdout 保留給協定框架；請勿將 sctl 包裝在會向 stdout 列印橫幅的腳本中。

目前的工具：

| 工具 | 用途 | 確認原則 |
|---|---|---|
| `scripts_list` | 列出腳本摘要 | 無 |
| `scripts_metadata_get` | 讀取單一腳本的中繼資料 | 無 |
| `scripts_source_get` | 依 uuid 和可選行範圍讀取原始碼 | 原始碼讀取原則 |
| `scripts_source_grep` | 搜尋原始碼並傳回相符行 | 原始碼讀取原則 |
| `scripts_install_request` | 請求安裝腳本 | 寫入原則 |
| `scripts_edit_request` | 請求以內容為錨點的編輯 | 寫入原則 |
| `scripts_toggle_request` | 請求啟用或停用 | 寫入原則 |
| `scripts_delete_request` | 請求刪除 | 寫入原則 |

## 6. 稽核與撤銷

- 外部存取卡片中的「檢視稽核日誌」會開啟依此來源篩選的日誌頁面。
- `sctl status` 顯示守護程序版本、擴充功能連線狀態和近期安全性事件；`-o json` 回傳完整事件。
- 「停止外部存取」會斷開連線、刪除擴充功能端的配對狀態並清除工作階段允許。之後需要重新註冊。
- 若要只停用某一個 AI 用戶端，請從該用戶端的 MCP 設定中移除 sctl；這不會撤銷其他 CLI 或用戶端的存取權。

## 7. 疑難排解 {#troubleshooting}

**守護程序無法連線**

請先執行 `sctl serve`。請求命令永遠不會自動啟動守護程序。

**控制通道驗證失敗**

確認 `serve`、CLI 命令和 MCP 程序指向相同的絕對資料目錄。同時檢查 `SCTL_DATA_DIR` 和任何明確的 `--data-dir`，然後
重新啟動 MCP 用戶端。

**狀態顯示「連線失敗」**

確認守護程序正在運行、擴充功能位址與之一致，且本機安全軟體未封鎖 `127.0.0.1:8643`。

**命令沒有回應**

在瀏覽器中檢查是否有原始碼公開或寫入確認頁面。按 `Ctrl-C` 使請求失效。

**尋找日誌**

日誌位於 `<data-dir>/logs/` 下。如果既未設定 `--data-dir` 也未設定 `SCTL_DATA_DIR`，預設值為：

| 平台 | 日誌目錄 |
|---|---|
| macOS | `~/Library/Application Support/sctl/logs/` |
| Windows | `%LOCALAPPDATA%\sctl\logs\` |
| Linux | `~/.config/sctl/logs/` |
