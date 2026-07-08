---
id: cat-api
---

# Documentation CatApi

## Introduction

Les API spécifiques à cette extension sont définies avec le préfixe `CAT_`.

Vous pouvez également consulter des exemples dans le [répertoire d'exemples](https://github.com/scriptscat/scriptcat/tree/main/example).

## Définitions

### CAT_setProxy

> Obsolète depuis la version 0.9.1. Pourrait être réintroduit dans les versions bêta.

Définit un proxy. Notez que cette fonctionnalité peut entrer en conflit avec des extensions comme Proxy SwitchyOmega. Plusieurs scripts peuvent utiliser des proxys sans conflit.

### CAT_registerMenuInput

Enregistre une zone de saisie dans le menu, permettant aux utilisateurs de saisir des valeurs et d'exécuter une fonction de rappel.

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
