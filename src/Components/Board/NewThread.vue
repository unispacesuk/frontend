<template>
  <form class="border-t border-slate-300 pt-5 px-3">
    <div class="text-xl">Add a New Thread</div>
    <div class="flex flex-col space-y-2">
      <Input
        placeholder="Thread title"
        @input-change="(value: String) => newThread.title = value"
        ref="reset"
      />
      <textarea
        class="border border-slate-300 rounded-md px-5 py-2 outline-none resize-none"
        rows="10"
        v-model="newThread.content"
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
import { IThread } from '../../Interfaces/IThread';
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
      this.$event.emit('reset');
    },
    submit() {
      this.$emit('submit-form', this.newThread);
      this.clearForm();
    },
  },
});
</script>

<style scoped></style>
