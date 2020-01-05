module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'plugin:node/recommended', 'prettier'],
  plugins: ['jest', 'node', 'prettier'],
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  rules: {
    'no-restricted-syntax': [
      'off',
      {
        selector: 'ForOfStatement',
      },
    ],
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['transforms/*.js'],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        'node/no-unsupported-features/es-syntax': 'off',
      },
    },
    {
      files: ['transforms/__tests__/*.js'],
      env: {
        'jest/globals': true,
      },
    },
  ],
};
