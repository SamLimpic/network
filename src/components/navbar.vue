<template>
  <div class="col-12 mx-0 bg-info">
    <div class="row align-items-center">
      <div class="col-12 text-light p-2">
        <div class="row justify-content-between align-items-center d-md-flex d-none ">
          <div class="col-4">
            <router-link :to="{ name: 'Home' }">
              <h1 class="text-light px-3 py-2 my-auto">
                <b> NOT <i class="fas fa-not-equal"></i> WORK </b>
              </h1>
            </router-link>
          </div>
          <div class="col-4">
            <form class="input-group pr-5 my-auto" @submit.prevent="searchSite(state.search)">
              <input type="text"
                     class="form-control text-primary"
                     placeholder="Search"
                     aria-label="Search Field"
                     aria-describedby="button-addon2"
                     v-model="state.search"
              >
              <div class="input-group-append">
                <button class="btn btn-outline-light" type="submit" id="button-addon2">
                  <b><i class="fas fa-search"></i></b>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="row justify-content-around align-items-center d-md-none d-flex px-3 py-2">
          <div class="col-3">
            <div class="dropdown" v-if="user.isAuthenticated">
              <img class="rounded-circle small-icon" :src="account.picture" alt="User Image" @click="state.dropOpen = !state.dropOpen">
              <div
                class="dropdown-menu ml-3 p-0 list-group w-100"
                :class="{ show: state.dropOpen }"
                @click="state.dropOpen = false"
              >
                <router-link :to="{ name: 'Profile', params: {id: account.id} }">
                  <div class="list-group-item list-group-item-action hoverable">
                    Account
                  </div>
                </router-link>
                <div
                  class="list-group-item list-group-item-action hoverable"
                  @click="logout"
                >
                  Logout
                </div>
              </div>
            </div>

            <button
              class="btn btn-lg p-0"
              @click="login"
              v-else
            >
              <h1 class="my-auto p-0">
                <i class="fas fa-circle-notch fa-spin text-light"></i>
              </h1>
            </button>
          </div>
          <div class="col-3">
            <router-link :to="{ name: 'Home' }">
              <h1 class="text-center my-auto">
                <i class="fas fa-not-equal text-light"></i>
              </h1>
            </router-link>
          </div>
          <div class="col-3">
            <h1 class="text-right my-auto">
              <i class="fas fa-search"></i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { postsService } from '../services/PostsService'
// import { profilesService } from '../services/ProfilesService'
import Notification from '../utils/Notification'

export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false,
      search: null
    })
    return {
      state,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      profiles: computed(() => AppState.profiles),
      async login() {
        try {
          AuthService.loginWithPopup()
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async logout() {
        try {
          await AuthService.logout({ returnTo: window.location.origin })
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async searchSite(query) {
        try {
          await postsService.getPostsByQuery(query)
          // await profilesService.getProfilesByQuery(query)
          state.search = null
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
