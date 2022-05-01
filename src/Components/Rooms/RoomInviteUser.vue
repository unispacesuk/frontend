<template>
  <Modal
    class="invite-user-modal"
    title="Invite a new user to your room"
    @close-modal="onCloseModal"
  >
    <div class="form-row">
      <Label label="Name or Username" />
      <Input @input-change="onInputChange" />
    </div>

    <div class="users-list">
      <div v-if="state.users.length" class="space-y-2">
        <div v-for="(user, index) of state.users" :key="index">
          <RoomUserListItem :user="user" />
        </div>
      </div>
      <div v-else>Search for a user.</div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { searchUser } from '../../Services/User/UserService';
  import { debounce } from '../../Services/Util';
  import { useUser } from '../../Stores/UserStore';
  import Modal from '../Modal/Modal.vue';
  import Label from '../Form/Label.vue';
  import Input from '../Form/Input.vue';
  import RoomUserListItem from './RoomUserListItem.vue';

  const { currentUser } = useUser();

  const state = reactive({
    users: [],
  });

  const emits = defineEmits<{
    (event: 'action:close'): void;
  }>();

  const onInputChange = debounce(handleSearch);

  function handleSearch(value: string) {
    if (!value) return (state.users = []);
    searchUser(value)?.then((data) => {
      state.users = data.response.filter((user: any) => user._id !== currentUser.id);
    });
  }

  function onCloseModal() {
    return emits('action:close');
  }

  defineExpose({ state, onInputChange, onCloseModal });
</script>

<style scoped lang="scss">
  .invite-user-modal {
    .form-row {
      @apply flex flex-col;
    }

    .users-list {
      @apply flex flex-col;
    }
  }
</style>
