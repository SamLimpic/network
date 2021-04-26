<template>
  <div class="about row justify-content-center ml-4 mt-md-3 mt-2 mb-1 mr-md-3 mr-4" v-if="activeProfile && peanuts[0] != null && !state.loading">
    <ActiveProfile />
  </div>
  <CreatePostForm v-if="activeProfile && activeProfile.id === account.id && !state.loading" />
  <div class="row justify-content-center ml-2 mr-1" v-if="activePosts[0] != null && !state.loading">
    <div class="col-12">
      <Post v-for="post in activePosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { postsService } from '../services/PostsService'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'

export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true
    })
    onMounted(async() => {
      try {
        await profilesService.getActiveProfile(route.params.id)
        await profilesService.getPostsByProfileId(route.params.id)
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async createPost() {
        try {
          await postsService.createPost(state.newPost)
          // NOTE reseting to the empty object resets the input fields
          state.newPost = {}
          // REVIEW CLOSING THE MODAL
          // eslint-disable-next-line no-undef
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      activePosts: computed(() => AppState.activePosts),
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile),
      peanuts: computed(() => AppState.peanuts)
    }
  }
}
</script>

<style scoped>
.img-banner {
  width: 100%;
  height: 10rem;
  object-fit: cover;

}
.img-overlay {
    position: absolute;
    top: 10rem;
}
.icon-overlay {
    position: absolute;
    top: 12rem;
    right: 2rem;
    font-size: 2rem;
}
</style>
