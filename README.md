# Web Components Codemods

Codemods for Web Components.  
Breaking changes? Don't panic :)

## Usage

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
        .propBinding="${expression}"
      >
      </some-component>
    `;
  }
}
```

Command with options:

```bash
jscodeshift input.js -t replace-attrs.js -p --tag=some-component --attrs='{"attr-one": "foo", ".propBinding": ".newPropBinding"}'
```

Output:

```js
class MyComponent extends LitElement {
  render() {
    return html`
      <some-component
        foo="value"
        attr-two="${expression}"
        .newPropBinding="${expression}"
      >
      </some-component>
    `;
  }
}
```
