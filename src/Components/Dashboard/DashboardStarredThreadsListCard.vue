<template>
  <div class="card">
    <div class="overflow-hidden">
      <div class="card__title">{{ state.thread.title }}</div>
      <div class="card__date">{{ new Date(state.thread.created_at).toDateString() }}</div>
    </div>
    <div class="actions">
      <ButtonActionSecondary @button-click="onClickVisitThread"> Read </ButtonActionSecondary>
      <ButtonActionCancel @button-click="onClickRemove">
        <TrashIcon class="w-5" />
      </ButtonActionCancel>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { computed, reactive } from 'vue';
  import { starThread } from '../../Services/Board/BoardsService';
  import { TrashIcon } from '@heroicons/vue/solid';
  import ButtonActionCancel from '../Buttons/ButtonActionCancel.vue';
  import ButtonActionSecondary from '../Buttons/ButtonActionSecondary.vue';

  const router = useRouter();

  const props = defineProps<{
    thread: any;
  }>();

  const state = reactive({
    thread: computed(() => props.thread),
  });

  const emits = defineEmits<{
    (event: 'action:remove-thread', data: number): void;
  }>();

  function onClickVisitThread() {
    router.push(`/thread/${state.thread._id}`);
  }

  function onClickRemove() {
    starThread(state.thread._id, 'unstar')
      .then(() => {
        emits('action:remove-thread', state.thread._id);
      })
      .catch(() => {});
  }

  defineExpose({ state, onClickVisitThread, onClickRemove });
</script>

<style scoped lang="scss">
  .card {
    @apply py-3 hover:bg-gray-100 px-3 rounded-md flex items-center justify-between border border-gray-200;

    &__title {
      @apply pr-3 text-lg whitespace-nowrap overflow-hidden overflow-ellipsis;
    }

    &__date {
      @apply text-sm text-gray-500;
    }

    .actions {
      @apply flex space-x-2 shrink-0;
    }
  }
</style>
