---
title: OPFS File API
---

`@grant CAT.agent.opfs`

The OPFS (Origin Private File System) file API lets a script read and write files in the Agent workspace. All paths are relative to the `agents/workspace/` directory.

## write — write a file

```javascript
const result = await CAT.agent.opfs.write(path, content);
```

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `path` | `string` | File path (required); supports nested directories |
| `content` | `string \| Blob` | File content |

**Supported `content` formats:**

| Format | Description |
|------|------|
| Plain string | Saved as a UTF-8 text file |
| Data URL string | Automatically decoded and saved as binary (e.g. `data:image/png;base64,...`) |
| `Blob` object | Binary data saved directly |

**Returns `WriteResult`:**

| Field | Type | Description |
|------|------|------|
| `path` | `string` | Path the file was saved to |
| `size` | `number` | File size (bytes) |

```javascript
// Write a text file
await CAT.agent.opfs.write("data/config.json", JSON.stringify({ key: "value" }));

// Write a binary file (data URL)
const canvas = document.createElement("canvas");
const dataUrl = canvas.toDataURL("image/png");
await CAT.agent.opfs.write("images/chart.png", dataUrl);
```

> Parent directories are created automatically if they don't exist. If the file already exists, its content is overwritten.

## read — read a file

```javascript
const result = await CAT.agent.opfs.read(path, format?);
```

**Parameters:**

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `path` | `string` | — | File path (required) |
| `format` | `"text" \| "blob"` | `"text"` | Read format |

**Returns `ReadResult`:**

| Field | Type | When present | Description |
|------|------|------|------|
| `path` | `string` | always | file path |
| `size` | `number` | always | File size |
| `content` | `string` | format="text" | File text content |
| `data` | `Blob` | format="blob" | The file's Blob object (transferred via structured clone) |
| `mimeType` | `string` | format="blob" | Auto-detected MIME type |

**Two read modes:**

```javascript
// Text mode — suited to JSON and text files
const config = await CAT.agent.opfs.read("data/config.json");
const data = JSON.parse(config.content);

// Blob mode — suited to images and binary files
const image = await CAT.agent.opfs.read("images/chart.png", "blob");
// image.data is a real Blob object (not a scope-restricted blob: URL)
// Create a local URL with URL.createObjectURL(image.data) in whatever
// context needs it, or hand the Blob directly to any API that accepts one
```

**Automatic MIME type detection:**

| Extension | MIME type |
|--------|----------|
| `.jpg` / `.jpeg` | `image/jpeg` |
| `.png` | `image/png` |
| `.gif` | `image/gif` |
| `.webp` | `image/webp` |
| `.svg` | `image/svg+xml` |
| `.mp3` | `audio/mpeg` |
| `.wav` | `audio/wav` |
| `.mp4` | `video/mp4` |
| `.pdf` | `application/pdf` |
| `.json` | `application/json` |
| `.txt` | `text/plain` |
| `.html` | `text/html` |
| `.css` | `text/css` |
| `.js` | `application/javascript` |
| other | `application/octet-stream` |

## list — list a directory

```javascript
const entries = await CAT.agent.opfs.list(path?);
```

**Parameters:**

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `path` | `string` | `""` | Directory path; an empty string means the root directory |

**Returns `FileEntry[]`:**

| Field | Type | Description |
|------|------|------|
| `name` | `string` | File/directory name |
| `type` | `"file" \| "directory"` | Type |
| `size` | `number` | File size (`file` type only) |

```javascript
const entries = await CAT.agent.opfs.list("data/");
for (const entry of entries) {
  if (entry.type === "file") {
    console.log(`${entry.name} (${entry.size} bytes)`);
  } else {
    console.log(`${entry.name}/`);
  }
}
```

## delete — delete a file or directory

```javascript
const result = await CAT.agent.opfs.delete(path);
```

Supports recursively deleting a directory and everything inside it.

**Returns:**

```typescript
{ success: true }
```

## readAttachment — read an attachment

```javascript
const result = await CAT.agent.opfs.readAttachment(attachmentId);
```

Reads attachment data (images, files, etc.) from a conversation. The attachment ID comes from `ContentBlock.attachmentId` in a message.

**Parameters:**

| Parameter | Type | Description |
|------|------|------|
| `attachmentId` | `string` | Attachment ID (required) |

**Returns:**

| Field | Type | Description |
|------|------|------|
| `id` | `string` | Attachment ID |
| `data` | `Blob` | Attachment binary data |
| `size` | `number` | File size (bytes) |
| `mimeType` | `string` | MIME type |

```javascript
// Read an image attachment the AI generated in a conversation
const messages = await conv.getMessages();
const lastMsg = messages[messages.length - 1];
const imageBlock = lastMsg.content.find(b => b.type === "image");
if (imageBlock) {
  const attachment = await CAT.agent.opfs.readAttachment(imageBlock.attachmentId);
  console.log(`Attachment size: ${attachment.size}, type: ${attachment.mimeType}`);
}
```

## Working with Blob data

- `read(path, "blob")` returns a real `Blob` object transferred via [structured clone](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) — not a `blob:` URL scoped to the extension's origin, so there's no cross-context access restriction to worry about
- To get a temporary URL usable in a page, call `URL.createObjectURL(result.data)`; call `URL.revokeObjectURL()` when you're done with it
- You can also pass the `Blob` directly to any Web API that accepts a `Blob`/`File` (e.g. `fetch`'s `body`, `FormData.append`, a `DataTransfer` for `<input type="file">`)
