import "./bootstrap";

import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import router from './router'
import store from './store'
import mainStore from './store'
import App from './App.vue'
import Vuex from "vuex";
import VueInputMask from "vue-inputmask";

import vSelect from 'vue-select'

import VueToastr from "@deveodk/vue-toastr";

import ToggleButton from 'vue-js-toggle-button'

import money from 'v-money';

import JsonViewer from 'vue-json-viewer'

// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer)

Vue.use(money, { precision: 2 });

window.axios = axios
Vue.prototype.$http = window.axios;


import VueLoading from 'vuejs-loading-plugin'

// overwrite defaults
Vue.use(VueLoading, {
  dark: false, // default false
  text: '', // default 'Loading'
  loading: false, // default false
  background: 'rgb(255,255,255, 0.68)', // set custom background
  classes: ['loadingOverwrite'] // array, object or string
})

import { VueTables, ServerTable, ClientTable, Event } from "vue-tables-2";

import "../node_modules/@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css";
import "./assets/css/main.css";
import "./assets/auxiliary/fontawesome/css/all.min.css";
import 'vue-select/dist/vue-select.css';
import '../node_modules/moment/moment'

window.moment = require('moment');
moment.locale('pt-br');

import swal from "sweetalert";
Vue.use(ToggleButton);

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'

const translation = {
  count: "Mostrando {from} de {to} até {count} de registros",
  filter: "Pesquisar:",
  filterPlaceholder: "Pesquisar",
  limit: "Registros:",
  noResults: "Nenhum registro encontrado",
  page: "Página:",
  filterBy: "Filtrar por {column}",
  // for dropdown pagination filterBy: 'Filter by {column}',
  // Placeholder for search fields when filtering by column loading:'Loading...',
  // First request to server defaultOption:'Select {column}'
  // default option for list filters }
};

const options = {
  requestFunction: function (data) {
    // data.token = this.$store.getters.token
    return axios
      .get(this.url, {
        params: data,
      })
      .catch(
        function (e) {
          this.dispatch("error", e);
          router.push("/login");
        }.bind(this)
      );
  },
  texts: translation,
  pagination: { chunk: 15, dropdown: false, nav: "scroll" },
  perPage: 10,
  perPageValues: [10, 25, 50, 100],
};

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(ServerTable, options, false, "bootstrap4", "footerPagination");

Vue.use(VueToastr);

Vue.use(VueInputMask.default);

// Composition API
Vue.use(VueCompositionAPI)
Vue.component('v-select', vSelect)

Vue.use(Vuex);

// import core styles
require('@core/scss/core.scss')
require('@core/scss/base/pages/app-chat-list.scss')
require('@core/scss/base/pages/app-chat.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

// export const store = new Vuex.Store(mainStore);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch("initialize");
  },
}).$mount('#app')

Vue.prototype.$message = function (title, msg, type) {
  let newMsg = "";
  if (msg instanceof Object) {
    newMsg += "<ul>";
    for (var key in msg) {
      if (msg.hasOwnProperty(key)) {
        newMsg += "<li>";
        newMsg += msg[key];
        newMsg += "</li>";
      }
    }
    newMsg += "</ul>";
  } else newMsg = msg;

  this.$toastr("add", {
    title: title,
    msg: newMsg,
    clickClose: true,
    timeout: 4000,
    position: "toast-top-right",
    type: type,
  });
};

Vue.prototype.$error = function (error) {
  let errors = error.response ? error.response.data : error;

  if (typeof errors === "object") {
    let html = "<ul>";

    $.each(errors, function (key, value) {
      html += "<li>" + value[0] + "</li>";
    });

    html += "</ul>";

    errors = html;
  }

  this.$message(null, errors, "error");
};