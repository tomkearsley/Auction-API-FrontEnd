<template>
  <div>
    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>
    <div id="user" style="font-size: medium">
      <h1 style="color: mediumblue">User Details</h1>
      <hr>
      Name: {{user.givenName}}
      {{user.familyName}} <br>
      Registered Email: {{user.email}} <br>
      Account Balance: {{user.accountBalance}}
    </div>
    <router-link :to="{ name: 'buying' }">
      <input type="button" value="Buying">
    </router-link>
    <router-link :to="{ name: 'selling' }">
      <input type="button" value="Selling">
    </router-link>
    <router-link :to="{ name: 'createAuction' }">
      <input type="button" value="Create New Auction">
    </router-link>
    <hr>
    <b-form @submit.prevent="editUser">
      <h3>Edit Details</h3>
      <b-form-input v-model="user_patch.givenName"
                    style="max-width: 50rem;"
                    type="text"
                    placeholder="Enter Given Name"
                    required>
      </b-form-input>
      <b-form-input v-model="user_patch.familyName"
                    style="max-width: 50rem;"
                    type="text"
                    required
                    placeholder="Enter Family Name">

      </b-form-input>
      <input type="submit" value="Save Changes">
    </b-form>
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
