<template>
  <div class="home-page">
    <div class="home-page__top">
      <div class="main-title">Welcome to Unispaces</div>
      <div class="main-subtitle">
        Your source of academic help and the place to find your study buddies.
      </div>
    </div>
    <div v-if="!currentUser.username" class="signup-promo">
      <div class="text">
        Interested in joining? Register an account or go read the best articles that people are
        sharing.
      </div>
      <div class="actions">
        <ButtonActionPrimary @button-click="onRegisterClick"
          >Register an Account</ButtonActionPrimary
        >
        <ButtonActionSecondary @button-click="onVisitBlogsClick"
          >Visit the Blogs</ButtonActionSecondary
        >
      </div>
    </div>
    <div class="offers">
      <div class="title">What do these Spaces have to offer?</div>
      <div class="cards">
        <!-- Study Groups -->
        <div class="cards__item smooth" @click="onCardClick('study-groups')">
          <div class="item-title text-[#FF796A]">Study Groups</div>
        </div>
        <!-- Resource Sharing -->
        <div class="cards__item smooth" @click="onCardClick('resource-sharing')">
          <div class="item-title text-[#00A095]">Share Resources</div>
        </div>
        <!-- Study Groups -->
        <div class="cards__item smooth" @click="onCardClick('ask-questions')">
          <div class="item-title text-[#FF9F23]">Ask Questions</div>
        </div>
        <!-- Study Groups -->
        <div class="cards__item smooth" @click="onCardClick('be-blogger')">
          <div class="item-title text-[#00B6FF]">Be a Blogger</div>
        </div>
      </div>
      <div class="tabs">
        <StudyGroups v-if="state.currentCard === 'study-groups'" />
        <ResourceSharing v-if="state.currentCard === 'resource-sharing'" />
        <AskQuestions v-if="state.currentCard === 'ask-questions'" />
        <BeABlogger v-if="state.currentCard === 'be-blogger'" />
      </div>
    </div>

    <div class="h-32"></div>
  </div>
</template>

<script setup lang="ts">
  import { inject, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUser } from '../Stores/UserStore';
  import { IBus } from '../Interfaces/IBus';
  import ButtonActionPrimary from '../Components/Buttons/ButtonActionPrimary.vue';
  import ButtonActionSecondary from '../Components/Buttons/ButtonActionSecondary.vue';
  import StudyGroups from '../Components/Home/StudyGroups.vue';
  import ResourceSharing from '../Components/Home/ResourceSharing.vue';
  import AskQuestions from '../Components/Home/AskQuestions.vue';
  import BeABlogger from '../Components/Home/BeABlogger.vue';

  const router = useRouter();
  const $bus = inject<IBus>('$bus');
  const { currentUser } = useUser();

  const state = reactive({
    currentCard: 'study-groups',
  });

  function onRegisterClick() {
    return router.push('/register');
  }

  function onVisitBlogsClick() {
    return router.push('/blogs');
  }

  function onCardClick(tab: string) {
    return (state.currentCard = tab);
  }

  defineExpose({ onRegisterClick, onVisitBlogsClick, onCardClick });
</script>

<style scoped lang="scss">
  .home-page {
    @apply text-center;

    &__top {
      @apply flex flex-col space-y-4;
    }

    .main-title {
      @apply text-4xl lg:text-6xl font-extrabold tracking-tight text-$accent text-center mt-10;
    }

    .main-subtitle {
      @apply text-xl lg:text-2xl font-extrabold tracking-tight text-$accent text-center;
    }

    .text {
      @apply text-xl md:px-5 lg:px-16;
    }

    .signup-promo {
      @apply flex flex-col space-y-4 mt-16 border border-gray-200 py-6 rounded-md bg-zinc-100;

      .actions {
        @apply flex space-x-4 justify-center;
      }
    }

    .offers {
      @apply mt-16;

      .title {
        @apply font-bold text-xl tracking-tight text-$accent;
      }

      .cards {
        @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 cursor-pointer;

        &__item {
          @apply px-3 py-5 border border-gray-200 rounded-md hover:bg-$accent hover:shadow-lg;

          .item-title {
            @apply text-lg font-extrabold tracking-tighter;
          }
        }
      }

      .tabs {
        @apply mt-10;
      }
    }
  }
</style>
