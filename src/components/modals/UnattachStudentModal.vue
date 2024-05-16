<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Откерпить студента</h2>
    <p class="confirmation">
      Вы уверены, что хотите открепить студента
      <span>{{ studentName }}</span> от группы <span>{{ groupName }}</span
      >?
    </p>

    <div class="button-pair">
      <Button
        @click="onClose"
        center
        elevated
        label="Отмена"
      />
      <Button
        center
        danger
        label="Открепить"
      />
    </div>
  </ModalBase>
</template>

<script setup>
import ModalBase from "@/components/ModalBase.vue";
import Button from "@/components/ui/Button.vue";

const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.heading {
  font-size: 2rem;
}

.confirmation {
  margin-top: 1rem;
  margin-bottom: 2rem;
  span {
    color: var(--clr-red-400);
    font-weight: 600;
  }
}

.button-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
