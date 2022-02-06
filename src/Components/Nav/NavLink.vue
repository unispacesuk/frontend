<template>
  <div class="flex justify-between hover:transform hover:translate-x-2 ease-in-out duration-150"
    :class="(this.$route.name === route) ? 'text-gray-400' : ''">
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
  route: string;
}

export default defineComponent({
  name: 'NavLink',
  props: ['name', 'route'],
  setup(props: LinkProps) {
    const name = props.name;
    const key = props.route;

    return {
      name,
      key,
    };
  },
});
</script>
