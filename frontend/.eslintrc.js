module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "plugin:prettier/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier", "import"],

  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "index",
          "sibling",
          "parent",
          "internal",
          "external",
          "builtin",
          "object",
          "type",
        ],
      },
    ],
    "react/jsx-one-expression-per-line": "off",
    "linebreak-style": "off",
    "no-use-before-define": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "no-underscore-dangle": "off",
    "consistent-return": "off",
    "react/prop-types": "off",
  },
};
