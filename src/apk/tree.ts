import * as ZIP from 'jszip'

interface ApkTree {
  init(): Promise<void>
}

export interface ZipTree {
  filename: string,
  isDirectory: boolean,
  object?: ZIP.JSZipObject,
  children?: ZipTree[]
}

export class ApkTreeImpl implements ApkTree {

  #files: Map<string,ZIP.JSZipObject>

  constructor(files: Map<string, ZIP.JSZipObject>) {
    this.#files = files
  }

  getTree() {
    return this.#cacheTree
  }

  #cacheTree: ZipTree[] = []

  async init() {
    const output = this.#covertToTree(Array.from(this.#files))
    this.#cacheTree = output
    // ;(window as any).dev = output
  }

  #symbol = '/'

  #isRoot(name: string) {
    return name.includes(this.#symbol)
  }

  #covertToTree(files: [string, ZIP.JSZipObject][]): ZipTree[] {
    const tree: ZipTree[] = []
    files.forEach(([filename, file]) => {
      if (this.#isRoot(filename)) {
        filename = `/${ filename }`
      }
      const now = filename.split('/')    
      now.splice(0, 1)
      const len = now.length
      if (len == 1) {
        this.#appendFileAsRoot([filename, file], tree)
      } else if (len >= 2) {
        const parent = now.slice(0, -1)
        const name = now[len - 1]
        this.#appendFile(parent, name, file, tree)
      }
    })
    return tree
  }

  #appendFile(parent: string[], filename: string, file: ZIP.JSZipObject, target: ZipTree[]) {
    let tmp: null | ZipTree[] = null

    parent.forEach((dirName, index)=> {
      const isFirst = index == 0

      if (isFirst) {
        const once = target.find(item=> {
          return item.filename == dirName
        })
        if (!once) {
          const len = target.push({
            filename: dirName,
            isDirectory: true,
            children: [],
          })
          tmp = target[len - 1]['children'] || []
        } else {
          tmp = once['children'] || []
        }
      } else {
        const once = tmp?.find((item: ZipTree)=> {
          return item.filename == dirName
        })
        if (!once) {
          const len = tmp?.push({
            filename: dirName,
            isDirectory: true,
            children: [],
          }) || 0
          tmp = tmp![len - 1]['children'] || []
        } else {
          tmp = once['children'] || []
        }
      }

    })

    tmp!.push({
      filename: filename,
      isDirectory: false,
      object: file,
    })
  }

  #appendFileAsRoot(ctx: [string, ZIP.JSZipObject], target: ZipTree[]) {
    target.push({
      filename: ctx[0],
      isDirectory: false,
      object: ctx[1],
    })
  }

}