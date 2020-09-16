import Vue from 'vue';
import VueRouter from 'vue-router';
// import './index.scss';
import CartWizard from './CartWizard.vue';

new Vue({
  router: new VueRouter({mode: 'history'}),
  render: h => h(CartWizard),
}).$mount("#app");
