import Vue from 'vue';
import './index.scss';
import CartWizard from './CartWizard.vue';

new Vue({
  render: h => h(CartWizard),
}).$mount("#app");
