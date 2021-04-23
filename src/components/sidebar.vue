<template>
  <nav class="navbar navbar-expand-lg col-12 mx-0">
    <span class="navbar-text">
      <button
        class="btn btn-lg btn-outline-primary text-uppercase mx-auto"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>

      <div class="row justify-content-center" v-else>
        <div class="col-12 pt-5">
          <img class="w-100 rounded-circle px-5 pt-5 pb-2" :src="user.picture" alt="">
          <p v-if="user.class">{{ user.class }}</p>
          <h3>{{ user.name }}</h3>
          <p v-if="user.github"><i class="fab fa-github"></i>{{ user.github }}</p>
          <p v-if="user.linkedin"><i class="fab fa-linkedin"></i>{{ user.linkedin }}</p>
          <p v-if="user.resume"><i class="far fa-address-book"></i>{{ user.resume }}</p>
        </div>
      </div>
    </span>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Sidebar',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
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
</style>
