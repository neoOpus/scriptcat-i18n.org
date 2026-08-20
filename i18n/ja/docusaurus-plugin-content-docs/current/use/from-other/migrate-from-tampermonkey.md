---
title: Tampermonkey から ScriptCat への移行
---

現在 Tampermonkey を使用していて ScriptCat に移行したい場合は、以下の手順とヒントでスムーズに移行できます。

## Tampermonkey からバックアップをエクスポートする

まず、Tampermonkey のアイコンをクリックして管理パネルを開きます

![image-20250716225507707](./migrate-from-tampermonkey.assets/image-20250716225507707.webp)

`ユーティリティ` をクリックし、zip ファイルのセクションで `エクスポート` をクリックすると、zip ファイルをエクスポートできます

![image-20250716225611932](./migrate-from-tampermonkey.assets/image-20250716225611932.webp)

## ScriptCat にインポートする

ScriptCat 拡張機能で、管理パネルのアイコンをクリックして管理パネルを開きます

![image-20250716225719787](./migrate-from-tampermonkey.assets/image-20250716225719787.webp)

`ツール` を選択し、`ファイルをインポート` をクリックして、先ほどエクスポートした Tampermonkey の zip ファイルを選択し、`開く` をクリックしてインポートします。

![image-20250716225741428](./migrate-from-tampermonkey.assets/image-20250716225741428.webp)

開いたページで、インポートしたいスクリプトを選択（またはすべて選択）し、`インポート` ボタンをクリックします。
