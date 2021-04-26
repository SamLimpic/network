<template>
  <div class="row column-height card shadow">
    <div class="col-12">
      <button
        class="btn btn-lg btn-outline-info text-uppercase m-4"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        <i class="fas fa-circle-notch fa-spin text-info"></i>
      </button>
      <div class="row text-center" v-else>
        <div class="col-12 mx-0">
          <div class="dropdown text-left px-4 pt-4">
            <button
              class="btn btn-lg btn-outline-info text-uppercase mx-auto"
              @click="state.dropOpen = !state.dropOpen"
            >
              <i class="fas fa-not-equal"></i>
            </button>

            <div
              class="dropdown-menu p-0 list-group mt-2 ml-4"
              :class="{ show: state.dropOpen }"
              @click="state.dropOpen = false"
            >
              <router-link :to="{ name: 'Profile', params: {id: account.id} }" @click="reload(account.id)">
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
          <router-link :to="{ name: 'Profile', params: { id: account.id }}">
            <img class="w-75 rounded-circle profile-icon icon-border m-3 mt-5" :src="account.picture" alt="" @click="reload(account.id)">
          </router-link>
          <div class="text-left pl-4 py-3">
            <p class="text-muted p-1 m-0" v-if="account.class">
              {{ account.class }}
            </p>
            <h4 class="pb-1">
              {{ account.name }}
            </h4>
            <h5 class="pb-1" v-if="account.github">
              <i class="fab fa-github pr-2"></i><small> {{ (account.github).split('/')[3] }} </small>
            </h5>
            <h5 class="pb-1" v-if="account.linkedin">
              <i class="fab fa-linkedin pr-2"></i><small> {{ (account.linkedin).split('/')[4] }} </small>
            </h5>
            <h5 class="pb-1" v-if="account.resume">
              <i class="far fa-address-book pr-2"></i><small> {{ account.resume }} </small>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { profilesService } from '../services/ProfilesService'
export default {
  name: 'Sidebar',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      },
      async reload(id) {
        await profilesService.getActiveProfile(id)
      }
    }
  }
}
</script>

<style scoped>
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
.column-height {
  min-height: 100vh;
}
</style>
