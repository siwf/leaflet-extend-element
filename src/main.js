import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './styles/element-variables.scss';
import '@/styles/index.scss' // global css
import ElementUI from 'element-ui';
import './permission'
import BasicContainer from './components/BasicContainer'
import BasicWrapper from './components/BasicWrapper'
// if (process.env.NODE_ENV === 'development') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.config.productionTip = false;

Vue.component('BasicContainer', BasicContainer)
Vue.component('BasicWrapper', BasicWrapper)
Vue.use(ElementUI, {
  size: 'small'
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app-water');
