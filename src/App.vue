<template>
  <AppTemplate>
    <RouterView />
  </AppTemplate>
  <ModalWrapper />
</template>

<script lang="ts" setup>
import ModalWrapper from "@/components/ModalWrapper.vue";
import AppTemplate from "@/components/AppTemplate.vue";
import { onMounted } from "vue";
import { useGeneralStore } from "./stores/general";

const generalStore = useGeneralStore();

onMounted(async () => {
  await generalStore.fetchSpecializations();
  await generalStore.fetchTeachers();
  await generalStore.fetchSubjects();
});
</script>
