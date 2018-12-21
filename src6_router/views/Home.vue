<template>
  <div>
    <h2>Home</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link to="/home/news">News</router-link>
        </li>
        <li>
          <router-link to="/home/messages">Messages</router-link>
        </li>
      </ul>
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>

</style>