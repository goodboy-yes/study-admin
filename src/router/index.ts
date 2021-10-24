import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouteComponent,
} from "vue-router";
import homeRouter from "./modules/home";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

// https://cn.vitejs.dev/guide/features.html#glob-import
const modulesRoutes = import.meta.glob("/src/views/*/*/*.vue");

export const constantRoutesArr: RouteComponent[] = [homeRouter];

// 过滤meta中showLink为false的路由
export const filterTree = (data: any[]) => {
  const newTree = data.filter((v) => v.meta.showLink);
  newTree.forEach((v) => v.children && (v.children = filterTree(v.children)));
  return newTree;
};

// 按照路由中meta下的rank等级升序来排序路由
export const ascending = (arr) => {
  return arr.sort((a: any, b: any) => {
    return a?.meta?.rank - b?.meta?.rank;
  });
};

const router = createRouter({
  history: createWebHashHistory(), // createWebHistory
  routes: filterTree(constantRoutesArr),
  // 当切换到新路由时，设置页面滚到顶部或者是保持原先的滚动位置
  scrollBehavior(to, from, savedPosition) {
    // 返回Promise使处理过渡时，等待过渡结束后再滚动
    return new Promise((resolve) => {
      // 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  },
});

router.beforeEach((to, _from, next) => {
  NProgress.start();
  const externalLink = to?.redirectedFrom?.fullPath;
  // @ts-ignore
  if (!externalLink) to.meta.title ? (document.title = to.meta.title) : "";
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
