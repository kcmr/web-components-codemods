function replaceAttrs(source, tag, attrs) {
  const tagWithAttrs = new RegExp(`<${tag}([^>]*)>`, 'g');

  return source.replace(tagWithAttrs, (m) => {
    for (const [from, to] of Object.entries(attrs)) {
      m = m.replace(new RegExp(`${from}(\s*=)`, 'g'), (f) =>
        f.replace(from, to)
      );
    }

    return m;
  });
}

export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const { tag, attrs, tabWidth = 4, useTabs = false } = options;

  return j(file.source)
    .find(j.TaggedTemplateExpression, {
      tag: { name: 'html' },
    })
    .forEach((path) => {
      const source = j(path.node).toSource();
      const result = replaceAttrs(source, tag, attrs);

      if (source === result) {
        return path;
      }

      j(path).replaceWith(result);
    })
    .toSource({
      tabWidth,
      useTabs,
    });
}
