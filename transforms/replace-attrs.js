class AttrReplacer {
  constructor(parser, tag, attrs) {
    this.parser = parser;
    this.attrs = attrs;
    this.tagWithAttrs = new RegExp(`<${tag}([^>]*)>`, 'g');
    this.hasTag = this.nodeHasTag.bind(this);
    this.tagWithNewAttrs = this.getTagWithNewAttrs.bind(this);
  }

  nodeHasTag(path) {
    return this.parser(path.node)
      .toSource()
      .match(this.tagWithAttrs);
  }

  getTagWithNewAttrs(path) {
    const source = this.parser(path).toSource();
    return this.replaceAttrs(source);
  }

  replaceAttrs(source) {
    return source.replace(this.tagWithAttrs, (m) => {
      for (const [from, to] of Object.entries(this.attrs)) {
        const attribute = new RegExp(`${from}(\s*=)`, 'g');
        m = m.replace(attribute, (f) => f.replace(from, to));
      }

      return m;
    });
  }
}

export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const { tag, attrs, tabWidth = 4, useTabs = false } = options;
  const tagAttrReplacer = new AttrReplacer(j, tag, attrs);
  const { hasTag, tagWithNewAttrs } = tagAttrReplacer;

  return j(file.source)
    .find(j.TaggedTemplateExpression, { tag: { name: 'html' } })
    .filter(hasTag)
    .replaceWith(tagWithNewAttrs)
    .toSource({ tabWidth, useTabs });
}
