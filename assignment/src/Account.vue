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
  </div>
</template>

<script>
    export default {
      data(){
        return{
          error: "",
          errorFlag: false,
          userId: this.$route.params.userId,
          user: []

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

        }
      }
    }
</script>

<style scoped>

</style>
