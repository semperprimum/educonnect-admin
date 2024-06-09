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
import { useI18n } from "vue-i18n";

const generalStore = useGeneralStore();
const { locale } = useI18n();

onMounted(async () => {
  locale.value = localStorage.getItem("locale") || "ru";
  await generalStore.fetchSpecializations();
  await generalStore.fetchTeachers();
  await generalStore.fetchSubjects();
});
</script>
