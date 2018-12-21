<template>
  <div>
    <div>click {{$store.state.count}} times, count is {{$store.getters.evenOrOdd}}</div>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementIfOdd">increment if odd</button>
      <button @click="incrementAsync">increment async</button>
    </div>
  </div>
</template>

<script>

  export default {
    
    created () {
      console.log(this.$store)
    },


    methods: {
      increment () {
        this.$store.dispatch('increment')
      },

      decrement () {
        this.$store.dispatch('decrement')
      },

      incrementIfOdd () {
        this.$store.dispatch('incrementIfOdd')
      },

      incrementAsync () {
        this.$store.dispatch('incrementAysnc')
      },
    }
  }

</script>

<style>
</style>