<template>
  <div class="row px-0">
    <div class="col-2 d-md-flex d-none">
      <Sidebar />
    </div>
    <div class="col-md-8 col-12 px-0">
      <header class="row">
        <Navbar />
      </header>
      <main class="row">
        <router-view />
      </main>
    </div>
    <div class="col-2 d-md-flex d-none">
      <Ads />
    </div>
  </div>
  <footer class="row justify-content-around fixed-bottom bg-primary text-dark text-center p-3">
    <div class="col-4 text-right mt-1 mb-0">
      <h5><i class="fas fa-angle-left"></i><i>Newer</i></h5>
    </div>
    <div class="col-4 text-left mt-1 mb-0">
      <h5><i>Older</i><i class="fas fa-angle-right"></i></h5>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
