<template>
  <div class="about row justify-content-center ml-4 mt-3 mr-3" v-if="activeProfile && peanuts.length > 0 && !state.loading">
    <div class="col-12 card shadow p-4">
      <div class="row pb-4 position-relative">
        <div class="col-12">
          <img class="img-banner" :src="activeProfile.coverImg" alt="Profile Banner" v-if="activeProfile.coverImg" />
          <img class="img-banner" :src="peanuts[0].banner" alt="Banner Peanut" v-else />
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
          <p class="mr-5 mt-3 text-muted" v-if="activeProfile.bio">
            <i>
              {{ activeProfile.bio }}
            </i>
          </p>
        </div>
      </div>
      <div class="row justify-content-end" v-if="activeProfile.id === account.id">
        <div class="col text-right">
          <button type="button" class="btn btn-outline-info">
            Edit
          </button>
        </div>
      </div>
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
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
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
