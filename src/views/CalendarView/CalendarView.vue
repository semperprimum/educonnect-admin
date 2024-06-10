<template>
  <ContainerWithHeading :heading="t('event_calendar')">
    <div class="container">
      <EventList />

      <div class="calendar">
        <Calendar :attributes="attributes" />

        <Button
          @click="openCreateEventModal"
          :label="t('create_event')"
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
import { useI18n } from "vue-i18n";

const openCreateEventModal = () => {
  ModalService.open("CreateEventModal");
};

const { t } = useI18n();

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
  flex-direction: column-reverse;
  gap: 1rem;

  @media only screen and (min-width: 48em) {
    flex-direction: row;
  }
}

.button {
  margin-top: 1rem;
  width: 100%;
}
</style>
