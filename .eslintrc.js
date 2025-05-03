// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  ignorePatterns: ['/dist/*'],
  plugins: [
    // ...existing plugins...
    'import'
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true
    }
  },
  rules: {
    // ...existing rules...
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in imports (come from NodeJS)
          'external', // External imports
          'internal', // Absolute imports
          'parent', // Parent imports
          'sibling', // Sibling imports
          'index' // index imports
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        pathGroups: [
          {
            pattern: 'react**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'before'
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['react']
      }
    ]
  }
};
