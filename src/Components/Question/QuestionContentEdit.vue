<template>
  <div class="flex flex-col space-y-4">
    <div class="flex flex-col">
      <Label label="Title" />
      <Input :input-value="question.title" @input-change="(v) => (newTile = v)" />
    </div>
    <div class="flex flex-col">
      <Label label="Description" />
      <TextEditor
        :content="question.description"
        @update-content="(v) => (newDescription = v)"
      ></TextEditor>
    </div>
    <div class="flex items-center justify-end space-x-2">
      <div class="text-sm text-red-500" v-if="newTile === '' && newDescription === ''">
        {{ error }}
      </div>
      <ButtonActionPrimary class="flex space-x-2" @button-click="doSaveQuestion">
        <div>Save</div>
        <Spinner v-if="saving" class="w-5" />
      </ButtonActionPrimary>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, inject } from 'vue';
  import { IQuestion } from '../../Interfaces/Question/IQuestion';
  import { saveQuestion } from '../../Services/Question/QuestionService';
  import { IBus } from '../../Interfaces/IBus';
  import Spinner from '../../Icons/Util/Spinner.vue';
  import Input from '../Form/Input.vue';
  import Label from '../Form/Label.vue';
  import ButtonActionPrimary from '../Buttons/ButtonActionPrimary.vue';
  import TextEditor from '../Form/TextEditor.vue';

  const props = defineProps<{
    question: IQuestion;
  }>();

  const $bus: IBus | undefined = inject('$bus');
  const newTile = ref<string>('');
  const newDescription = ref<string>('');
  const error = ref<string>('');

  const saving = ref<boolean>(false);

  function doSaveQuestion() {
    saving.value = true;
    if (newTile.value === '' && newDescription.value === '') {
      error.value = "You haven't made any changes.";
      saving.value = false;
      return;
    }

    const data = {
      title: newTile.value!,
      description: newDescription.value!,
    };

    saveQuestion(props.question.id!.toString(), data)
      .then((r) => {
        console.log(r);
        $bus?.emit('question-update-success', r.question);
        $bus?.emit('add-toast', 'Question edited.', 'success');
        saving.value = false;
      })
      .catch((e) => {
        console.log(e.response);
        saving.value = false;
      });
  }
</script>
