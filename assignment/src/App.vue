<template>
  <div>
    <div id="navbar">
      <div v-if="loggedIn" id="logout">
        <ul>
          <li><a href="/auctions">Auctions</a></li>
          <li><router-link :to="{name: 'account', params: {userId: userId}}">My Account </router-link></li>
          <li><a v-on:click="logOut()">Logout</a></li>
        </ul>
      </div>
      <div v-else id="logout">
        <ul>
          <li><a href="/auctions">Auctions</a></li>
          <li><router-link :to="{ name: 'login' }">Login</router-link></li>
          <li><router-link :to="{ name: 'sign-up' }">Sign Up</router-link></li>
        </ul>
      </div>
    </div>
    <div id="app">
      <router-view></router-view>
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
            this.$router.push('/');

          }, function(error){
            this.error = error;
            this.errorFlag = true;
            localStorage.clear();
            location.reload();
          });

      }

    }
  }
</script>

<style>
  #navbar{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 0px;
    margin-bottom: 5px;

  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding-left: 10px;
    color: #2c3e50;
    margin-top: 0px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    float: left;
  }



  #login{
    position:absolute;
    top: 5px;
    right: 20px;
  }
  #logout ul{
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;

  }
  #logout li {
    float: left;
  }
  #logout li a{
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  #logout a:hover{
    background-color: #111;
  }
</style>
