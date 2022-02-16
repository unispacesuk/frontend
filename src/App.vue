<template>
<!--  <div v-if="loading" class="text-5xl text-center">... loading page ...</div>-->
  <Layout>
    <router-view :key="$route.fullPath" />
  </Layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import Layout from './Layouts/Layout.vue';
import { useUser } from './Stores/UserStore';

export default {
  name: 'App',
  components: { Layout },
  setup() {
    const userStore = useUser();
    const loading = ref<boolean>(true);
    return {
      userStore,
      loading,
    };
  },
  async beforeCreate() {
    // await this.userStore.authenticate();
    // setTimeout(() => {
    //   this.loading = false;
    // }, 5000)
  },
};
</script>
