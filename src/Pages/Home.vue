<template>
  hey there from home <br />
  <button @click="modal = !modal">open modal</button>
  <Modal v-if="modal"> hi </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '../Layouts/Layout.vue';
import Modal from '../Components/Modal/Modal.vue';

export default defineComponent({
  name: 'Home',
  components: { Modal, Layout },
  data() {
    return {
      modal: <boolean>false,
    };
  },
  beforeMount() {
    this.$bus.subscribe('heythere', this.hey);
  },
  methods: {
    hey(name: any, age: any) {
      console.log(name);
      console.log(age);
    },
  },
});
</script>
