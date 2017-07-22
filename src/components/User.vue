<template>
  <div class="profile" v-if="profile">
    <h1>Profile</h1>
    <p>This is the profile of {{ profile.username }}.</p>
  </div>
</template>

<script>
export default {
  name: 'profile',
  computed: {
    profile () {
      return this.$store.state.userProfiles[1]
    }
  },
  created () {
    return this.$store.dispatch('FETCH_USER_PROFILE')
  }
}
</script>
