---
title: 啟用瀏覽器用戶腳本支援
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Icon } from "@iconify/react";
import BrowserGuide from '@site/src/components/BrowserGuide';
import GithubStar from '@site/src/components/GithubStar';

<GithubStar variant="bar" scene="install" />

<BrowserGuide texts={{
  allowUserScripts: {
    title: "您的瀏覽器支援「允許用戶腳本」",
    description: "請按照以下步驟啟用「允許用戶腳本」選項，即可正常使用 ScriptCat。",
    button: "查看步驟",
    anchor: "#allow-user-scripts",
  },
  devMode: {
    title: "您的瀏覽器需要啟用「開發者模式」",
    description: "請按照以下步驟啟用「開發者模式」，即可正常使用 ScriptCat。",
    button: "查看步驟",
    anchor: "#enable-developer-mode",
  },
  legacy: {
    title: "您的瀏覽器版本過舊",
    description: "您的瀏覽器不支援 Manifest V3。您需要手動安裝舊版 ScriptCat（v0.16.x）。請參閱下方說明。",
  },
  nonChromium: {
    title: "未偵測到基於 Chromium 的瀏覽器",
    description: "ScriptCat 目前僅支援基於 Chromium 的瀏覽器（如 Chrome、Edge 等）。如果您正在使用基於 Chromium 的瀏覽器，請忽略此訊息並按照以下步驟操作。",
  },
}} />

## 允許用戶腳本 {#allow-user-scripts}

[允許用戶腳本](https://developer.chrome.com/docs/extensions/reference/api/userScripts?hl=en#chrome_versions_138_and_newer_allow_user_scripts_toggle) 是 Manifest V3 的新功能，允許用戶腳本在瀏覽器中執行。

<Tabs groupId="browser" queryString>
  <TabItem value="edge" label={<div className="flex items-center gap-1"><Icon height={16} width={16} icon="logos:microsoft-edge" />Edge</div>} default>

① 開啟瀏覽器的擴充功能管理介面，或造訪 [edge://extensions/](edge://extensions/)

![edge-open-settings](./open-dev.assets/edge-extensions-page.webp)

② 在擴充功能管理介面中，找到 ScriptCat 擴充功能並點擊 `詳細資料`

![edge-extensions-details](open-dev.assets/edge-extensions-details.png)

③ 在 ScriptCat 擴充功能詳細資料頁面中，找到 `允許用戶腳本` 選項並啟用它。然後停用並重新啟用擴充功能，或重新啟動瀏覽器，以使腳本功能生效。

> ⚠️⚠️⚠️ 對於較低版本的 Edge 瀏覽器（\<=143）或沒有此選項的使用者，請參閱[啟用開發者模式](#enable-developer-mode)

![edge-allow-user-scripts](open-dev.assets/edge-allow-user-scripts.png)

  </TabItem>
  <TabItem value="chrome" label={<div className="flex items-center gap-1"><Icon height={16} width={16} icon="logos:chrome" />Chrome</div>}>

① 開啟瀏覽器的擴充功能管理介面，或造訪 [chrome://extensions/](chrome://extensions/)

![chrome-open-settings](./open-dev.assets/chrome-extensions-page.webp)

② 在擴充功能管理介面中，找到 ScriptCat 擴充功能並點擊 `詳細資料`

![scriptcat-extension-details](open-dev.assets/scriptcat-extension-details.webp)

③ 在 ScriptCat 擴充功能詳細資料頁面中，找到 `允許用戶腳本` 選項並啟用它。然後停用並重新啟用擴充功能，或重新啟動瀏覽器，以使腳本功能生效。

![allow-user-scripts-toggle](open-dev.assets/allow-user-scripts-toggle.webp)
</TabItem>
  <TabItem value="edge-mobile" label={<div className="flex items-center gap-1"><Icon height={16} width={16} icon="logos:microsoft-edge" />Edge Mobile</div>}>

對於瀏覽器引擎版本 ≥ 138 的 Edge Mobile，不需要開發者模式。請改為在擴充功能設定中啟用 `允許用戶腳本`。

① 開啟 Edge Mobile 的擴充功能列表，找到 ScriptCat 擴充功能，點擊右側的 `⋮` 按鈕

② 在擴充功能設定彈出視窗中，啟用 `允許用戶腳本`

③ 停用並重新啟用擴充功能，或重新啟動瀏覽器，以使腳本功能生效。

> ⚠️⚠️⚠️ 對於瀏覽器引擎版本低於 138，或沒有此選項的使用者，請參閱[啟用開發者模式](#enable-developer-mode)

![edge-mobile-allow-user-scripts](./open-dev.assets/edge%20mobile%20138.png)

  </TabItem>
</Tabs>

## 啟用開發者模式 {#enable-developer-mode}

<Tabs groupId="browser" queryString>
  <TabItem value="edge" label={<div className="flex items-center gap-1"><Icon height={16} width={16} icon="logos:microsoft-edge" /><span>Edge</span></div>} default>

① 開啟瀏覽器的擴充功能管理介面，或造訪 [edge://extensions/](edge://extensions/)

![edge-open-settings](./open-dev.assets/edge-extensions-page.webp)

② 啟用 `開發者模式`（在某些瀏覽器中，此模式可能位於其他選項中，例如 360 瀏覽器：進階管理 > 開發者模式）

![edge-open-dev](./open-dev.assets/edge-developer-mode-toggle.webp)

③ 啟用開發者模式後，停用並重新啟用擴充功能，或重新啟動瀏覽器，以使腳本功能生效。

  </TabItem>
  <TabItem value="chrome" label={<div className="flex items-center gap-1"><Icon height={16} width={16} icon="logos:chrome" /><span>Chrome</span></div>}>

① 開啟瀏覽器的擴充功能管理介面，或造訪 [chrome://extensions/](chrome://extensions/)

![chrome-open-settings](./open-dev.assets/chrome-extensions-page.webp)

② 啟用 `開發者模式`（在某些瀏覽器中，此模式可能位於其他選項中，例如 360 瀏覽器：進階管理 > 開發者模式）

![chrome-open-dev](./open-dev.assets/chrome-developer-mode-toggle.webp)

③ 啟用開發者模式後，停用並重新啟用擴充功能，或重新啟動瀏覽器，以使腳本功能生效。

  </TabItem>

<TabItem value="edge-mobile" label={<div className="flex items-center gap-1"><Icon height={16} width={16} icon="logos:microsoft-edge" /><span>Edge Mobile</span></div>}>

對於瀏覽器引擎版本低於 138，或沒有 `允許用戶腳本` 選項的 Edge Mobile，請點擊擴充功能頁面頂部的設定按鈕以啟用開發者模式。

![edge-mobile-open-dev](./open-dev.assets/edge%20mobile.png)
</TabItem>

</Tabs>

:::warning 舊版本注意事項

如果您使用 Windows 8/7/XP 系統，或您的瀏覽器引擎版本低於 120，您需要手動安裝[舊版 ScriptCat](https://bbs.tampermonkey.net.cn/thread-3068-1-1.html)。v0.16.x 是支援 Manifest V2 的最後一個版本。安裝步驟可參閱：[載入已解壓的擴充功能安裝](/docs/use/use/#load-unpacked-extension-installation)。

:::

<details>
<summary>技術背景：Manifest V3</summary>

由於瀏覽器的限制，擴充功能被迫升級到 Manifest V3，Manifest V2 擴充功能將於 2025 年 6 月後完全停止支援。在 Manifest V3 的限制下，您必須啟用開發者模式或用戶腳本功能，才能正常使用 ScriptCat 擴充功能。

參考：[擴充功能使用者的開發者模式](https://developer.chrome.com/docs/extensions/reference/api/userScripts?hl=en#developer_mode_for_extension_users)、[Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3?hl=en)

對於瀏覽器引擎版本 ≥ 138，您需要啟用「允許用戶腳本」。對於較低版本，請使用「啟用開發者模式」。

</details>
