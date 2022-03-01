<template>
  hey there from home <br />

  <div class="flex flex-col space-y-2">
    <div>
      <Button type="plain">Plain Button</Button>
    </div>
    <div>
      <Button type="primary">Primary Button</Button>
    </div>
    <div>
      <Button type="success">Success Button</Button>
    </div>
    <div>
      <Button type="error">hey</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Button from '../Components/Buttons/Button.vue';
</script>
