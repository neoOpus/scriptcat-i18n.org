---
slug: /use/use
title: クイックスタート
---

ScriptCat はユーザースクリプトを実行できるブラウザ拡張機能で、Tampermonkey のスクリプトと互換性があり、さらに多くの機能を提供します。バグを見つけたり、提案がある場合は、[GitHub リポジトリ](https://github.com/scriptscat/scriptcat)でフィードバックを送信できます。

## 拡張機能をインストールする

次の拡張機能ストアから拡張機能をインストールできます:

| ブラウザ     | ストアのリンク                                                                                                                                                                                                                                  | ステータス     |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Chrome       | [安定版](https://chrome.google.com/webstore/detail/scriptcat/ndcooeababalnlpkfedmmbbbgkljhpjf) [ベータ版](https://chromewebstore.google.com/detail/%E8%84%9A%E6%9C%AC%E7%8C%AB-beta/jaehimmlecjmebpekkipmpmbpfhdacom?authuser=0&hl=zh-CN) | ✅ 利用可能     |
| Edge         | [安定版](https://microsoftedge.microsoft.com/addons/detail/scriptcat/liilgpjgabokdklappibcjfablkpcekh) [ベータ版](https://microsoftedge.microsoft.com/addons/detail/scriptcat-beta/nimmbghgpcjmeniofmpdfkofcedcjpfi)                      | ✅ 利用可能     |
| Firefox      | [安定版](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat/) [ベータ版](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat-pre/)                                                                                             | ✅ MV2         |

### その他のブラウザ

上記のリストにないブラウザを使用している場合は、[Github Release](https://github.com/scriptscat/scriptcat/releases) ページから `zip`/`crx` ファイルをダウンロードして、手動でインストールできます。

### 展開済み拡張機能を読み込む {#load-unpacked-extension-installation}

① まず [Github Release](https://github.com/scriptscat/scriptcat/releases) または [コミュニティダウンロード](https://bbs.tampermonkey.net.cn/thread-3068-1-1.html) ページから `zip` ファイルをダウンロードします。`crx` ファイルの場合は、拡張子を `zip` に変更してください。

② プラグインを保存するフォルダーを用意し、上記の zip ファイルをそのフォルダーに解凍します。解凍後は次のようになります（**注意: このフォルダーは削除したり移動したりしないでください。拡張機能が正常に動作しなくなります**）![download-zip](./use.assets/download-zip.webp)

③ ブラウザの拡張機能管理画面を開いて、展開済みの拡張機能を読み込みます（[manifest v3 ScriptCat をサポートするための開発者モードの有効化](/docs/use/open-dev/)を参照して、最初に開発者モードを有効にしてください）

- 1. **Edge** ![edge-load-unpacked](./use.assets/edge-load-unpacked.webp)
- 2. **Chrome** ![chrome-load-unpacked](./use.assets/chrome-load-unpacked.webp)

④ 手順②で作成したフォルダーを選択します（読み込みが完了すると、拡張機能管理画面の拡張機能リストに ScriptCat のアイコンが表示されます。ブラウザのアドレスバー右上の拡張機能ボタンをクリックしても確認できます）

- 1. **Edge** ![edge-load-unpacked-img](./use.assets/edge-load-unpacked-img.webp)
- 2. **Chrome** ![chrome-load-unpacked-img](./use.assets/chrome-load-unpacked-img.webp)

⑤ 右上の ScriptCat アイコンをクリックし、表示された画面の右上にある `┆` > スクリプトを取得 をクリックすると、スクリプトサイトでスクリプトを検索・インストールできます。

注: この方法でインストールした拡張機能は自動更新されません。更新する場合は、上記の手順を繰り返して拡張機能を更新してください（ファイルを置き換えて、一度再読み込みします）。


## スクリプトを取得する

> スクリプト以外にも、[Tampermonkey 中国語フォーラム](https://bbs.tampermonkey.net.cn/)と[スクリプト開発ガイド](https://learn.scriptcat.org/)からスクリプトの情報やチュートリアルを得ることができます。

### ScriptCat スクリプトサイト

[ScriptCat スクリプトサイト](https://scriptcat.org/)はこの拡張機能のスクリプトサイトで、作成したスクリプトを公開できます。

- 新しいスクリプトサイト
- バックグラウンドスクリプト/定期スクリプト
- 使いやすいインターフェース

### Userscript.Zone 検索

[Userscript.Zone 検索](https://www.userscript.zone/?utm_source=tm.net&utm_medium=scripts)は、適切な URL やドメインを入力してユーザースクリプトを検索できる新しいウェブサイトです。

- 豊富なスクリプトリソース
- 適切なユーザースクリプトを簡単に見つけられる
- 審査済みのユーザースクリプトページ、または少なくともコメント機能のあるページのユーザースクリプトのみを表示

### GreasyFork

[GreasyFork](https://greasyfork.org/)は、ユーザースクリプトの公開・共有に広く使われているプラットフォームで、開発者がスクリプトを公開し、ユーザーがウェブサイトの機能を拡張・変更するブラウザスクリプトをインストールできます。このサイトは Jason Barnabe によって作成され、セキュリティとオープンソースの透明性を重視していることで知られ、ブラウジング体験を向上させる豊富なスクリプトを提供しています。

Jason Barnabe はブラウザ拡張機能 Stylish の原作者でもあります。ただし、[Stylish](https://userstyles.org/) は 2016 年に売却され、現在は別の会社によって運営されており、その後の開発に Jason Barnabe は直接関与していません。

- 豊富なスクリプトリソース
- Github からスクリプトを同期する機能がある
- 非常に活発な[オープンソース開発モデル](https://github.com/JasonBarnabe/greasyfork)

### GitHub/Gist

[Github と Gist でスクリプトリソースを検索できます。](https://gist.github.com/search?l=JavaScript&o=desc&q="%3D%3DUserScript%3D%3D"&s=updated)

## オンボーディングツアー

ScriptCat をインストールした後、ダッシュボードを開くとオンボーディングツアーが自動的に開始されます（左側のサイドバーの「ヘルプセンター」からいつでも再度開くこともできます）。ツアーの内容:

- [スクリプトをインストールする](/docs/use/script_installation/): スクリプトマーケットからのインストール。[バックグラウンドスクリプト](/docs/dev/background/)のサポートを含む。
- 管理と操作: 編集、実行/停止、[UserConfig](/docs/dev/config/)。
- [バックアップ](/docs/use/sync/)と[他のマネージャーからの移行](/docs/use/from-other/migrate-from-tampermonkey/)。
- [スクリプト同期](/docs/use/sync/)。
- [サブスクリプション](/docs/dev/subscribe/)。
