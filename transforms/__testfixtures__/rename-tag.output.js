const stringLiteral = `
<some-tag-name-renamed>
  <some-tag-name-two></some-tag-name-two>
</some-tag-name-renamed>`;

const taggedTemplate = html`<some-tag-name-renamed></some-tag-name-renamed>`;

const stringMatch = document.querySelector('some-tag-name');

const containsName = `<some-tag-name-two></some-tag-name-two>`;
