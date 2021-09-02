import Vue from "vue";
import Router from "vue-router";
import { routerHistory, writeHistory } from "vue-router-back-button";

Vue.use(Router);
Vue.use(routerHistory);

const scrollBehavior = (_, __, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }

  const position = {
    x: 0,
    y: 0,
  };

  return position;
};

const router = new Router({
  scrollBehavior,
  routes: [
    {
      path: "/",
      name: "home",
      title: "Trang chủ",
      iconName: "estate",
      sidebar: true,
      component: require("@/pages/HomePage").default,
    },
    {
      path: "/latest",
      name: "latest",
      title: "Mới nhất",
      iconName: "music",
      sidebar: true,
      component: require("@/pages/LatestPage").default,
    },
    {
      path: "/genres",
      name: "genres",
      title: "Thể loại",
      iconName: "apps",
      sidebar: true,
      component: require("@/pages/GenresPage").default,
    },
    {
      path: "/genres/:id",
      name: "dynamic-genres",
      component: require("@/pages/GenresPage/dynamic").default,
    },
    {
      path: "/top",
      name: "top",
      title: "Top 100",
      iconName: "star",
      sidebar: true,
      component: require("@/pages/TopPage").default,
    },
    {
      path: "/album/:id",
      name: "album",
      component: require("@/pages/AlbumPage").default,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});

router.afterEach(writeHistory);

export default router;
