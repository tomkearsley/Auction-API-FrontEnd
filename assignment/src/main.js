
import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Auctions from './Auctions.vue';

import  VueRouter from 'vue-router';

import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/auctions",
    component: Auctions

  }
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});


new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
});
