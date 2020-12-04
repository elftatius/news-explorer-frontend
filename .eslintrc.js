module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': [2, { allowAfterThis: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['postcss.config.js'] }],
  },
};
