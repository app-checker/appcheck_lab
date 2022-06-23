export enum ApkTechnologyID {
  kotlin = 'kotlin',
  flutter = 'flutter',
  uniapp = 'uniapp',
  reactNative = 'react_native',
}

// enum ApkTechnologyType {
//   /**
//    * 框架
//    */
//   framework,
//   /**
//    * 编程语言
//    */
//   lang,
// }

export interface ApkTechnologyModel {

  // type: ApkTechnologyType,

  id: ApkTechnologyID,

  desc: string,

  link: string,

  icon: string,

  version?: string,

}

const data: ApkTechnologyModel[] = [
  {
    id: ApkTechnologyID.kotlin,
    desc: 'Kotlin是一由JetBrains开发可用于现代多平台应用的静态编程语言。',
    link: 'https://kotlinlang.org',
    icon: 'kotlin_logo',
  },
  {
    id: ApkTechnologyID.flutter,
    desc: 'Flutter是谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面。 Flutter可以与现有的代码一起工作。在全世界，Flutter正在被越来越多的开发者和组织使用，并且Flutter是完全免费、开源的。',
    link: 'https://flutter.dev/',
    icon: 'flutter_logo',
  },
  {
    id: ApkTechnologyID.uniapp,
    desc: 'uni-app 是使用 Vue 语法开发小程序、H5、App的统一框架',
    link: 'https://uniapp.dcloud.io/',
    icon: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/9a952c80-6080-11eb-a16f-5b3e54966275.png',
  },
  {
    id: ApkTechnologyID.reactNative,
    desc: `React Native 是一个由 Facebook 于 2015 年 9 月发布的一款开源的 JavaScript 框架，它可以让开发者使用 JavaScript 和 React 来开发跨平台的移动应用。它既保留了 React 的开发效率，又同时拥有 Native 应用的良好体验，加上 Virtual DOM 跨平台的优势，实现了真正意义上的：Learn Once,Write Anywhere.`,
    link: 'https://reactnative.dev/',
    icon: 'reactnative_logo'
  }
]

const dataMap = new Map<ApkTechnologyID, ApkTechnologyModel>(data.map(item=> [ item.id, item ]))

export const renderVersion = (current: Pick<ApkTechnologyModel, "id" | "version">): ApkTechnologyModel=> {
  const { version } = current
  /**
   * TODO: not find item
   */
  const item = data.find(item=> item.id == item.id)
  return Object.assign({}, item, { version })
}

export default dataMap