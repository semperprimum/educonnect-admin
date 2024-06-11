<template>
  <ContainerWithHeading :heading="t('schedule') + ' -> ' + groupName">
    <div class="container">
      <ScheduleTile v-for="s in schedule" :key="s.date" :schedule="s" />
    </div>
  </ContainerWithHeading>
</template>

<script lang="ts" setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import mockGroups from "@/views/mockGroups.json";
import { useRoute } from "vue-router";
import ScheduleTile from "./components/ScheduleTile.vue";
import { useI18n } from "vue-i18n";
import { ref, watch, onMounted, type Ref } from "vue";
import type { ScheduleDay, Subject } from "@/types";
import { useGroupStore } from "@/stores/group";

const currentRoute = useRoute();
const groupStore = useGroupStore();
const { t } = useI18n();

const groupName = mockGroups.filter(
  (group) => group.id.toString() == currentRoute.params.id,
)[0].title;

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const getMonday = () => {
  const d: Date = new Date();
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

const monday = getMonday();

const getDatePlusNDays = (d: Date, n: number): string => {
  const date = new Date(d);
  date.setDate(date.getDate() + n);
  return formatDate(date);
};

const subjects: Subject[] = [
  { number: 1 },
  { number: 2 },
  { number: 3 },
  { number: 4 },
  { number: 5 },
  { number: 6 },
];

// prettier-ignore
const schedule: Ref<ScheduleDay[]> = ref([
  { date: formatDate(monday), dayOfWeek: "Monday", subjects: [...subjects] },
  { date: getDatePlusNDays(monday, 1), dayOfWeek: "Tuesday", subjects: [...subjects], },
  { date: getDatePlusNDays(monday, 2), dayOfWeek: "Wednesday", subjects: [...subjects], },
  { date: getDatePlusNDays(monday, 3), dayOfWeek: "Thursday", subjects: [...subjects], },
  { date: getDatePlusNDays(monday, 4), dayOfWeek: "Friday", subjects: [...subjects], },
  { date: getDatePlusNDays(monday, 5), dayOfWeek: "Saturday", subjects: [...subjects], },
]);

const populateSchedule = (fetchedSchedule: any) => {
  fetchedSchedule.forEach((day: any) => {
    const scheduleDay = schedule.value.find((d) => d.date === day.date);
    if (scheduleDay) {
      day.subjects.forEach((subject: any) => {
        scheduleDay.subjects[subject.number - 1] = subject;
      });
    }
  });
};

onMounted(async () => {
  await groupStore.getGroupInfoById(+currentRoute.params.id);
  await groupStore.getGroupSchedule(+currentRoute.params.id);

  populateSchedule(groupStore.schedule);
});

watch(
  () => groupStore.schedule,
  async () => {
    await groupStore.getGroupInfoById(+currentRoute.params.id);
    await groupStore.getGroupSchedule(+currentRoute.params.id);

    populateSchedule(groupStore.schedule);
  },
);
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
