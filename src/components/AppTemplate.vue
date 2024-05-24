<template>
  <main class="app-wrapper">
    <SideBarNav v-if="route.path !== '/login'" />
    <div class="content-wrapper">
      <slot></slot>
    </div>
  </main>
</template>

<script setup>
import SideBarNav from "@/components/SideBarNav.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style lang="scss" scoped>
.content-wrapper {
  padding: 2rem;
  // margin-left: 6.25rem;
  margin-top: 5.25rem;

  display: flex;
  flex-direction: column;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 5px;
  }

  @media only screen and (min-width: 48em) {
    padding: 2rem 5rem;
    margin-top: 0;
    margin-left: 6.25rem;
  }
}
</style>
