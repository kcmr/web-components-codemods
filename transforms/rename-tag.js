class TagReplacer {
  constructor(parser, oldTag, newTag) {
    this.parser = parser;
    this.oldTag = oldTag;
    this.newTag = newTag;
    this.tag = new RegExp(`${oldTag}[^-]`, 'g');
    this.hasTag = this.nodeHasTag.bind(this);
    this.renamedTag = this.getNewTag.bind(this);
  }

  nodeHasTag(path) {
    return this.parser(path.node).toSource().match(this.tag);
  }

  getNewTag(path) {
    const source = this.parser(path).toSource();
    return this.replaceTag(source);
  }

  replaceTag(source) {
    return source.replace(this.tag, (m) => m.replace(this.oldTag, this.newTag));
  }
}

export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const { oldTag, newTag, tabWidth = 2, useTabs = false } = options;
  const tagReplacer = new TagReplacer(j, oldTag, newTag);
  const { hasTag, renamedTag } = tagReplacer;

  root
    .find(j.TemplateElement)
    .filter(hasTag)
    .replaceWith(renamedTag)
    .toSource({ tabWidth, useTabs });

  root.find(j.Literal).filter(hasTag).replaceWith(renamedTag);

  return root.toSource({ tabWidth, useTabs });
}
