<template>
  <div class="px-3">
    <div class="text-lg mb-4">Questions Table</div>

    <template v-if="state.loading">
      <TableSkeleton />
    </template>
    <template v-else>
      <div class="questions-table">
        <table class="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Asked on</th>
              <th class="text-center">User</th>
              <th class="text-center">Replies</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(question, index) of state.questions" :key="index">
              <td class="flex-shrink-0 overflow-ellipsis">{{ question.title }}</td>
              <td class="flex-shrink overflow-ellipsis">
                {{ new Date(question.createdAt).toDateString() }}
              </td>
              <td class="flex-shrink">{{ question.userId }}</td>
              <td class="flex-shrink">{{ question.answers }}</td>
              <td class="flex-shrink">
                <ButtonActionCancel @button-click="onDeleteQuestion(question.id)">
                  Delete
                </ButtonActionCancel>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';
  import { deleteQuestion, getAllQuestions } from '../../../Services/Question/QuestionService';
  import { IQuestion } from '../../../Interfaces/Question/IQuestion';
  import TableSkeleton from '../../Skeletons/TableSkeleton.vue';
  import ButtonActionCancel from '../../Buttons/ButtonActionCancel.vue';

  const state = reactive({
    loading: true,
    questions: <IQuestion[]>[],
  });

  onBeforeMount(() => {
    getAllQuestions(null)
      .then((data) => {
        state.questions = data.questions;
        state.loading = false;
      })
      .catch(() => {});
  });

  function onDeleteQuestion(id: number) {
    deleteQuestion(id)
      .then(() => {
        state.questions = state.questions.filter((question) => question.id !== id);
      })
      .catch(() => {});
  }

  defineExpose({ state });
</script>

<style scoped lang="scss">
  .questions-table {
    @apply overflow-hidden overflow-x-auto border border-gray-100 rounded;

    .table {
      @apply min-w-full text-sm divide-y divide-gray-200;

      thead {
        tr {
          @apply bg-gray-50;
          th {
            @apply px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap;
          }
        }
      }

      tbody {
        @apply divide-y divide-gray-100;

        tr {
          td {
            @apply px-4 py-2 text-gray-900 whitespace-nowrap;
          }
        }
      }
    }
  }
</style>
