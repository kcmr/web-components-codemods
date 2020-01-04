export default function transform(file, api) {
  const j = api.jscodeshift;
  const isProgramChild = (path) =>
    path.parentPath.parentPath.name === 'program';
  const iife = (path) =>
    j.expressionStatement(
      j.callExpression(
        j.functionExpression(null, [], j.blockStatement(path.node.body)),
        []
      )
    );

  return j(file.source)
    .find(j.BlockStatement)
    .filter(isProgramChild)
    .replaceWith(iife)
    .toSource();
}
