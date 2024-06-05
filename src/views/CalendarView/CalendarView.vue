<template>
  <ContainerWithHeading heading="Календарь событий">
    <div class="container">
      <EventList />

      <div class="calendar">
        <Calendar :attributes="attributes" />

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

<script lang="ts" setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import Calendar from "@/components/Calendar.vue";
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import EventList from "@/views/CalendarView/components/EventList.vue";
import ModalService from "@/services/ModalService";

const openCreateEventModal = () => {
  ModalService.open("CreateEventModal");
};

const attributes = [
  {
    highlight: "gray",
    dates: [
      new Date(2024, 5, 7),
      new Date(2024, 5, 12),
      new Date(2024, 5, 14),
      new Date(2024, 5, 20),
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
</style>
