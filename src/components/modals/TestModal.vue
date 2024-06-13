<template>
  <ModalBase :onClose="onClose">
    <code>TestModal.vue</code>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from "@/components/ModalBase.vue";

defineProps<{
  onClose: () => void;
}>();
</script>

<style lang="scss" scoped></style>
