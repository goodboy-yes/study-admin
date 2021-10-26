import Layout from "/@/layout/index.vue";
const homeRouter = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/welcome",
    meta: {
      icon: "el-icon-s-home",
      showLink: true,
      rank: 0,
    },
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: () => import("/@/views/welcome.vue"),
        meta: {
          title: "message.hshome",
          showLink: true,
        },
      },
    ],
  },
  {
    path: "/menu1",
    name: "menu1",
    component: Layout,
    redirect: "/menu1/menu11",
    meta: {
      icon: "el-icon-s-home",
      showLink: true,
      rank: 1,
    },
    children: [
      {
        path: "/menu1/menu11",
        name: "menu11",
        component: () => import("/@/views/menu1/menu11.vue"),
        meta: {
          title: "message.menu11",
          showLink: true,
        },
      },
    ],
  },
  {
    path: "/menu2",
    name: "menu2",
    component: Layout,
    redirect: "/menu2/menu21",
    meta: {
      icon: "el-icon-s-home",
      showLink: true,
      rank: 2,
    },
    children: [
      {
        path: "/menu2/menu21",
        name: "menu21",
        component: () => import("/@/views/menu2/menu21.vue"),
        meta: {
          title: "message.menu21",
          showLink: true,
        },
      },
    ],
  },
  {
    path: "/menu3",
    name: "menu3",
    component: Layout,
    redirect: "/menu3/menu31",
    meta: {
      title: "message.menu3",
      icon: "el-icon-s-home",
      showLink: true,
      rank: 3,
    },
    children: [
      {
        path: "/menu3/menu31",
        name: "menu31",
        component: () => import("/@/views/menu3/menu31.vue"),
        meta: {
          title: "message.menu31",
          showLink: true,
        },
      },
      {
        path: "/menu3/menu32",
        name: "menu32",
        component: () => import("/@/views/menu3/menu32.vue"),
        meta: {
          title: "message.menu32",
          showLink: true,
        },
      },
      {
        path: "/menu3/menu33",
        name: "menu33",
        component: () => import("/@/views/menu3/menu33.vue"),
        meta: {
          title: "message.menu33",
          showLink: true,
        },
      },

    ],
  },
  {
    path: "/menu4",
    name: "menu4",
    component: Layout,
    redirect: "/menu4/menu41",
    meta: {
      title: "message.menu4",
      icon: "el-icon-s-home",
      showLink: true,
      rank: 4,
    },
    children: [
      {
        path: "/menu4/menu41",
        name: "menu41",
        component: () => import("/@/views/menu4/menu41.vue"),
        meta: {
          title: "message.menu41",
          showLink: true,
        },
      },
      {
        path: "/menu4/menu42",
        name: "menu42",
        component: () => import("/@/views/menu4/menu42.vue"),
        meta: {
          title: "message.menu42",
          showLink: true,
        },
      },
      {
        path: "/menu4/menu43",
        name: "menu43",
        component: () => import("/@/views/menu4/menu43.vue"),
        meta: {
          title: "message.menu43",
          showLink: true,
        },
      },
      {
        path: "/menu4/menu44",
        name: "menu44",
        component: () => import("/@/views/menu4/menu44.vue"),
        meta: {
          title: "message.menu44",
          showLink: true,
        },
      },
    ],
  },

]


export default homeRouter;
