<template>
  <div class="row">
    <div class="col-2 d-md-block d-none">
      <Sidebar />
    </div>
    <div class="col-md-10 col-12">
      <header class="row mb-3">
        <Navbar />
      </header>
      <main class="row">
        <div class="col-md-9 col-12">
          <router-view />
          <EditAccountModal />
        </div>
        <div class="col-3 d-md-block d-none">
          <Peanuts />
        </div>
      </main>
    </div>
  </div>
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
