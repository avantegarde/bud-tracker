<template>
  <div id="nav">
    <h1>
      <img alt="Bud Tracker" src="@/assets/logo.png">
      <span>Bud Tracker</span>
    </h1>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
#nav {
  display: block;
  width: 100%;
  margin: 0;
  padding: 10px;
  border-bottom: 1px solid #cccccc;
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
@media screen and (max-width: 500px) {
#nav h1 {
  width: 75px;
}
}
</style>