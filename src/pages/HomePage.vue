<template>
  <div class="home flex-grow-1 d-flex flex-column ml-2" v-if="state.posts[0] != null">
    <Post v-for="post in state.posts" :key="post.id" :post="post" />
  </div>
  <div class="row text-center" v-else>
    <div class="col">
      <h1><i class="fas fa-spinner fa-spin text-info"></i></h1>
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
      loading: true,
      posts: computed(() => AppState.posts),
      activePosts: [],
      profiles: []
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
      state
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
