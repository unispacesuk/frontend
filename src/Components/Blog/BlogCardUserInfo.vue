<template>
  <div class="card_info">
    <div class="card_info__user_info">
      <div>
        <UserAvatar :user="user" size="lg" />
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
  import { inject, reactive } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUser } from '../../Stores/UserStore';
  import { calculateVotes, isVoted, voteBlogArticle } from '../../Services/Blog/BlogService';
  import { IBus } from '../../Interfaces/IBus';
  import ReactionButton from '../Buttons/ReactionButton.vue';
  import UserAvatar from '../User/UserAvatar.vue';

  const { currentUser, connections } = storeToRefs(useUser());

  const props = defineProps<{
    articleId: number;
    user: {
      avatar: string;
      username: string;
      firstName: string;
      lastName: string;
    };
    votes: any[];
    userId: number;
  }>();

  const voteTypes: any = {
    3: 'bigSmile',
    4: 'heartEyes',
    5: 'rofl',
    6: 'surprised',
  };

  const state = reactive<any>({
    bigSmile: {
      count: calculateVotes(props.votes, 3, props.articleId),
      isVoted: isVoted(props.votes, 3, props.articleId, currentUser.value.id),
    },
    heartEyes: {
      count: calculateVotes(props.votes, 4, props.articleId),
      isVoted: isVoted(props.votes, 4, props.articleId, currentUser.value.id),
    },
    rofl: {
      count: calculateVotes(props.votes, 5, props.articleId),
      isVoted: isVoted(props.votes, 5, props.articleId, currentUser.value.id),
    },
    surprised: {
      count: calculateVotes(props.votes, 6, props.articleId),
      isVoted: isVoted(props.votes, 6, props.articleId, currentUser.value.id),
    },
  });

  const $bus = inject<IBus>('$bus');

  function handleVote(type: number) {
    const voteType: string = voteTypes[type];
    if (state[voteType].isVoted) {
      return;
    }

    voteBlogArticle(props.articleId, { voteType: type })
      .then(() => {
        state[voteType].count++;
        state[voteType].isVoted = true;
        $bus?.emit('add-toast', 'Voted with success!', 'success');

        if (currentUser.value.id === props.userId) return;
        sendLiveNotification();
      })
      .catch(() => {
        $bus?.emit('add-toast', 'Something went wrong.', 'error');
      });
  }

  function sendLiveNotification() {
    const realTime = connections.value.find((c) => c.channel === 'real-time');
    realTime!.websocket.sendMessage(
      JSON.stringify({
        type: 'notification',
        metadata: {
          type: 'article_reacted',
          message: 'Someone reacted to one of your blog articles.',
          receiver: props.userId,
        },
      })
    );
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
