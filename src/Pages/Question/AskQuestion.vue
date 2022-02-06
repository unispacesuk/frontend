<template>
  <div class="text-2xl p-3">Ask a question</div>
  <AskQuestionForm />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AskQuestionForm from '../../Components/Question/AskQuestionForm.vue';

export default defineComponent({
  name: 'AskQuestion',
  components: { AskQuestionForm },
  beforeMount() {
  },
  beforeUnmount() {
  }
});
</script>
