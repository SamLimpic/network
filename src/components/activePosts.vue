<template>
  <div class="row justify-content-center card shadow ml-2 mr-1 my-4 px-md-0 px-3 pl-md-3 pl-3 pr-md-0 pr-4 py-3">
    <div class="col-12">
      <div class="row justify-content-start align-items-center py-3">
        <div class="col-md-1 col-4 ">
          <router-link :to="{name: 'Profile', params: { id: activePost.creator.id }}">
            <img class="rounded-circle small-icon icon-border" :src="activePost.creator.picture" alt="">
          </router-link>
        </div>
        <div class="col-md-11 col-8 text-left ">
          <h6 class="m-0">
            <u> {{ (activePost.creator.name).split('@')[0] }} </u>
          </h6>
          <p class="m-0 p-0 text-muted">
            {{ (activePost.createdAt).slice(6, 10) }}
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-11 text-left">
          <h6>{{ activePost.body }}</h6>
        </div>
      </div>
      <div class="row justify-content-end mb-1">
        <div class="col-2 my-auto m-0 p-0">
          <h3 class="m-0 p-0 text-right text-info" v-if="activePost.likeIds[0] != null">
            {{ activePost.likeIds.length }}
          </h3>
        </div>
        <div v-if="account.id !== activePost.creator.id">
          <div class="col-2 my-auto p-0 mr-md-4 mr-0" v-if="(activePost.likeIds).includes(account.id)">
            <button type="button"
                    class="btn"
                    data-toggle="button"
                    aria-pressed="false"
                    autocomplete="off"
                    @click="like(activePost.id)"
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
                    @click="like(activePost.id)"
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
                    @click="edit(account.id)"
            >
              <h2 class="m-0 p-0">
                <i class="fas fa-trash-alt text-info"></i>
              </h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
// import VueTimeago from 'vue-timeago'

export default {
  name: 'ActivePost',
  props: {
    activePost: {
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
      async edit(id) {
        try {
          await postsService.likePost(id)
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
