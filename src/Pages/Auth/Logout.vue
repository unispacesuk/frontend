<template></template>

<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import { useUser } from '../../Stores/UserStore';
  import { IUser } from '../../Interfaces/User/IUser';
  import { router } from '../../Router';
  const userStore = useUser();

  onBeforeMount(() => {
    localStorage.removeItem('access-token');
    userStore.user = <IUser>{};
    userStore.connection.websocket.close();
    router.push('/login');
  });
</script>
