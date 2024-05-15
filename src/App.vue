<template>
  <AppTemplate>
    <RouterView />
  </AppTemplate>
  <ModalWrapper />
</template>

<script setup>
import ModalWrapper from "@/components/ModalWrapper.vue";
import AppTemplate from "@/components/AppTemplate.vue";
</script>
