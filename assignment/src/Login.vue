<template>
<div>
  <div id="field">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required>


    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>

    <button type="submit">Login</button>

  </div>
</div>
</template>

<script>
    export default {
        name: "login.vue"
    }
</script>

<style scoped>

</style>
