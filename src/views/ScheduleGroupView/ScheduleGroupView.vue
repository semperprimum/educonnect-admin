<template>
  <ContainerWithHeading :heading="t('schedule') + ' -> ' + groupName">
    <div class="container">
      <ScheduleTile
        v-for="(s, index) in filledSchedule"
        :subjects="s"
        :index="index"
      />
    </div>
  </ContainerWithHeading>
</template>

<script lang="ts" setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import mockGroups from "@/views/mockGroups.json";
import { useRoute } from "vue-router";
import ScheduleTile from "./components/ScheduleTile.vue";
import { useI18n } from "vue-i18n";
import { ref, onMounted, type Ref } from "vue";
import { useGroupStore } from "@/stores/group";
import type { Subject } from "@/types";
import { computed } from "vue";

const currentRoute = useRoute();
const groupStore = useGroupStore();
const { t } = useI18n();

const groupName = mockGroups.filter(
  (group) => group.id.toString() == currentRoute.params.id,
)[0].title;

const subjects: Subject[] = [
  { number: 1 },
  { number: 2 },
  { number: 3 },
  { number: 4 },
  { number: 5 },
  { number: 6 },
];

const schedule = [
  [...subjects],
  [...subjects],
  [...subjects],
  [...subjects],
  [...subjects],
  [...subjects],
];

// Function to update the schedule with fetched data and return a new schedule
function fillSchedule(fetchedData: Subject[][]): Subject[][] {
  // Create a new schedule based on the original template
  const newSchedule = schedule.map((day) => [...day]);

  fetchedData.forEach((dayData, dayIndex) => {
    if (dayIndex < newSchedule.length) {
      dayData.forEach((subject) => {
        const slotIndex = newSchedule[dayIndex].findIndex(
          (item) => item.number === subject.number,
        );
        if (slotIndex !== -1) {
          // Replace the null object with the fetched data
          newSchedule[dayIndex][slotIndex] = subject;
        }
      });
    }
  });

  return newSchedule;
}

const filledSchedule = computed(() => {
  if (!groupStore.schedule) return;
  return fillSchedule(groupStore.schedule);
});

onMounted(async () => {
  await groupStore.getGroupInfoById(+currentRoute.params.id);
  await groupStore.getGroupSchedule(+currentRoute.params.id);

  console.log(groupStore.schedule);
});
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
