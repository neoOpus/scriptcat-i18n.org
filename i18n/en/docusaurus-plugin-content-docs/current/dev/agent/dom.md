---
title: DOM Manipulation API
---

`@grant CAT.agent.dom`

The DOM manipulation API provides complete browser page automation: navigation, content reading, screenshots, form interaction, and DOM monitoring.

## Tab management

### listTabs — list tabs

```javascript
const tabs = await CAT.agent.dom.listTabs();
```

Returns information about every open tab.

**Returns `TabInfo[]`:**

| Field | Type | Description |
|------|------|------|
| `tabId` | `number` | Tab ID |
| `url` | `string` | Current URL |
| `title` | `string` | Page title |
| `active` | `boolean` | Whether this is the currently active tab |
| `windowId` | `number` | ID of the window it belongs to |
| `discarded` | `boolean` | Whether it has been discarded (suspended) |

## Navigation

### navigate — navigate a page

```javascript
const result = await CAT.agent.dom.navigate(url, options?);
```

**Parameters:**

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `url` | `string` | — | Target URL (required) |
| `options.tabId` | `number` | current active tab | Which tab to use |
| `options.waitUntil` | `boolean` | `true` | Whether to wait for the page to finish loading |
| `options.timeout` | `number` | `30000` | Timeout in milliseconds |

**Returns `NavigateResult`:**

```typescript
{ tabId: number; url: string; title: string }
```

## Reading content

### readPage — read page content

```javascript
const page = await CAT.agent.dom.readPage(options?);
```

Converts the page DOM into structured text, automatically removing irrelevant elements like `<script>`, `<style>`, `<noscript>`, `<svg>`, and `<link[rel=stylesheet]>`.

**Parameters:**

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `options.tabId` | `number` | current active tab | Which tab to use |
| `options.selector` | `string` | — | CSS selector; only the matched element's content is returned |
| `options.maxLength` | `number` | — | Max content characters; truncated beyond this |
| `options.removeTags` | `string[]` | — | Additional tag names to remove |

**Returns `PageContent`:**

| Field | Type | Description |
|------|------|------|
| `title` | `string` | Page title |
| `url` | `string` | Page URL |
| `html` | `string` | Processed page text content |
| `truncated` | `boolean` | Whether the content was truncated |
| `totalLength` | `number` | Total length of the original content |

### screenshot — take a screenshot

```javascript
const shot = await CAT.agent.dom.screenshot(options?);
```

**Parameters:**

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `options.tabId` | `number` | current active tab | Which tab to use |
| `options.quality` | `number` | `80` | JPEG quality (0-100) |
| `options.fullPage` | `boolean` | `false` | Capture the full page |
| `options.selector` | `string` | — | CSS selector; only capture the matched element's area |
| `options.saveTo` | `string` | — | Path to save to in the OPFS workspace |

**Returns `ScreenshotResult`:**

| Field | Type | Description |
|------|------|------|
| `dataUrl` | `string` | base64 data URL |
| `path` | `string` | OPFS save path (when `saveTo` is used) |
| `size` | `number` | File size (when `saveTo` is used) |

**How the capture mode is chosen:**

| Scenario | Behavior |
|------|------|
| `selector` given | Locates the element's bounds via CDP and crops the screenshot |
| Background tab | Tries a CDP screenshot; if that fails, activates the tab and uses `captureVisibleTab` |
| Foreground tab | Uses `captureVisibleTab` directly |

```javascript
// Save a screenshot to OPFS
const shot = await CAT.agent.dom.screenshot({
  saveTo: "screenshots/page.png",
  quality: 90
});
console.log(`Saved to ${shot.path}, size ${shot.size} bytes`);
```

## Page interaction

### click — click an element

```javascript
const result = await CAT.agent.dom.click(selector, options?);
```

**Parameters:**

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `selector` | `string` | — | CSS selector (required) |
| `options.tabId` | `number` | current active tab | Which tab to use |
| `options.trusted` | `boolean` | `false` | Use CDP to dispatch a real mouse event |

**Returns `ActionResult`:**

| Field | Type | Description |
|------|------|------|
| `success` | `boolean` | Whether it succeeded |
| `navigated` | `boolean` | Whether the click triggered a page navigation |
| `url` | `string` | The new URL after navigation |
| `newTab` | `boolean` | Whether a new tab was opened |

**`trusted` vs. a plain click:**

- `trusted: false` (default) — simulates `element.click()` via injected JS; fast, but some sites may detect it as a non-genuine event
- `trusted: true` — sends a real mouse event via the Chrome DevTools Protocol, indistinguishable from actual user interaction, but requires debugger permission

### fill — fill a form field

```javascript
const result = await CAT.agent.dom.fill(selector, value, options?);
```

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `selector` | `string` | CSS selector (required) |
| `value` | `string` | Value to fill in (required) |
| `options.tabId` | `number` | Which tab to use |
| `options.trusted` | `boolean` | Use CDP to simulate keyboard input |

**Behavior:**
- Normal mode: sets `element.value` and dispatches an `input` event
- Trusted mode: CDP focuses the element → types character by character

### scroll — scroll the page

```javascript
const result = await CAT.agent.dom.scroll(direction, options?);
```

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `direction` | `"up" \| "down" \| "top" \| "bottom"` | Scroll direction (required) |
| `options.tabId` | `number` | Which tab to use |
| `options.selector` | `string` | Scroll a specific container instead of the whole page |

**Returns `ScrollResult`:**

| Field | Type | Description |
|------|------|------|
| `scrollTop` | `number` | Scroll position after scrolling |
| `scrollHeight` | `number` | Total content height |
| `clientHeight` | `number` | Viewport height |
| `atBottom` | `boolean` | Whether it's now scrolled to the bottom |

### waitFor — wait for an element

```javascript
const result = await CAT.agent.dom.waitFor(selector, options?);
```

Polls for the specified element to appear on the page (checking every 500ms).

**Parameters:**

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `selector` | `string` | — | CSS selector (required) |
| `options.tabId` | `number` | current active tab | Which tab to use |
| `options.timeout` | `number` | `10000` | Timeout in milliseconds |

**Returns `WaitForResult`:**

| Field | Type | Description |
|------|------|------|
| `found` | `boolean` | Whether the element was found |
| `element` | `object` | Element info (only when `found=true`) |
| `element.selector` | `string` | The matched selector |
| `element.tag` | `string` | Tag name |
| `element.text` | `string` | Text content |
| `element.role` | `string` | ARIA role |
| `element.type` | `string` | input type |
| `element.visible` | `boolean` | Whether it's visible |

## Script execution

### executeScript — run JavaScript

```javascript
const result = await CAT.agent.dom.executeScript(code, options?);
```

**Parameters:**

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `code` | `string` | — | JavaScript code (required) |
| `options.tabId` | `number` | current active tab | Which tab to use |

> The code always runs in the page's **MAIN world** (sharing the same `window` object as the page's own JS), so it can call the page's own functions and read page variables directly — but for the same reason it **cannot access the extension's blob URLs** (e.g. a `blob:` URL you create via `URL.createObjectURL()` from the `Blob` returned by `CAT.agent.opfs.read` in `"blob"` mode), since blob URLs are scoped to the extension's own origin. If you need to work with a blob URL in an isolated context, use a SkillScript instead (see [Skill Development](../skill-dev)).

```javascript
// Call a page's own JS function / read a page variable
const data = await CAT.agent.dom.executeScript(
  "return window.__APP_STATE__"
);

// Read DOM content
const title = await CAT.agent.dom.executeScript(
  "return document.querySelector('h1')?.textContent"
);
```

> The code is wrapped in `new Function()` for execution, and supports a `return` value. The timeout is 30 seconds.

## DOM monitoring

Uses the Chrome DevTools Protocol to monitor DOM changes and dialog events on a page.

### startMonitor — start monitoring

```javascript
await CAT.agent.dom.startMonitor(tabId);
```

Starts monitoring the specified tab for DOM changes and dialogs (alert/confirm/prompt).

### stopMonitor — stop monitoring

```javascript
const result = await CAT.agent.dom.stopMonitor(tabId);
```

Stops monitoring and returns the changes collected.

**Returns `MonitorResult`:**

| Field | Type | Description |
|------|------|------|
| `dialogs` | `Array<{ type, message }>` | List of dialogs |
| `addedNodes` | `Array<{ tag, id?, class?, role?, text }>` | Summary of newly added DOM nodes |

> `addedNodes` is deduplicated by node ID and capped at 50 entries; nodes that have since been removed from the page or aren't visible are skipped automatically. `text` is plain text extracted from the node's `outerHTML`, truncated to 300 characters.

### peekMonitor — check monitor status

```javascript
const status = await CAT.agent.dom.peekMonitor(tabId);
```

Non-destructively checks the current monitoring status.

**Returns `MonitorStatus`:**

| Field | Type | Description |
|------|------|------|
| `hasChanges` | `boolean` | Whether there are any changes |
| `dialogCount` | `number` | Number of dialogs |
| `nodeCount` | `number` | Number of newly added nodes |

## Full example

```javascript
// ==UserScript==
// @name        Auto form filler
// @match       https://example.com/form
// @grant       CAT.agent.dom
// ==/UserScript==

// Wait for the form to load
await CAT.agent.dom.waitFor("form#signup", { timeout: 5000 });

// Fill in the form
await CAT.agent.dom.fill("input[name=username]", "test_user");
await CAT.agent.dom.fill("input[name=email]", "test@example.com");

// Check the agreement box
await CAT.agent.dom.click("input[type=checkbox]#agree");

// Screenshot the filled-in form
await CAT.agent.dom.screenshot({
  selector: "form#signup",
  saveTo: "screenshots/form-filled.png"
});

// Click submit
const result = await CAT.agent.dom.click("button[type=submit]", { trusted: true });
if (result.navigated) {
  console.log("Form submitted successfully, navigated to:", result.url);
}
```
