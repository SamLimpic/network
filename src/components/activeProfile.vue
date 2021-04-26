<template>
  <div class="about row justify-content-center ml-4 mt-md-3 mt-2 mb-1 mr-md-3 mr-4" v-if="activeProfile != null">
    <div class="col-12 card shadow p-0">
      <div class="row pb-4 position-relative">
        <div class="col-12">
          <img class="img-banner" :src="activeProfile.coverImg" alt="Profile Banner" v-if="activeProfile.coverImg" />
          <img class="img-banner" :src="peanuts[1].banner" alt="Banner Peanut" v-else />
        </div>
      </div>
      <div class="p-4">
        <div class="row justify-content-between m-0 p-0">
          <div class="col-3 img-overlay ">
            <img class="profile-icon icon-border" :src="activeProfile.picture" alt="" />
          </div>
          <div class="col-md-3 col-4 icon-overlay text-muted">
            <div class="row justify-content-end">
              <div class="col-4" v-if="activeProfile.github">
                <a class="text-info" :href="activeProfile.github" target="_blank"><i class="fab fa-github"></i></a>
              </div>
              <div class="col-4" v-if="activeProfile.linkedin">
                <a class="text-info" :href="activeProfile.linedkin" target="_blank"><i class="fab fa-linkedin"></i></a>
              </div>
              <div class="col-4" v-if="activeProfile.resume">
                <a class="text-info" :href="activeProfile.resume" target="_blank"><i class="far fa-address-book"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 mt-5 ml-3">
            <h6 class="text-muted p-0 m-0" v-if="activeProfile.class">
              {{ activeProfile.class }}
            </h6>
            <h3> <b>{{ (activeProfile.name).split('@')[0] }}</b> </h3>
            <p class="mr-5 mt-md-3 mt-2 text-muted" v-if="activeProfile.bio">
              <i>
                {{ activeProfile.bio }}
              </i>
            </p>
          </div>
        </div>
        <div class="row justify-content-end" v-if="activeProfile.id === account.id">
          <div class="col text-right">
            <button title="Open Edit Profile Form"
                    type="button"
                    class="btn btn-outline-info"
                    data-toggle="modal"
                    data-target="#edit-account-form"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'

export default {
  name: 'ActiveProfile',
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      newPost: {}
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
    top: 8rem;
}
.icon-overlay {
    position: absolute;
    top: 11rem;
    right: 2rem;
    font-size: 2rem;
}
</style>
