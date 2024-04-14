module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks'
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
   // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }], //should add ".ts" if typescript project
    'max-len': ['error', { 
      code: 100, 
      tabWidth: 2, 
      ignoreUrls: true, 
      ignoreComments: false,
      ignoreRegExpLiterals: true,
       ignoreStrings: true, 
       ignoreTemplateLiterals: true 
    }],

  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
