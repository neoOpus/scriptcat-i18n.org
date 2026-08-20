---
title: Violentmonkey から ScriptCat への移行
---

現在 Violentmonkey を使用していて ScriptCat に移行したい場合は、以下の手順とヒントでスムーズに移行できます。

## Violentmonkey からバックアップをエクスポートする

まず、Violentmonkey のアイコンをクリックして管理パネルを開きます

![image-20250716225900597](./migrate-from-violentmonkey.assets/image-20250716225900597.webp)

`設定` をクリックし、`zip ファイルとしてエクスポート` をクリックすると、バックアップファイルをエクスポートできます

![image-20250716225935258](./migrate-from-violentmonkey.assets/image-20250716225935258.webp)

## ScriptCat にインポートする

ScriptCat 拡張機能で、管理パネルのアイコンをクリックして管理パネルを開きます

![image-20250716225719787](./migrate-from-tampermonkey.assets/image-20250716225719787.webp)

`ツール` を選択し、`ファイルをインポート` をクリックして、先ほどエクスポートした Violentmonkey の zip ファイルを選択し、`開く` をクリックしてインポートします。

![image-20250716225741428](./migrate-from-tampermonkey.assets/image-20250716225741428.webp)

開いたページで、インポートしたいスクリプトを選択（またはすべて選択）し、`インポート` ボタンをクリックします。
