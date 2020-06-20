const stringLiteral = `
<some-tag-name>
  <some-tag-name-two></some-tag-name-two>
</some-tag-name>`;

const taggedTemplate = html`<some-tag-name></some-tag-name>`;

const stringMatch = document.querySelector('some-tag-name');

const containsName = `<some-tag-name-two></some-tag-name-two>`;

customElements.define('some-tag-name', SomeTagName);
