<template>
  <div v-if="loading" class="flex justify-center items-center h-screen">
    <Spinner class="w-10" />
  </div>
  <Layout v-if="!loading">
    <router-view :key="$route.fullPath" />
  </Layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import Layout from './Layouts/Layout.vue';
import { useUser } from './Stores/UserStore';
import Spinner from './Icons/Util/Spinner.vue';
import { router } from './Router';

export default {
  name: 'App',
  components: { Spinner, Layout },
  setup() {
    const userStore = useUser();
    const loading = ref<boolean>(true);

    async function checkAuthed() {
      const authed = await userStore.authenticate();
      if (authed) {
        return loading.value = false;
      }

      return router.push('/login');
    }

    return {
      userStore,
      loading,
      checkAuthed,
    };
  },
  async beforeCreate() {
    await this.checkAuthed();
  },
};
</script>
