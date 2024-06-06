<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Добавить студента</h2>
    <form class="form">
      <Multiselect :options="['Башарин Глеб']" />

      <Button center elevated label="Добавить" :trailing="Plus" />
    </form>
  </ModalBase>
</template>

<script lang="ts" setup>
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import ModalBase from "@/components/ModalBase.vue";
import Multiselect from "vue-multiselect";

defineProps<{
  onClose: () => void;
}>();
</script>

<style lang="scss" scoped>
.heading {
  font-size: var(--fs-600);
}

.form {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;

  button {
    margin-top: 1.5rem;
  }
}
</style>
