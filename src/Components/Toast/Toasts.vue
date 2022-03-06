<template>
  <div class="fixed bottom-10 left-10 z-[91]">
    <transition-group name="toast" appear>
      <div v-for="toast in toasts" v-bind:key="toast.id">
        <Toast v-if="toast.id" @close-toast="removeToast(toast.id)" :toast="toast" />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Toast from './Toast.vue';
  import { IToast } from '../../Interfaces/Toast/IToast';

  export default defineComponent({
    name: 'Toasts',
    components: { Toast },
    data() {
      return {
        toasts: <IToast[]>[],
      };
    },
    beforeMount() {
      this.$bus.listen('add-toast', this.addToast);
      // this.$bus.listen('remove-toast', this.removeToast);
    },
    beforeUnmount() {
      this.$bus.forget('add-toast');
    },
    methods: {
      addToast(text: string, type: string) {
        this.toasts.length === 5 ? this.toasts.shift() : '';
        this.toasts.push({
          text: text,
          id: Date.now(),
          type: type ?? 'success',
        });
      },
      removeToast(id: number) {
        this.toasts = this.toasts.filter((t: IToast) => t.id !== id);
      },
    },
  });
</script>
