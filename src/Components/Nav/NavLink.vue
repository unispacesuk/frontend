<template>
  <div class="flex justify-between hover:transform hover:translate-x-2 ease-in-out duration-150">
    <div class="py-2 font-bold">
      {{ name }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface LinkProps {
  name: string;
}

export default defineComponent({
  name: 'NavLink',
  props: ['name'],
  setup(props: LinkProps) {
    const name = props.name;

    return {
      name,
    };
  },
});
</script>
