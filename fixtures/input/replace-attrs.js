class Component extends LitElement {
  static get properties() {
    return {
      foo: {
        type: String,
      },
    };
  }

  get icon() {
    return html`
      <wc-icon icon="icon:foo"></wc-icon>
    `;
  }

  render() {
    return html`
      <some-component
        attr-one="${this.foo}"
        attr-two="hola"
        .someProp="${this.foo}"
        @click="${this._handler}"
      ></some-component>
    `;
  }

  _handler() {
    console.log('foo');
  }
}
