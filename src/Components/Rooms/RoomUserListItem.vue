<template>
  <div class="room-user-list-item">
    <div class="user-info">
      <UserAvatar :user="state.user" size="xs" />
      <div class="flex space-x-2 items-center" v-html="userInfo()"></div>
    </div>

    <div class="actions">
      <ButtonActionSecondary
        v-if="!state.isInvited"
        class="flex space-x-2"
        :disabled="state.isInviting"
        @button-click="onClickInviteUser"
      >
        <div>Invite User</div>
        <Spinner v-if="state.isInviting" class="w-5" />
      </ButtonActionSecondary>
      <CheckCircleIcon v-if="state.isInvited" class="w-5 text-green-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, reactive } from 'vue';
  import { CheckCircleIcon } from '@heroicons/vue/solid';
  import { useRoute } from 'vue-router';
  import { inviteUser } from '../../Services/Rooms/RoomsService';
  import { IBus } from '../../Interfaces/IBus';
  import UserAvatar from '../User/UserAvatar.vue';
  import ButtonActionSecondary from '../Buttons/ButtonActionSecondary.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';

  const { roomId } = useRoute().params;
  const $bus = inject<IBus>('$bus');

  const props = defineProps<{
    user: any;
  }>();

  const state = reactive({
    user: computed(() => props.user),
    isInviting: false,
    isInvited: false,
  });

  function userInfo() {
    return (
      '<div class="font-bold">' +
      state.user.first_name +
      ' ' +
      state.user.last_name +
      '</div> <div class="text-sm italic text-gray-500">&lt;' +
      state.user.username +
      '&gt;</div>'
    );
  }

  function onClickInviteUser() {
    state.isInviting = true;

    inviteUser(<string>roomId, state.user._id)
      .then((data) => {
        state.isInviting = false;
        if (data.error) {
          return $bus?.emit('add-toast', 'This user is already invited.', 'error');
        }
        state.isInvited = true;
      })
      .catch(() => {
        state.isInviting = false;
        // error thingy
      });
  }

  defineExpose({ state, userInfo, onClickInviteUser });
</script>

<style scoped lang="scss">
  .room-user-list-item {
    @apply flex justify-between mt-3 items-center px-3;

    .user-info {
      @apply flex space-x-4 items-center;
    }

    .actions {
      @apply flex space-x-2;
    }
  }
</style>
