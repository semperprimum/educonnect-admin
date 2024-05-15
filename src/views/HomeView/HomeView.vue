<template>
  <ContainerWithHeading heading="Добрый день, Денис Валентинович!">
    Home
    <div>
      <Button
        @click="openModal"
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
  ModalService.open("TestModal", { test: "This is a text from a prop!" });
};
</script>

<style lang="scss" scoped></style>
