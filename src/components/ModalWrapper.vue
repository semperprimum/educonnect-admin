<template>
  <component
    :is="currentModal"
    v-if="currentModal"
    v-bind="modalProps"
    @close="closeModal"
  />
</template>

<script lang="ts" setup>
import ModalService from "@/services/ModalService";
import { computed } from "vue";
import * as allModals from "@/components/modals";
import type { Modals } from "@/types";

const modals = allModals as Modals;

const currentModal = computed(() => {
  const modalName = ModalService.getCurrentModal();
  return modalName ? modals[modalName] : null;
});

const modalProps = computed(() => ModalService.getModalProps());

const closeModal = () => {
  ModalService.close();
};
</script>
