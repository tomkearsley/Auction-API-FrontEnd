<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>
    <div id="user">
      {{user.givenName}}
      {{user.familyName}} <br>
      Registered Email: {{user.email}} <br>
      Account Balance: {{user.accountBalance}}
    </div>
    <form @submit.prevent="editUser">
      <h3>Edit Details</h3>
      Given Name<input v-model="user_patch.givenName" type="text">
      Family Name<input v-model="user_patch.familyName" type="text">
      <input type="submit" value="Save Changes">
    </form>
    <h3>Auctions</h3>
    <router-link :to="{ name: 'buying' }">
      <input type="button" value="Buying">
    </router-link>
    <router-link :to="{ name: 'selling' }">
      <input type="button" value="Selling">
    </router-link>
    <router-link :to="{ name: 'createAuction' }">
      <input type="button" value="Create New Auction">
    </router-link>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          error: "",
          errorFlag: false,
          userId: this.$route.params.userId,
          user: [],
          user_patch:{
            givenName:"",
            familyName:""
          }

        }
      },
      mounted: function () {
        this.getUser();
      },
      methods: {
        getUser: function(){
          let request = {
            headers: {
              'X-Authorization': localStorage.getItem('token')
            }
          };
          console.log(request);
          this.$http.get(`http://localhost:4941/api/v1/users/${this.userId}`,request)
            .then(function (response) {
              this.user = response.data;
            }, function(error){
              this.error = error;
              this.errorFlag = true;
            });

        },
        editUser:function () {
          this.$http.patch(`http://localhost:4941/api/v1/users/${this.userId}`,this.user_patch,{headers:{'X-Authorization':localStorage.getItem('token')}})
            .then(function (response) {
              location.reload();

            }, function (error) {
                this.error = error;
                this.errorFlag = true;
              });

        }
      }
    }
</script>

<style scoped>

</style>
