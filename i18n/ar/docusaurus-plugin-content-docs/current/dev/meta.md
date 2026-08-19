---
title: كتلة البيانات الوصفية
---

المحتوى داخل `==UserScript==` يصف الأذونات التي يحتاجها السكربت ومعلومات عن السكربت وما إلى ذلك. يقع في بداية السكربت.

```js
// ==UserScript==
// @name         New Userscript
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  try to take over the world!
// @author       You
// @crontab      * * once * *
// ==/UserScript==
```

## القيم الرئيسية

### name

اسم السكربت

### namespace

مساحة اسم السكربت. يحدد `name + namespace` تفرد السكربت.

### version

إصدار السكربت. يُنصح باتباع [التحكم الدلالي بالإصدارات](https://semver.org/)، بحيث عند اكتشاف تغيير في الإصدار، يُطلب من المستخدم التحديث، وهكذا.

### description

وصف تفصيلي للسكربت

### author

مؤلف السكربت

### run-at

متى يعمل السكربت

| القيمة | وقت التشغيل | مدعوم منذ |
| -------------- | ------------------------------------------------------------------ | ---------------------- |
| document-start | يحقن السكربت في الصفحة بمجرد تطابق الرابط من الواجهة الأمامية | v0.3.0 |
| document-end | يحقن السكربت بعد اكتمال تحميل الـ DOM؛ قد تكون سكربتات الصفحة والصور ما زالت قيد التحميل في هذه المرحلة | v0.3.0 |
| document-idle | يحقن السكربت بعد اكتمال تحميل جميع المحتويات | v0.3.0 |
| document-body | يتم حقن السكربت فقط بمجرد أن تحتوي الصفحة على عنصر `body` | v0.6.2 |
| document-menu | يعرض قائمة عند النقر بزر الماوس الأيمن؛ تشغيل السكربت يستخدم اسم السكربت كاسم القائمة | v0.3.4-v0.9.4 (🔥 تمت إزالته) |

لأيقونات القوائم، يمكنك الرجوع إلى [رموز Unicode](https://unicode-table.com/en/) و[الرموز التعبيرية](https://www.emojiall.com/en-US/).

### run-in

يحدد البيئة التي يُحقن فيها السكربت: `@run-in normal-tabs` للتبويبات العادية، `@run-in incognito-tabs` لتبويبات التصفح الخاص.

### early-start (v1.1.0+)

عندما يكون `run-at` هو `document-start`، يعمل السكربت في أقرب وقت ممكن، لكنه لا يزال لا يستطيع ضمان تحميل أسرع من الصفحة.

بمجرد تعريف `@run-at document-start`، يمكنك إضافة `@early-start` لجعل السكربت يُحمَّل أسرع من الصفحة: [مثال](https://github.com/scriptscat/scriptcat/blob/main/example/early-start.js)

### inject-into

:::tip

في بيئة content-script (`content`)، يشير `unsafeWindow` فقط إلى `window` الحالي للبيئة نفسها، ولا يمكنه الوصول إلى `window` الخاص بالصفحة.

لا يدعم ScriptCat الفحص التلقائي لقيود CSP لتحديد ما إذا كان سيتم الحقن كـ `content` أو `page` (أي `@inject-into auto` الخاص بـ Tampermonkey).

:::

يحدد أين يتم حقن السكربت، ويدعم `page` و `content`، والافتراضي هو `page`.

- `page`: يُحقن السكربت في بيئة الصفحة، ويمكنه استخدام `unsafeWindow` للوصول إلى `window` و`DOM` الخاصين بالصفحة
- `content`: يُحقن السكربت في بيئة content-script، ولا يمكنه الوصول مباشرة إلى كائن `window` الخاص بالصفحة، لكن يمكنه الوصول إلى `DOM` الخاص بالصفحة، ولا يخضع لـ `CSP`

### storageName 🧪

مساحة التخزين لـ `Value`؛ يمكن مشاركة البيانات تحت نفس `storageName` والتواصل بين السكربتات. هذه ميزة خاصة بـ ScriptCat.

### background

يميز هذا السكربت كسكربت خلفية، يحتاج إلى التشغيل في بيئة الخلفية. راجع [سكربت الخلفية](./background.md#background-script-background) للتفاصيل.

### crontab

يميز السكربت كسكربت مجدول، ويتطلب قيمة تعبير cron. يمكن أن يوجد تعبير cron واحد فقط، ويعمل وفقاً لهذا الجدول في بيئة الخلفية. راجع [السكربت المجدول](./background.md#scheduled-script-crontab) للتفاصيل.

### match

فقط الروابط المطابقة لـ `match` هي التي تشغل السكربت، باتباع [أنماط المطابقة](https://developer.chrome.com/docs/extensions/mv3/match_patterns/). في `match`، `*` هو حرف بدل، `tld` يطابق النطاق الأعلى، والنطاق الذي يبدأ بـ `*.` سيطابق أيضاً `xxx.com`:

| القيمة | أمثلة صحيحة | أمثلة غير صحيحة |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `http://scriptcat.org/doc/match` | `http://scriptcat.org/doc/match` | `http://scriptcat.org/doc/runAt` |
| `*://*/param?*` | `https://scriptcat.org/param` \| `http://scriptcat.org/param?search=tampermonkey` | `https://scriptcat.org/test/param` |
| `*://*/prefix*suffix` | `http://scriptcat.org/prefix/suffix` \| `http://scriptcat.org/prefix/mid/suffix` \| `http://scriptcat.org/prefixsuffix` | `http://scriptcat.org/prefix/suffix/end` |
| `http*://scriptcat.org/*` | `https://scriptcat.org/` \| `https://scriptcat.org/doc` \| `http://scriptcat.org/doc/match` \| `http://scriptcat.org/param?search=tampermonkey` | `https://doc.scriptcat.org/` |
| `http*://scriptcat.org/doc/*` | `https://scriptcat.org/doc` \| `http://scriptcat.org/doc/match` | `http://scriptcat.org/param?search=tampermonkey` |
| `http*://scriptcat.tld/doc/*` | `https://scriptcat.cn/doc` \| `http://scriptcat.net.cn/doc/match` | `http://google.com/param?search=tampermonkey` |
| `http*://*.scriptcat.org/doc/*` | `https://scriptcat.cn/doc` \| `http://www.scriptcat.net.cn/doc/match` | `http://google.com/param?search=tampermonkey` |

### include

يدعم `\*` للمطابقة الضبابية، مما يسمح بروابط غير قياسية

### exclude

روابط لا يجب أن تطابق؛ يستخدم نفس صيغة التعبير الخاصة بـ `include`

### grant

يطلب إذن واجهة برمجة — لا يمكن استدعاء واجهة برمجة إلا بعد طلبها. راجع قائمة الأذونات في: [وثائق واجهة البرمجة](./api.md) و[وثائق CAT API](./cat-api.md).

قيمتان خاصتان:

- **none**: لا يعمل السكربت في بيئة معزولة (sandbox)، بل مباشرة في بيئة الصفحة. في هذه البيئة، لا تتوفر أي واجهات GM APIs، لكن يمكن الوصول مباشرة إلى كائن `window` الخاص بالصفحة.
- **unsafeWindow**: في بيئة المعزل، إذا كنت بحاجة إلى الوصول إلى كائن `window` الخاص بالصفحة، استخدم `unsafeWindow` للقيام بذلك. (لا يتطلب Tampermonkey التصريح عنه — وهو محتفظ به فقط للتوافق، وهو أمر غير نظيف اعترافاً)

### connect

يطلب إذن الوصول إلى موقع؛ راجع `GM_cookie` و `GM_xmlhttpRequest`. `GM_download` في وضع `native` يحترم أيضاً `@connect` (المضيفات غير المصرح عنها تثير طلب تأكيد، على عكس Tampermonkey)

### resource

يتضمن ملف مورد. بعد التصريح عن `@resource`، يمكنك استخدام `GM_getResourceText`/`GM_getResourceURL` لاسترجاع المعلومات.

```js
// @resource icon https://bbs.tampermonkey.net.cn/favicon.ico
// @resource html https://bbs.tampermonkey.net.cn/
// @resource xml https://bbs.tampermonkey.net.cn/sitemap.xml
// Adding resource integrity verification
// @resource icon https://bbs.tampermonkey.net.cn/favicon.ico#md5-xxx,sha256-xxx
```

### require

يتضمن ملف JS خارجي؛ يدعم [التحقق من سلامة الموارد](#resource-integrity-verification)

### require-css

يتضمن ملف CSS خارجي؛ يدعم [التحقق من سلامة الموارد](#resource-integrity-verification)

### noframes

يميز السكربت بأنه لا يعمل داخل `<frame>`

### definition

عنوان مرجع لملف `.d.ts`، مما يتيح تلميحات الإكمال التلقائي في المحرر

### antifeature

هذا متعلق بسوق السكربتات؛ يجب تمييز الميزات غير المرغوبة بقيمة الوصف هذه، على سبيل المثال:

```js
// @antifeature ads This script has ads
// @antifeature referral-link This script modifies or redirects to the author's referral link
```

## قيم وصف إضافية

### license

ترخيص المصدر المفتوح للسكربت الحالي

### updateURL

يتطلب فحص التحديث أن يحتوي السكربت البعيد على وسم `@version` لكي يسري مفعوله.

الرابط الذي يستخدمه السكربت للتحقق من التحديثات؛ إذا لم يُضبط، فإنه يقترض تلقائياً `user.js => meta.js` من الرابط، أو الرابط الحالي إذا لم يوجد `user.js`.

إذا تم تكوين `@updateURL`، فيجب أيضاً تكوين `@downloadURL` لكي يسري مفعول `@updateURL`.

### downloadURL

عنوان تنزيل تحديث السكربت

### supportURL

موقع الدعم، صفحة الإبلاغ عن الأخطاء

### homepage, homepageURL, website

الصفحة الرئيسية للسكربت

### source

صفحة الكود المصدري للسكربت

### icon, iconURL, defaulticon

أيقونة السكربت

### icon64, icon64URL

أيقونة السكربت بحجم 64x64

### copyright

معلومات حقوق النشر للسكربت

### tag

وسوم السكربت، مفصولة بفواصل أو مسافات

### compatible

معلومات التوافق المعروضة على GreasyFork

### scriptUrl

رابط سكربت المستخدم الذي يشير إليه سكربت الاشتراك

### unwrap

يجعل سكربت المستخدم يتجاوز تغليف المعزل ويُحقن ويُنفذ مباشرة في النطاق العام الأصلي للصفحة. يمكن للسكربت الوصول مباشرة وتعديل المتغيرات العامة الحقيقية للصفحة، لكنه لن يتمكن من استخدام واجهات البرمجة المميزة لسكربتات المستخدم مثل `GM.*`. يُستخدم عادةً في السيناريوهات التي تتطلب تفاعلاً عميقاً مع سكربتات الصفحة الأصلية، أو عند ترحيل سكربت صفحة عادي موجود.

### cloudCat

يميز السكربت بأنه قابل للتصدير إلى حزمة سكربت سحابية CloudCat (SC فقط)

### cloudServer

خدمة CloudCat السحابية التي يستخدمها السكربت

### exportValue

قيم تخزين السكربت للتصدير عند التصدير كسكربت سحابي

### exportCookie

كوكيز للتصدير عند التصدير كسكربت سحابي

### ملاحظات

### التحقق من سلامة الموارد {#resource-integrity-verification}

- استخدم md5 أو sha1 أو sha256 أو sha384 أو sha512 للتحقق من الموارد ضد العبث. يمكن فصل طرق التحقق المتعددة بـ `;` أو `,`.
- وفقاً لـ [توصيات W3C](https://w3c.github.io/webappsec-subresource-integrity/#hash-collision-attacks)، لا يُنصح باستخدام md5 و sha1؛ استخدم sha384 أو خوارزمية تجزئة أقوى بدلاً من ذلك.

على سبيل المثال:

```js
// @require https://cdn.jsdelivr.net/npm/darkmode-js@1.5.7/lib/darkmode-js.min.js#md5-d55836f30c097da753179f82fa6f108f,sha256-a476ab8560837a51938aa6e1720c8be87c2862b6221690e9de7ffac113811a90
```
