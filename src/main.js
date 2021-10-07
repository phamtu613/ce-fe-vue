import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Notifications from "vue-notification";
import velocity from 'velocity-animate'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import Vuelidate from "vuelidate";
import VModal from 'vue-js-modal'
import VueNumericInput from 'vue-numeric-input';
import VueHtml2pdf from 'vue-html2pdf'
import BackToTop from 'vue-backtotop'
import vuelidateErrorExtractor, { templates } from "vuelidate-error-extractor";
import VueApexCharts from 'vue-apexcharts'


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(CoreuiVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.use(BackToTop);
Vue.use(Notifications, { velocity });
Vue.use(VModal)
Vue.use(VueNumericInput)
Vue.use(VueHtml2pdf)
Vue.use(require('vue-moment'));
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.use(vuelidateErrorExtractor, {
  template: templates.singleErrorExtractor.foundation6,
  messages:
  {
    required: "The field is required",
    email: "The invalid email",
    minLength: 'The field should be at least {min} characters'
  }
});

new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount('#app')
