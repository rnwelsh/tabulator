const config = {
  version: '',
  setVersion(vnum) {this.version = `/* Tabulator v${vnum} (c) Oliver Folkerd <%= moment().format('YYYY') %> */`},
  sourcemaps:false,
  create:{
    minified:false,
    unminified:true
  },
  ignore: {
    FILE_NAME_CONFLICT: true,
    ignoreCircular: [
      "Column.js",
      "Tabulator.js",
    ],
  }
}

config.ignore.CIRCULAR_DEPENDENCY = function(warn) { return config.ignore.ignoreCircular.some(file => warn.importer.includes(file))}

export default config