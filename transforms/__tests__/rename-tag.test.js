const { defineTest } = require('jscodeshift/dist/testUtils');

defineTest(__dirname, 'rename-tag', {
  oldTag: 'some-tag-name',
  newTag: 'some-tag-name-renamed',
});
