<template>
  <div v-if="pageStore.loading" class="flex justify-center items-center h-screen">
    <Spinner class="w-10" />
  </div>
  <Layout v-if="!pageStore.loading">
    <router-view :key="$route.fullPath" />
  </Layout>
  <Toasts />
</template>

<script lang="ts">
  import { ref, onBeforeMount, watch } from 'vue';
  import Layout from './Layouts/Layout.vue';
  import Spinner from './Icons/Util/Spinner.vue';
  import Toasts from './Components/Toast/Toasts.vue';
  import { usePage } from './Stores/PageStore';
  import { useUser } from './Stores/UserStore';
  import { storeToRefs } from 'pinia';

  export default {
    name: 'App',
    components: { Toasts, Spinner, Layout },
    setup() {
      const loading = ref<boolean>(true);
      const { user } = storeToRefs(useUser());
      const pageStore = usePage();

      watch(user, () => {
        pageStore.setPageLoading(false);
      });
      // onBeforeMount(() => {
      //   pageStore.setPageLoading(false);
      // });

      return {
        loading,
        pageStore,
        user,
      };
    },
  };
</script>
