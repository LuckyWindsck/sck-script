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
  },
  overrides: [
    {
      files: ['src/coderemixer-afk.user.js'],
      extends: ['plugin:vue/essential'],
      globals: {
        Vue: 'readonly',
        moment: 'readonly',
      },
    },
    {
      files: ['src/utaten-copy-lyric.user.js'],
      extends: ['plugin:vue/essential'],
      globals: {
        Vue: 'readonly',
      },
    },
  ],
  rules: {
    semi: ['error', 'never'],
  },
}
