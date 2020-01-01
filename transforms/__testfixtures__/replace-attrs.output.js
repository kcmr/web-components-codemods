const expression = 'foo';
const html = (str) => str;

class Component extends HTMLElement {
  get foo() {
    return html`
      <not-replaced icon="icon:foo" another="bar"></not-replaced>
    `;
  }

  render() {
    return html`
      <wc-icon
        emoji="icon:foo"
        new-attr="value"
        .newProp="${expression}"
      ></wc-icon>
    `;
  }
}
