<template>
  <div class="home">
    <h1>Welcome to Zutto</h1>
    <p>Welcome to your fresh installation of ZuttoZuttoZutto! Make sure that you have a good understanding of the README file before you proceed.</p>
    <p>This site currently has {{ users }} registered users.</p>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    users () {
      return this.$store.state.siteStats.users
    }
  },
  created () {
    return this.$store.dispatch('FETCH_STATS')
  }
}
</script>
