---
id: cat-api
---

# CatApi Documentation

## Introduction

APIs specific to this extension are defined starting with `CAT_`.

You can also view related examples in the [example directory](https://github.com/scriptscat/scriptcat/tree/main/example).

## Definitions

### CAT_setProxy

> Deprecated in version 0.9.1. May be re-introduced in beta versions.

Sets a proxy. Note that this feature may conflict with extensions like Proxy SwitchyOmega. Multiple scripts can use proxies without conflict (e.g., one script for Google access, another for Twitter).

### CAT_click

Similar to `element.click()`, but used to trigger clicks in specific scenarios.

### CAT_registerMenuInput

Registers a menu input box, allowing users to input values and execute a callback function.

```typescript
declare function CAT_registerMenuInput(
  name: string,
  listener?: (inputValue?: any) => void,
  options_or_accessKey?:
    | {
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

### FileStorageFileInfo

Interface for file information used in storage operations.

```typescript
interface FileStorageFileInfo {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    hash?: string;
}
```
