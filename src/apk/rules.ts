export interface ApkRuleItemModel {
  _id: string,
  name: string,
  label: string,
  type: number, 
  isRegexRule: boolean,
  regexName: string | null
}

export interface ApkNativeLibItemModel {
  label: string;
  team: string;
  iconUrl: string;
  contributors: string[];
  description: string;
  relativeUrl: string;
}

const apkRulesCacheMap = new Map<string, ApkNativeLibItemModel>()


class ApkRules {
  #_key = "https://api.jsonbin.io/b/62a1b175449a1f38210201ea"

  #_cacheKey = "rules"

  #data: ApkRuleItemModel[] = []

  async init() {
    await this.#getData()
  }

  #getCacheData(): ApkRuleItemModel[] {
    const _now = this.#data
    if (_now.length >= 1) return _now
    const cache = localStorage.getItem(this.#_cacheKey)
    if (!!cache) {
      const data = JSON.parse(cache) as ApkRuleItemModel[]
      this.#data = data
      return data
    }
    return []
  }

  async #getData(): Promise<ApkRuleItemModel[]> {
    const cacheData = this.#getCacheData()
    if (cacheData.length >= 1) return cacheData
    return await this.#getRemoteRules()
  }

  async #getRemoteRules(): Promise<ApkRuleItemModel[]> {
    const data = await (await fetch(this.#_key)).json() as ApkRuleItemModel[]
    this.#data = data
    localStorage.setItem(this.#_cacheKey, JSON.stringify(data))
    return data
  }

  find(libName: string): ApkRuleItemModel | undefined {
    const lib = this.#data.find(item=> {
      const name = item.name
      const eqName = name == libName
      if (!eqName) {
        const isRegexRule = item.isRegexRule
        if (isRegexRule) {
          const regExp = new RegExp(name as string)
          const flag = regExp.test(libName)
          return flag
        }
      }
      return eqName
    })
    return Object.assign({}, lib, { name: libName, })
  }

  static async getLibInfo(lib: ApkRuleItemModel): Promise<ApkNativeLibItemModel> {
    const { name, regexName, isRegexRule } = lib
    const baseURL = `https://raw.githubusercontent.com/zhaobozhen/LibChecker-Rules/master/native-libs/`
    let url = `${ baseURL }${ name }.json`
    if (isRegexRule) {
      url = `${ baseURL }regex/${ regexName }.json`
    }
    const cacheData: ApkNativeLibItemModel | undefined = apkRulesCacheMap.get(url)
    if (!cacheData) {
      const data = await (await fetch(url)).json() as ApkNativeLibItemModel
      apkRulesCacheMap.set(url, data)
      return data
    }
    return cacheData
  }

}

export {
  ApkRules,
}