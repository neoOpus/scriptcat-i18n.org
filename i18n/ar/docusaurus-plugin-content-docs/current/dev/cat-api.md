---
id: cat-api
---

# وثائق CatApi

## مقدمة

يتم تعريف واجهات البرمجة (APIs) الخاصة بهذه الإضافة بالبدء بـ `CAT_`.

يمكنك أيضاً الاطلاع على أمثلة ذات صلة في [دليل الأمثلة](https://github.com/scriptscat/scriptcat/tree/main/example).

## التعريفات

### CAT_registerMenuInput

تسجيل مربع إدخال في القائمة، مما يسمح للمستخدمين بإدخال القيم وتنفيذ وظيفة استدعاء (callback).

```typescript
declare function CAT_registerMenuInput(
  name: string,
  listener?: (inputValue?: any) => void,
  options_or_accessKey?: {
        id?: number | string;
        title?: string;
        accessKey?: string;
        autoClose?: boolean;
        type?: "text" | "password" | "number";
        defaultValue?: string;
      }
    | string
): number;
```
