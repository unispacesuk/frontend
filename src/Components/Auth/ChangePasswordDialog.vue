<template>
  <Modal title="Change Password">
    <div class="change-password-dialog">
      <Label label="Email Address" class="label" />
      <Input @input-change="onInputChange" />
      <Label
        label="Enter your email to receive a link and update your password."
        class="help-text"
      />

      <div class="buttons-row">
        <ButtonActionPrimary class="flex space-x-2" @button-click="onClickSendEmail">
          <div>Send</div>
          <Spinner class="w-5" v-if="state.isSendingEmail" />
        </ButtonActionPrimary>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { inject, reactive } from 'vue';
  import { changePassword } from '../../Services/Auth/AuthService';
  import { IBus } from '../../Interfaces/IBus';
  import Modal from '../Modal/Modal.vue';
  import Input from '../Form/Input.vue';
  import Label from '../Form/Label.vue';
  import ButtonActionPrimary from '../Buttons/ButtonActionPrimary.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';

  const $bus = inject<IBus>('$bus');

  const state = reactive({
    isSendingEmail: false,
    emailAddress: '',
  });

  function onInputChange(value: string) {
    state.emailAddress = value;
  }

  function onClickSendEmail() {
    state.isSendingEmail = true;

    changePassword({ email: state.emailAddress })
      .then((response) => {
        $bus?.emit('add-toast', response.message, 'success');
        state.isSendingEmail = false;
      })
      .catch((error) => {
        console.error(error);
      });
  }
</script>

<style scoped lang="scss">
  .change-password-dialog {
    @apply flex flex-col mt-3;

    .label {
      @apply text-gray-600;
    }

    .help-text {
      @apply text-gray-600 mt-3 text-sm;
    }

    .buttons-row {
      @apply flex justify-end mt-3;
    }
  }
</style>
