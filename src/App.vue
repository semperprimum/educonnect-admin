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
import { useAuthStore } from "./stores/auth";
import { useI18n } from "vue-i18n";

const generalStore = useGeneralStore();
const authStore = useAuthStore();
const { locale } = useI18n();

onMounted(async () => {
  locale.value = localStorage.getItem("locale") || "ru";

  if (authStore.token) {
    await authStore.checkAuth();
    await generalStore.fetchSpecializations();
    await generalStore.fetchTeachers();
    await generalStore.fetchSubjects();
  }
});
</script>
