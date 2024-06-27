import globals from "globals";
import pluginJs from "@eslint/js";

export default {
  env: {
    node: true,
  },
  languageOptions: {
    globals: globals.browser,  // Setting browser globals
  },
  ...pluginJs.configs.recommended,
  rules: {
    'no-unused-vars': 'warn',  // Turn off the no-unused-vars rule
    'no-undef': 'error',
  },
};