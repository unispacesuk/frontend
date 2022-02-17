<template>
  <div v-if="loading" class="flex justify-center items-center h-screen">
    <Spinner class="w-10" />
  </div>
  <Layout v-if="!loading">
    <router-view :key="$route.fullPath" />
  </Layout>
  <Toasts />
</template>

<script lang="ts">
import { ref, inject } from 'vue';
import Layout from './Layouts/Layout.vue';
import { useUser } from './Stores/UserStore';
import Spinner from './Icons/Util/Spinner.vue';
import { router } from './Router';
import { IBus } from './Interfaces/IBus';
import Toasts from './Components/Toast/Toasts.vue';

export default {
  name: 'App',
  components: { Toasts, Spinner, Layout },
  setup() {
    const userStore = useUser();
    const loading = ref<boolean>(false);
    const $bus: IBus | any = inject('$bus');

    async function checkAuthed() {
      loading.value = true;
      const authed = await userStore.authenticate();
      if (authed) {
        return (loading.value = false);
      }

      loading.value = false;
      $bus?.emit('add-toast', 'Something went wrong.\nPlease login again.');
      localStorage.removeItem('access-token');
      return router.push('/login');
    }

    return {
      userStore,
      loading,
      checkAuthed,
    };
  },
  async beforeCreate() {
    if (localStorage.getItem('access-token')) {
      await this.checkAuthed();
    }
  },
};
</script>
