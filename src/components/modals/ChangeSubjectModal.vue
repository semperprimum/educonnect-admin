<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">{{ t("change_class") }}</h2>
    <span class="info">Понедельник, 2 пара | Программирование | П-21-57к</span>

    <form class="form">
      <DropdownGroup
        class="form__dropdown"
        label="Заменить на:"
        placeholder="Предмет"
        id="subject"
        :options="[
          { name: 'Основы front-end, Попов Денис Валентинович', value: '1' },
        ]"
        elevated
      />

      <Input class="form__input" :placeholder="t('study_room')" elevated />

      <Button
        class="form__button"
        @click.prevent="() => {}"
        elevated
        center
        :label="t('change_class')"
      />
    </form>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from "@/components/ModalBase.vue";
import DropdownGroup from "@/components/ui/DropdownGroup.vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{
  onClose: () => void;
}>();
</script>

<style lang="scss" scoped>
.heading {
  font-size: var(--fs-600);
}

.info {
  color: var(--clr-neutral-300);
}

.form {
  display: grid;
  margin-top: 1rem;
  gap: 1rem;

  &__input {
    max-width: 10rem;
  }

  &__button {
    margin-top: 1.5rem;
  }
}
</style>
