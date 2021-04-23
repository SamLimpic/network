<template>
  <div class="results text-center">
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      profiles: computed(() => AppState.profiles),
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
