<template>
  <Modal
    title="Update Password"
    v-if="state.isUpdatingPassword"
    @close-modal="handleUpdatePasswordCancel"
  >
    <div class="flex flex-col space-y-4 mt-4">
      <div class="modal_input_row">
        <Label class="label" label="Current Password" />
        <Input
          placeholder="Current password"
          @input-change="handleCurrentPasswordChange"
          type="password"
        />
      </div>
      <div class="modal_input_row">
        <Label class="label" label="New Password" />
        <Input
          placeholder="New password"
          @input-change="handleNewPasswordChange"
          :class="{
            'outline outline-$error/50 focus:outline-$error/50':
              state.newPassword !== state.newPasswordConfirm,
          }"
          type="password"
        />
      </div>
      <div class="modal_input_row">
        <Label class="label" label="Repeat new Password" />
        <Input
          placeholder="Repeat new password"
          @input-change="handleNewPasswordConfirmChange"
          :class="{
            'outline outline-$error/50 focus:outline-$error/50':
              state.newPassword !== state.newPasswordConfirm,
          }"
          type="password"
        />
      </div>

      <!-- hints -->
      <div class="hints" :class="isValidPasswords() ? 'text-green-600' : 'text-red-500'">
        The password must be longer than 8 characters.
      </div>

      <div class="button_row">
        <div>
          <ButtonActionCancel @button-click="handleUpdatePasswordCancel">
            Cancel
          </ButtonActionCancel>
        </div>
        <div>
          <ButtonActionPrimary
            class="w-full"
            @button-click="handleSubmitNewPassword"
            :disabled="!isValidPasswords() || state.currentPassword === ''"
          >
            Update Password
          </ButtonActionPrimary>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { computed, inject, reactive } from 'vue';
  import { updateUserPassword } from '../../Services/User/UserService';
  import { IBus } from '../../Interfaces/IBus';
  import Input from '../../Components/Form/Input.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import Modal from '../../Components/Modal/Modal.vue';
  import Label from '../../Components/Form/Label.vue';
  import ButtonActionCancel from '../../Components/Buttons/ButtonActionCancel.vue';

  const props = defineProps<{
    isUpdatingPassword: boolean;
  }>();

  const emits = defineEmits<{
    (event: 'close-updating-password'): void;
  }>();

  const $bus = inject<IBus>('$bus');
  const state = reactive({
    isUpdatingPassword: computed(() => props.isUpdatingPassword),
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  function handleUpdatePasswordCancel() {
    state.currentPassword = '';
    state.newPassword = '';
    state.newPasswordConfirm = '';
    emits('close-updating-password');
  }

  function handleCurrentPasswordChange(value: string) {
    state.currentPassword = value;
  }

  function handleNewPasswordChange(value: string) {
    state.newPassword = value;
  }

  function handleNewPasswordConfirmChange(value: string) {
    state.newPasswordConfirm = value;
  }

  function handleSubmitNewPassword() {
    const data = {
      currentPassword: state.currentPassword,
      newPassword: state.newPassword,
      newPasswordConfirm: state.newPasswordConfirm,
    };

    updateUserPassword(data)
      .then(() => {
        state.currentPassword = '';
        state.newPassword = '';
        state.newPasswordConfirm = '';
        $bus?.emit('add-toast', 'Password updated successfully.', 'success');
        emits('close-updating-password');
      })
      .catch((error) => {
        // console.error(error.response);
        // state.isUpdatingPassword = false;
        const { response } = error;
        $bus?.emit('add-toast', response.data.error, 'error');
      });
  }

  function isValidPasswords() {
    return state.newPasswordConfirm.length > 8 && state.newPassword === state.newPasswordConfirm;
  }

  defineExpose({
    state,
    handleUpdatePasswordCancel,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleNewPasswordConfirmChange,
    handleSubmitNewPassword,
  });
</script>

<style scoped lang="scss">
  .modal_input_row {
    @apply flex flex-col;

    .label {
      @apply text-sm text-gray-500;
    }
  }

  .hints {
    @apply text-sm;
  }

  .button_row {
    @apply flex justify-end space-x-2;
  }
</style>
