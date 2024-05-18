<template>
  <ModalBase :onClose="onClose">
    <code>TestModal.vue</code>
  </ModalBase>
</template>

<script setup>
import ModalBase from "@/components/ModalBase.vue";

const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
