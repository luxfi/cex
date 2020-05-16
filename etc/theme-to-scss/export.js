const fs = require('fs')
const path = require('path')
const stringStream = require('string-to-stream')
const jsonSass = require('json-sass')
const prefix = require('prefix-stream')
const flatten = require('./flatten')

const NOTICE = '/* FILE AUTO-GENERATED MATERIAL UI THEME: DO NOT EDIT */\n/* (see script command line in package.json */\n'

// Note: argv[0] and argv[1] are 'node' and '<this script>' 
const src = process.argv[2]
const dest = process.argv[3]

const sourceAbs = path.join(process.cwd(), src)
const sourceRel = path.relative(__dirname, sourceAbs)
console.log("Material UI to SASS export script.")
console.log("Source: " + sourceAbs + "...")
console.log("Destination: " + path.join(process.cwd(), dest) + "...")

const flat = flatten(sourceRel)

/* TEST JSON STEP ONLY
//console.log(JSON.stringify(flat, null, 2))
stringStream(JSON.stringify(flat, null, 2))
  .pipe(fs.createWriteStream('./muiThemeMap.json'))
*/

  // Note that all fs related paths are relative to process.cwd(), *not* this file's dir
stringStream(JSON.stringify(flat, null, 2))
  .pipe(jsonSass({ prefix: '$mui-theme: ' })) // add everything to a single sass map
  .pipe(prefix(NOTICE))
  .pipe(fs.createWriteStream(path.normalize(dest)))

