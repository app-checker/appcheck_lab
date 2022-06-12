enum ApkArchConstType {

  /**
   * arm64-v8a
   * 
   * 第7代及以上的 ARM 处理器。2011年15月以后的生产的大部分Android设备都使用它.
   */
  ARMV8,

  /**
   * armeabi-v7a
   * 
   * 第8代、64位ARM处理器，很少设备，三星 Galaxy S6是其中之一。
   */
  ARMV7,

  /**
   * armeabi
   * 
   * 第5代、第6代的ARM处理器，早期的手机用的比较多。
   */
  ARMV5,

  /**
   * x86
   * 
   * 平板、模拟器用得比较多。
   */
  X86,

  /**
   * x86_64
   * 
   * 64位的平板。
   */
  X86_64
}

class ApkArchConst {
  static ARMV8_STRING = "arm64-v8a"
  static ARMV7_STRING = "armeabi-v7a"
  static ARMV5_STRING = "armeabi"
  static X86_STRING = "x86"
  static X86_64_STRING = "x86_64"

  static getArch(arch: string): ApkArchConstType {
    switch (arch) {
      case ApkArchConst.ARMV8_STRING:
        return ApkArchConstType.ARMV8
      case ApkArchConst.ARMV7_STRING:
        return ApkArchConstType.ARMV7
      case ApkArchConst.ARMV5_STRING:
        return ApkArchConstType.ARMV5
      case ApkArchConst.X86_STRING:
        return ApkArchConstType.X86
      case ApkArchConst.X86_64_STRING:
        return ApkArchConstType.X86_64
      default:
        return -1
    }
  }

  static toString(archType: ApkArchConstType) {
    switch (archType) {
      case ApkArchConstType.ARMV8:
        return ApkArchConst.ARMV8_STRING
      case ApkArchConstType.ARMV7:
        return ApkArchConst.ARMV7_STRING
      case ApkArchConstType.ARMV5:
        return ApkArchConst.ARMV5_STRING
      case ApkArchConstType.X86:
        return ApkArchConst.X86_STRING
      case ApkArchConstType.X86_64:
        return ApkArchConst.X86_64_STRING
      default:
        return 'unknow'
    }
  }
}

export {
  ApkArchConst,
  ApkArchConstType,
}

export default ApkArchConst