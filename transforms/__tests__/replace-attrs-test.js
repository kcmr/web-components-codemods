const { defineTest } = require('jscodeshift/dist/testUtils');

defineTest(__dirname, 'replace-attrs', {
  tag: 'wc-icon',
  attrs: {
    icon: 'emoji',
    'some-attr': 'new-attr',
    '.someProp': '.newProp',
  },
});
