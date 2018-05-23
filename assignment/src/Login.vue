<template>
<div>
    <div v-if="errorFlag" style="color: red;">
      {{ error.body }}
    </div>
  <div id="field">
    <form @submit.prevent="validateLogin">
    <label for="uname"><b>Username</b></label>
    <input type="text" v-model="loginRequest" placeholder="Enter Username Or Email" name="uname" required>


    <label for="psw"><b>Password</b></label>
    <input type="password" v-model="user.password" placeholder="Enter Password" name="psw" required>

    <button id= "submit" type="submit">Login</button>
    </form>
  </div>
</div>
</template>

<script>
    export default {
      data() {
        return {
          user: {
            password: ''

          },
          result : [],
          error: "",
          errorFlag: false,
          userId: "",
          token: "",
          loginRequest:""
        }
      }, mounted: function () {

      },
      methods: {

        validateLogin: function(){
          this.user['username'] = this.loginRequest;
          this.user['email'] = this.loginRequest;
          this.$http.post('http://localhost:4941/api/v1/users/login',this.user)
            .then(function (response) {
              this.result = response.data;
              localStorage.setItem('token',this.result.token);
              localStorage.setItem('user_id',this.result.id);
              location.reload();
              this.$router.push('/');
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
