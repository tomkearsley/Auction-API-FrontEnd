import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import Home from './Home.vue';
import Auctions from './Auctions.vue';
import Auction from './Auction.vue';
import Login from './Login'

import SignUp from './SignUp';

import VueRouter from 'vue-router';
Vue.use(VueRouter);



import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.use(BootstrapVue);


Vue.http.options.emulateJSON = true;

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/auctions",
    component: Auctions

  },
  {
    path: "/auctions/:auctionId",
    name: "auction",
    component: Auction
  },
  {
    path:"/users/login",
    name:"login",
    component:Login
  },
  {
    path:"/users",
    name:"sign-up",
    component:SignUp
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
