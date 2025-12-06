import vue from 'eslint-plugin-vue';

export default [
  {
    ignores: ['dist', 'node_modules'],
  },
  ...vue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': 'off',
      // Relax template formatting rules to avoid noisy diffs; rely on Prettier for layout.
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/html-indent': 'off',
      'vue/attributes-order': 'off',
    },
  },
];
