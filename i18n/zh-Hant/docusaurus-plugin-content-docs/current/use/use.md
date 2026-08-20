---
slug: /use/use
title: 快速開始
---

ScriptCat 是一個可以執行用戶腳本的瀏覽器擴充功能，相容於 Tampermonkey 腳本，並提供更多功能。如果您發現 BUG 或者有建議，可以前往 [GitHub Repo](https://github.com/scriptscat/scriptcat) 提供回饋。

## 安裝擴充功能

您可以從下列擴充功能商店中安裝擴充功能：

| 瀏覽器         | 商店連結                                                                                                                                                                                                                                     | 狀態         |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Chrome         | [正式版本](https://chrome.google.com/webstore/detail/scriptcat/ndcooeababalnlpkfedmmbbbgkljhpjf) [Beta 版本](https://chromewebstore.google.com/detail/%E8%84%9A%E6%9C%AC%E7%8C%AB-beta/jaehimmlecjmebpekkipmpmbpfhdacom?authuser=0&hl=zh-CN) | ✅ 可用        |
| Edge           | [正式版本](https://microsoftedge.microsoft.com/addons/detail/scriptcat/liilgpjgabokdklappibcjfablkpcekh) [Beta 版本](https://microsoftedge.microsoft.com/addons/detail/scriptcat-beta/nimmbghgpcjmeniofmpdfkofcedcjpfi)                      | ✅ 可用        |
| Firefox        | [正式版本](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat/) [Beta 版本](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat-pre/)                                                                                             | ✅ MV2         |

### 其他瀏覽器

如果上述列表中沒有您的瀏覽器，可以從 [Github Release](https://github.com/scriptscat/scriptcat/releases) 頁面中，下載 `zip`/`crx` 檔案手動進行安裝。

### 載入已解壓的擴充功能安裝 {#load-unpacked-extension-installation}

① 先從 [Github Release](https://github.com/scriptscat/scriptcat/releases) 或 [社群下載](https://bbs.tampermonkey.net.cn/thread-3068-1-1.html) 頁面中下載 `zip` 檔案，如果是 `crx` 檔案將其副檔名改為 `zip`。

② 準備一個資料夾用於存放擴充功能，將上面的 zip 解壓到該資料夾。解壓後如下（**注意：此資料夾不可刪除或移動，否則擴充功能將無法正常運作**）![download-zip](./use.assets/download-zip.webp)

③ 開啟瀏覽器的擴充功能管理介面載入已解壓的擴充功能（參考[開啟開發者模式支援 manifest v3 版腳本貓](/docs/use/open-dev/)先開啟開發者模式）

- 1. **Edge** ![edge-load-unpacked](./use.assets/edge-load-unpacked.webp)
- 2. **Chrome** ![chrome-load-unpacked](./use.assets/chrome-load-unpacked.webp)

④ 選擇載入步驟 ② 中新建的資料夾（載入完成後擴充功能管理介面的擴充功能列表中會顯示腳本貓圖示，瀏覽器的位址列右上角點擊擴充功能按鈕也可看見）

- 1. **Edge** ![edge-load-unpacked-img](./use.assets/edge-load-unpacked-img.webp)
- 2. **Chrome** ![chrome-load-unpacked-img](./use.assets/chrome-load-unpacked-img.webp)

⑤ 點擊右上角腳本貓圖示，在出現的介面右上角點擊 `┆` >取得腳本，即可前往腳本站搜尋安裝腳本。

注意：以此方式安裝擴充功能無法自動更新，如需更新請重複以上步驟以更新擴充功能（替換檔案，重新載入一次即可）。


## 取得腳本

> 除了腳本外您也可以在 [油猴中文網](https://bbs.tampermonkey.net.cn/) 與 [腳本開發指南](https://learn.scriptcat.org/) 獲取一些腳本的資訊和教學。

### ScriptCat 腳本貓腳本站

[ScriptCat 腳本貓腳本站](https://scriptcat.org/) 是本擴充功能的腳本站點，可發布您編寫的腳本。

- 新晉腳本站點
- 背景腳本/定時腳本
- 介面友好

### Userscript.Zone 搜尋

[Userscript.Zone 搜尋](https://www.userscript.zone/?utm_source=tm.net&utm_medium=scripts) 是一個新網站，允許透過輸入合適的 URL 或網域來搜尋用戶腳本。

- 大量的腳本資源
- 很容易找到合適的用戶腳本
- 僅顯示受審核的用戶腳本頁面或至少具有註解功能的頁面中的用戶腳本

### GreasyFork

[GreasyFork](https://greasyfork.org/) 是一個廣泛使用的用戶腳本（userscript）分享與託管平台，提供開發者發布和用戶安裝各類瀏覽器腳本。該網站由 Jason Barnabe 建立，並以注重安全性與開源透明為特點，收錄了大量可用於擴充網站功能或改善瀏覽體驗的腳本資源。

Jason Barnabe 同時也是 Stylish 瀏覽器擴充功能的原作者。不過，[Stylish](https://userstyles.org/) 已於 2016 年轉手並由其他公司營運，之後的發展與 Jason Barnabe 已無直接關聯。

- 大量的腳本資源
- 擁有可以從 Github 中進行腳本同步的功能
- 非常活躍的[開放原始碼發展模式](https://github.com/JasonBarnabe/greasyfork)

### GitHub/Gist

您可以[在 Github 和 Gist 中搜尋腳本資源。](https://gist.github.com/search?l=JavaScript&o=desc&q="%3D%3DUserScript%3D%3D"&s=updated)

## 新手引導

安裝腳本貓後，開啟管理面板會自動開始新手引導（也可隨時從左側「說明中心」重新開啟）。引導涵蓋：

- [安裝腳本](/docs/use/script_installation/)：從腳本市場安裝，支援[背景腳本](/docs/dev/background/)。
- 管理與操作：編輯、執行/停止、[UserConfig](/docs/dev/config/)。
- [備份](/docs/use/sync/)與[從其它管理器遷移](/docs/use/from-other/migrate-from-tampermonkey/)。
- [腳本同步](/docs/use/sync/)。
- [訂閱](/docs/dev/subscribe/)。
