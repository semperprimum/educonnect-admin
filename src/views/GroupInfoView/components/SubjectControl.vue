<template>
  <div class="subjects">
    <ul class="subjects__list">
      <li v-for="subject in subjects" class="subjects__item">
        <div class="subjects__item--info">
          <p>
            {{ subject.subject.title }}
            -
            {{ subject.teacher.fio }}
          </p>
        </div>

        <button
          @click="handleRemove(subject.id)"
          class="subjects__delete-button"
        >
          <Xmark aria-hidden="true" />
        </button>
      </li>
    </ul>

    <Multiselect
      class="elevated select"
      v-model="selectedSubject"
      :options="generalStore.teacherSubjects"
      label="id"
      :showLabels="false"
      placeholder="Предмет"
      :custom-label="customLabel"
    />

    <Button
      @click.prevent="handleSubmit"
      class="subjects__button"
      elevated
      center
      label="Добавить"
      :trailing="Plus"
    />
  </div>
</template>

<script lang="ts" setup>
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import Xmark from "@/assets/icons/Xmark.vue";
import Multiselect from "vue-multiselect";
import { useGroupStore, type Subject } from "@/stores/group";
import { useGeneralStore } from "@/stores/general";
import type { Ref } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const generalStore = useGeneralStore();
const groupStore = useGroupStore();
const currentRoute = useRoute();
const selectedSubject: Ref<Subject | null> = ref(null);

const customLabel = (subject: Subject) => {
  return `${subject.subject.title} - ${subject.teacher.fio}`;
};

const handleSubmit = async () => {
  if (!selectedSubject.value) return;

  // check if selected teacherSubject was already added
  if (props.subjects.find((el) => el.id === selectedSubject.value?.id)) return;

  const groupId: number = +currentRoute.params.id;
  const teacherSubjectId: number = selectedSubject.value.id;

  await groupStore.addTeacherSubject(groupId, teacherSubjectId);

  selectedSubject.value = null;
};

const handleRemove = async (id: number) => {
  const groupId: number = +currentRoute.params.id;

  await groupStore.removeSubject(groupId, id);
};

const props = defineProps<{
  subjects: Subject[];
}>();
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
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
    align-items: center;
    border-bottom: 1px solid var(--clr-neutral-600);
    padding-bottom: 0.75rem;

    &--info {
      line-height: 1.2;
    }
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

.select {
  margin-top: 1.5rem !important;
}
</style>
