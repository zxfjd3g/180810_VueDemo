<template>
  <div>
    <h2>xxxxxxxxx</h2>
    <HelloWorld/>
    <hello-world/>
    <img src="./assets/logo.png" alt="logo" class="logo">
  </div>
</template>
<script>
  import HelloWorld from './components/HelloWorld.vue'
  export default { // name/data/methods/computed/components
    name: "App",
    components: {
      HelloWorld
    }
  }
</script>
<style>
  .logo {
    width: 200px;
    height: 200px;
  }
</style>