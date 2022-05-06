<template>
  <div class="resource-sharing-info">
    <div>Have some documents that you wish to quickly upload and share?</div>
    <div>Unispaces gives you unlimited space to save and share documents with your peers.</div>
  </div>
  <div class="border-4 border-$accent rounded-md w-full lg:w-3/4 xl:w-3/5 mx-auto">
    <img class="rounded-md object-cover w-full" :src="imgAskQuestions" alt="rooms" />
  </div>
</template>

<script setup>
  import imgAskQuestions from '../../Assets/resource-sharing.png';
</script>

<style scoped lang="scss">
  .resource-sharing-info {
    @apply mb-5 text-lg font-bold tracking-tight text-$accent;
  }
</style>
