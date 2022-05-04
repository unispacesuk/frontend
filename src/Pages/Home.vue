<template>
  hey there from home hello <br />

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

  <br />
  <br />
  <br />
  <br />
  <br />

  <div class="flex flex-col space-y-2">
    <div>
      <ButtonActionPrimary label="Action Primary"></ButtonActionPrimary>
    </div>
    <div>
      <ButtonActionSecondary label="Action Secondary"></ButtonActionSecondary>
    </div>
    <div>
      <ButtonActionCancel label="Action Cancel"></ButtonActionCancel>
    </div>
  </div>

  <br />
  <br />

  <Toggle :checked="true" />
</template>

<script setup lang="ts">
  import { inject } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../Stores/UserStore';
  import { IBus } from '../Interfaces/IBus';
  import Button from '../Components/Buttons/Button.vue';
  import ButtonActionPrimary from '../Components/Buttons/ButtonActionPrimary.vue';
  import ButtonActionSecondary from '../Components/Buttons/ButtonActionSecondary.vue';
  import ButtonActionCancel from '../Components/Buttons/ButtonActionCancel.vue';
  import Toggle from '../Components/Buttons/Toggle.vue';

  const { connections } = storeToRefs(useUser());
  const $bus = inject<IBus>('$bus');

  // function sendMessage() {
  //   const not = connections.value.find((c) => c.channel === 'real-time');
  //   not!.websocket.sendMessage(JSON.stringify({ type: 'notification', receiver: 1 }));
  // }
</script>
