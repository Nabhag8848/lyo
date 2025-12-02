const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

// Plugin to add tslib to generated package.json
class AddTslibPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('AddTslibPlugin', (compilation) => {
      const packageJsonPath = join(
        compilation.options.output.path,
        'package.json'
      );
      try {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
        if (!packageJson.dependencies) {
          packageJson.dependencies = {};
        }
        // Add tslib if not present
        if (!packageJson.dependencies.tslib) {
          packageJson.dependencies.tslib = '^2.3.0';
          writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        }
      } catch {
        // package.json might not exist yet, ignore
      }
    });
  }
}

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
    }),
    new AddTslibPlugin(),
  ],
};
