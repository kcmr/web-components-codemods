const stringLiteral = `
<some-tag-name>
  <some-tag-name-two></some-tag-name-two>
</some-tag-name>`;

const taggedTemplate = html`<some-tag-name></some-tag-name>`;

const stringMatch = document.querySelector('some-tag-name');
const stringMatch2 = ["\"\\n      </some-tag-name>\\n    \""];

const containsName = `<some-tag-name-two></some-tag-name-two>`;

customElements.define('some-tag-name', SomeTagName);
