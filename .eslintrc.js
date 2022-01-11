module.exports = {
  env: {
    es2021: true,
    node: true
    // browser: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    "@typescript-eslint/space-before-function-paren": false
  }
}
