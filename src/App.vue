<template>
<div id="app">
  <!--
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/Help">Hilfe</router-link> |
    <router-link to="/Wuppern">Wuppern</router-link>
  </div>
  -->
  <router-view />
</div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>

:root {
  --bg-clr: #eee;
  --txt-clr: #2c3e50;
}

body {
  background: +eee;
  background: var(--bg-clr);
  margin: 0;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  color: var(--txt-clr);
}

#nav {
  position: absolute;
  padding: 5px;
  max-height: 5vh;
  z-index: 9999;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
