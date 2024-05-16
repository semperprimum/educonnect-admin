<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Создать группу</h2>
    <form class="form">
      <InputGroup
        elevated
        label="Литеры группы"
        placeholder="Литеры"
        id="literals"
      />
      <DropdownGroup
        elevated
        label="Отделение"
        id="branch"
        :options="[{ name: 'программироване', value: 'programming' }]"
      />
      <DropdownGroup
        elevated
        label="Куратор"
        id="curator"
        :options="[{ name: 'Гульнар Нурхамитовна', value: '1' }]"
      />
      <Button
        center
        elevated
        label="Создать"
        :trailing="Plus"
        @click.prevent="() => {}"
      />
    </form>
  </ModalBase>
</template>

<script setup>
import ModalBase from "@/components/ModalBase.vue";
import InputGroup from "@/components/ui/InputGroup.vue";
import DropdownGroup from "@/components/ui/DropdownGroup.vue";
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";

const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.heading {
  font-size: 2rem;
}

.form {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;

  button {
    margin-top: 2rem;
  }
}
</style>
