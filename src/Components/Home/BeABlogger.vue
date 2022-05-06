<template>
  <div class="resource-sharing-info">
    <div>Want to write articles and share with a large community? We got you covered!</div>
    <div>
      Unispaces also provides a personal blogging platform if you wish to write articles about your
      studies.
    </div>
    <div>You can write and start a discussion with all other members.</div>
  </div>
  <div class="border-4 border-$accent rounded-md w-full lg:w-3/4 xl:w-3/5 mx-auto">
    <img class="rounded-md object-cover w-full" :src="imgBeABlogger" alt="rooms" />
  </div>
</template>

<script setup>
  import imgBeABlogger from '../../Assets/blogger.png';
</script>

<style scoped lang="scss">
  .resource-sharing-info {
    @apply mb-5 text-lg font-bold tracking-tight text-$accent;
  }
</style>
