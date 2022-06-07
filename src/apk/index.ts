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
}

export type ApkManifestRootAttrName = 'versionCode'
  | "versionName"
  | "compileSdkVersion"
  | "compileSdkVersionCodename"
  | 'minSdkVersion'
  | 'targetSdkVersion'
  | 'applicationName'
  | 'package'


interface ApkUtils {
  init(): Promise<void>
  isApk(): boolean
  getApkManifest(): Promise<ApkManifest>
}

class ApkUtilsImpl implements ApkUtils {

  #zip = new ZIP

  #file: File

  #files = new Map<string, ZIP.JSZipObject>()

  constructor(file: File) {
    this.#file = file
  }


  public async getApkManifest(): Promise<ApkManifest> {

    const resources = await this.#files.get('resources.arsc')?.async('arraybuffer')
    if (!resources) {
      throw new ParseApkError('resources.arsc not found')
    }
    
    const manifest = this.#files.get('AndroidManifest.xml')
    if (!manifest) {
      throw new ZipFileError('manifest file not found')
    }
    const xmlBody = await manifest.async('arraybuffer')
    const buffer: Buffer = Buffer.from(xmlBody)
    const Axml = axml.parse<AxmlRoot>(buffer)
    const map = new Map<ApkManifestRootAttrName, string | number>()
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
    const item = (application as AxmlChildren).attrs.find(item=> {
      return item.name == 'label'
    })
    if (!item) {
      throw new ParseApkError('application label not found')
    }
    let value = item.value as string
    const apkUtilsSymbol = new ApkUtilsSymbol(value)
    if (apkUtilsSymbol.isString || apkUtilsSymbol.isID) {
      const resourceTable = new ResourceTable(resources)
      const pointValue = apkUtilsSymbol.value
      value = resourceTable.getResource(pointValue)
    }
    map.set('applicationName', value)

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
    }
    return result
  }

  public async init(): Promise<void> {
    try {
      const _files = await this.#zip.loadAsync(this.#file)
      _files.forEach((path: string, file) => {
        this.#files.set(path, file)
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
    return this.#files.size >= 1
  }

}

enum ApkUtilsSymbols {
  id = 'id',
  string = 'string',
}

class ApkUtilsSymbol {

  #value: string

  #easyAppend(value: ApkUtilsSymbols): string {
    return `@${ value }/`
  }

  constructor(value: string) {
    this.#value = value
  }

  get isID() {
    return this.#value.startsWith(this.#easyAppend(ApkUtilsSymbols.id)) 
  }

  get isString(): boolean {
    return this.#value.startsWith(this.#easyAppend(ApkUtilsSymbols.string))
  }

  get value(): number {
    let _type = ApkUtilsSymbols.id
    if (this.isString) {
      _type = ApkUtilsSymbols.string
    } 
    const _split = this.#easyAppend(_type)
    const result = this.#value.split(_split)[1]
    return Number.parseInt(result, 16)
  }
  
}

export { ApkUtilsImpl }