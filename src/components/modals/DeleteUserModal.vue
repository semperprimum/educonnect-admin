<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Удалить пользователя</h2>

    <p class="confirmation-text">
      Вы уверены, что хотите удалить пользователя <span>{{ name }}</span
      >?
    </p>

    <div class="button-pair">
      <Button @click="onClose" center elevated label="Отмена" />
      <Button center danger label="Удалить" />
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
  name: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.heading {
  font-size: var(--fs-600);
}

.confirmation-text {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  font-size: var(--fs-300);

  span {
    color: var(--clr-red-400);
    font-weight: var(--fw-bold);
  }
}

.button-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
