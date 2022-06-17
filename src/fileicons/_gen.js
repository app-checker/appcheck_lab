const fs = require('fs')
const path = require('path')

const iconTarget = path.join(__dirname, './icons')

const files = fs.readdirSync(iconTarget)

let _genCode = `type ProgrammingFileIconsType = `

files.forEach((item, index)=> {

  const fileName = path.basename(item).split('.')[0]
  let append = ''
  let prefix = `"${ fileName }"`
  if (index == 0) {
    append = prefix + '\n'
  } else {
    append = `  | '${fileName}'\n`
  }

  _genCode += append
})

fs.writeFileSync('debug.ts', _genCode)