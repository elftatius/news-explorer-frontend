module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': [2, { allow: ['_id'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['postcss.config.js'] }],
  },
};
