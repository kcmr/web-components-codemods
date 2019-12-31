function isProgramChild(path) {
  return path.parentPath.parentPath.name === 'program';
}

export default function transform(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.BlockStatement)
    .filter(isProgramChild)
    .replaceWith((path) =>
      j.expressionStatement(
        j.callExpression(
          j.functionExpression(null, [], j.blockStatement(path.node.body)),
          []
        )
      )
    )
    .toSource();
}
