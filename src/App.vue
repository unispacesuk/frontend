<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script lang="ts">
import { provide } from 'vue';
import Layout from './Layouts/Layout.vue';
import { BusService } from './Services/BusService';
const bus = new BusService();

export default {
  name: 'App',
  components: { Layout },
  setup() {
    provide('$bus', bus);
  },
};
</script>
