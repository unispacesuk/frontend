<template>
  <div class="room-users-list-item" v-for="(user, index) of state.users" :key="index">
    <template v-if="user">
      <div class="left">
        <div class="relative shrink-0">
          <UserAvatar :user="user" size="xs" />
          <div class="status" :class="user.is_online ? 'online' : 'offline'"></div>
        </div>
        <div class="overflow-ellipsis overflow-hidden">
          {{ user.username }}
        </div>
      </div>
      <div
        v-if="currentUser.id !== user._id"
        class="action-delete"
        @click="onRemoveUserClick(user)"
      >
        <XCircleIcon class="w-5" />
      </div>
    </template>
  </div>

  <Modal v-if="state.selectedUser" title="Removing User" @close-modal="onRemoveUserClose">
    <div class="mt-3">
      Are you sure you want to remove <b>{{ state.selectedUser.username }}</b> from the room?
    </div>

    <div class="flex space-x-2 justify-end mt-3">
      <ButtonActionCancel @button-click="onRemoveUserClose" :disabled="state.isRemoving">
        Cancel
      </ButtonActionCancel>
      <ButtonActionPrimary
        @button-click="onClickRemoveUser"
        class="flex space-x-2"
        :disabled="state.isRemoving"
      >
        <div>Remove</div>
        <Spinner v-if="state.isRemoving" class="w-5" />
      </ButtonActionPrimary>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { reactive, computed } from 'vue';
  import { useUser } from '../../Stores/UserStore';
  import { XCircleIcon } from '@heroicons/vue/solid';
  import UserAvatar from '../User/UserAvatar.vue';
  import Modal from '../Modal/Modal.vue';
  import ButtonActionPrimary from '../Buttons/ButtonActionPrimary.vue';
  import ButtonActionCancel from '../Buttons/ButtonActionCancel.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';

  const { currentUser } = useUser();

  const props = defineProps<{
    users: any;
  }>();

  const state = reactive({
    users: computed(() => props.users),
    selectedUser: null,
    isRemoving: false,
  });

  const emits = defineEmits<{
    (event: 'action:remove-user', data: any): void;
  }>();

  function onRemoveUserClick(user: any) {
    return (state.selectedUser = user);
  }

  function onRemoveUserClose() {
    return (state.selectedUser = null);
  }

  function onClickRemoveUser() {
    emits('action:remove-user', state.selectedUser);
    state.selectedUser = null;
  }

  defineExpose({ state, onRemoveUserClick, onRemoveUserClose, onClickRemoveUser });
</script>

<style scoped lang="scss">
  .room-users-list-item {
    @apply flex justify-between items-center mb-3;

    .left {
      @apply flex items-center space-x-2 overflow-hidden;
    }

    .status {
      @apply w-3 h-3 rounded-full absolute bottom-0 right-0 border-2 border-white;
    }
    .online {
      @apply bg-green-500;
    }
    .offline {
      @apply bg-red-500;
    }

    .action-delete {
      @apply text-gray-300 hover:text-gray-400 cursor-pointer;
    }
  }
</style>
