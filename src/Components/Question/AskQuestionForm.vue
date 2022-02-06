<template>
  <form class="flex flex-col space-y-3" @submit.prevent>
    <div class="flex flex-col">
      <Label label="Title" />
      <Input
        placeholder="please write the question as you would ask to someone else"
        @input-change="(value: String) => newQuestion.title = value"
      />
    </div>

    <div class="flex flex-col">
      <Label label="Description" />
      <Textarea
        placeholder="write the question description here and include as much information as possible"
        rows="10"
        @textarea-change="(value: String) => newQuestion.description = value"
      />
    </div>

    <div class="flex flex-col">
      <Label label="Tags" />
      <Input
        placeholder="all tags must be separated by coma"
        @input-change="(value: String) => tags.value = value"
      />
    </div>

    <div class="flex justify-end space-x-2">
      <ButtonPrimary label="Submit" @button-click="submit" />
      <ButtonPlain label="Clear Form" @button-click="clearForm(true)" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from '../Form/Input.vue';
import Textarea from '../Form/Textarea.vue';
import ButtonPrimary from '../Buttons/ButtonPrimary.vue';
import ButtonPlain from '../Buttons/ButtonPlain.vue';
import Label from '../Form/Label.vue';
import { submitQuestion } from '../../Services/Question/QuestionService';

export default defineComponent({
  name: 'AskQuestionForm',
  components: { Label, Textarea, Input, ButtonPrimary, ButtonPlain },
  emits: ['reset-inputs'],
  data() {
    return {
      newQuestion: {
        title: '',
        description: '',
        tags: {},
      },
      tags: {
        value: '',
      },
    };
  },
  methods: {
    clearForm(click?: boolean) {
      this.newQuestion = {
        title: '',
        description: '',
        tags: {},
      };
      this.tags.value = '';
      this.$bus.emit('input-reset');
      this.$bus.emit('textarea-reset');

      if (click) {
        this.$bus.emit('add-toast', 'Form cleared.');
      }
    },
    async submit() {
      let tagsArray = this.tags.value.split(',');
      tagsArray = tagsArray.map(t => t.trim()).filter(t => t !== '');
      this.newQuestion.tags = tagsArray;

      await submitQuestion(this.newQuestion).then((r) => {
        console.log(r);
        this.clearForm();
        this.$bus.emit('add-toast', 'Question posted.');
        this.$emit('reset-inputs');

        // TODO: redirect to question after adding
        this.$router.push('/questions')
      });
    },
  },
});
</script>
