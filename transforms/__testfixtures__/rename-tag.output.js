const stringLiteral = `
<some-tag-name-renamed>
  <some-tag-name-two></some-tag-name-two>
</some-tag-name-renamed>`;

const taggedTemplate = html`<some-tag-name-renamed></some-tag-name-renamed>`;

const stringMatch = document.querySelector('some-tag-name-renamed');
const stringMatch2 = ["\"\\n      </some-tag-name-renamed>\\n    \""];

const containsName = `<some-tag-name-two></some-tag-name-two>`;

customElements.define('some-tag-name-renamed', SomeTagName);
