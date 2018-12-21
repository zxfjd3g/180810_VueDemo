<template>
  <div>
    <div>click {{count}} times, count is {{evenOrOdd}}</div>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementIfOdd">increment if odd</button>
      <button @click="incrementAsync">increment async</button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    
    /*computed: {
      count () {
        return this.$store.state.count
      },
      evenOrOdd () {
        return this.$store.getters.evenOrOdd
      }
    },*/

    computed: {
      ...mapState(['count']),   // {count () {return this.$store.state.count}}
      ...mapGetters(['evenOrOdd']), // {evenOrOdd () {return this.$store.getters.evenOrOdd}}
    },


    /*methods: {
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
    }*/

    methods: {
      ...mapActions(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync'])
    }
  }

</script>

<style>
</style>