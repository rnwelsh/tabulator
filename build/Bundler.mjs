import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import license from 'rollup-plugin-license'
import {sync} from 'globby'
import {emptyDirSync}  from 'fs-extra'
import postcss from 'rollup-plugin-postcss'
import config from './config.mjs'
import prettify from 'postcss-prettify'
const bundles = [];


  function bundle(versionNumber='', env=null){
    config.setVersion(versionNumber)
    if(env) watch(env)
    else build()
    return bundles
  }

  function noWarn(warn, defaultHandler){
    let suppressed = false, codeHandler = config.ignore[warn.code]
    if(codeHandler) suppressed = typeof codeHandler === "function" ? codeHandler(warn) : codeHandler;
    if(!suppressed) defaultHandler(warn);
  }
  
  function watch(env){
    console.log("Building Dev Package Bundles: ", env);
    switch(env){
      case "css": bundleCSS(false);
      break;
      
      case "esm": bundleESM(false);
      break;
      
      case "umd": bundleUMD(false);
      break;
      
      default:
        bundleCSS(false);
        bundleESM(false);
      break;
    }
  }
  
  function build(){
    
    if(!(config.create.minified||config.create.unminified)) {
      console.log('No builds enabled in config.create.\nEnding build process...\n')
      process.exit(0)
    }
    console.log("Clearing Dist Files");
    clearDist();
    
    import('postcss-prettify').then(pp => {
      if(config.create.unminified) {
        console.log("Building Unminified Production Package Bundles");
        bundleCSS({plugins:[pp.default]})
        bundleESM()
        bundleUMD()
      }
  
      if(config.create.minified) {
        console.log("Building Minified Production Package Bundles");
          bundleCSS({minify:true, plugins:[pp]});
          bundleESM(true);
          bundleUMD(true);
      }
  
    })
    
    if(config.create.unminified) {
      console.log("Building Unminified Production Package Bundles");
      bundleCSS()
      bundleESM()
      bundleUMD()
    }

    if(config.create.minified) {
      console.log("Building Minified Production Package Bundles");
      import('@rollup/plugin-terser').then(terser => {
        bundleCSS(true);
        bundleESM(true);
        bundleUMD(true);
      })
    }
    
  
  }
  
  const clearDist = () => emptyDirSync("./dist")
  
  // copyStandaloneBuilds(){ var builds = ["jquery_wrapper.js"];  builds.forEach((build) => { fs.copySync("./src/js/builds/" + build, "./dist/js/" + build); }); }
  
  function bundleCSS({minify=false, plugins=null}={}){
    
    bundles.push(...sync("./src/scss/**/tabulator*.scss").map(inputFile => ({
      input: inputFile,
      output: {file: './dist/css/' + inputFile.split("/").pop().replace(".scss", minify ? ".min" : "" + '.css'), format: "es"},
      plugins: [
        postcss({
          modules: false,
          extract: true,
          minimize: minify,
          sourceMap: config.sourcemaps,
          plugins: plugins
        }),
      ],
      onwarn:  noWarn.bind(this),
    })))
  }
  
  function bundleESM(minify=false){
      bundles.push({
      input:"src/js/builds/esm.js",
      plugins: [
        nodeResolve(),
        minify ? terser() : null,
        license({
          banner: {
            commentStyle:"none",
            content:  config.version,
          },
        }),
      ],
      output: [
        {
          file: 'dist/js/tabulator_esm' + minify ? '.min' : '' + '.js',
          format: "esm",
          exports: "named",
          sourcemap: config.sourcemaps,
        },
      ],
      onwarn:  noWarn.bind(this),
    });
  }
  
  function bundleUMD(minify=false){
      bundles.push({
      input:"src/js/builds/usd.js",
      
      plugins: [
        nodeResolve(),
        minify ? terser() : null,
        license({
          banner: {
            commentStyle:"none",
            content:  config.version,
          },
        }),
      ],
      output: {
        file: 'dist/js/tabulator' + minify ? ".min" : "" + '.js',
        format: "umd",
        name: "Tabulator",
        esModule: false,
        exports: "default",
        sourcemap: config.sourcemaps,
      },
      onwarn:  noWarn.bind(this),
    });
  }
// }

export default bundle