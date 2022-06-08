enum ApkArchConstType {
  ARMV8,
  ARMV7,
  ARMV5,
  X86,
  X86_64,
  unknow,
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
        return ApkArchConstType.unknow
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