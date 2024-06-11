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
import { useAuthStore } from "./stores/auth";

const generalStore = useGeneralStore();
const authStore = useAuthStore();
const { locale } = useI18n();

onMounted(async () => {
  locale.value = localStorage.getItem("locale") || "ru";

  await authStore.checkAuth();

  if (authStore.token) {
    await generalStore.fetchSpecializations();
    await generalStore.fetchTeachers();
    await generalStore.fetchSubjects();
    await generalStore.fetchTeacherSubjects();
  }
});
</script>
