<template>
  <div class="w-full flex flex-col text-center">
    <div>
      <router-link to="/">Home</router-link>
    </div>
    <div>
      <router-link to="/boards">Boards</router-link>
    </div>
    <div>
      <router-link to="/questions">Questions</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LeftNav',
});
</script>
