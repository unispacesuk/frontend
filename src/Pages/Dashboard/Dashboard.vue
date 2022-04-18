<template>
  <div class="container">
    <div class="container__top">
      <div class="container__top__left">left menu</div>
      <div class="container__top__right">
        <div class="title mb-5">My Account</div>

        <CurrentAvatar size="lg" />

        <div class="title mt-5">User Profile</div>
        <form class="form">
          <div class="form__input">
            <Label class="label" label="Username" />
            <Input placeholder="username" :input-value="currentUser.username" />
          </div>
          <div class="form__input">
            <Label class="label" label="First Name" />
            <Input placeholder="username" :input-value="currentUser.firstName" />
          </div>
          <div class="form__input">
            <Label class="label" label="Last Name" />
            <Input placeholder="username" :input-value="currentUser.lastName" />
          </div>
        </form>

        <div class="title mt-5">Email</div>
        <form class="form">
          <div class="form__input">
            <div>
              <Label class="label" label="Email Address" />
            </div>
            <div class="flex space-x-2">
              <Input
                placeholder="username"
                :input-value="currentUser.email"
                :disabled="!state.isEditingEmail"
              />
              <ButtonActionSecondary label="Change" @button-click="handleEmailEdit" />
            </div>
          </div>
        </form>

        <div class="title mt-5">Password</div>
        <div class="sub-title">
          Change your password if you feel your current one is not secure enough.
        </div>
        <div class="flex">
          <ButtonActionSecondary class="py-10" @button-click="handleUpdatePassword">
            Update Password
          </ButtonActionSecondary>
        </div>
      </div>
    </div>

    <div class="container__bottom">
      <ButtonActionPrimary> Save Changes </ButtonActionPrimary>
    </div>
  </div>

  <!--  <div>-->
  <!--    <DashboardStarredThreadsList />-->
  <!--  </div>-->
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useUser } from '../../Stores/UserStore';
  import DashboardStarredThreadsList from '../../Components/Dashboard/DashboardStarredThreadsList.vue';
  import CurrentAvatar from '../../Components/User/CurrentAvatar.vue';
  import Input from '../../Components/Form/Input.vue';
  import Label from '../../Components/Form/Label.vue';
  import ButtonActionSecondary from '../../Components/Buttons/ButtonActionSecondary.vue';
  import ButtonActionPrimary from '../../Components/Buttons/ButtonActionPrimary.vue';

  const { currentUser } = useUser();

  const state = reactive({
    isEditingEmail: false,
  });

  function handleEmailEdit() {
    state.isEditingEmail = !state.isEditingEmail;
  }

  function handleUpdatePassword() {}

  defineExpose({
    currentUser,
    handleEmailEdit,
  });
</script>

<style scoped lang="scss">
  .container {
    @apply flex flex-col;

    &__top {
      @apply flex;

      &__left {
        @apply w-[150px] flex-shrink-0 border-r mr-2;
      }

      &__right {
        @apply flex-grow px-5 pb-5 border-b border-gray-200;

        .title {
          @apply text-xl font-bold;
        }

        .sub-title {
          @apply text-sm text-gray-600 py-2 px-3;
        }

        .form {
          @apply flex justify-between space-x-2 mt-2;

          &__input {
            @apply flex flex-col flex-grow mb-3;

            .label {
              @apply text-sm text-gray-500;
            }
          }
        }
      }
    }

    &__bottom {
      @apply flex justify-end mt-3;
    }
  }
</style>
