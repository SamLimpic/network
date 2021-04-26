<template>
  <!-- <div v-if="profiles[0] != null">
    <ActiveProfile v-for="profile in profiles" :key="profile.id" :profile="profile" />
  </div> -->
  <div class="home flex-grow-1 d-flex flex-column ml-2" v-if="state.posts[0] != null">
    <Post v-for="post in state.posts" :key="post.id" :post="post" />
  </div>
  <div class="row text-center" v-else>
    <div class="col">
      <h1><i class="fas fa-spinner fa-spin text-info"></i></h1>
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
      <button class="btn btn-outline-info" @click="olderPosts" v-if="state.posts[19] != null">
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
import { postsService } from '../services/PostsService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      page: 1,
      loading: true,
      posts: computed(() => AppState.posts)
    })

    // This fires everytime this component is rendered to the Dom
    // similar to how we were using the 'constructor' of the controllers in MVC
    onMounted(async() => {
      try {
        await postsService.getAllPosts()
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })

    return {
      state,
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
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
