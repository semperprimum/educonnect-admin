<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Создать событие</h2>

    <form class="form">
      <InputGroup
        label="Заголовок"
        placeholder="Например: Кураторский час"
        id="title"
        elevated
      />
      <InputGroup
        elevated
        label="Время"
        placeholder="Например: 15:00"
        id="time"
      />
      <InputGroup
        elevated
        label="Место"
        placeholder="Например: Аудитория 1210"
        id="place"
      />

      <Dropdown
        elevated
        label="Тип события"
        :options="[
          { name: 'Мероприятие', value: 'event' },
          { name: 'Задание', value: 'task' },
        ]"
      />
      <Dropdown
        elevated
        label="Группа"
        :options="[
          { name: 'Все', value: '0' },
          { name: 'П-21-57к', value: '1' },
          { name: 'П-21-56б', value: '2' },
          { name: 'П-21-55гб', value: '3' },
          { name: 'П-20-54к', value: '4' },
          { name: 'П-20-53б', value: '5' },
        ]"
      />
      <Dropdown
        elevated
        label="Студенты"
        :options="[
          { name: 'Все', value: 'all' },
          { name: 'Группа А', value: 'a' },
          { name: 'Группа Б', value: 'b' },
        ]"
      />

      <Button
        elevated
        center
        label="Создать событие"
        :trailing="Plus"
        class="button"
      />
    </form>
  </ModalBase>
</template>

<script setup>
import ModalBase from "@/components/ModalBase.vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import InputGroup from "@/components/ui/InputGroup.vue";
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
  font-size: var(--fs-600);
}

.form {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.button {
  margin-top: 1.5rem;
}
</style>
