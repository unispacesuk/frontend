<template>
  <div class="w-full bg-slate-100 h-full rounded-md flex flex-col items-center py-6 space-y-3">
    <div>
      <img class="rounded-full" src="https://eu.ui-avatars.com/api/?size=100" alt="avatar" />
    </div>
    <div>
      {{ username }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

interface UserInfoProps {
  username: string;
}

const props = defineProps<UserInfoProps>();
const username = ref<string>(props.username);
</script>
