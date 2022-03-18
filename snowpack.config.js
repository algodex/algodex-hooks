// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration
/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  plugins: ['snowpack-plugin-rollup-bundle'],
  alias: {
    '@/': './src/',
  },
  packageOptions: {
    polyfillNode: true,
    // source: 'remote',
  },
  // optimize: {
  //   bundle: true,
  //   minify: true,
  //   target: 'es2018',
  // },
};
