import Vue from "vue";
import VueRouter from "vue-router";
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("views/home/Home.vue"),
    children: [
      {
        path: "/",
        component: () => import("@/components/Welcome.vue"),
      },
      {
        path: "talk/:friendId",
        component: () => import("views/talk/Talk.vue"),
      },
      {
        path: "addfriend",
        component: () => import("views/addFriend/AddFriend.vue"),
      },
      {
        path: "setting",
        component: () => import("views/setting/Setting.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("views/auth/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("views/auth/Register.vue"),
  },
  {
    path: "/socket",
    component: () => import("views/socket/Socket.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
