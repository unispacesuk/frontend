<template>
  <div class="messages-area">
    <div
      class="message-item"
      :class="isOwnMessage(message) ? 'justify-end' : ''"
      v-for="(message, index) of state.messages"
      :key="index"
    >
      <div v-if="isOwnMessage(message)" class="message-row">
        <div class="own">
          <div>{{ message.message }}</div>
          <div class="date">
            <b>{{ message.sender.username }}</b>
            <span class="font-light ml-1.5">
              {{ moment().endOf('minute').to(message.created_at) }}
            </span>
          </div>
        </div>
        <CurrentAvatar class="shrink-0" size="xs" />
      </div>
      <div v-else class="message-row">
        <UserAvatar class="shrink-0" :user="message.sender" size="xs" />
        <div class="other">
          <div>{{ message.message }}</div>
          <div class="date">
            <b>{{ message.sender.username }}</b>
            <span class="font-light ml-1.5">
              {{ moment().endOf('minute').to(message.created_at) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { useUser } from '../../Stores/UserStore';
  import CurrentAvatar from '../User/CurrentAvatar.vue';
  import UserAvatar from '../User/UserAvatar.vue';
  import moment from 'moment';

  const { currentUser } = useUser();

  const props = defineProps<{
    messages: any;
    users: any;
  }>();

  const state = reactive({
    // messages: props.messages,
    messages: computed(() => props.messages),
    users: computed(() => props.users),
  });

  function isOwnMessage(message: any) {
    return message.sender._id === currentUser.id;
  }

  defineExpose({ state, currentUser });
</script>

<style scoped lang="scss">
  .messages-area {
    @apply flex flex-col flex-grow;

    .message-item {
      @apply py-3 flex;

      .message-row {
        @apply flex space-x-2 items-center break-words;

        .own {
          @apply bg-slate-800 text-white px-3 py-2 rounded-md max-w-lg;
        }

        .other {
          @apply bg-gray-100 px-3 p-2 rounded-md max-w-lg;
        }

        .date {
          @apply text-xs mt-2 text-gray-400;
        }
      }
    }
  }
</style>
