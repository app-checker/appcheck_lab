/**
 * create by d1y<chenhonzhou@gmail.com>
 * create at 2022-06-09
 * 参考文档: https://www.apiref.com/android-zh/android/Manifest.permission.html
 */

export interface permissionModal {
  permission: string,
  desc: string,
}

const permission: permissionModal[] = [
  {
    "permission": "ACCESS_CHECKIN_PROPERTIES",
    "desc": "允许对签入数据库中的“属性”表进行读/写访问，以更改上载的值。"
  },
  {
    "permission": "ACCESS_COARSE_LOCATION",
    "desc": "允许应用访问大概的位置。"
  },
  {
    "permission": "ACCESS_FINE_LOCATION",
    "desc": "允许应用访问精确的位置。"
  },
  {
    "permission": "ACCESS_LOCATION_EXTRA_COMMANDS",
    "desc": "允许应用程序访问额外的位置提供程序命令。"
  },
  {
    "permission": "ACCESS_NETWORK_STATE",
    "desc": "允许应用程序访问有关网络的信息。"
  },
  {
    "permission": "ACCESS_NOTIFICATION_POLICY",
    "desc": "对希望访问通知政策的应用程序的标记许可。"
  },
  {
    "permission": "ACCESS_WIFI_STATE",
    "desc": "允许应用访问有关Wi-Fi网络的信息。"
  },
  {
    "permission": "ACCOUNT_MANAGER",
    "desc": "允许应用程序调用AccountAuthenticators。"
  },
  {
    "permission": "ADD_VOICEMAIL",
    "desc": "允许应用程序将语音邮件添加到系统中。"
  },
  {
    "permission": "BATTERY_STATS",
    "desc": "允许应用收集电池统计信息"
  },
  {
    "permission": "BIND_ACCESSIBILITY_SERVICE",
    "desc": "必须由 AccessibilityService要求，以确保只有系统可以绑定到它。"
  },
  {
    "permission": "BIND_APPWIDGET",
    "desc": "允许应用程序告诉AppWidget服务哪个应用程序可以访问AppWidget的数据。"
  },
  {
    "permission": "BIND_CARRIER_MESSAGING_SERVICE",
    "desc": "此常量在API级别23中已弃用。请改为使用BIND_CARRIER_SERVICES"
  },
  {
    "permission": "BIND_CARRIER_SERVICES",
    "desc": "允许绑定到运营商应用程序中的服务的系统进程将拥有此权限。"
  },
  {
    "permission": "BIND_CHOOSER_TARGET_SERVICE",
    "desc": "必须由 ChooserTargetService要求，以确保只有系统可以绑定到它。"
  },
  {
    "permission": "BIND_CONDITION_PROVIDER_SERVICE",
    "desc": "必须由 ConditionProviderService来确保只有系统可以绑定它。"
  },
  {
    "permission": "BIND_DEVICE_ADMIN",
    "desc": "设备管理接收方必须提供此信息，以确保只有系统才能与其交互。"
  },
  {
    "permission": "BIND_DREAM_SERVICE",
    "desc": "必须由 DreamService来确保只有系统可以绑定它。"
  },
  {
    "permission": "BIND_INCALL_SERVICE",
    "desc": "必须由 InCallService来确保只有系统可以绑定它。"
  },
  {
    "permission": "BIND_INPUT_METHOD",
    "desc": "必须由 InputMethodService来确保只有系统可以绑定到它。"
  },
  {
    "permission": "BIND_MIDI_DEVICE_SERVICE",
    "desc": "必须由 MidiDeviceService来确保只有系统可以绑定它。"
  },
  {
    "permission": "BIND_NFC_SERVICE",
    "desc": "必须由 HostApduService或 OffHostApduService来确保只有系统可以绑定到它。"
  },
  {
    "permission": "BIND_NOTIFICATION_LISTENER_SERVICE",
    "desc": "必须由 NotificationListenerService来确保只有系统可以绑定到它。"
  },
  {
    "permission": "BIND_PRINT_SERVICE",
    "desc": "必须由 PrintService所要求，以确保只有系统可以绑定到它。"
  },
  {
    "permission": "BIND_QUICK_SETTINGS_TILE",
    "desc": "允许应用绑定到第三方快速设置切片。"
  },
  {
    "permission": "BIND_REMOTEVIEWS",
    "desc": "必须由 RemoteViewsService要求，以确保只有系统可以绑定到它。"
  },
  {
    "permission": "BIND_SCREENING_SERVICE",
    "desc": "必须由 CallScreeningService来确保只有系统可以绑定它。"
  },
  {
    "permission": "BIND_TELECOM_CONNECTION_SERVICE",
    "desc": "必须由 ConnectionService来确保只有系统可以绑定它。"
  },
  {
    "permission": "BIND_TEXT_SERVICE",
    "desc": "必须由TextService（例如"
  },
  {
    "permission": "BIND_TV_INPUT",
    "desc": "必须由 TvInputService确保只有系统可以绑定它。"
  },
  {
    "permission": "BIND_VOICE_INTERACTION",
    "desc": "必须由 VoiceInteractionService所要求，以确保只有系统可以绑定到它。"
  },
  {
    "permission": "BIND_VPN_SERVICE",
    "desc": "必须由 VpnService来确保只有系统可以绑定到它。"
  },
  {
    "permission": "BIND_VR_LISTENER_SERVICE",
    "desc": "VrListenerService必须要求，以确保只有系统可以绑定到它。"
  },
  {
    "permission": "BIND_WALLPAPER",
    "desc": "必须由 WallpaperService要求，以确保只有系统可以绑定到它。"
  },
  {
    "permission": "BLUETOOTH",
    "desc": "允许应用连接到配对的蓝牙设备。"
  },
  {
    "permission": "BLUETOOTH_ADMIN",
    "desc": "允许应用程序发现并配对蓝牙设备。"
  },
  {
    "permission": "BLUETOOTH_PRIVILEGED",
    "desc": "允许应用程序在无需用户交互的情况下配对蓝牙设备，并允许或禁止电话簿访问或消息访问。"
  },
  {
    "permission": "BODY_SENSORS",
    "desc": "允许应用程序访问用户用来测量他/她身体内发生的事情的传感器的数据，例如心率。"
  },
  {
    "permission": "BROADCAST_PACKAGE_REMOVED",
    "desc": "允许应用程序广播应用程序包已被删除的通知。"
  },
  {
    "permission": "BROADCAST_SMS",
    "desc": "允许应用程式广播短讯收据通知。"
  },
  {
    "permission": "BROADCAST_STICKY",
    "desc": "允许应用程序广播粘性意图。"
  },
  {
    "permission": "BROADCAST_WAP_PUSH",
    "desc": "允许应用程式广播WAP PUSH收据通知。"
  },
  {
    "permission": "CALL_PHONE",
    "desc": "允许应用程式启动电话通话，无需通过拨号程式使用者介面让使用者确认通话。"
  },
  {
    "permission": "CALL_PRIVILEGED",
    "desc": "允许应用程式拨打任何电话号码（包括紧急电话号码），而无需通过拨号程式使用者介面让使用者确认所拨打的电话。"
  },
  {
    "permission": "CAMERA",
    "desc": "要求能够访问摄像机设备。"
  },
  {
    "permission": "CAPTURE_AUDIO_OUTPUT",
    "desc": "允许应用程序捕获音频输出。"
  },
  {
    "permission": "CAPTURE_SECURE_VIDEO_OUTPUT",
    "desc": "允许应用程序捕获安全的视频输出。"
  },
  {
    "permission": "CAPTURE_VIDEO_OUTPUT",
    "desc": "允许应用程序捕获视频输出。"
  },
  {
    "permission": "CHANGE_COMPONENT_ENABLED_STATE",
    "desc": "允许应用程序更改是否启用应用程序组件（非自己的应用程序组件）。"
  },
  {
    "permission": "CHANGE_CONFIGURATION",
    "desc": "允许应用程序修改当前配置，如区域设置。"
  },
  {
    "permission": "CHANGE_NETWORK_STATE",
    "desc": "允许应用程序更改网络连接状态。"
  },
  {
    "permission": "CHANGE_WIFI_MULTICAST_STATE",
    "desc": "允许应用程序进入Wi-Fi多播模式。"
  },
  {
    "permission": "CHANGE_WIFI_STATE",
    "desc": "允许应用更改Wi-Fi连接状态。"
  },
  {
    "permission": "CLEAR_APP_CACHE",
    "desc": "允许应用程序清除设备上所有已安装应用程序的缓存。"
  },
  {
    "permission": "CONTROL_LOCATION_UPDATES",
    "desc": "允许从收音机启用/禁用位置更新通知。"
  },
  {
    "permission": "DELETE_CACHE_FILES",
    "desc": "允许应用程序删除缓存文件。"
  },
  {
    "permission": "DELETE_PACKAGES",
    "desc": "允许应用程序删除软件包。"
  },
  {
    "permission": "DIAGNOSTIC",
    "desc": "允许应用程序读取RW到诊断资源。"
  },
  {
    "permission": "DISABLE_KEYGUARD",
    "desc": "允许应用程序在不安全的情况下禁用键盘锁。"
  },
  {
    "permission": "DUMP",
    "desc": "允许应用程序从系统服务中检索状态转储信息。"
  },
  {
    "permission": "EXPAND_STATUS_BAR",
    "desc": "允许应用程序展开或折叠状态栏。"
  },
  {
    "permission": "FACTORY_TEST",
    "desc": "作为制造商测试应用程序运行，以root用户身份运行。"
  },
  {
    "permission": "GET_ACCOUNTS",
    "desc": "允许访问帐户服务中的帐户列表。"
  },
  {
    "permission": "GET_ACCOUNTS_PRIVILEGED",
    "desc": "允许访问帐户服务中的帐户列表。"
  },
  {
    "permission": "GET_PACKAGE_SIZE",
    "desc": "允许应用程序找出任何包裹使用的空间。"
  },
  {
    "permission": "GET_TASKS",
    "desc": "此常数在API级别21中已弃用。不再强制执行。"
  },
  {
    "permission": "GLOBAL_SEARCH",
    "desc": "此权限可用于内容提供商以允许全局搜索系统访问其数据。"
  },
  {
    "permission": "INSTALL_LOCATION_PROVIDER",
    "desc": "允许应用程序将位置提供程序安装到位置管理器中。"
  },
  {
    "permission": "INSTALL_PACKAGES",
    "desc": "允许应用程序安装软件包。"
  },
  {
    "permission": "INSTALL_SHORTCUT",
    "desc": "允许应用程序在Launcher中安装快捷方式。"
  },
  {
    "permission": "INTERNET",
    "desc": "允许应用程序打开网络套接字。"
  },
  {
    "permission": "KILL_BACKGROUND_PROCESSES",
    "desc": "允许应用程式致电 killBackgroundProcesses(String) 。"
  },
  {
    "permission": "LOCATION_HARDWARE",
    "desc": "允许应用程序在硬件中使用位置功能，例如geofencing api。"
  },
  {
    "permission": "MANAGE_DOCUMENTS",
    "desc": "允许应用程序管理对文档的访问，通常作为文档选择器的一部分。"
  },
  {
    "permission": "MASTER_CLEAR",
    "desc": "不适用于第三方应用程序。"
  },
  {
    "permission": "MEDIA_CONTENT_CONTROL",
    "desc": "允许应用程式知道正在播放的内容并控制其播放。"
  },
  {
    "permission": "MODIFY_AUDIO_SETTINGS",
    "desc": "允许应用修改全局音频设置。"
  },
  {
    "permission": "MODIFY_PHONE_STATE",
    "desc": "允许修改电话状态 - 开机，毫秒等。"
  },
  {
    "permission": "MOUNT_FORMAT_FILESYSTEMS",
    "desc": "允许将文件系统格式化为可移动存储。"
  },
  {
    "permission": "MOUNT_UNMOUNT_FILESYSTEMS",
    "desc": "允许安装和卸载可移动存储的文件系统。"
  },
  {
    "permission": "NFC",
    "desc": "允许应用程序通过NFC执行I / O操作。"
  },
  {
    "permission": "PACKAGE_USAGE_STATS",
    "desc": "允许应用程序收集组件使用情况统计信息"
  },
  {
    "permission": "PERSISTENT_ACTIVITY",
    "desc": "此常数在API级别9中已弃用。此功能将在未来删除; 请不要使用。 允许应用程序使其活动持久化。"
  },
  {
    "permission": "PROCESS_OUTGOING_CALLS",
    "desc": "允许应用程序查看在拨出电话期间拨打的号码，并可选择将呼叫重定向到其他号码或完全中止呼叫。"
  },
  {
    "permission": "READ_CALENDAR",
    "desc": "允许应用程序读取用户的日历数据。"
  },
  {
    "permission": "READ_CALL_LOG",
    "desc": "允许应用程式读取使用者的通话记录。"
  },
  {
    "permission": "READ_CONTACTS",
    "desc": "允许应用程序读取用户的联系人数据。"
  },
  {
    "permission": "READ_EXTERNAL_STORAGE",
    "desc": "允许应用程序从外部存储读取。"
  },
  {
    "permission": "READ_FRAME_BUFFER",
    "desc": "允许应用程序拍摄屏幕截图，更一般地访问帧缓冲区数据。"
  },
  {
    "permission": "READ_INPUT_STATE",
    "desc": "此常数在API级别16中已弃用。使用此权限的API已被删除。"
  },
  {
    "permission": "READ_LOGS",
    "desc": "允许应用程序读取底层系统日志文件。"
  },
  {
    "permission": "READ_PHONE_STATE",
    "desc": "允许只读访问电话状态，包括设备的电话号码，当前蜂窝网络信息，任何正在进行的呼叫的状态以及设备上注册的任何 PhoneAccount的列表。"
  },
  {
    "permission": "READ_SMS",
    "desc": "允许应用程式读取短讯。"
  },
  {
    "permission": "READ_SYNC_SETTINGS",
    "desc": "允许应用程式读取同步设定。"
  },
  {
    "permission": "READ_SYNC_STATS",
    "desc": "允许应用读取同步统计信息。"
  },
  {
    "permission": "READ_VOICEMAIL",
    "desc": "允许应用程序读取系统中的语音邮件。"
  },
  {
    "permission": "REBOOT",
    "desc": "需要能够重新启动设备。"
  },
  {
    "permission": "RECEIVE_BOOT_COMPLETED",
    "desc": "允许应用程序接收在系统完成引导后广播的 ACTION_BOOT_COMPLETED 。"
  },
  {
    "permission": "RECEIVE_MMS",
    "desc": "允许应用程式监控收到的彩信。"
  },
  {
    "permission": "RECEIVE_SMS",
    "desc": "允许应用程式接收短讯。"
  },
  {
    "permission": "RECEIVE_WAP_PUSH",
    "desc": "允许应用程序接收WAP推送消息。"
  },
  {
    "permission": "RECORD_AUDIO",
    "desc": "允许应用程序录制音频。"
  },
  {
    "permission": "REORDER_TASKS",
    "desc": "允许应用程序更改任务的Z顺序。"
  },
  {
    "permission": "REQUEST_IGNORE_BATTERY_OPTIMIZATIONS",
    "desc": "为了使用 ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS ，应用程序必须持有权限。"
  },
  {
    "permission": "REQUEST_INSTALL_PACKAGES",
    "desc": "允许应用程序请求安装软件包。"
  },
  {
    "permission": "RESTART_PACKAGES",
    "desc": "此常数在API级别8中已被弃用。不再支持restartPackage(String) API。"
  },
  {
    "permission": "SEND_RESPOND_VIA_MESSAGE",
    "desc": "允许应用程序（电话）向其他应用程序发送请求以处理传入呼叫期间的响应通过消息操作。"
  },
  {
    "permission": "SEND_SMS",
    "desc": "允许应用程式发送短讯。"
  },
  {
    "permission": "SET_ALARM",
    "desc": "允许应用程序广播一个意图为用户设置警报。"
  },
  {
    "permission": "SET_ALWAYS_FINISH",
    "desc": "允许应用程序控制放置在后台时是否立即完成活动。"
  },
  {
    "permission": "SET_ANIMATION_SCALE",
    "desc": "修改全局动画缩放因子。"
  },
  {
    "permission": "SET_DEBUG_APP",
    "desc": "配置应用程序进行调试。"
  },
  {
    "permission": "SET_PREFERRED_APPLICATIONS",
    "desc": "此常数在API级别7中已弃用。不再有用，详情请参阅addPackageToPreferred(String) 。"
  },
  {
    "permission": "SET_PROCESS_LIMIT",
    "desc": "允许应用程序设置可运行的最大数量的（不需要的）应用程序进程。"
  },
  {
    "permission": "SET_TIME",
    "desc": "允许应用程序设置系统时间。"
  },
  {
    "permission": "SET_TIME_ZONE",
    "desc": "允许应用程序设置系统时区。"
  },
  {
    "permission": "SET_WALLPAPER",
    "desc": "允许应用程式设定墙纸。"
  },
  {
    "permission": "SET_WALLPAPER_HINTS",
    "desc": "允许应用程式设定壁纸提示。"
  },
  {
    "permission": "SIGNAL_PERSISTENT_PROCESSES",
    "desc": "允许应用程序请求将信号发送到所有持久性进程。"
  },
  {
    "permission": "STATUS_BAR",
    "desc": "允许应用程序打开，关闭或禁用状态栏及其图标。"
  },
  {
    "permission": "SYSTEM_ALERT_WINDOW",
    "desc": "允许应用使用类型 TYPE_SYSTEM_ALERT创建窗口，显示在所有其他应用的顶部。"
  },
  {
    "permission": "TRANSMIT_IR",
    "desc": "允许使用设备的红外发射器（如果可用）。"
  },
  {
    "permission": "UNINSTALL_SHORTCUT",
    "desc": "允许应用程序在Launcher中卸载快捷方式。"
  },
  {
    "permission": "UPDATE_DEVICE_STATS",
    "desc": "允许应用更新设备统计信息。"
  },
  {
    "permission": "USE_FINGERPRINT",
    "desc": "允许应用使用指纹硬件。"
  },
  {
    "permission": "USE_SIP",
    "desc": "允许应用程序使用SIP服务。"
  },
  {
    "permission": "VIBRATE",
    "desc": "允许访问振动器。"
  },
  {
    "permission": "WAKE_LOCK",
    "desc": "允许使用电源管理器的WakeLocks让处理器免于睡眠或屏幕变暗。"
  },
  {
    "permission": "WRITE_APN_SETTINGS",
    "desc": "允许应用程序编写apn设置。"
  },
  {
    "permission": "WRITE_CALENDAR",
    "desc": "允许应用程序写入用户的日历数据。"
  },
  {
    "permission": "WRITE_CALL_LOG",
    "desc": "允许应用程序写入（但不读取）用户的通话记录数据。"
  },
  {
    "permission": "WRITE_CONTACTS",
    "desc": "允许应用程序写入用户的联系人数据。"
  },
  {
    "permission": "WRITE_EXTERNAL_STORAGE",
    "desc": "允许应用程序写入外部存储。"
  },
  {
    "permission": "WRITE_GSERVICES",
    "desc": "允许应用修改Google服务地图。"
  },
  {
    "permission": "WRITE_SECURE_SETTINGS",
    "desc": "允许应用程序读取或写入安全系统设置。"
  },
  {
    "permission": "WRITE_SETTINGS",
    "desc": "允许应用程序读取或写入系统设置。"
  },
  {
    "permission": "WRITE_SYNC_SETTINGS",
    "desc": "允许应用程序写入同步设置。"
  },
  {
    "permission": "WRITE_VOICEMAIL",
    "desc": "允许应用修改和删除系统中现有的语音邮件。"
  }
]

const permissionMap = new Map(permission.map(item => [item.permission, item.desc]))

function getPermissionDesc(key: string): string | undefined {
  return permissionMap.get(key)
}

export {
  permission,
  permissionMap,
  getPermissionDesc,
}