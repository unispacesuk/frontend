<template>
  <form>
    <div class="flex flex-col space-y-2">
      <div>
        <div class="text-xl ml-5">Add a new Board to {{ category.title }}</div>
      </div>
      <Input placeholder="Board Title" @input-change="setTitle" />
      <Input placeholder="Board Description" @input-change="setDescription" />
      <div>
        <Button @button-click="$emit('submit-board', formBody)" type="primary">Submit</Button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Input from '../../Form/Input.vue';
import { ICategory } from '../../../Interfaces/Board/ICategory';
import Button from '../../Buttons/Button.vue';

export default defineComponent({
  name: 'AddBoard',
  components: { Button, Input },
  props: ['category'],
  emits: ['submit-board'],
  data() {
    return {
      formBody: {
        title: '',
        description: '',
        category: this.category.id,
      },
    };
  },
  setup(props: any) {
    const category: ICategory = props.category;

    return {
      category,
    };
  },
  methods: {
    setTitle(title: string) {
      this.formBody.title = title;
    },
    setDescription(desc: string) {
      this.formBody.description = desc;
    },
  },
});
</script>
