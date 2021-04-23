<template>
  <div class="navbar navbar-primary col-12 mx-0 bg-primary">
    <router-link class="" :to="{ name: 'Home' }">
      <div class="col align-items-center text-dark p-2">
        <h1 class="d-md-flex d-none">
          <b> NOT <i class="fas fa-not-equal"></i> WORK </b>
        </h1>
        <div class="row justify-content-between d-md-none d-flex px-4">
          <img class="col-3 w-75 rounded-circle" :src="user.picture" alt="">
          <h1 class="col-3 text-center">
            <b><i class="fas fa-not-equal"></i></b>
          </h1>
          <h1 class="col-3 text-right">
            <b><i class="fas fa-search"></i></b>
          </h1>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Navbar',
  setup() {
    return {
      user: computed(() => AppState.user)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
