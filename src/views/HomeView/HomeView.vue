<template>
  <ContainerWithHeading heading="Добрый день, Денис Валентинович!">
    Home
    <div>
      <Button
        @click="openModal"
        danger
        label="Open Modal"
      />
    </div>
  </ContainerWithHeading>
</template>

<script setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import Button from "@/components/ui/Button.vue";
import ModalService from "@/services/ModalService";

const openModal = () => {
  ModalService.open("TestModal");
};
</script>

<style lang="scss" scoped></style>
