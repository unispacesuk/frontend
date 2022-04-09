<template>
  <div v-if="pageStore.loading" class="flex justify-center items-center h-screen">
    <Spinner class="w-10" />
  </div>
  <Layout v-if="!pageStore.loading">
    <router-view :key="$route.fullPath" />
  </Layout>
  <Toasts />
</template>

<script setup lang="ts">
  import { onMounted, ref, inject } from 'vue';
  import { usePage } from './Stores/PageStore';
  import { useUser } from './Stores/UserStore';
  import { storeToRefs } from 'pinia';
  import { IBus } from './Interfaces/IBus';
  import Layout from './Layouts/Layout.vue';
  import Spinner from './Icons/Util/Spinner.vue';
  import Toasts from './Components/Toast/Toasts.vue';

  const loading = ref<boolean>(true);
  const { user, websocket } = storeToRefs(useUser());
  const pageStore = usePage();

  const $bus = inject<IBus>('$bus');

  setTimeout(() => {
    if (user.value.id) {
      $bus?.emit('add-toast', 'Websocket connected.', 'success');
      // $bus?.emit('add-toast', 'Something went wrong when connecting to the Websocket.', 'error');
      // connectWebsocket();
    }
  }, 5000);

  setInterval(() => {
    // if (websocket.value!.readyState === websocket.value!.CLOSED) {
    //   console.log('Websocket is disconnected... attempting to reconnect...');
    //   return connectWebsocket();
    // }
  }, 10000);

  onMounted(() => {
    pageStore.setPageLoading(false);
  });

  function connectWebsocket() {
    websocket.value = new WebSocket('wss://ws.unispaces.test2');
    websocket.value!.onopen = () => {
      websocket.value!.send(JSON.stringify({ type: 'connect', user: user.value.id }));
    };
    websocket.value!.onmessage = (rawData) => {
      const data = JSON.parse(rawData.data);

      if (data.type === 'ping' && data.user === user.value.id) {
        websocket.value!.send(JSON.stringify({ type: 'pong', user: user.value.id }));
      }

      if (data.event === 'notification' && data.user === user.value.id) {
        $bus?.emit('add-toast', data, 'success');
      }
    };
  }
</script>
