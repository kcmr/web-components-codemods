const expression = 'foo';
const html = (str) => str;

class Component extends HTMLElement {
  render() {
    return html`
      <wc-icon
        icon="icon:foo"
        some-attr="value"
        .someProp="${expression}"
      ></wc-icon>
    `;
  }
}
