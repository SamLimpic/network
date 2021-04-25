<template>
  <div class="row w-100 column-height mt-3">
    <div class="col-12" v-if="peanuts[0] != null">
      <!-- {{ peanuts[0] }} -->
      <img class="img-fluid mb-3" :src="peanuts[0].tall" alt="">
      <img class="img-fluid my-3" :src="peanuts[1].tall" alt="">
    </div>
  </div>
</template>

<script>
import { peanutsService } from '../services/PeanutsService'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  name: 'Peanuts',
  setup() {
    onMounted(async() => {
      try {
        await peanutsService.getAllPeanuts()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      peanuts: computed(() => AppState.peanuts)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.column-height {
  min-height: 100vh;
}
</style>
