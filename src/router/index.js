import Vue from "vue";
import VueRouter from "vue-router";

import User from "./user";
import Profile from "./profile";
import Product from "./products";
import Company from "./companies";
import Stock from "./stock";
import Type from "./types";
import UnityMeasure from "./unity_measures";
import Dimension from "./dimensions";
import Supplier from "./suppliers";
import PDV from "./pdv";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    User,
    Profile,
    Product,
    Company,
    Stock,
    Type,
    UnityMeasure,
    Dimension,
    Supplier,
    PDV,
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: {
        pageTitle: "Home",
        breadcrumb: [
          {
            text: "Home",
            active: true,
          },
        ],
      },
    },
    {
      path: "/change-company",
      name: "change-company",
      component: () => import("@/views/ChangeCompany.vue"),
      meta: {
        pageTitle: "Alterar Empresa",
        breadcrumb: [
          {
            text: "Alterar Empresa",
            active: true,
          },
        ],
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "/error-404",
      name: "error-404",
      component: () => import("@/views/error/Error404.vue"),
      meta: {
        layout: "full",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const access_nivel = localStorage.getItem("access_nivel");
  const authenticated = localStorage.getItem("token");
  let to_splited = to.path.toString().split("/");
  to_splited = to_splited.filter((part) => part !== "");

  if (
    !authenticated &&
    !["/login"].includes(to.path.toString()) &&
    !["public"].includes(to_splited[0])
  ) {
    next("/login");

    return true;
  }

  if (to.meta.access_nivel) {
    if (!to.meta.access_nivel.includes(access_nivel)) {
      next("/");
    }
  }

  next();
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
