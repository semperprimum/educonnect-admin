<template>
  <ModalBase :onClose="onClose">
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro vero illo
      iure dignissimos omnis hic labore veniam maxime aperiam ratione.
    </p>

    <code>{{ test }}</code>
  </ModalBase>
</template>

<script setup>
import ModalBase from "@/components/ModalBase.vue";
const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
  test: {
    type: String,
    required: false,
  },
});
</script>
