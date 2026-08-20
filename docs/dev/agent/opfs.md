---
title: OPFS 文件 API
---

`@grant CAT.agent.opfs`

OPFS（Origin Private File System）文件 API 允许脚本在 Agent 工作区中读写文件。所有路径相对于 `agents/workspace/` 目录。

## write — 写入文件

```javascript
const result = await CAT.agent.opfs.write(path, content);
```

**参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `path` | `string` | 文件路径（必填），支持多级目录 |
| `content` | `string \| Blob` | 文件内容 |

**content 支持的格式：**

| 格式 | 说明 |
|------|------|
| 普通字符串 | 保存为 UTF-8 文本文件 |
| data URL 字符串 | 自动解码为二进制保存（如 `data:image/png;base64,...`） |
| `Blob` 对象 | 直接保存二进制数据 |

**返回值 WriteResult：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `path` | `string` | 文件保存路径 |
| `size` | `number` | 文件大小（字节） |

```javascript
// 写入文本文件
await CAT.agent.opfs.write("data/config.json", JSON.stringify({ key: "value" }));

// 写入二进制文件（data URL）
const canvas = document.createElement("canvas");
const dataUrl = canvas.toDataURL("image/png");
await CAT.agent.opfs.write("images/chart.png", dataUrl);
```

> 如果路径中的父目录不存在，会自动创建。如果文件已存在，内容会被覆盖。

## read — 读取文件

```javascript
const result = await CAT.agent.opfs.read(path, format?);
```

**参数：**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `path` | `string` | — | 文件路径（必填） |
| `format` | `"text" \| "blob"` | `"text"` | 读取格式 |

**返回值 ReadResult：**

| 字段 | 类型 | 条件 | 说明 |
|------|------|------|------|
| `path` | `string` | 始终 | 文件路径 |
| `size` | `number` | 始终 | 文件大小 |
| `content` | `string` | format="text" | 文件文本内容 |
| `data` | `Blob` | format="blob" | 文件的 Blob 对象（通过结构化克隆传输） |
| `mimeType` | `string` | format="blob" | 自动识别的 MIME 类型 |

**两种读取模式：**

```javascript
// 文本模式 — 适合 JSON、文本文件
const config = await CAT.agent.opfs.read("data/config.json");
const data = JSON.parse(config.content);

// Blob 模式 — 适合图片、二进制文件
const image = await CAT.agent.opfs.read("images/chart.png", "blob");
// image.data 是一个真正的 Blob 对象（不是受作用域限制的 blob: URL）
// 可按需在任意上下文中用 URL.createObjectURL(image.data) 生成本地 URL，
// 或直接把 Blob 传给接受 Blob 的 API（如 fetch 的 body、FormData 等）
```

**支持的 MIME 类型自动识别：**

| 扩展名 | MIME 类型 |
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
| 其他 | `application/octet-stream` |

## list — 列出目录

```javascript
const entries = await CAT.agent.opfs.list(path?);
```

**参数：**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `path` | `string` | `""` | 目录路径，空字符串为根目录 |

**返回值 FileEntry[]：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 文件/目录名 |
| `type` | `"file" \| "directory"` | 类型 |
| `size` | `number` | 文件大小（仅 file 类型） |

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

## delete — 删除文件或目录

```javascript
const result = await CAT.agent.opfs.delete(path);
```

支持递归删除目录及其所有内容。

**返回值：**

```typescript
{ success: true }
```

## readAttachment — 读取附件

```javascript
const result = await CAT.agent.opfs.readAttachment(attachmentId);
```

读取对话中的附件数据（图片、文件等）。附件 ID 来自消息中的 `ContentBlock.attachmentId`。

**参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| `attachmentId` | `string` | 附件 ID（必填） |

**返回值：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 附件 ID |
| `data` | `Blob` | 附件二进制数据 |
| `size` | `number` | 文件大小（字节） |
| `mimeType` | `string` | MIME 类型 |

```javascript
// 读取对话中 AI 生成的图片附件
const messages = await conv.getMessages();
const lastMsg = messages[messages.length - 1];
const imageBlock = lastMsg.content.find(b => b.type === "image");
if (imageBlock) {
  const attachment = await CAT.agent.opfs.readAttachment(imageBlock.attachmentId);
  console.log(`附件大小: ${attachment.size}, 类型: ${attachment.mimeType}`);
}
```

## Blob 数据使用注意事项

- `read(path, "blob")` 返回的是通过[结构化克隆](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)传输的真实 `Blob` 对象，不是受扩展源作用域限制的 `blob:` URL 引用，因此没有跨执行环境访问受限的问题
- 如需生成可在页面中直接使用的临时 URL，调用 `URL.createObjectURL(result.data)` 即可；用完后建议调用 `URL.revokeObjectURL()` 释放
- 也可以将 `Blob` 直接传给接受 `Blob`/`File` 的 Web API（如 `fetch` 的 `body`、`FormData.append`、`<input type="file">` 的 `DataTransfer` 等）
