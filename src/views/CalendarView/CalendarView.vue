<template>
  <ContainerWithHeading heading="Календарь событий">
    <div class="container">
      <EventList />

      <div class="calendar">
        <DatePicker
          :attributes="attributes"
          v-model.date="date"
          locale="ru"
          color="red"
          :is-dark="true"
        />

        <Button
          @click="openCreateEventModal"
          label="Создать событие"
          :trailing="Plus"
          center
          class="button"
        />
      </div>
    </div>
  </ContainerWithHeading>
</template>

<script setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import { DatePicker } from "v-calendar";
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import EventList from "@/views/CalendarView/components/EventList.vue";
import { ref } from "vue";
import ModalService from "@/services/ModalService";

const date = ref(new Date());

const openCreateEventModal = () => {
  ModalService.open("CreateEventModal");
};

const attributes = [
  {
    highlight: "gray",
    dates: [
      new Date(2024, 4, 11),
      new Date(2024, 4, 12),
      new Date(2024, 4, 14),
      new Date(2024, 4, 16),
    ],
  },
];
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 1rem;
}

.button {
  margin-top: 1rem;
  width: 100%;
}

.calendar {
  &:deep(.vc-container) {
    background-color: var(--clr-neutral-700);
    border: 1px solid var(--clr-neutral-600);
    border-radius: 1rem;
    font-family:
      "Inter Variable",
      -apple-system,
      system-ui,
      sans-serif;
  }

  &:deep(.vc-title),
  &:deep(.vc-arrow),
  &:deep(.vc-nav-item),
  &:deep(.vc-nav-title),
  &:deep(.vc-nav-arrow) {
    background: transparent;
  }

  &:deep(.vc-title) {
    text-transform: capitalize;
  }

  &:deep(.vc-nav-item),
  &:deep(.vc-weekday) {
    color: var(--clr-neutral-300);
  }

  &:deep(.vc-gray) {
    --vc-accent-500: var(--clr-neutral-600);
  }

  &:deep(.vc-popover-content) {
    background: var(--clr-neutral-600);
    border: 1px solid var(--clr-neutral-500);
  }
}
</style>
