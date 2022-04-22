module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'lineBreak': false,
    'prefer-destructuring': 0,
    'max-len': 0,
    'import/no-cycle': 0,
    'no-console': 0,
    'no-alert': 0,
  },
};
