<template>
  <div class="card_info">
    <div class="card_info__user_info">
      <div>
        <template v-if="user.avatar">
          <img class="w-[110px] rounded-full" :src="avatarBase + user.avatar" alt="avatar" />
        </template>
        <template v-else>
          <img
            class="w-[110px] rounded-full"
            :src="avatarApi + user.username + '.svg'"
            alt="avatar"
          />
        </template>
      </div>
      <div>{{ user.username }}</div>
      <div>BSc Computer Science</div>
    </div>
    <div class="card_info__reactions">
      <ReactionButton
        :class="{ 'bg-blue-200': state.bigSmile.isVoted }"
        @button-click="handleVote(3)"
      >
        <div>😄</div>
        <div>{{ state.bigSmile.count }}</div>
      </ReactionButton>
      <ReactionButton
        :class="{ 'bg-blue-200': state.heartEyes.isVoted }"
        @button-click="handleVote(4)"
      >
        <div>😍</div>
        <div>{{ state.heartEyes.count }}</div>
      </ReactionButton>
      <ReactionButton :class="{ 'bg-blue-200': state.rofl.isVoted }" @button-click="handleVote(5)">
        <div>🤣</div>
        <div>{{ state.rofl.count }}</div>
      </ReactionButton>
      <ReactionButton
        :class="{ 'bg-blue-200': state.surprised.isVoted }"
        @button-click="handleVote(6)"
      >
        <div>😯</div>
        <div>{{ state.surprised.count }}</div>
      </ReactionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import { voteBlogArticle } from '../../Services/Blog/BlogService';
  import { IBus } from '../../Interfaces/IBus';
  import ReactionButton from '../Buttons/ReactionButton.vue';

  const { currentUser } = storeToRefs(useUser());

  const props = defineProps<{
    articleId: number;
    user: {
      avatar: string;
      username: string;
      firstName: string;
      lastName: string;
    };
    votes: any[];
  }>();

  const voteTypes: any = {
    3: 'bigSmile',
    4: 'heartEyes',
    5: 'rofl',
    6: 'surprised',
  };

  const votes = computed(() => {
    if (props.votes[0] === null) return [];
    return props.votes;
  });

  // TODO: maybe extract and refactor this?
  const state = reactive<any>({
    bigSmile: {
      count: votes.value.filter((vote) => vote.blog_id === props.articleId && vote.vote_type === 3)
        .length,
      isVoted:
        votes.value.filter(
          (vote) =>
            vote.blog_id === props.articleId &&
            vote.user_id === currentUser.value.id &&
            vote.vote_type === 3
        ).length > 0,
    },
    heartEyes: {
      count: votes.value.filter((vote) => vote.blog_id === props.articleId && vote.vote_type === 4)
        .length,
      isVoted:
        votes.value.filter(
          (vote) =>
            vote.blog_id === props.articleId &&
            vote.user_id === currentUser.value.id &&
            vote.vote_type === 4
        ).length > 0,
    },
    rofl: {
      count: votes.value.filter((vote) => vote.blog_id === props.articleId && vote.vote_type === 5)
        .length,
      isVoted:
        votes.value.filter(
          (vote) =>
            vote.blog_id === props.articleId &&
            vote.user_id === currentUser.value.id &&
            vote.vote_type === 5
        ).length > 0,
    },
    surprised: {
      count: votes.value.filter((vote) => vote.blog_id === props.articleId && vote.vote_type === 6)
        .length,
      isVoted:
        votes.value.filter(
          (vote) =>
            vote.blog_id === props.articleId &&
            vote.user_id === currentUser.value.id &&
            vote.vote_type === 6
        ).length > 0,
    },
  });

  const avatarApi = inject('avatarApi');
  const avatarBase = inject('avatarBase');
  const $bus = inject<IBus>('$bus');

  function handleVote(type: number) {
    const voteType: string = voteTypes[type];
    if (state[voteType].isVoted) {
      return;
    }

    voteBlogArticle(props.articleId, { voteType: type })
      .then((res) => {
        state[voteType].count++;
        state[voteType].isVoted = true;
        $bus?.emit('add-toast', 'Voted with success!', 'success');
      })
      .catch((error) => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }
</script>

<style scoped lang="scss">
  .card_info {
    @apply flex flex-col items-center space-y-5 border-r border-gray-200 text-center;

    &__user_info {
      @apply flex flex-col items-center;
    }

    &__reactions {
      @apply grid grid-cols-2 gap-2;
    }
  }
</style>
