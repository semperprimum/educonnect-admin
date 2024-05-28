<template>
  <div class="subjects">
    <ul class="subjects__list">
      <li v-for="subject in subjects" class="subjects__item">
        <SubjectSelect
          @optionChange="
            (value: string) => changeSubject(subject.id, 'name', value)
          "
          :options="classes"
          :selected="subject.name"
          placeholder="Предмет"
        />
        <SubjectSelect
          @optionChange="
            (value: string) => changeSubject(subject.id, 'professor', value)
          "
          :selected="subject.professor"
          placeholder="Преподаватель"
          :options="professors"
        />
        <button
          @click.prevent="deleteSubject(subject.id)"
          class="subjects__delete-button"
        >
          <Xmark aria-hidden="true" />
        </button>
      </li>
    </ul>
    <Button
      @click.prevent="addSubject"
      class="subjects__button"
      elevated
      center
      label="Добавить"
      :trailing="Plus"
    />
  </div>
</template>

<script lang="ts" setup>
import SubjectSelect from "./SubjectSelect.vue";
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import Xmark from "@/assets/icons/Xmark.vue";

defineProps<{
  subjects: { id: string; name: string; professor: string }[];
}>();

const emit = defineEmits(["addSubject", "deleteSubject", "changeSubject"]);

const addSubject = () => {
  emit("addSubject");
};

const deleteSubject = (id: string) => {
  emit("deleteSubject", id);
};

const changeSubject = (id: string, field: string, value: string) => {
  emit("changeSubject", { id, field, value });
};

const professors = [
  "Денис Валентинович",
  "Татьяна Григорьевна",
  "Рушан Багдатович",
  "Ляззат Кокенаевна",
];

const classes = [
  "Основы Front-End",
  "Верстка Веб-Страниц",
  "Программирование",
  "Математика",
];
</script>

<style lang="scss" scoped>
.subjects {
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;

    display: grid;
    gap: 0.875rem;
  }

  &__item {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 0.75rem;
    align-items: center;
  }

  &__delete-button {
    padding: 0;
    border: none;
    background: none;

    svg {
      display: block;
      fill: var(--clr-neutral-300);
      width: 1.25rem;
      aspect-ratio: 1;
    }
  }

  &__button {
    margin-top: 2rem;
    width: 100%;
    padding: 0.5rem 1rem;
  }
}
</style>
