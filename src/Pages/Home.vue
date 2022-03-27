<template>
  hey there from home <br />

  <div class="flex flex-col space-y-2">
    <div>
      <Button @button-click="poke" type="plain">Plain Button</Button>
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
  import { inject } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../Stores/UserStore';
  import { IBus } from '../Interfaces/IBus';
  import Button from '../Components/Buttons/Button.vue';

  const { websocket } = storeToRefs(useUser());
  const $bus = inject<IBus>('$bus');

  const msg = {
    event: 'notification',
    type: 'thread_star',
    user: 1,
  };

  function poke() {
    websocket.value!.send(JSON.stringify(msg));
  }
</script>
