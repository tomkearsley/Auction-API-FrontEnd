<template>
  <div id="app">
    <router-view></router-view>
    <div id="login">
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
        searchText: ""
      }
    },
    mounted: function () {

    },
    methods: {

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

  table, th, td {
    border: 1px solid black;
  }

  #login{
    position:absolute;
    top: 5px;
    right: 20px;
  }
</style>
