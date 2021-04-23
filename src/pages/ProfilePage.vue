<template>
  <div class="about text-center">
    <h1>Welcome {{ activeProfile.name }}</h1>
    <img class="rounded" :src="activeProfile.picture" alt="" />
    <p>{{ activeProfile.email }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Profile',
  setup() {
    return {
      activeProfile: computed(() => AppState.activeProfile)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
