import { readFile } from 'node:fs/promises'
export const watch = process.env.TARGET 
export const shouldCreate = {
  minified: true,
  unminified: false,
  sourceMaps: false,
}

// handle checks & setup as soon as possible
if(!watch && !(shouldCreate.minified || shouldCreate.unminified)) {
  console.log(' x No builds enabled in options.shouldCreate.\n   Ending build process...\n')
  process.exit(0)
}
(await import('fs-extra')).emptyDirSync('./dist');

/** Use import.meta.url to make the path to package.json relative to the current source file instead of process.cwd() */
const packageVersion = JSON.parse(await readFile(new URL('../package.json', import.meta.url)) ).version


export const licenseBanner =  `Tabulator v ${packageVersion} (c) Oliver Folkerd ${new Date().getFullYear()}`
export const banner =  `/**\n * Tabulator v${packageVersion} (c) Oliver Folkerd ${new Date().getFullYear()}\n */`

const okErrors = {
  FILE_NAME_CONFLICT: true,
  circularDeps: [
    "Column.js",
    "Tabulator.js",
  ],
}

okErrors["CIRCULAR_DEPENDENCY"] = function(ids=['']) { return okErrors.circularDeps.some(testItem => ids.some(targetItem => targetItem.endsWith(testItem)))}

export function noWarn(warn, defaultHandler){
  if( !okErrors[warn.code] || ( typeof okErrors[warn.code] === 'function' && !okErrors[warn.code](warn.ids) ) ) {defaultHandler(warn)}
}

export const mapScssFileName = (directory, fileName = '', modifier='') => directory + fileName.substring(fileName.lastIndexOf('/')+1,fileName.lastIndexOf('.')) + modifier + '.css'





