export enum ApkTechnologyID {
  kotlin = 'kotlin',
  flutter = 'flutter',
  uniapp = 'uniapp',
  reactNative = 'react_native',
  iapp = 'iapp',
  cordova = 'cordova',
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
  },
  {
    id: ApkTechnologyID.iapp,
    desc: 'IApp是一款手机端的一款软件开发软件。 容易上手，轻松开发出自己的软件。 编程语言是俗语言Java的扩展性语言。 IApp 只需要懂一点英语的人都能凭借自己的智商走出一片天。',
    link: 'http://www.yougais.com/',
    icon: 'http://v.dayx.cn:93/images/201607010702506386.png',
  },
  {
    id: ApkTechnologyID.cordova,
    desc: 'cordova是一个开源的移动开发框架。 允许你用标准的web技术-HTML5,CSS3和JavaScript做跨平台（android、ios、windows等）开发。 应用在每个平台的具体执行被封装了起来，并依靠符合标准的API绑定去访问每个设备的功能，比如说：传感器、数据、网络状态。',
    link: 'https://cordova.apache.org/',
    icon: 'cordova_logo',
  },
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