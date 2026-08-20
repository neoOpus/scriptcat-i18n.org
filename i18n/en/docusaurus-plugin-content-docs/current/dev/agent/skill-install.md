---
title: Installing and Using Skills
---

A Skill is an extension package for Agent that injects domain-specific knowledge and custom tools into the AI. This page covers how to install, configure, and manage Skills.

:::tip Official Skill repository
**[scriptscat/skills](https://github.com/scriptscat/skills)** — ready-to-use Skills for browser automation, scheduled tasks, file parsing, script-development assistance, and more.
:::

## Installation methods

### Method 1: install from a URL

Open a `SKILL.cat.md` URL directly in your browser's address bar; ScriptCat will intercept it and pop up an install-confirmation page.

For example, to install the official browser-automation Skill:

```
https://raw.githubusercontent.com/scriptscat/skills/main/browser-automation/SKILL.cat.md
```

You can also do this from the management page:

1. Open the ScriptCat management page → **Agent → Skills**
2. Click the **URL** button in the top right
3. Paste the `SKILL.cat.md` URL
4. Click Install

ScriptCat automatically fetches `SKILL.cat.md` along with the scripts and reference material files it declares.

### Method 2: install a ZIP

1. Open the ScriptCat management page → **Agent → Skills**
2. Click the **+** button in the top right
3. Select a Skill package in `.zip` format

The ZIP's directory structure should follow the standard Skill format (it must contain `SKILL.cat.md`).

## Official Skill list

Right-click **Copy link**, then paste the link into the Skills management URL field to install.

| Skill | Description | Install |
|-------|------|------|
| [browser-automation](https://github.com/scriptscat/skills/tree/main/browser-automation) | Page analysis, DOM manipulation, form filling, screenshots, navigation | [Install](https://raw.githubusercontent.com/scriptscat/skills/main/browser-automation/SKILL.cat.md) |
| [scheduled-tasks](https://github.com/scriptscat/skills/tree/main/scheduled-tasks) | Cron scheduled tasks (auto-run by the LLM / script callback) | [Install](https://raw.githubusercontent.com/scriptscat/skills/main/scheduled-tasks/SKILL.cat.md) |
| [skill-creator](https://github.com/scriptscat/skills/tree/main/skill-creator) | Helps create, test, and package new Skills | [Install](https://raw.githubusercontent.com/scriptscat/skills/main/skill-creator/SKILL.cat.md) |
| [file-parser](https://github.com/scriptscat/skills/tree/main/file-parser) | Parses Excel, PDF, Word, CSV, and PPT files | [Install](https://raw.githubusercontent.com/scriptscat/skills/main/file-parser/SKILL.cat.md) |
| [scriptcat-dev](https://github.com/scriptscat/skills/tree/main/scriptcat-dev) | ScriptCat/Tampermonkey script development assistant | [Install](https://raw.githubusercontent.com/scriptscat/skills/main/scriptcat-dev/SKILL.cat.md) |
| [synology-office-sheet](https://github.com/scriptscat/skills/tree/main/synology-office-sheet) | Read/write Synology Office spreadsheets | [Install](https://raw.githubusercontent.com/scriptscat/skills/main/synology-office-sheet/SKILL.cat.md) |
| [wechat-publisher](https://github.com/scriptscat/skills/tree/main/wechat-publisher) | WeChat Official Account operations assistant | [Install](https://raw.githubusercontent.com/scriptscat/skills/main/wechat-publisher/SKILL.cat.md) |
| [xiaohongshu-publisher](https://github.com/scriptscat/skills/tree/main/xiaohongshu-publisher) | Xiaohongshu (RED) operations assistant | [Install](https://raw.githubusercontent.com/scriptscat/skills/main/xiaohongshu-publisher/SKILL.cat.md) |

## Configuring a Skill

Some Skills require configuration (such as an API key):

1. Find the installed Skill on the **Agent → Skills** page
2. Click the **Settings** icon (gear)
3. Fill in the configuration fields and save

Fields marked `secret` in the configuration are masked in the UI.

## Enable / disable

On the Skills management page, use the toggle on a Skill's card to control whether it's enabled. Disabled Skills are not loaded in conversations.

## Checking for updates

Skills installed via URL support version checking:

1. Click the **Check for updates** button in the top right of the Skills page
2. Skill cards with a new version available will show an **Update** button
3. Click it to upgrade with one click

Updates are compared using the `version` field (semver format) declared in `SKILL.cat.md`.

## Using Skills in a conversation

Installed Skills are automatically available in Agent conversations. The AI decides when to load and call a Skill's tools based on the conversation content.

You can also specify which Skills to load when creating a conversation:

```javascript
const conv = await CAT.agent.conversation.create({
  skills: "auto"              // Automatically load all Skills
  // or specify particular Skills
  // skills: ["browser-automation", "file-parser"]
});
```

## Learn more

- [Skill Management API](./skill.md) — manage Skills programmatically from a script
- [Skill Development Guide](./skill-dev.md) — create your own Skill
