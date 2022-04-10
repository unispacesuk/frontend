<template>
  <div class="form">
    <CurrentAvatar size="xs" />
    <Input
      class="w-full"
      placeholder="Comment..."
      @input-change="handleInputUpdate"
      :input-value="state.newComment"
    />
    <ButtonActionSecondary
      class="flex space-x-2"
      :disabled="state.isSubmitting"
      @button-click="handleSubmit"
    >
      <div>Submit</div>
      <Spinner v-if="state.isSubmitting" class="w-5" />
    </ButtonActionSecondary>
  </div>
</template>

<script setup lang="ts">
  import { inject, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import { submitNewComment } from '../../Services/Blog/BlogService';
  import { IBus } from '../../Interfaces/IBus';
  import Input from '../Form/Input.vue';
  import CurrentAvatar from '../User/CurrentAvatar.vue';
  import ButtonActionSecondary from '../Buttons/ButtonActionSecondary.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';

  const { currentUser } = storeToRefs(useUser());
  const { articleId } = useRoute().params;
  const $bus = inject<IBus>('$bus');

  const emits = defineEmits<{
    (event: 'submit-comment', data: any): void;
  }>();

  const state = reactive({
    isSubmitting: false,
    newComment: '',
  });

  function handleInputUpdate(value: string) {
    state.newComment = value;
  }

  async function handleSubmit() {
    if (!state.newComment) {
      return console.log('comment is empty....');
    }
    state.isSubmitting = true;

    // +variable converts to number.
    try {
      const { response } = await submitNewComment(+articleId, { content: state.newComment });
      state.isSubmitting = false;
      emits('submit-comment', {
        username: currentUser.value.username,
        avatar: currentUser.value.avatar,
        comment: response,
      });
      $bus?.emit('input-reset');
      $bus?.emit('add-toast', 'New comment added.', 'success');
    } catch (error) {
      state.isSubmitting = false;
      $bus?.emit('add-toast', 'Something went wrong.', 'error');
    }
  }
</script>

<style scoped lang="scss">
  .form {
    @apply flex space-x-2 items-center px-5;
  }
</style>
