<template>
  <div>
    <form @submit.prevent="createUser">

      <label for="givenName"><b>FirstName</b></label>
      <input type="text" v-model="user.givenName" placeholder="Enter Given First Name" name="givenName" required>

      <label for="lastName"><b>LastName</b></label>
      <input type="text" v-model="user.familyName" placeholder="Enter Given Last Name" name="lastName" required>

      <label for="email"><b>Email</b></label>
      <input type="email" v-model="user.email" placeholder="Enter Email Address" name="email" required>

      <label for="uname"><b>Username</b></label>
      <input type="text" v-model="user.username" placeholder="Enter Username" name="uname" required>


      <label for="psw"><b>Password</b></label>
      <input type="password" v-model="user.password" placeholder="Enter Password" name="psw" required>

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user:{
          username:'',
          givenName:'',
          familyName:'',
          email:'',
          password:''

        },
        error: "",
        errorFlag: false,
        userId:""
      }
    },
    mounted: function () {

    },
    methods: {
      createUser: function(){

        this.$http.post('http://localhost:4941/api/v1/users',this.user)
          .then(function (response) {
            this.userId = response.data;
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
