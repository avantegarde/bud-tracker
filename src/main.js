import Vue from 'vue'
import moment from "moment";
import VueMomentJS from "vue-momentjs";
import App from './App.vue'
Vue.use(VueMomentJS, moment);
//Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Custom CSS
import './assets/style.css'
// Firestore
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
