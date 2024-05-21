<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Добавить студента</h2>
    <form class="form">
      <DropdownGroup
        elevated
        id="student"
        label="П-21-57к"
        placeholder="Студент"
        :options="[
          { name: 'Башарин Глеб', value: '' },
          { name: 'Ибраев Альжан', value: '' },
          { name: 'Филонов Артём', value: '' },
          { name: 'Ульданов Мансур', value: '' },
        ]"
      />

      <Button
        center
        elevated
        label="Добавить"
        :trailing="Plus"
      />
    </form>
  </ModalBase>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import ModalBase from "@/components/ModalBase.vue";
import DropdownGroup from "@/components/ui/DropdownGroup.vue";
const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
});
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
