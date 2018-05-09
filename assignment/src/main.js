
import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Auctions from './Auctions.vue';
import Auction from './Auction.vue';
import Login from './Login'

import VueRouter from 'vue-router';
Vue.use(VueRouter);



import VueResource from 'vue-resource';
Vue.use(VueResource);


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
