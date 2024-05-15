<template>
  <AppTemplate heading="Добрый день, Богдан Данилович!"
    >Home
    <div>
      <button @click="openModal">Open Modal</button>
    </div>
  </AppTemplate>
</template>

<script setup>
import AppTemplate from "@/components/AppTemplate.vue";
import ModalService from "@/services/ModalService";

const openModal = () => {
  ModalService.open("TestModal", { test: "This is a text from a prop!" });
};
</script>

<style lang="scss" scoped></style>
