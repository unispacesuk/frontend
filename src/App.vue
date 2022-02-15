<template>
  <Layout>
    <router-view :key="$route.fullPath"/>
  </Layout>
</template>

<script lang="ts">
import Layout from './Layouts/Layout.vue';

export default {
  name: 'App',
  components: { Layout },
  setup() {
  },
};
</script>
