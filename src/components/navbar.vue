<template>
  <div class="col-12 mx-0 bg-primary">
    <router-link class="row align-items-center" :to="{ name: 'Home' }">
      <div class="col-12 text-light p-2">
        <h1 class="d-md-flex d-none px-3 py-2">
          <b> NOT <i class="fas fa-not-equal"></i> WORK </b>
        </h1>
        <div class="row justify-content-around align-items-center d-md-none d-flex px-3 py-2">
          <img class="col-3 rounded-circle" :src="user.picture" alt="User Image">
          <h1 class="col-3 text-center">
            <b><i class="fas fa-not-equal"></i></b>
          </h1>
          <h1 class="col-3 text-center">
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
