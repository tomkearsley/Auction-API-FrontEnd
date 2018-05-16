


<template>
  <div v-if="loggedIn">
    Welcome {{user.givenName}}! <br>
    <input type="button" v-on:click="goAuctions()" value="View Auctions"> <br>

  </div>
  <div v-else>
      Home Page
    <input type="button" v-on:click="goAuctions()" value="View Auctions"> <br>
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
      },
      goAuctions: function(){
        this.$router.push('/auctions')
      }
    }
  }
</script>

<style scoped>

</style>
