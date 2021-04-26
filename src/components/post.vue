<template>
  <div class="row justify-content-center card shadow px-md-0 px-3 pl-md-3 pl-3 pr-md-0 pr-4 py-3 m-1 my-4 mr-0" v-if="post != null">
    <div class="col-12">
      <div class="row justify-content-start align-items-center py-3">
        <div class="col-md-1 col-4 ">
          <router-link :to="{name: 'Profile', params: { id: post.creator.id }}">
            <img class="rounded-circle small-icon icon-border" :src="post.creator.picture" alt="">
          </router-link>
        </div>
        <div class="col-md-11 col-8 text-left ">
          <h6 class="m-0">
            <u> {{ (post.creator.name).split('@')[0] }} </u>
          </h6>
          <p class="m-0 p-0 text-muted">
            {{ (post.createdAt).slice(6, 10) }}
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-11 text-left">
          <h6>{{ post.body }}</h6>
        </div>
      </div>
      <div class="row justify-content-end mb-1">
        <div class="col-2 my-auto m-0 p-0">
          <h3 class="m-0 p-0 text-right text-info" v-if="post.likeIds[0] != null">
            {{ post.likeIds.length }}
          </h3>
        </div>
        <div v-if="account.id !== post.creator.id">
          <div class="col-2 my-auto p-0 mr-md-4 mr-0" v-if="(post.likeIds).includes(account.id)">
            <button type="button"
                    class="btn"
                    data-toggle="button"
                    aria-pressed="false"
                    autocomplete="off"
                    @click="like(post.id)"
            >
              <h2 class="m-0 p-0">
                <i class="fas fa-heart text-info"></i>
              </h2>
            </button>
          </div>
          <div class="col-2 my-auto p-0 mr-md-4 mr-0" v-else>
            <button type="button"
                    class="btn"
                    data-toggle="button"
                    aria-pressed="false"
                    autocomplete="off"
                    @click="like(post.id)"
            >
              <h2 class="m-0 p-0">
                <i class="far fa-heart text-info"></i>
              </h2>
            </button>
          </div>
        </div>
        <div v-else>
          <div class="col-2 my-auto p-0 mr-md-4 mr-0">
            <button type="button"
                    class="btn"
                    data-toggle="button"
                    aria-pressed="false"
                    autocomplete="off"
                    @click="deletePost(post.id)"
            >
              <h2 class="m-0 p-0">
                <i class="fas fa-trash-alt text-info"></i>
              </h2>
            </button>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-if="post.imgUrl">
        <div class="col-12 p-md-2 p-0">
          <img class="w-100 pr-md-4 pr-0 pl-2 py-2" :src="post.imgUrl" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'

// import VueTimeago from 'vue-timeago'

export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup() {
    // Vue.use(VueTimeago, {
    //   name: 'Timeago',
    //   locale: 'en',
    //   locales: {
    //     'zh-CN': require('date-fns/locale/zh_cn'),
    //     ja: require('date-fns/locale/ja')
    //   }
    // })
    return {
      async like(id) {
        try {
          await postsService.likePost(id)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async deletePost(id) {
        try {
          await postsService.deletePost(id)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style>

</style>
