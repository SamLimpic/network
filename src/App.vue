<template>
  <div class="row">
    <div class="col-2 d-md-block d-none">
      <Sidebar />
    </div>
    <div class="col-md-10 col-12">
      <header class="row">
        <Navbar />
      </header>
      <main class="row">
        <div class="col-md-9 col-12">
          <router-view />
        </div>
        <div class="col-3 d-md-block d-none">
          <Peanuts />
        </div>
      </main>
    </div>
  </div>
  <footer class="row justify-content-around bg-primary text-light text-center p-3">
    <div class="col-4 text-right mt-1 mb-0">
      <h5><i class="fas fa-angle-left"></i> <i>Newer</i></h5>
    </div>
    <div class="col-4 text-left mt-1 mb-0">
      <h5><i>Older </i><i class="fas fa-angle-right"></i></h5>
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
