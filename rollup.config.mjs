// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */

//** import modules shared across all configurations here */
import {mapScssFileName, noWarn, shouldCreate, watch, banner} from './build/options.mjs'
import sizes from 'rollup-plugin-sizes';
import esbuild from 'rollup-plugin-esbuild'

const optimize = false

export default (async () => {
  const config = []

  /** builds that include css */
  if (!watch || (watch==='css' || watch==='dev')) {
    
    //** dynamic import css plugins here 
    const postcss = (await import('rollup-plugin-postcss')).default
    const postcssPlugins = [(await import('postcss-prettify')).default ]
    //** rollup css config template */
    const cssOptions = (inputFile, minify=false) => ({
      input: inputFile,
      output: {file: mapScssFileName('./dist/css/', inputFile, minify ? '.min' : ''), format: 'es'},
      onwarn:  noWarn.bind(this),
      plugins: 
      [
        sizes(),
        postcss({
          modules: false,
          extract: true,
          minimize:   minify,
          sourceMap: shouldCreate.sourceMaps,
          plugins: minify ? undefined : postcssPlugins
        }),
        
      ],
    });
    
    //** load css files */
    (await import('globby')).sync('./src/scss/**/tabulator*.scss').forEach(inputFile => {
     ( shouldCreate.unminified || watch ) && config.push(cssOptions(inputFile));
     ( shouldCreate.minified   || watch ) && config.push(cssOptions(inputFile, true));
    });
    
    //** return early if only watching css */
    if (watch==='css') return config
    
  }
  
  //** dynamic import js plugins here */

  //** rollup js config template */
  const jsOptions = (format='esm', minify = false) => ({
    input:'src/js/builds/' + format + '.js',
    onwarn:  noWarn.bind(this),
    plugins:
    [
      esbuild({
        sourceMap: shouldCreate.sourceMaps,
        minify: minify,
        target: 'esnext',
        // optimizeDeps: {
        //   include: optimize ? ['vue', 'react', 'three', 'lodash'] : [],
        // },
      }),
      sizes(),

    ],
    output: {
      file: 'dist/js/tabulator' + (format==='esm' ? '_esm' : '') + (minify ? '.min' : '') + '.js',
      name: 'Tabulator',
      format: format==='esm' ? 'esm' : 'umd',
      exports: format==='esm' ? 'named' : 'default',
      sourcemap: shouldCreate.sourceMaps,
      banner: banner

    },
  });
  
  /** builds that include esm */
  if(!watch || watch==='esm' || watch==='dev') {
    (shouldCreate.unminified || watch) && config.push(jsOptions('esm'));
    (shouldCreate.minified   || watch) && config.push(jsOptions('esm',true));
    
    
    if(watch) return config
  }
  
  /** builds that include umd */
  (shouldCreate.unminified || watch) && config.push(jsOptions('umd'));
  (shouldCreate.minified   || watch) && config.push(jsOptions('umd',true));
    
  return config
})();
