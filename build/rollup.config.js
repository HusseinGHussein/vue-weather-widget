import fs from 'fs';
import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/index.js',
  dest: process.env.NODE_ENV === 'production' ? 'dist/js/vue-weather-widget.min.js' : 'dist/js/vue-weather-widget.js',
  moduleName: 'VueWeatherWidget',
  format: 'umd',
  plugins: [
    vue({
      css (style, styles, compiler) {
        fs.writeFileSync('dist/css/vue-weather-widget.css', style);
      }
    }),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      externalHelpers: false,
      exclude: 'node_modules/**',
      presets: [['es2015', {'modules': false}]],
      plugins: [
        'transform-object-assign',
        'external-helpers'
      ]
    }),
    (process.env.NODE_ENV === 'production' && uglify())
  ],
};
