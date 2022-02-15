<template>
  hey there from home <br />
  <button @click="addToast">add toast</button>
  <transition name="modal">
    <Modal v-if="modal" @close-modal="modal = false"> this is some modal content </Modal>
  </transition>
</template>

<script lang="ts">
import { defineComponent, inject, onBeforeMount } from 'vue';
import Layout from '../Layouts/Layout.vue';
import Modal from '../Components/Modal/Modal.vue';
import Toast from '../Components/Toast/Toast.vue';
import Toasts from '../Components/Toast/Toasts.vue';

export default defineComponent({
  name: 'Home',
  components: { Toasts, Toast, Modal, Layout },
  data() {
    return {
      modal: <boolean>false,
      showToast: <boolean>false,
    };
  },
  setup() {
    const $bus: any = inject('$bus');
    onBeforeMount(() => {
      $bus.listen('close-modal');
      $bus.listen('add-toast');
    });
  },
  // beforeMount() {
  //   this.$bus.listen('close-modal', this.handleCloseModal);
  // },
  methods: {
    handleCloseModal() {
      this.modal = false;
    },
    addToast() {
      this.$bus.emit('add-toast', 'random string');
    },
  },
});
</script>
