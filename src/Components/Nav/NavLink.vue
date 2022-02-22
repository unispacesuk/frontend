<template>
  <div
    class="flex items-center justify-between hover:transform hover:translate-x-2 ease-in-out duration-150"
    :class="this.$route.fullPath.toLowerCase().includes(name.toLowerCase()) ? 'text-gray-400' : ''"
  >
    <div class="py-2 font-bold">
      {{ name }}
    </div>
    <div>
      <slot></slot>
    </div>
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

    return {
      name,
    };
  },
});
</script>
