<template>
  <ContainerWithHeading :heading="'Расписание -> ' + groupName">
    <div class="container">
      <ScheduleTile />
      <ScheduleTile />
      <ScheduleTile />
      <ScheduleTile />
      <ScheduleTile />
      <ScheduleTile />
    </div>
  </ContainerWithHeading>
</template>

<script lang="ts" setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import mockGroups from "@/views/mockGroups.json";
import { useRoute } from "vue-router";
import ScheduleTile from "./components/ScheduleTile.vue";

const currentRoute = useRoute();

const groupName = mockGroups.filter(
  (group) => group.id.toString() == currentRoute.params.id,
)[0].title;
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-auto-rows: 1fr;
  min-height: 100%;
  gap: 1rem;
}
</style>
