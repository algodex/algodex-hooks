import fs from 'fs';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
// import json from '@rollup/plugin-json';
import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
const pkg = JSON.parse(
    fs.readFileSync('./package.json', {encoding: 'utf-8'}),
);
const customResolver = resolve({
  extensions: ['.js', '.jsx'],
});
const projectRootDir = path.resolve(__dirname);
export default {
  input: 'src',
  external: (id) => {
    return /@algodex/.test(id) || [
      'react',
      'react-dom',
      '@emotion/core',
      '@emotion/styled',
      'axios',
      'ajv',
      'ajv-formats',
      'react-query',
      'prop-types',
      'react-is',
      'lodash',
      'big.js',
      '@randlabs/myalgo-connect',
      'algosdk',
    ].includes(id);
  },
  plugins: [
    // json(),
    alias({
      entries: [
        {
          find: '@/',
          replacement: path.resolve(projectRootDir, './src/'),
        },
      ],
      customResolver,
    }),
    babel(
        {
          babelHelpers: 'bundled',
        },
    ),
    commonjs(),
    nodeResolve({browser: true}),
    terser(),
  ],
  output: {
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
  },
};
