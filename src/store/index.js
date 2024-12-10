import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import env from '../config/env';
import Router from '../router/'

Vue.use(Vuex)

const baseURL = env.baseURL;
const normalURL = env.normalURL;

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
  },
  strict: process.env.DEV,
  state: {
    user: {
      name: '',
      photo: '',
      company_logo: '',
      company_name: '',
      job: '',
      email: '',
      is_admin: '',
      access_nivel: 0,
      id: 0
    },
    authenticated: false,
    notifications: 0,
    token: '',
    api: baseURL,
    url: normalURL,
    breadcrumbs: [{ name: "Home", route: "/" }]
  },
  getters: {
    token: state => {
      return state.token;
    },
    authenticated: state => {
      if (state.token == null || state.token == 'null') {
        return false;
      }

      return state.authenticated;
    },
    logo: state => {
      return state.logo;
    },
    user: state => {
      return state.user;
    },
    api: state => {
      return state.api;
    },
    breadcrumbs: state => {
      return state.breadcrumbs;
    }
  },
  mutations: {
    auth(state, token) {

      if (token != null && token != undefined) {
        state.authenticated = true;
        state.token = token;

        localStorage.clear();
        localStorage.setItem('token', token);

        axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');
        this.commit('profileUpdate');
      }
    },
    updateNotifications(state, data) {
      state.notifications = Number(state.notifications) + 1;
    },
    profileUpdate(state) {
      axios.post(state.api + 'me', {
        token: state.token
      })
        .then(response => {
          state.user.id = response.data.id;
          state.user.name = response.data.name;
          state.user.email = response.data.email;
          state.user.photo = state.url + "user/image/" + response.data.id;
          state.user.company_logo = state.url + "companies/logo/" + response.data.company_id;
          state.user.company_name = response.data.company_name;
          state.user.company_color = response.data.company_color;
          state.user.company_font_color = response.data.company_font_color;
          state.user.cellphone = response.data.cellphone;
          state.user.access_nivel = response.data.access_nivel;

          localStorage.setItem('accept_terms', response.data.accept_terms);
          localStorage.setItem('access_nivel', response.data.access_nivel);

          axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');

        })
        .catch(error => {
          localStorage.clear();

          Router.push('/login');
        });
    },
    updateBreadCrumbs(state, newRoute) {
      if (state.breadcrumbs.length > 1) {
        state.breadcrumbs.pop();
      }
      state.breadcrumbs.push(newRoute)
      // state.breadcrumbs = newRoute;
    }
  },
  actions: {
    initialize(context) {
      const token = localStorage.getItem('token');
      context.commit('auth', token);
    }
  },
})
