<template>
  <div class="row text-center" v-if="state.loading">
    <div class="col">
      <h1><i class="fas fa-spinner fa-spin text-info"></i></h1>
    </div>
  </div>
  <div v-else>
    <div v-if="activePosts[0] != null">
      <ActiveProfile v-for="profile in profiles" :key="profile.id" :profile="profile" />
    </div>
    <div v-if="profiles[0] != null">
      <ActivePost v-for="activePost in activePosts" :key="activePost.id" :active-post="activePost" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'
import { postsService } from '../services/PostsService'
export default {
  name: 'Results',
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true
    })

    onMounted(async() => {
      await profilesService.getProfilesByQuery(route.params.query)
      await postsService.getPostsByQuery(route.params.query)
      state.loading = false
    })
    return {
      state,
      profiles: computed(() => AppState.profiles),
      activePosts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped>

</style>
