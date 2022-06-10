/**
 * create by d1y<chenhonzhou@gmail.com>
 * create time: 2022-06-07 11:53
 *
 */

import ZIP from 'jszip'
import { Buffer } from 'buffer'
import { ResourceTable } from './res'
import * as axml from '@/shared/axml'

class ParseApkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ParseApkError'
    this.message = 'parse apk ' + message
  }
}

class ZipFileError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ZipFileError'
    this.message = 'zip file ' + message
  }
}

export interface AxmlRoot extends AxmlChildren {
}

export interface AxmlAttr {
  name: string,
  namespace: string,
  prefix: string,
  value: string | number,
}

export interface AxmlChildren {
  attrs: AxmlAttr[],
  children: AxmlChildren[],
  localName: string,
  prefixes: string[][],
  qName: string,
  uri: string,
}

/**
 * The apk `AndroidManifest.xml` file
 * 
 * https://github.com/app-checker/analysisAPK/blob/master/src/analysisAPK.cpp
 */
export interface ApkManifest {
  versionCode: number,
  versionName: string,
  packageName: string,
  minSdkVersion: number,
  targetSdkVersion: number,
  permissionList: string[],
  applicationName: string,
  icon: ArrayBuffer,
}

export type ApkManifestRootAttrName = 'versionCode'
  | "versionName"
  | "compileSdkVersion"
  | "compileSdkVersionCodename"
  | 'minSdkVersion'
  | 'targetSdkVersion'
  | 'applicationName'
  | 'package'
  | 'icon'


interface ApkUtils {
  init(): Promise<void>
  isApk(): boolean
  getApkManifest(): Promise<ApkManifest>
}

class ApkUtilsImpl implements ApkUtils {

  #zip = new ZIP

  #file: File

  files = new Map<string, ZIP.JSZipObject>()

  constructor(file: File) {
    this.#file = file
  }

  #resourcesFilename = 'resources.arsc'

  #androidManifestFilename = 'AndroidManifest.xml'

  #icLauncher = 'ic_launcher.png';

  async #getResources(): Promise<ArrayBuffer | undefined> {
    const resources = await this.files.get(this.#resourcesFilename)?.async('arraybuffer')
    return resources
  }

  async #getAndroidMainfest(): Promise<AxmlRoot | undefined> {
    const manifest = await this.files.get(this.#androidManifestFilename)?.async('arraybuffer')
    if (!manifest) return
    const buffer = Buffer.from(manifest)
    const Axml = axml.parse<AxmlRoot>(buffer)
    return Axml
  }

  #getApkLabl(rawValue: string,resourceTable: ResourceTable): string {
    if (ApkUtilsSymbol.is(rawValue)) {
      const value = (new ApkUtilsSymbol(rawValue)).value
      const execValue = resourceTable.getResource(value)
      return execValue
    }
    return rawValue
  }

  async #getApkIcon(rawValue: string, resourceTable: ResourceTable): Promise<ArrayBuffer> {
    if (ApkUtilsSymbol.is(rawValue)) {
      const value = (new ApkUtilsSymbol(rawValue)).value
      const execPath = resourceTable.getResource(value)
      if (this.files.has(execPath)) {

        const isXml = execPath.endsWith('.xml')
        // const isImage = execPath.endsWith('.jpg') || execPath.endsWith('.png')

        // FIXME: 不支持 xml
        if (isXml) {
          throw new ParseApkError(`icon ${execPath} is xml(no support)`)
        }
        const file = this.files.get(execPath) as ZIP.JSZipObject
        const arraybuffer = await file.async('arraybuffer')
        return arraybuffer
      }
    }
    const iconTables = Array.from(this.files).filter(item=> {
      const [ filename ] = item
      return filename.endsWith(this.#icLauncher)
    })
    if (iconTables.length > 0) {
      const targetIndex = 0
      const target = iconTables[targetIndex]
      const [ _, file ] = target
      const arraybuffer = await file.async('arraybuffer')
      return arraybuffer
    }
    throw new ParseApkError('get icon not found')
  }

  public async getApkManifest(): Promise<ApkManifest> {

    const resources = await this.#getResources()
    if (!resources) {
      throw new ParseApkError(`${ this.#resourcesFilename } not found`)
    }
    
    const Axml = await this.#getAndroidMainfest()
    if (!Axml) {
      throw new ParseApkError(`${ this.#androidManifestFilename } not found`)
    }

    const map = new Map<ApkManifestRootAttrName, string | number | ArrayBuffer>()
    Axml.attrs.forEach(item=> {
      const name = item.name as ApkManifestRootAttrName
      const value = item.value
      map.set(name, value)
    })


    const UsesSDK = Axml.children.find(item=> {
      return item.localName == 'uses-sdk'
    })
    if (!UsesSDK) {
      throw new ParseApkError('uses-sdk not found')
    }
    UsesSDK.attrs.forEach(item=> {
      const name = item.name as ApkManifestRootAttrName
      const value = item.value
      map.set(name, value)
    })

    const permissions: AxmlChildren[] = []
    let application: AxmlChildren | null = null
    Axml.children.forEach(item=> {
      const localName = item.localName
      if (localName == 'uses-permission') {
        permissions.push(item)
      } else if (localName == 'application') {
        application = item
      }
    })

    
    if (!application) {
      throw new ParseApkError('application not found')
    }

    // [0] => label
    // [1] => icon
    const labelAndIcon: string[] = []

    ;(application as AxmlChildren).attrs.every(item=> {
      if (labelAndIcon.length == 2) return false
      const name = item.name
      const value = item.value as string
      if (name == 'label') {
        labelAndIcon.push(value) 
      } else if (name == 'icon') {
        if (labelAndIcon.length == 1) {
          labelAndIcon.push(value)
        } else {
          labelAndIcon.unshift(value)
        }
      }
      return true
    })

    if (labelAndIcon.length <= 1) {
      throw new ParseApkError('application label icon not found')
    }

    const resourceTable = new ResourceTable(resources)
    const labelValue = this.#getApkLabl(labelAndIcon[0], resourceTable)
    let iconValue: ArrayBuffer = new ArrayBuffer(0)
    try { 
      iconValue = await this.#getApkIcon(labelAndIcon[1], resourceTable)
    } catch (error) {
      console.log(error)
    }

    map.set('icon', iconValue)
    map.set('applicationName', labelValue)

    const _ps = permissions.map(item=> {
      try {
        const attrs = item.attrs
        if (attrs.length == 0) return null
        return attrs[0].value
      } catch (error) {
        return null
      }
    }).filter(item=> !!item) as string[]
    const result = <ApkManifest>{
      versionCode: map.get('versionCode'),
      versionName: map.get('versionName'),
      packageName: map.get('package'),
      minSdkVersion: map.get('minSdkVersion'),
      targetSdkVersion: map.get('targetSdkVersion'),
      permissionList: _ps,
      applicationName: map.get('applicationName'),
      icon: map.get('icon'),
    }
    return result
  }

  public async init(): Promise<void> {
    try {
      const _files = await this.#zip.loadAsync(this.#file)
      _files.forEach((path: string, file) => {
        this.files.set(path, file)
      })
    } catch (error) {
      throw new ParseApkError(error as any)
    }
  }

  /**
   * check if the file is apk
   * @returns {boolean}
   */
  public isApk(): boolean {
    return this.files.size >= 1
  }

}

enum ApkUtilsSymbols {
  id = 'id',
  string = 'string',
  ref = 'ref',
}

class ApkUtilsSymbol {

  get #_sybs(): Map<string, string> {
    const map = new Map<string, string>()
    Object.keys(ApkUtilsSymbols)
      .filter((v) => Number.isNaN(+v))
      .forEach(item=> {
        map.set(item, ApkUtilsSymbol.createTemplate(item))
      })
    return map
  }

  #value: string

  static createTemplate(scoped: string): string {
    return `@${ scoped }/`
  }

  constructor(value: string) {
    this.#value = value
  }

  static is(value: string): boolean {
    const kyes: string[] = Object.keys(ApkUtilsSymbols)
      .filter((v) => Number.isNaN(+v))
      .map(item=> {
        return ApkUtilsSymbol.createTemplate(item)
      })
    
    return kyes.some(item=> {
      return value.startsWith(item)
    })
  }

  get value(): number {
    let result = ''
    const _value = this.#value
    Array.from(this.#_sybs.values()).every(item=> {
      if (_value.startsWith(item)) {
        const tryItem = _value.split(item)[1]
        result = tryItem
        return false
      }
      return true
    })
    return Number.parseInt(result, 16)
  }
  
}

export { ApkUtilsImpl }