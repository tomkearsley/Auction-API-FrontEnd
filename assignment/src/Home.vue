


<template>
  <div v-if="isLoggedIn">
    Welcome {{user.givenName}}! <br>
    <input type="button" value="View Auctions"> <br>
    <input type="button" value="My Account"> <br>

  </div>
  <div v-else>
      Home Page
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
