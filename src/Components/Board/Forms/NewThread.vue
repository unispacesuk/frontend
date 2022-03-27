<template>
  <form class="px-3">
    <div class="text-xl py-3">Add a New Thread</div>
    <div class="flex flex-col space-y-2">
      <Input
        placeholder="Thread title"
        @input-change="(v: String) => newThreadTitle = v"
        ref="reset"
      />
      <TextEditor @update-content="(v: String) => newThreadContent = v"></TextEditor>
      <div class="flex justify-end space-x-2">
        <ButtonActionSecondary label="Clear Form" @button-click="clearForm"></ButtonActionSecondary>
        <ButtonActionPrimary @button-click="submit" class="flex space-x-2" :disabled="loading">
          <div>Submit</div>
          <Spinner class="w-5" v-if="loading" />
        </ButtonActionPrimary>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { IThread } from '../../../Interfaces/Board/IThread';
  import { IBus } from '../../../Interfaces/IBus';
  import Input from '../../Form/Input.vue';
  import Spinner from '../../../Icons/Util/Spinner.vue';
  import TextEditor from '../../Form/TextEditor.vue';
  import ButtonActionSecondary from '../../Buttons/ButtonActionSecondary.vue';
  import ButtonActionPrimary from '../../Buttons/ButtonActionPrimary.vue';

  const props = defineProps<{
    loading: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'submit-form', body: object): void;
  }>();

  const $route = useRoute();
  const $bus = inject<IBus>('$bus');
  const newThreadTitle = ref<string>('');
  const newThreadContent = ref<string>('');

  $bus?.listen('submit-success', clearForm);

  function submit() {
    if (newThreadTitle.value === '' || newThreadContent.value === '') {
      $bus?.emit('add-toast', 'Please fill up Title and Content.', 'error');
    }

    const body = {
      title: newThreadTitle.value,
      content: newThreadContent.value,
      board: $route.params.boardId,
    };

    emit('submit-form', body);
  }

  function clearForm() {
    $bus?.emit('input-reset');
    $bus?.emit('text-reset-content');
    $bus?.emit('add-toast', 'Form cleared.', 'success');
  }
</script>

<style scoped></style>
