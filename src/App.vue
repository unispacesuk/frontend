<template>
  <Layout>
    <router-view/>
  </Layout>
</template>

<script lang="ts">
import Layout from "./Layouts/Layout.vue";

export default {
  name: "App",
  components: {Layout}
}
</script>