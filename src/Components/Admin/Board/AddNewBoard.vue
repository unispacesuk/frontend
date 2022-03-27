<template>
  <Transition name="modal">
    <Modal v-if="addingBoard" @close-modal="emit('close-modal', false)">
      <div>
        <div class="text-xl border-b border-gray-200 px-4 pt-1 pb-3">Add a new board</div>
      </div>
      <div class="flex flex-col space-y-2 py-5">
        <label for="title" class="pl-3">Title</label>
        <Input id="title" @input-change="(v) => (title = v)" />

        <label for="description" class="pl-3">Description</label>
        <Input id="description" @input-change="(v) => (description = v)" />
      </div>

      <div class="flex justify-end mt-3">
        <ButtonActionPrimary class="flex space-x-2" @button-click="addNewBoard">
          <div>Add</div>
          <Spinner v-if="loading" class="w-5" />
        </ButtonActionPrimary>
      </div>
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { addBoard } from '../../../Services/Board/BoardsService';
  import { IBus } from '../../../Interfaces/IBus';
  import { useCategories } from '../../../Stores/CategoriesStore';
  import Modal from '../../Modal/Modal.vue';
  import Input from '../../Form/Input.vue';
  import Label from '../../Form/Label.vue';
  import Spinner from '../../../Icons/Util/Spinner.vue';
  import ButtonActionPrimary from '../../Buttons/ButtonActionPrimary.vue';

  const categoriesStore = useCategories();

  const props = defineProps<{
    addingBoard: boolean;
    categoryId: number;
  }>();

  const emit = defineEmits<{
    (event: 'close-modal', value: boolean): void;
  }>();

  const $bus = inject<IBus>('$bus');
  const loading = ref<boolean>(false);
  const title = ref<string>('');
  const description = ref<string>('');

  function addNewBoard() {
    if (!props.categoryId) return;

    loading.value = true;
    if (!title.value || !description.value) {
      loading.value = false;
      return $bus?.emit('add-toast', 'Enter all details.', 'error');
    }

    addBoard({
      title: title.value,
      description: description.value,
      category: props.categoryId,
    })
      .then((d) => {
        categoriesStore.updateCategoryBoards(props.categoryId, d.board);
        $bus?.emit('add-toast', 'New board added.', 'success');
        loading.value = false;
        emit('close-modal', false);
      })
      .catch((e) => {
        // if (e.response) {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
        // }
      });
  }
</script>
