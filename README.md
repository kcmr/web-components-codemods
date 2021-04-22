# Web Components Codemods

[![Build Status](https://travis-ci.com/kcmr/web-components-codemods.svg?branch=master)](https://travis-ci.com/kcmr/web-components-codemods)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![codecov](https://codecov.io/gh/kcmr/web-components-codemods/branch/master/graph/badge.svg)](https://codecov.io/gh/kcmr/web-components-codemods)
![Dependency status](https://img.shields.io/david/kcmr/web-components-codemods.svg)

[![NPM](https://nodei.co/npm/web-components-codemods.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/web-components-codemods/)

Codemods for Web Components.  
Breaking changes? Don't panic :)

## Table of contents

- [Usage](#usage)
  - [Using the included CLI](#using-the-included-cli)
  - [Using jscodeshift](#using-jscodeshift)
- [Available codemods](#available-codemods)
  - [Replace attrs](#replace-attrs)
  - [Replace block scope by IIFE](#replace-block-scope-by-iife)
  - [Rename tag](#rename-tag)
  - [LitElement to Lit imports](#litelement-to-lit-imports)
- [Acknowledgments](#acknowledgments)

## Usage

The available codemods can be run in two ways: by using the included CLI or running the transform scripts directly with jscodeshift.

### Using the included CLI

Install this package globally:

```bash
npm i -g web-components-codemods
```

Run the command in the directory you want to run a transform (the directory can be changed later):

```bash
kodemod
```

The command will prompt you for the transform to run and all of its options.
![kodemod CLI screenshot](https://raw.githubusercontent.com/kcmr/web-components-codemods/master/docs/images/kodemod-cli-screenshot.png)

Alternatively, you can run a specific transform by running `kodemod <transform>`.

Example:

```bash
kodemod replace-attrs
```

Available transform commands (same as transform scripts):

- [replace-attrs](#replace-attrs)
- [block-scope-to-iife](#replace-block-scope-by-iife)
- [rename-tag](#rename-tag)
- [LitElement to Lit imports](#litelement-to-lit-imports)

### Using jscodeshift

Install [jscodeshift](https://github.com/facebook/jscodeshift) globally:

```bash
npm i -g jscodeshift
```

Clone or download this repository:

```bash
npx degit kcmr/web-components-codemods
```

Run `jscodeshift` passing the transform script with the `-t` option:

```bash
jscodeshift target-dir/*.js -t web-components-codemods/<transform-script>.js
```

## Available codemods

### Replace attrs

Replaces attributes in the specified tag inside a template literal tagged `html` (LitElement or lit-html).

**Script**: `transforms/replace-attrs.js`

**Options**

| Name         | Default     | Type      | Description                                              |
| ------------ | ----------- | --------- | -------------------------------------------------------- |
| `--tag`      | `undefined` | `String`  | Tag name where the attributes will be replaced           |
| `--attrs`    | `undefined` | `String`  | Stringified object with `{'old-attr': 'new-attr'}` pairs |
| `--tabWidth` | `4`         | `Number`  | Number of spaces used per tab                            |
| `--useTabs`  | `false`     | `Boolean` | Use tabs instead of spaces                               |

Example input:

```js
class MyComponent extends LitElement {
  render() {
    return html`
      <some-component
        attr-one="value"
        attr-two="${expression}"
        .someProp="${expression}"
      >
      </some-component>
    `;
  }
}
```

Command with options:

```bash
jscodeshift input.js -t replace-attrs.js --tag=some-component --attrs='{"attr-one": "foo", ".someProp": ".newProp"}'
```

Output:

```diff
class MyComponent extends LitElement {
  render() {
    return html`
      <some-component
-        attr-one="value"
+        foo="value"
        attr-two="${expression}"
-        .someProp="${expression}"
+        .newProp="${expression}"
      >
      </some-component>
    `;
  }
}
```

### Replace block scope by IIFE

Replaces brackets used as scope in a file by an IIFE.

**Script**: `transforms/block-scope-to-iife.js`

**Options**: no options.

Example input:

```js
{
  const { Element } = Polymer;
}
```

Command with options:

```bash
jscodeshift input.js -t block-scope-to-iife.js
```

Output:

```diff
-{
+(function() {
  const { Element } = Polymer;
+})();
-}
```

### Rename tag

Renames a tag name inside template literals and strings.

**Script**: `transforms/rename-tag.js`

**Options**

| Name         | Default     | Type      | Description                   |
| ------------ | ----------- | --------- | ----------------------------- |
| `--oldTag`   | `undefined` | `String`  | Tag name to replace           |
| `--newTag`   | `undefined` | `String`  | New tag name                  |
| `--tabWidth` | `2`         | `Number`  | Number of spaces used per tab |
| `--useTabs`  | `false`     | `Boolean` | Use tabs instead of spaces    |

Example input:

```js
const tpl = `
  <some-tag>
    <some-tag-two></some-tag-two>
  </some-tag>
`;
customElements.define('some-tag', SomeTag);
```

Command with options:

```bash
jscodeshift input.js -t rename-tag.js --oldTag=some-tag --newTag=new-tag
```

Output:

```diff
const tpl = `
-  <some-tag>
+  <new-tag>
    <some-tag-two></some-tag-two>
-  </some-tag>
+  </new-tag>
`;
-customElements.define('some-tag', SomeTag);
+customElements.define('new-tag', SomeTag);
```

### LitElement to Lit imports

Updates the imports from `lit-element` to `lit` according to the [upgrade guide](https://lit.dev/docs/releases/upgrade/) of Lit 2.0

**Script:** `transforms/lit-element-to-lit-imports.js`

**Options:**

| Name      | Default  | Type     | Description                      |
| --------- | -------- | -------- | -------------------------------- |
| `--quote` | `single` | `String` | Type of quote (single or double) |

Example input:

```js
import { css } from 'lit-element';
import { LitElement, html, property as foo, customElement } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { ifDefined } from 'lit-html/directives/if-defined';
```

Command with options:

```bash
jscodeshift input.js -t lit-element-to-lit-imports.js
```

Output:

```diff
-import { css } from 'lit-element';
+import { css } from 'lit';
-import { LitElement, html, property as foo, customElement } from 'lit-element';
+import { LitElement, html } from 'lit';
+import { property as foo, customElement } from 'lit/decorators.js';
-import { repeat } from 'lit-html/directives/repeat.js';
+import { repeat } from 'lit/directives/repeat.js';
-import { ifDefined } from 'lit-html/directives/if-defined';
+import { ifDefined } from 'lit/directives/if-defined';
```

## Acknowledgments

**Inspiration**

- [Fearless refactors con AST - Speaker Deck](https://speakerdeck.com/sanguino/fearless-refactors-con-ast)
- [React Codemod](https://github.com/reactjs/react-codemod)

**Resources**

- [Write Code to Rewrite Your Code: jscodeshift](https://www.toptal.com/javascript/write-code-to-rewrite-your-code)
- [jscodeshift API and demos](https://hackmd.io/@yQp_d2iwRF25H5YTCeWj0w/Hy8FL6IWZ?type=view#jscodeshift-draft)

## License

This project is licensed under the [MIT License](LICENSE).
