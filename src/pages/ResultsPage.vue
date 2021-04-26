<template>
  <div class="row text-center" v-if="state.loading">
    <div class="col">
      <h1><i class="fas fa-spinner fa-spin text-info"></i></h1>
    </div>
  </div>
  <div class="results row" v-if="!state.loading">
    <div class="col-12" v-if="state.activePosts && !state.loading">
      <div class="row">
        <!-- <ActiveProfile v-for="profile in state.profiles" :key="profile.id" :profile="profile" /> -->
      </div>
      <h1>THIS IS WHERE PROFILES GO</h1>
      <!-- <Post v-for="post in state.activePosts" :key="post.id" :post="post" /> -->
      <h1>THIS IS WHERE POSTS GO</h1>
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
      profiles: computed(() => AppState.profiles),
      activePosts: computed(() => AppState.posts),
      loading: true
    })

    onMounted(async() => {
      await profilesService.getProfilesByQuery(route.params.query)
      await postsService.getPostsByQuery(route.params.query)
      state.loading = false
    })
    return {
      state
    }
  }
}
</script>

<style scoped>

</style>
