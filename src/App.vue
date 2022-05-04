<template>
  <div v-if="pageStore.loading" class="flex justify-center items-center h-screen">
    <Spinner class="w-10" />
  </div>
  <template v-if="!pageStore.loading">
    <template v-if="state.currentLayout === 'layout'">
      <Layout>
        <router-view :key="$route.fullPath" />
      </Layout>
    </template>

    <template v-else>
      <ChatLayout>
        <router-view :key="$route.fullPath" />
      </ChatLayout>
    </template>
  </template>
  <Toasts />
</template>

<script setup lang="ts">
  import { onMounted, inject, reactive, computed, onBeforeMount, nextTick } from 'vue';
  import { useRoute } from 'vue-router';
  import { usePage } from './Stores/PageStore';
  import { useUser } from './Stores/UserStore';
  import { storeToRefs } from 'pinia';
  import { IBus } from './Interfaces/IBus';
  import { WebsocketClient } from './Services/Websockets/WebsocketClient';
  import Layout from './Layouts/Layout.vue';
  import ChatLayout from './Layouts/ChatLayout.vue';
  import Spinner from './Icons/Util/Spinner.vue';
  import Toasts from './Components/Toast/Toasts.vue';

  const { user, connections } = storeToRefs(useUser());
  const pageStore = usePage();
  const route = useRoute();

  const $bus = inject<IBus>('$bus');

  // notification event listener
  document.addEventListener('new-notification', (event: any) => {
    const data = event.detail;
    $bus?.emit('add-toast', data.metadata.message, 'success');
  });

  const state = reactive({
    currentLayout: computed(() => pageStore.getPageLayout), // be layout by default
  });

  onMounted(() => {
    pageStore.setPageLoading(false);
  });

  setTimeout(() => {
    if (user.value.id) {
      const newSocketConnection = {
        channel: 'real-time',
        websocket: new WebsocketClient('real-time', 'ws://localhost:3002/real-time', user.value.id),
      };
      connections.value.push(newSocketConnection);
    }
  }, 5000);

  setInterval(() => {
    // if (websocket.value!.readyState === websocket.value!.CLOSED) {
    //   console.log('Websocket is disconnected... attempting to reconnect...');
    //   return connectWebsocket();
    // }
  }, 10000);
</script>
