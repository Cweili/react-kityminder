module.exports = {
  extends: [
    'standard',
    'standard-react',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended'
  ],
  env: {
    browser: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      legacyDecorators: true,
      jsx: true
    }
  },
  settings: {
    react: {
      version: '16',
      pragma: 'createElement'
    }
  },
  rules: {
    'space-before-function-paren': 0,
    'react/prop-types': 0,
    'react/jsx-handler-names': 0,
    'react/jsx-fragments': 0,
    'react/no-unused-prop-types': 0,
    'import/export': 0
  }
}
