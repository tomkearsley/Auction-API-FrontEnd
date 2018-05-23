


<template>
  <div v-if="loggedIn">
    <h1>Welcome {{user.givenName}}! </h1><br>
    <img src="https://i.imgur.com/oExDJbt.png">

  </div>
  <div v-else>
    <h1>Home Page</h1>
    <h2>Welcome, use the navbar to either login, signup or view current auctions</h2>
    <img src="https://i.imgur.com/oExDJbt.png">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: "",
        errorFlag: false,
        auctions: [],
        user:[],
        searchText: "",
        loggedIn: false
      }
    },
    mounted: function () {
      this.isLoggedIn();
    },
    methods: {
      isLoggedIn: function(){
        if(localStorage.getItem('token')){
          this.loggedIn = true;
          this.$http.get(`http://localhost:4941/api/v1/users/${localStorage.getItem('user_id')}`,{headers: {'X-Authorization': localStorage.getItem('token')}})
            .then(function (response) {
              this.user = response.data;
            }, function (error) {
                this.error = error;
                this.errorFlag = errorFlag;
              });
        }
      }
    }
  }
</script>

<style scoped>

</style>
