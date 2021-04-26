<template>
  <div class="card shadow p-4 ml-4 mr-md-3 mr-4 mt-4" v-if="account">
    <div class="row justify-content-between px-md-3 px-0">
      <div class="col-1">
        <img class="small-icon icon-border mt-3" :src="account.picture" alt="" />
      </div>
      <form class="col-md-11 col-10" @submit.prevent="createPost">
        <div class="form-group form-border ml-4">
          <textarea class="form-control"
                    id="body"
                    rows="3"
                    placeholder="You surely must have something of value to say?"
                    required
                    v-model="state.newPost.body"
          ></textarea>
        </div>
        <div class="row justify-content-around">
          <div class="col-md-5 col-8 text-md-left text-right pl-3">
            <h5>
              <div class="form-group pl-1 bord">
                <div class="input-group">
                  <div class="input-group-prepend pl-md-4 pl-1">
                    <span class="input-group-text bg-white text-info border-info ml-md-4 ml-3" id="basic-addon1"><i class="far fa-images"></i></span>
                  </div>
                  <input type="text" class="form-control" aria-label="Image Url" aria-describedby="basic-addon1" v-model="state.newPost.imgUrl">
                </div>
                <!--
                <div class="input-group-prepend">
                  <span class="input-group-text bg-info text-light" id="img-url"><i class="far fa-images pr-2"></i> <small>Img Url</small></span>
                </div>
                <input type="text"
                       class="form-control"
                       aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-default"
                       v-model="state.newPost.imgUrl"
                >
              </div> -->
              </div>
            </h5>
          </div>
          <div class="col-md-5 col-4 text-md-right text-left pr-md-4 pr-0">
            <button type="submit" class="btn btn-outline-info mr-md-4 mr-5 ml-md-0 ml-1">
              <h5 class="m-0 my-auto">
                <i class="far fa-paper-plane"></i>
              </h5>
            </button>
          </div>
        </div>
        <!-- <div class="row justify-content-center">
          <div class="col-10">
            <div id="demo" class="collapse">
              <h5>
                <div class="form-group pl-3 mt-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-info text-light" id="img-url">Url</span>
                  </div>
                  <input type="text"
                         class="form-control"
                         aria-label="Sizing example input"
                         aria-describedby="inputGroup-sizing-default"
                         v-model="state.newPost.imgUrl"
                  >
                </div>
              </h5>
            </div>
          </div>
        </div> -->
      </form>
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
  name: 'CreatePostForm',
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      newPost: {}
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
          await profilesService.getPostsByProfileId(route.params.id)
          // NOTE reseting to the empty object resets the input fields
          state.newPost = {}
          // REVIEW CLOSING THE MODAL
          // eslint-disable-next-line no-undef
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
.form-border {
  border: 4px;
  border-color: var(--info);
  border-style: solid;
  border-radius: 3px
}
</style>
