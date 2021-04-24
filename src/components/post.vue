<template>
  <div class="row justify-content-center card shadow p-3 m-3">
    <div class="col-12">
      <div class="row justify-content-start align-items-center py-3">
        <div class="col-md-2 col-4">
          <img class="rounded-circle w-md-50 w-100" :src="post.creator.picture" alt="">
        </div>
        <div class="col-md-10 col-8 text-left">
          <h5 class="m-0">
            {{ post.creator.name }}
          </h5>
          <p class="m-0">
            <small><i> {{ post.createdAt }} </i></small>
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-11 text-left">
          <h6>{{ post.body }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style>

</style>
