<template>
  <div class="md:border-l border-gray-200 max-h-[600px] overflow-y-scroll px-3">
    <div class="py-3 flex" v-for="message of messages">
      <div>
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useUser } from '../../Stores/UserStore';

  const { currentUser } = useUser();

  const messages = [
    {
      user_id: 1,
      message: 'hello world',
    },
    {
      user_id: 1,
      message: 'hello world',
    },
    {
      user_id: 1,
      message: 'hello world',
    },
    {
      user_id: 1,
      message: 'hello world',
    },
    {
      user_id: 2,
      message: 'hello world',
    },
    {
      user_id: 2,
      message: 'hello world',
    },
    {
      user_id: 2,
      message: 'hello world',
    },
    {
      user_id: 2,
      message: 'hello world',
    },
    {
      user_id: 3,
      message: 'hello world',
    },
    {
      user_id: 3,
      message: 'hello world',
    },
    {
      user_id: 3,
      message: 'hello world',
    },
    {
      user_id: 3,
      message: 'hello world',
    },
    {
      user_id: 1,
      message: 'hello world',
    },
    {
      user_id: 1,
      message: 'hello world',
    },
    {
      user_id: 1,
      message: 'hello world',
    },
  ];
  const state = reactive({});

  defineExpose({ state });
</script>

<style scoped lang="scss"></style>
