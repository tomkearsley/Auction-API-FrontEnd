<template>
  <div id="app">
    <router-view></router-view>
    <div v-if="loggedIn" id="logout">
      <router-link :to="{name: 'account', params: {userId: userId}}">
        <input type="button" value="My Account">
      </router-link>
      <input type="button" v-on:click="logOut()"  value="Log Out">
    </div>
    <div v-else id="login">
      <router-link :to="{ name: 'login' }">Login</router-link>
      <router-link :to="{ name: 'sign-up' }">Sign Up</router-link>
    </div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        error: "",
        errorFlag: false,
        auctions: [],
        searchText: "",
        loggedIn: false,
        userId:""
      }
    },
    mounted: function () {
      this.isLoggedIn();
    },
    methods: {
      isLoggedIn: function(){
        if(localStorage.getItem('token')){

          this.loggedIn = true;
          this.userId = localStorage.getItem('user_id');
        }
      },
      logOut: function(){
        let request = {
          headers: {
            'X-Authorization': localStorage.getItem('token')
          }
        };
        this.$http.post('http://localhost:4941/api/v1/users/logout',{},request)
          .then(function (response) {
            localStorage.clear();
            location.reload();

          }, function(error){
            this.error = error;
            this.errorFlag = true;
          });

      }

    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }



  #login{
    position:absolute;
    top: 5px;
    right: 20px;
  }
  #logout{
    position:absolute;
    top: 5px;
    right: 20px;
  }
</style>
