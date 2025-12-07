import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default [
  ...baseConfig,
  ...pluginQuery.configs['flat/recommended'],
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];
