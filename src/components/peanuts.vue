<template>
  <div class="row w-100 column-height pt-3">
    <div class="col pt-3" v-if="state.peanuts[1]">
      <!-- {{ state.peanuts[0] }} -->
      <img class="img-fluid pb-4" :src="state.peanuts[0].tall" alt="">
      <img class="img-fluid " :src="state.peanuts[1].tall" alt="">
    </div>
  </div>
</template>

<script>
import { peanutsService } from '../services/PeanutsService'
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  name: 'Peanuts',
  setup() {
    const state = reactive({
      peanuts: computed(() => AppState.peanuts)
    })
    onMounted(async() => {
      try {
        await peanutsService.getAllPeanuts()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.column-height {
  min-height: 100%;
}
</style>
