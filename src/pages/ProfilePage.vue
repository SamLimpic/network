<template>
  <div class="about row justify-content-center ml-4 mt-md-3 mt-2 mb-5 mr-md-3 mr-4" v-if="activeProfile && peanuts[0] != null && !state.loading">
    <div class="col-12 card shadow p-4">
      <div class="row pb-4 position-relative">
        <div class="col-12">
          <img class="img-banner" :src="activeProfile.coverImg" alt="Profile Banner" v-if="activeProfile.coverImg" />
          <img class="img-banner" :src="peanuts[1].banner" alt="Banner Peanut" v-else />
        </div>
      </div>
      <div class="row justify-content-between m-0 p-0">
        <div class="col-3 img-overlay ">
          <img class="profile-icon icon-border" :src="activeProfile.picture" alt="" />
        </div>
        <div class="col-md-3 col-4 icon-overlay text-muted">
          <div class="row justify-content-end">
            <!-- <div class="col-4" v-if="activeProfile.github"> -->
            <div class="col-4">
              <i class="fab fa-github"></i>
            </div>
            <!-- <div class="col-4" v-if="activeProfile.linkedin"> -->
            <div class="col-4">
              <i class="fab fa-linkedin"></i>
            </div>
            <!-- <div class="col-4" v-if="activeProfile.resume"> -->
            <div class="col-4">
              <i class="far fa-address-book"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
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
  <div class="card shadow p-4 ml-4 mr-3" v-if="activeProfile">
    <div class="row justify-content-between px-3">
      <div class="col-1">
        <img class="small-icon icon-border mt-3" :src="activeProfile.picture" alt="" />
      </div>
      <div class="col-11">
        <div class="form-group form-border ml-4">
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div class="row justify-content-center">
          <div class="col-5 text-left">
            <h4 class="m-0 my-auto">
              <i class="far fa-images text-info"></i> <small>Add Photo</small>
            </h4>
          </div>
          <div class="col-5 text-right">
            <h4>
              <i class="far fa-paper-plane text-info"></i> <small>Post</small>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center ml-2 mr-1" v-if="activePosts[0] != null && !state.loading">
    <div class="col-12">
      <ActivePost v-for="activePost in activePosts" :key="activePost.id" :active-post="activePost" />
    </div>
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
import { profilesService } from '../services/ProfilesService'
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
.form-border {
  border: 4px;
  border-color: var(--info);
  border-style: solid;
  border-radius: 3px
}
</style>
