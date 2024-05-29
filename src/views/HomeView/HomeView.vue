<template>
  <ContainerWithHeading heading="Добрый день, Денис Валентинович!">
    Home
    <div>
      <Button @click="openModal" danger label="Open Modal" />
    </div>
    <Calendar
      :date="new Date()"
      :attributes="[
        {
          highlight: 'gray',
          dates: [
            new Date(2024, 4, 11),
            new Date(2024, 4, 12),
            new Date(2024, 4, 14),
            new Date(2024, 4, 16),
          ],
        },
      ]"
    />
  </ContainerWithHeading>
</template>

<script lang="ts" setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import Button from "@/components/ui/Button.vue";
import ModalService from "@/services/ModalService";
import Calendar from "@/components/Calendar.vue";

const openModal = () => {
  ModalService.open("TestModal");
};
</script>

<style lang="scss" scoped></style>
