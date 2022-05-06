<template>
  <div class="resource-sharing-info">
    <div>
      Everyone needs help from time to time, and the best thing to do is ask when you get stuck.
    </div>
    <div>
      Join in and ask questions. Be a good user and answer those that you feel confident to help.
    </div>
    <div>
      More than learning, you can also be a mentor or help other people achieve their goals.
    </div>
  </div>
  <div class="border-4 border-$accent rounded-md w-full lg:w-3/4 xl:w-3/5 mx-auto">
    <img class="rounded-md object-cover w-full" :src="imgAskQuestions" alt="rooms" />
  </div>
</template>

<script setup>
  import imgAskQuestions from '../../Assets/ask-questions.png';
</script>

<style scoped lang="scss">
  .resource-sharing-info {
    @apply mb-5 text-lg font-bold tracking-tight text-$accent;
  }
</style>
