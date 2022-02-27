<template>
  <Transition name="modal">
    <Modal v-if="props.addingCategory" @close-modal="emit('close-modal', false)">
      <div>
        <div class="text-xl border-b border-gray-200 px-4 pt-1 pb-3">Add new category</div>
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
        <Button type="success" @button-click="submitForm" class="flex space-x-2">
          <div>{{ !isEditing ? 'Submit' : 'Save' }}</div>
          <Spinner v-if="loading" class="w-5" />
        </Button>
      </div>
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { addCategory, editCategory } from '../../Services/Board/BoardsService';
  import Button from '../Buttons/Button.vue';
  import Modal from '../Modal/Modal.vue';
  import Input from '../Form/Input.vue';
  import Label from '../Form/Label.vue';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import { IBus } from '../../Interfaces/IBus';

  const props = defineProps<{
    addingCategory: boolean;
    isEditing?: boolean;
    id?: number;
    title?: string;
    description?: string;
  }>();

  const emit = defineEmits<{
    (event: 'close-modal', value: boolean): void;
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

    if (!props.isEditing) {
      addCategory({
        title: title.value,
        description: description.value,
      })
        .then((d) => {
          loading.value = false;
          $bus?.emit('refresh-categories');
          emit('close-modal', false); // false being the value of show modal... showModal = false
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
    if (props.isEditing) {
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
          emit('close-modal', false);
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
