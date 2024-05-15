<template>
  <component
    :is="currentModal"
    v-if="currentModal"
    v-bind="modalProps"
    @close="closeModal"
  />
</template>

<script setup>
import ModalService from "@/services/ModalService";
import { computed } from "vue";
import * as modals from "@/components/modals";

const currentModal = computed(() => {
  return ModalService.getCurrentModal()
    ? modals[ModalService.getCurrentModal()]
    : null;
});

const modalProps = computed(() => ModalService.getModalProps());

const closeModal = () => {
  ModalService.close();
};
</script>
