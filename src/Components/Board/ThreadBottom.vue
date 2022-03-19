<template>
  <div class="container">
    <div class="text-sm text-gray-500">{{ formattedDate() }}</div>
    <div class="flex space-x-2">
      {{ thread.stars }}
      <template v-if="user.username">
        <StarIcon
          @click="onClickHandleStar"
          class="w-5 container__icon container__icon__button smooth"
          :class="{ 'fill-yellow-500': state.isStarred }"
        />
      </template>
      <ShareIcon @click="onClickShare" class="w-5 container__icon container__icon__button smooth" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import { ShareIcon, StarIcon } from '@heroicons/vue/solid';
  import { getStarredState, starThread } from '../../Services/Board/BoardsService';
  import { IThread } from '../../Interfaces/Board/IThread';
  import { IBus } from '../../Interfaces/IBus';

  const props = defineProps<{
    thread: IThread;
  }>();

  const { user } = storeToRefs(useUser());
  const $bus = inject<IBus>('$bus');
  // const isStarred = ref<boolean>(false);
  const state = reactive({
    isStarred: false,
  });

  onBeforeMount(() => {
    if (user.value.username) {
      getStarredState(props.thread.id).then((d) => {
        state.isStarred = d.response;
      });
    }
  });

  // TODO: If this breaks refactor better
  function onClickHandleStar() {
    let action = state.isStarred ? 'unstar' : 'star';
    starThread(props.thread.id, action)
      .then((d) => {
        action === 'star'
          ? (props.thread.stars = +props.thread.stars! + 1)
          : (props.thread.stars = +props.thread.stars! - 1);

        action === 'star' ? (state.isStarred = true) : (state.isStarred = false);

        $bus?.emit(
          'add-toast',
          action === 'star' ? 'Thread starred.' : 'Thread unstarred.',
          'success'
        );
      })
      .catch((e) => {
        console.log(e);
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  function onClickShare() {
    alert('sharing this thread');
  }

  function formattedDate() {
    // @ts-ignore
    return new Date(props.thread.createdAt).toLocaleString();
  }
</script>

<style scoped lang="scss">
  .container {
    @apply w-full px-6 py-3 flex justify-between items-center border-t border-b border-gray-200;

    &__icon {
      @apply text-gray-400 hover:text-gray-800;

      &__button {
        @apply cursor-pointer;
      }
    }
  }
</style>
