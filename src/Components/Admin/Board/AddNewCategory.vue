<template>
  <Transition name="modal">
    <Modal v-if="action" @close-modal="emit('close-modal')">
      <div>
        <div class="text-xl border-b border-gray-200 px-4 pt-1 pb-3">
          {{ action === 'adding' ? 'Adding new category.' : `Editing: ${title}` }}
        </div>
      </div>
      <div class="flex flex-col space-y-5 py-3">
        <div class="flex flex-col space-y-2">
          <Label label="Title" />
          <Input class="w-full" :input-value="props.title" @input-change="(v) => (title = v)" />
        </div>
        <div class="flex flex-col space-y-2">
          <Label label="Description" />
          <Input
            class="w-full"
            :input-value="props.description"
            @input-change="(v) => (description = v)"
          />
        </div>
      </div>

      <div class="flex justify-end mt-3">
        <ButtonActionPrimary class="flex space-x-2" @button-click="submitForm">
          <div>{{ action === 'adding' ? 'Submit' : 'Save' }}</div>
          <Spinner v-if="loading" class="w-5" />
        </ButtonActionPrimary>
      </div>
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { addCategory, editCategory } from '../../../Services/Board/BoardsService';
  import { IBus } from '../../../Interfaces/IBus';
  import Modal from '../../Modal/Modal.vue';
  import Input from '../../Form/Input.vue';
  import Label from '../../Form/Label.vue';
  import Spinner from '../../../Icons/Util/Spinner.vue';
  import ButtonActionPrimary from '../../Buttons/ButtonActionPrimary.vue';

  const props = defineProps<{
    action: string;
    id?: number;
    title?: string;
    description?: string;
  }>();

  const emit = defineEmits<{
    (event: 'close-modal'): void;
  }>();

  const $bus: IBus | undefined = inject('$bus');
  const title = ref<string>(props.title ?? '');
  const description = ref<string>(props.description ?? '');
  const loading = ref<boolean>(false);

  function submitForm() {
    loading.value = true;
    if (!title.value || !description.value) {
      loading.value = false;
      return $bus?.emit('add-toast', 'Enter all details.', 'error');
    }

    if (props.action === 'adding') {
      addCategory({
        title: title.value,
        description: description.value,
      })
        .then((d) => {
          loading.value = false;
          $bus?.emit('refresh-categories');
          emit('close-modal'); // false being the value of show modal... showModal = false
        })
        .catch((e) => {
          if (e.response) {
            const error = e.response.data.error;
            console.log(error);
            $bus?.emit('add-toast', error, 'error');
          }
        });
    }

    // I know I don't need this because it will not get to here if not editing but just to be sure
    if (props.action === 'editing') {
      if (props.title === title.value && props.description === description.value) {
        loading.value = false;
        return $bus?.emit('add-toast', "You haven't made any changes.", 'warning');
      }

      editCategory({
        id: props.id,
        title: title.value,
        description: description.value,
      })
        .then((d) => {
          $bus?.emit('add-toast', 'Category edited.', 'success');
          $bus?.emit('refresh-categories');
          emit('close-modal');
          loading.value = false;
        })
        .catch((e) => {
          if (e.response) {
            const error = e.response.data.error;
            console.log(error);
            $bus?.emit('add-toast', error, 'error');
          }
        });
    }
  }
</script>
