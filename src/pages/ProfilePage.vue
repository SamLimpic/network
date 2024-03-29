<template>
  <ActiveProfile v-if="activeProfile && peanuts[0] != null && !state.loading" />
  <CreatePostForm v-if="activeProfile && activeProfile.id === account.id && !state.loading" />
  <div class="row justify-content-center ml-2 mr-1" v-if="activePosts[0] != null && !state.loading">
    <div class="col-12">
      <Post v-for="post in activePosts" :key="post.id" :post="post" />
    </div>
  </div>
  <div class="row justify-content-around bg-transparent text-info text-center p-3 mb-4">
    <div class="col-4 text-right mt-1 mb-0">
      <button class="btn btn-outline-info" @click="newerPosts" v-if="state.page > 1">
        <h5 class="p-0 pt-1 my-auto">
          <i class="fas fa-angle-left"></i> <i>Newer</i>
        </h5>
      </button>
      <button class="btn btn-outline-dark" disabled v-else>
        <h5 class="p-0 pt-1 my-auto">
          <i class="fas fa-angle-left"></i> <i>Newer</i>
        </h5>
      </button>
    </div>
    <div class="col-4 text-left mt-1 mb-0">
      <button class="btn btn-outline-info" @click="olderPosts" v-if="activePosts[19] != null">
        <h5 class="p-0 pt-1 my-auto">
          <i>Older </i><i class="fas fa-angle-right"></i>
        </h5>
      </button>
      <button class="btn btn-outline-dark" disabled v-else>
        <h5 class="p-0 pt-1 my-auto">
          <i>Older </i><i class="fas fa-angle-right"></i>
        </h5>
      </button>
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
      loading: true,
      page: 1
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
      async newerPosts() {
        try {
          state.page--
          await postsService.getPostsByPage(state.page)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async olderPosts() {
        try {
          state.page++
          await postsService.getPostsByPage(state.page)
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
