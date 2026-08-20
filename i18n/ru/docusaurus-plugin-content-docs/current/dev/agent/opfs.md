---
title: API файлов OPFS
---

`@grant CAT.agent.opfs`

API файлов OPFS (Origin Private File System) позволяет скрипту читать и записывать файлы в рабочем пространстве Agent. Все пути относительны к каталогу `agents/workspace/`.

## write — записать файл

```javascript
const result = await CAT.agent.opfs.write(path, content);
```

**Параметры:**

| Параметр | Тип | Описание |
|------|------|------|
| `path` | `string` | Путь к файлу (обязательно); поддерживаются вложенные каталоги |
| `content` | `string \| Blob` | Содержимое файла |

**Поддерживаемые форматы `content`:**

| Формат | Описание |
|------|------|
| Обычная строка | Сохраняется как текстовый файл UTF-8 |
| Строка data URL | Автоматически декодируется и сохраняется как бинарные данные (например, `data:image/png;base64,...`) |
| Объект `Blob` | Сохраняется напрямую как бинарные данные |

**Возвращаемое значение, WriteResult:**

| Поле | Тип | Описание |
|------|------|------|
| `path` | `string` | Путь, по которому сохранён файл |
| `size` | `number` | Размер файла в байтах |

```javascript
// Write a text file
await CAT.agent.opfs.write("data/config.json", JSON.stringify({ key: "value" }));

// Write a binary file (data URL)
const canvas = document.createElement("canvas");
const dataUrl = canvas.toDataURL("image/png");
await CAT.agent.opfs.write("images/chart.png", dataUrl);
```

> Если родительские каталоги в пути не существуют, они создаются автоматически. Если файл уже существует, его содержимое перезаписывается.

## read — прочитать файл

```javascript
const result = await CAT.agent.opfs.read(path, format?);
```

**Параметры:**

| Параметр | Тип | По умолчанию | Описание |
|------|------|--------|------|
| `path` | `string` | — | Путь к файлу (обязательно) |
| `format` | `"text" \| "blob"` | `"text"` | Формат чтения |

**Возвращаемое значение, ReadResult:**

| Поле | Тип | Условие | Описание |
|------|------|------|------|
| `path` | `string` | Всегда | Путь к файлу |
| `size` | `number` | Всегда | Размер файла |
| `content` | `string` | format="text" | Текстовое содержимое файла |
| `data` | `Blob` | format="blob" | Объект Blob файла (передаётся через structured clone) |
| `mimeType` | `string` | format="blob" | Автоматически определённый MIME-тип |

**Два режима чтения:**

```javascript
// Текстовый режим — подходит для JSON и текстовых файлов
const config = await CAT.agent.opfs.read("data/config.json");
const data = JSON.parse(config.content);

// Режим blob — подходит для изображений и бинарных файлов
const image = await CAT.agent.opfs.read("images/chart.png", "blob");
// image.data — настоящий объект Blob (не blob: URL с ограниченной областью действия)
// При необходимости создайте временный URL через URL.createObjectURL(image.data)
// в любом нужном контексте, либо передайте Blob напрямую в API, принимающий Blob
```

**Автоматически распознаваемые MIME-типы:**

| Расширение | MIME-тип |
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
| Другое | `application/octet-stream` |

## list — список каталога

```javascript
const entries = await CAT.agent.opfs.list(path?);
```

**Параметры:**

| Параметр | Тип | По умолчанию | Описание |
|------|------|--------|------|
| `path` | `string` | `""` | Путь к каталогу; пустая строка означает корневой каталог |

**Возвращаемое значение, FileEntry[]:**

| Поле | Тип | Описание |
|------|------|------|
| `name` | `string` | Имя файла/каталога |
| `type` | `"file" \| "directory"` | Тип |
| `size` | `number` | Размер файла (только для типа `file`) |

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

## delete — удалить файл или каталог

```javascript
const result = await CAT.agent.opfs.delete(path);
```

Поддерживает рекурсивное удаление каталога и всего его содержимого.

**Возвращаемое значение:**

```typescript
{ success: true }
```

## readAttachment — прочитать вложение

```javascript
const result = await CAT.agent.opfs.readAttachment(attachmentId);
```

Читает данные вложений (изображения, файлы и т.д.) из диалога. ID вложения берётся из `ContentBlock.attachmentId` в сообщении.

**Параметры:**

| Параметр | Тип | Описание |
|------|------|------|
| `attachmentId` | `string` | ID вложения (обязательно) |

**Возвращаемое значение:**

| Поле | Тип | Описание |
|------|------|------|
| `id` | `string` | ID вложения |
| `data` | `Blob` | Бинарные данные вложения |
| `size` | `number` | Размер файла в байтах |
| `mimeType` | `string` | MIME-тип |

```javascript
// Read an image attachment generated by the AI in a conversation
const messages = await conv.getMessages();
const lastMsg = messages[messages.length - 1];
const imageBlock = lastMsg.content.find(b => b.type === "image");
if (imageBlock) {
  const attachment = await CAT.agent.opfs.readAttachment(imageBlock.attachmentId);
  console.log(`Attachment size: ${attachment.size}, type: ${attachment.mimeType}`);
}
```

## Работа с данными Blob

- `read(path, "blob")` возвращает настоящий объект `Blob`, переданный через [structured clone](https://developer.mozilla.org/ru/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) — а не `blob:` URL, ограниченный источником расширения, поэтому проблем с доступом из разных контекстов исполнения не возникает
- Чтобы получить временный URL для использования на странице, вызовите `URL.createObjectURL(result.data)`; после использования рекомендуется вызвать `URL.revokeObjectURL()`
- Также можно передать `Blob` напрямую в любой Web API, принимающий `Blob`/`File` (например, `body` в `fetch`, `FormData.append`, `DataTransfer` для `<input type="file">`)
