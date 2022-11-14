module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',

  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'prettier',
  ],
  rules: {
    'react/jsx-one-expression-per-line': 'off',
    'linebreak-style': 'off',
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
  },
};
