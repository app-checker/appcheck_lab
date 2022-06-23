import JSZip from "jszip"
import { ApkUtilsImpl } from "."
import ApkArchConst, { ApkArchConstType, ApkArchConstMap } from "./constants"
import { ApkTechnologyID, ApkTechnologyModel } from '@/apk/platform'
import PlatformDataMap from '@/apk/platform'
import { ApkTreeImpl, ZipTree } from "./tree"

type MapFile = Map<string, JSZip.JSZipObject>

const extractFilename = (path: string) => {
  const pathArray = path.split("/");
  const lastIndex = pathArray.length - 1;
  return pathArray[lastIndex];
}

interface ApkAnalyze {

  // init(): Promise<void>

  /**
   * 使用技术栈
   */
  getTechnology(): Promise<ApkTechnologyModel[]>

  /**
   * 支持架构
   * @returns {ApkArchConstType[]}
   */
  getArch(): ApkArchConstType[]

  /**
   * 支持架构
   * @returns {string[]}
   */
  getArchAsString(): string[][]

  /**
   * 获取使用的库
   * @returns {string[]}
   */
  getLibs(): Promise<string[]>

  /**
   * 获取文件(树结构)
   */
  getFileTree(): Promise<ZipTree[]>

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
    this.init()
  }
  
  async getFileTree(): Promise<ZipTree[]> {
    const tree = this.#apkTree
    if (!tree) return []
    return tree.getTree()
  }

  #apkTree: ApkTreeImpl | undefined

  async init() {
    const apkTree = new ApkTreeImpl(this.#files)
    this.#apkTree = apkTree
    await apkTree.init()
    // await this.getLibs()
    // this.isUsedKotlin()
  }

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
        if (!arch.has(archName as any) && (archType as number) >= 0) {
          arch.add(archType)
        }
      }
    })
    const reulst = Array.from(arch).map(v => v)
    return reulst
  }

  getArchAsString(): string[][] {
    const result = this.getArch().map(item => {
      const id = ApkArchConst.toString(item)
      const desc = ApkArchConstMap.get(item) ?? ""
      return [ id, desc ] as string[]
    })
    return result
  }

  #_kotlinRules: string[] = [
    'kotlin-tooling-metadata.json',
    'kotlin/kotlin.kotlin_builtins',
    'META-INF/services/kotlinx.coroutines.CoroutineExceptionHandler',
    'META-INF/services/kotlinx.coroutines.internal.MainDispatcherFactory',
  ]

  /**
   * 项目是否使用到了 `Kotlin`
   * `zhaobozhen/LibChecker/app/src/main/kotlin/com/absinthe/libchecker/utils/PackageUtils.kt#L306`
   */
  async #isUsedKotlin(): Promise<boolean> {
    const flag = this.#_kotlinRules.some(item => {
      return this.#files.get(item)
    })
    return flag
  }
  /**
   * 项目是否使用到 `Flutter`
   * @returns {Promise<boolean>}
   */
  async #isUsedFlutter(data?: string[],): Promise<boolean> {
    const raw = data ? data : await this.getLibs()
    return raw.includes('libapp.so') && raw.includes('libflutter.so')
  }

  /**
   * 项目是否使用到 `iapp`
   * @link https://m.bamenshenqi.com/community/detail/post/427489.html
   */
  async #isUsedIAPP(): Promise<boolean> {
    const extra_conf1g = this.#files.get('assets/extra_conf1g.xml')
    const libSO = this.#files.get('assets/lib.so')
    let flag = false
    for (let item of this.#files) {
      const filename = item[0]
      const IF = filename.endsWith('libygsiyu.so')
      if (IF) {
        flag = true
        break
      }
    }
    const isNext = flag && !!extra_conf1g && !!libSO
    return isNext
  }

  async getTechnology(): Promise<ApkTechnologyModel[]> {
    const resultKey: ApkTechnologyID[] = []

    const mircoTasks = [
      {
        id: ApkTechnologyID.kotlin,
        run: this.#isUsedKotlin,
      },
      {
        id: ApkTechnologyID.flutter,
        run: this.#isUsedFlutter,
      },
      {
        id: ApkTechnologyID.iapp,
        run: this.#isUsedIAPP,
      },
    ]

    for (let item of mircoTasks) {
      const taskBoolean = await item.run.bind(this)()
      if (taskBoolean) {
        resultKey.push(item.id)
      }
    }

    const result = resultKey.map(item=> {
      const data = PlatformDataMap.get(item)
      return data
    }).filter(item=> !!item) as ApkTechnologyModel[]

    return result

  }

}

export { ApkAnalyzeImpl }