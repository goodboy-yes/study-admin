// 菜单国际化配置
// vxe-table组件国际化
// import zhVxeTable from "vxe-table/lib/locale/lang/zh-CN";
// import enVxeTable from "vxe-table/lib/locale/lang/en-US";

// element-plus国际化
import enLocale from "element-plus/lib/locale/lang/en";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";

// 导航菜单配置
export const menusConfig = {
  zh: {
    message: {
      hshome: "首页",
      menu11:"按钮",
      menu21:"菜单2-1",
      menu3:"菜单3",
      menu31:"菜单3-1",
      menu32:"菜单3-2",
      menu33:"菜单3-3",
      menu4:"菜单4",
      menu41:"菜单4-1",
      menu42:"菜单4-2",
      menu43:"菜单4-3",
      menu44:"菜单4-4",
    },
  },
  en: {
    message: {
      hshome: "Home",
      menu11:"button",
      menu21:"menu2-1",
      menu3:"menu3",
      menu31:"menu3-1",
      menu32:"menu3-2",
      menu33:"menu3-3",
      menu4:"menu4",
      menu41:"menu4-1",
      menu42:"menu4-2",
      menu43:"menu4-3",
      menu44:"menu4-4",
    },
  },
};

// 按钮配置
export const buttonConfig = {
  zh: {
    message: {
      hsLoginOut: "退出系统",
      hsfullscreen: "全屏",
      hsexitfullscreen: "退出全屏",
      hsrefreshRoute: "刷新路由",
      hslogin: "登陆",
      hsregister: "注册",
      hsadd: "新增",
      hsmark: "标记/取消",
      hssave: "保存",
      hssearch: "搜索",
      hsexpendAll: "全部展开",
      hscollapseAll: "全部折叠",
      hssystemSet: "系统设置",
      hsdelete: "删除",
      hsreload: "重新加载",
      hscloseCurrentTab: "关闭当前标签页",
      hscloseLeftTabs: "关闭左侧标签页",
      hscloseRightTabs: "关闭右侧标签页",
      hscloseOtherTabs: "关闭其他标签页",
      hscloseAllTabs: "关闭全部标签页",
    },
  },
  en: {
    message: {
      hsLoginOut: "loginOut",
      hsfullscreen: "fullScreen",
      hsexitfullscreen: "exitFullscreen",
      hsrefreshRoute: "refreshRoute",
      hslogin: "login",
      hsregister: "register",
      hsadd: "Add",
      hsmark: "Mark/Cancel",
      hssave: "Save",
      hssearch: "Search",
      hsexpendAll: "Expand All",
      hscollapseAll: "Collapse All",
      hssystemSet: "System Set",
      hsdelete: "Delete",
      hsreload: "Reload",
      hscloseCurrentTab: "Close CurrentTab",
      hscloseLeftTabs: "Close LeftTabs",
      hscloseRightTabs: "Close RightTabs",
      hscloseOtherTabs: "Close OtherTabs",
      hscloseAllTabs: "Close AllTabs",
    },
  },
};

// 配置
// export const xxxx = {
//   zh: {
//     message: {},
//   },
//   en: {
//     message: {},
//   },
// };

const localesList = [menusConfig, buttonConfig];

export const localesConfigs = {
  zh: {
    message: Object.assign({}, ...localesList.map((v) => v.zh.message)),
    ...zhLocale,
  },
  en: {
    message: Object.assign({}, ...localesList.map((v) => v.en.message)),
    ...enLocale,
  },
};
