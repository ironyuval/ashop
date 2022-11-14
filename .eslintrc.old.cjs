module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/jsx-one-expression-per-line': 'off',
    'linebreak-style': ['error', 'windows'],
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'consistent-return': 'off',
  },
};
