<template>
  <template v-if="state.loading"> Loading... </template>

  <template v-else-if="state.isPrivate">
    <div class="text-lg text-center">This user's profile is private. :(</div>
  </template>

  <template v-else-if="state.noUserFound">
    <div class="text-lg text-center">No user found with that username.</div>
  </template>

  <template v-else>
    {{ state.user }}
  </template>
</template>

<script setup lang="ts">
  import { reactive, computed, onBeforeMount, inject } from 'vue';
  import { useRoute } from 'vue-router';
  import { getUserPublicProfile } from '../../Services/User/UserService';
  import { IUser } from '../../Interfaces/User/IUser';
  import { IBus } from '../../Interfaces/IBus';

  const route = useRoute();
  const $bus = inject<IBus>('$bus');

  const state = reactive({
    loading: true,
    username: computed(() => route.params.username),
    user: <IUser>{},
    isPrivate: false,
    noUserFound: false,
  });

  onBeforeMount(() => {
    if (typeof state.username === 'string') {
      getUserPublicProfile(state.username)
        .then((data) => {
          state.loading = false;

          if (data.error && data.private) {
            return (state.isPrivate = true);
          }

          if (data.error) {
            return (state.noUserFound = true);
          }

          state.user = data.user;
        })
        .catch(() => {
          $bus?.emit('add-toast', 'Something went wrong.', 'error');
        });
    }
  });
</script>

<style scoped></style>
