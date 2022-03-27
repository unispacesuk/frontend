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
      <TextEditor @update-content="(value: String) => newQuestion.description = value"></TextEditor>
    </div>

    <div class="flex flex-col">
      <Label label="Tags" />
      <Input
        placeholder="all tags must be separated by coma"
        @input-change="(value: String) => tags.value = value"
      />
    </div>

    <div class="flex justify-end space-x-2">
      <ButtonActionSecondary
        label="Clear Form"
        @button-click="clearForm(true)"
      ></ButtonActionSecondary>
      <ButtonActionPrimary class="flex space-x-2" @button-click="submit">
        <div>Submit</div>
        <Spinner v-if="loading" class="w-5" />
      </ButtonActionPrimary>
    </div>
  </form>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Input from '../Form/Input.vue';
  import Textarea from '../Form/Textarea.vue';
  import Button from '../Buttons/Button.vue';
  import Label from '../Form/Label.vue';
  import { submitQuestion } from '../../Services/Question/QuestionService';
  import { Spinner } from '../../Icons';
  import ButtonActionPrimary from '../Buttons/ButtonActionPrimary.vue';
  import ButtonActionSecondary from '../Buttons/ButtonActionSecondary.vue';
  import TextEditor from '../Form/TextEditor.vue';

  export default defineComponent({
    name: 'AskQuestionForm',
    components: {
      TextEditor,
      ButtonActionSecondary,
      ButtonActionPrimary,
      Label,
      Textarea,
      Input,
      Button,
      Spinner,
    },
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
        loading: false,
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
        // this.$bus.emit('textarea-reset');
        this.$bus.emit('text-reset-content');

        if (click) {
          this.$bus.emit('add-toast', 'Form cleared.');
        }
      },
      async submit() {
        this.loading = true;

        // TODO: This has to be refactored to be separate and show custom error messages
        for (const el in this.newQuestion) {
          // @ts-ignore -> this will come out on refactor
          if (this.newQuestion[el] === '' || this.tags.value === '') {
            this.loading = false;
            return this.$bus.emit('add-toast', 'Enter all details.');
          }
        }

        let tagsArray = this.tags.value.split(',');
        tagsArray = tagsArray.map((t) => t.trim()).filter((t) => t !== '');
        this.newQuestion.tags = tagsArray;

        await submitQuestion(this.newQuestion)
          .then((r) => {
            this.clearForm();
            this.$bus.emit('add-toast', 'Question posted.');
            this.$emit('reset-inputs');

            // TODO: redirect to question after adding
            this.$router.push('/questions');
            this.loading = false;
          })
          .catch((e) => {
            if (e.response) {
              console.log(e.response);
            }
          });
      },
    },
  });
</script>
