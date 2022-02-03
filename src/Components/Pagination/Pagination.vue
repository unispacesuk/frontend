<template>
  <div class="flex justify-center mt-10">
    <div class="p-2 bg-slate-200 rounded-l-md border-r border-slate-400">
      <Left class="w-6 h-6" />
    </div>
    <div ref="pages" v-for="page of pages" :key="page">
      <div
        class="px-4 py-2 bg-slate-200"
        :class="page !== pages ? 'border-r border-slate-400' : ''"
      >
        {{ page }}
      </div>
    </div>
    <div class="p-2 bg-slate-200 rounded-r-md border-l border-slate-400">
      <Right class="w-6 h-6" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Left from '../../Icons/Arrows/Left.vue';
import Right from '../../Icons/Arrows/Right.vue';

interface PaginationProps {
  pages: number;
}

export default defineComponent({
  name: 'Pagination',
  components: { Right, Left },
  props: ['pages'],
  setup(props: PaginationProps) {
    let pages: number = props.pages;

    return {
      pages,
    };
  },
});
</script>

<style scoped></style>
