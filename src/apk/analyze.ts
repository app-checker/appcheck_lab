import JSZip from "jszip"
import { ApkUtilsImpl } from "."
import ApkArchConst, { ApkArchConstType } from "./constants"

type MapFile = Map<string, JSZip.JSZipObject>

const extractFilename = (path: string) => {
  const pathArray = path.split("/");
  const lastIndex = pathArray.length - 1;
  return pathArray[lastIndex];
}

interface ApkAnalyze {

  // init(): Promise<void>

  /**
   * 项目是否使用到了 `Kotlin`
   * `zhaobozhen/LibChecker/app/src/main/kotlin/com/absinthe/libchecker/utils/PackageUtils.kt#L306`
   */
  isUsedKotlin(): boolean

  /**
   * 支持架构
   * @returns {ApkArchConstType[]}
   */
  getArch(): ApkArchConstType[]

  /**
   * 支持架构
   * @returns {string[]}
   */
  getArchAsString(): string[]

  /**
   * 获取使用的库
   * @returns {string[]}
   */
  getLibs(): Promise<string[]>

}
class ApkAnalyzeImpl implements ApkAnalyze {

  #apkUtils: ApkUtilsImpl

  get #files(): MapFile {
    return this.#apkUtils.files
  }

  get #filesArray(): [string, JSZip.JSZipObject][] {
    return Array.from(this.#files)
  }

  constructor(apkUtils: ApkUtilsImpl) {
    this.#apkUtils = apkUtils
    // this.init()
  }

  // async init() {
  //   await this.getLibs()
  //   this.isUsedKotlin()
  // }

  async getLibs(): Promise<string[]> {
    const reuslt: [string, JSZip.JSZipObject][] = []
    for (let item of this.#filesArray) {
      const [filename, _] = item
      const fileIsSO = filename.endsWith('.so')
      const data = await _.async('arraybuffer')
      const dataIsBinary = data.byteLength > 0
      const isNext = fileIsSO && dataIsBinary
      if (isNext) reuslt.push(item)
    }
    const resultMap = reuslt.map(item => {
      const filename = item[0]
      return extractFilename(filename)
    })
    const data = Array.from(new Set(resultMap))
    return data
  }

  getArch(): ApkArchConstType[] {
    const arch = new Set<ApkArchConstType>()
    this.#files.forEach((_, filename: string) => {
      const isArchModule = filename.startsWith('lib/')
      if (isArchModule) {
        const archName = filename.split('/')[1]
        const archType = ApkArchConst.getArch(archName)
        if (archType && !arch.has(archName as any)) {
          arch.add(archType)
        }
      }
    })
    const reulst = Array.from(arch).map(v => v)
    return reulst
  }

  getArchAsString(): string[] {
    const result = this.getArch().map(item => ApkArchConst.toString(item))
    return result
  }

  #_kotlinRules: string[] = [
    'kotlin-tooling-metadata.json',
    'kotlin/kotlin.kotlin_builtins',
    'META-INF/services/kotlinx.coroutines.CoroutineExceptionHandler',
    'META-INF/services/kotlinx.coroutines.internal.MainDispatcherFactory',
  ]

  isUsedKotlin(): boolean {
    const flag = this.#_kotlinRules.some(item => {
      return this.#files.get(item)
    })
    return flag
  }

}

export { ApkAnalyzeImpl }