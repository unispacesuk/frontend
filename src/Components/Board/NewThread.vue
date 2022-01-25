<template>
  <form class="border-t border-slate-300 px-3 text-center">
    <div class="text-xl py-3">Add a New Thread</div>
    <div class="flex flex-col space-y-2">
      <Input
        placeholder="Thread title"
        @input-change="(value: String) => newThread.title = value"
        ref="reset"
      />
      <!-- replace this with a cool html editor to allow for styling and stuff -->
      <textarea
        class="border border-slate-300 rounded-md px-5 py-2 outline-none resize-none focus:border-slate-500 shadow-sm"
        rows="10"
        v-model="newThread.content"
        placeholder="Thread content"
      ></textarea>
      <div class="flex justify-end space-x-2">
        <ButtonPrimary label="Submit" @button-click="submit" />
        <ButtonPlain label="Clear Form" @button-click="clearForm" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IThread } from '../../Interfaces/Board/IThread';
import ButtonPlain from '../Buttons/ButtonPlain.vue';
import ButtonPrimary from '../Buttons/ButtonPrimary.vue';
import Input from '../Form/Input.vue';

export default defineComponent({
  name: 'NewThread',
  components: {
    Input,
    ButtonPlain,
    ButtonPrimary,
  },
  emits: ['submit-form', 'reset-form'],
  data() {
    return {
      newThread: <IThread>{
        title: '',
        content: '',
        board: this.$route.params.id,
      },
    };
  },
  methods: {
    clearForm() {
      this.newThread = {
        title: '',
        content: '',
        board: this.$route.params.id,
      };
      this.$bus.publish('input-reset');
    },
    submit() {
      this.$emit('submit-form', this.newThread);
      this.clearForm();
    },
  },
});
</script>

<style scoped></style>