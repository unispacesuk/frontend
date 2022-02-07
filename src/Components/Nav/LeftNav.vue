<template>
  <div class="w-full flex flex-col text-center items-center py-12">
    <!-- Avatar placeholder -->
    <div class="flex flex-col items-center space-y-2 mb-10">
      <div class="w-28 h-28 bg-red-300 rounded-full"></div>
      <div>Ricardo Rocha</div>
      <div>Computer Science</div>
    </div>
    <div class="text-right flex flex-col space-y-3 w-[60%]">
      <router-link to="/">
        <NavLink name="Home" route="home">
          <HomeSolid class="w-5" />
        </NavLink>
      </router-link>
      <router-link to="/boards">
        <NavLink name="Boards" route="board">
          <BoardSolid class="w-5" />
        </NavLink>
      </router-link>
      <router-link to="/questions">
        <NavLink name="Questions" route="question">
          <QuestionSolid class="w-5" />
        </NavLink>
      </router-link>

      <!-- user dashboard // can change in the future -->
      <router-link to="/dashboard">
        <NavLink name="Dashboard" route="dashboard">
          <UserSolid class="w-5" />
        </NavLink>
      </router-link>

      <!-- if user is admin -->
      <router-link to="/admin">
        <NavLink name="Admin Panel" route="admin">
          <CogSolid class="w-5" />
        </NavLink>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavLink from './NavLink.vue';
import { HomeSolid, BoardSolid, QuestionSolid, CogSolid, UserSolid } from '../../Icons';

export default defineComponent({
  name: 'LeftNav',
  components: { UserSolid, CogSolid, QuestionSolid, BoardSolid, HomeSolid, NavLink },
});
</script>
