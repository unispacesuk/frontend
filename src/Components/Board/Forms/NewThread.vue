<template>
  <form class="px-3 text-center">
    <div class="text-xl py-3">Add a New Thread</div>
    <div class="flex flex-col space-y-2">
      <Input
        placeholder="Thread title"
        @input-change="(v: String) => newThread.title = v"
        ref="reset"
      />
      <!-- replace this with a cool html editor to allow for styling and stuff -->
      <!--      <textarea-->
      <!--        class="border border-slate-300 rounded-md px-5 py-2 outline-none resize-none focus:border-slate-500 shadow-sm"-->
      <!--        rows="10"-->
      <!--        v-model="newThread.content"-->
      <!--        placeholder="Thread content"-->
      <!--      ></textarea>-->
      <Textarea
        @textarea-change="(v: String) => newThread.content = v"
        placeholder="Thread content"
        :height="100"
      />
      <div class="flex justify-end space-x-2">
        <Button @button-click="submit" type="primary" class="flex space-x-2" :disabled="loading">
          <div>Submit</div>
          <Spinner v-if="loading" class="w-5" />
        </Button>
        <Button @button-click="clearForm(true)" type="plain">Clear Form</Button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IThread } from '../../../Interfaces/Board/IThread';
  import Button from '../../Buttons/Button.vue';
  import Input from '../../Form/Input.vue';
  import Textarea from '../../Form/Textarea.vue';
  import Spinner from '../../../Icons/Util/Spinner.vue';

  export default defineComponent({
    name: 'NewThread',
    components: {
      Spinner,
      Textarea,
      Input,
      Button,
    },
    props: ['loading'],
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
    mounted() {
      this.$bus.listen('submit-success', this.clearForm);
    },
    methods: {
      clearForm(click?: boolean) {
        this.newThread = {
          id: 0,
          title: '',
          content: '',
          board: this.$route.params.id,
        };
        this.$bus.emit('input-reset');

        if (click) {
          this.$bus.emit('add-toast', 'Form cleared.');
        }
      },
      submit() {
        this.$emit('submit-form', this.newThread);
        // this.clearForm();
      },
    },
  });
</script>

<style scoped></style>
