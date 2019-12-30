const expression = 'foo';
const html = (str) => str;

class Component extends HTMLElement {
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
