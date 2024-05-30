<template>
  <AppTemplate>
    <RouterView />
  </AppTemplate>
  <ModalWrapper />
</template>

<script lang="ts" setup>
import ModalWrapper from "@/components/ModalWrapper.vue";
import AppTemplate from "@/components/AppTemplate.vue";
</script>
