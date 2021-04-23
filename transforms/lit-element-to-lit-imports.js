export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const { quote = 'single' } = options;

  const isLitElementImport = (path) =>
    path.value.source.value === 'lit-element';
  const isLitHtmlDirectiveImport = (path) =>
    path.value.source.value.includes('lit-html/directives/');
  const isDecorator = /(customElement|property)/;

  const litImport = j.literal('lit');
  const litDirectiveImport = (path) => {
    const fullPath = path.value.source.value;
    return j.literal(fullPath.replace('lit-html', 'lit'));
  };

  const updateDecoratorImports = (path) => {
    const decorators = [];
    let importNode;

    j(path)
      .find(j.ImportSpecifier)
      .forEach((specifier) => {
        importNode = specifier.parentPath.parentPath;
        if (isDecorator.test(specifier.value.imported.name)) {
          decorators.push(
            j.importSpecifier(specifier.value.imported, specifier.value.local)
          );
          specifier.replace();
        }
      });

    if (decorators.length) {
      importNode.insertAfter(
        j.importDeclaration(decorators, j.literal('lit/decorators.js'))
      );
    }
  };

  const replaceImportLiteral = (path) => ({
    with: (value) => j(path).find(j.Literal).replaceWith(value),
  });

  return j(file.source)
    .find(j.ImportDeclaration)
    .forEach((path) => {
      if (isLitElementImport(path)) {
        replaceImportLiteral(path).with(litImport);
        updateDecoratorImports(path);
      }

      if (isLitHtmlDirectiveImport(path)) {
        replaceImportLiteral(path).with(litDirectiveImport(path));
      }
    })
    .toSource({ quote });
}
