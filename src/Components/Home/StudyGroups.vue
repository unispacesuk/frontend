<template>
  <div class="study-groups-info">
    <div>Create private rooms and add your study buddies so you can chat and study together.</div>
    <div>You can also create public rooms and allow everyone to be a part of your circle.</div>
  </div>
  <div class="border-4 border-$accent rounded-md w-full lg:w-3/4 xl:w-3/5 mx-auto">
    <img class="rounded-md object-cover w-full" :src="imgStudyGroups" alt="rooms" />
  </div>
</template>

<script setup>
  import imgStudyGroups from '../../Assets/group-rooms.png';
</script>

<style scoped lang="scss">
  .study-groups-info {
    @apply mb-5 text-lg font-bold tracking-tight text-$accent;
  }
</style>
