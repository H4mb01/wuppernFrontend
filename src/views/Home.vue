<template>
  <div class="home">
    <h1>Wuppern</h1>
    <h2>DAS Spiel bei dem immer jemand über die Wupper geht!</h2>
    <router-link to="/Wuppern" class="wuppernHome" >Jetzt Spielen!</router-link>
    <br>
    <router-link to="/Help" class="wuppernRegeln" >du kennst Wuppern noch nicht? lies dir hier die Spielregeln durch!</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
  },
};
</script>

<style>
  :root {
    --home-fs: 25px;
  }
</style>
<style scoped>

.wuppernHome{
  font-size: calc(var(--home-fs) * 2);
  color: blue;
  background: yellow;
  padding: var(--home-fs);
  border: 2px solid rgb(255, 208, 0);
  display: inline-block;
  border-radius: calc(var(--home-fs)*.8);
}

.wuppernRegeln{
  font-size: calc(var(--home-fs) * .5);
  color: grey;
}

</style>