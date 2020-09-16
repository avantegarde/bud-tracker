<template>
  <div id="nav">
    <h1>
      <img alt="Bud Tracker" src="@/assets/logo.png">
      <span>Bud Tracker</span>
    </h1>
    <div v-if="user.loggedIn">
      <button @click.prevent="signOut" class="signout">Sign Out</button>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import 'firebase/auth';

export default {
  props:['user'],
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        this.user.loggedIn = false;
        localStorage.setItem("budBuddyLoginStatus", this.user.loggedIn);
        this.emitUserStatus(this.user.loggedIn, null);
      });
    },
    emitUserStatus(loggedInStatus, userData){
      this.$emit('catchUserStatus', {
        loggedIn: loggedInStatus,
        data: userData
      })
    }
  }
}
</script>
<style scoped>
#nav {
  display: block;
  width: 100%;
  margin: 0;
  padding: 10px;
  border-bottom: 1px solid #cccccc;
  position: relative;
}
#nav h1 {
  display: block;
  width: 100px;
  height: auto;
  margin: 0 auto;
  padding: 0;
}
#nav h1 span {
  display: none;
}
#nav h1 img {
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
}
button.signout {
  display: inline-block;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  outline: none;
  color: #42b983;
  position: absolute;
  top: 15px;
  right: 15px;
}
button.signout:hover {
  color: #222222;
}
@media screen and (max-width: 500px) {
#nav h1 {
  width: 75px;
}
}
</style>