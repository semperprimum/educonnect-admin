<template>
  <Spinner v-if="groupStore.isLoading" />
  <ContainerWithHeading
    v-else
    :heading="t('groups') + ' -> ' + groupStore.group?.title"
  >
    <div class="container">
      <div class="info">
        <span class="label">{{ t("literals") }}</span>
        <Input disabled :model-value="groupStore.group?.title" />

        <span class="label">{{ t("specialty") }}</span>
        <MultiSelect
          v-model="selectedSpecialization"
          :options="generalStore.specializations"
          :allow-empty="false"
          label="title"
          track-by="id"
          @update:modelValue="handleSpecializationChange"
        />

        <span class="label">{{ t("curator") }}</span>
        <MultiSelect
          :options="generalStore.teachers"
          :allow-empty="false"
          label="fio"
          track-by="id"
          v-model="selectedCurator"
          @update:modelValue="handleChangeCurator"
        />

        <Accordion :name="t('subject_control')" class="accordion">
          <SubjectControl
            @changeSubject="handleChangeSubject"
            @addSubject="handleAddSubject"
            @deleteSubject="handleDeleteSubject"
            :subjects="subjects"
          />
        </Accordion>
      </div>

      <StudentList />
    </div>
  </ContainerWithHeading>
</template>

<script lang="ts" setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import StudentList from "./components/StudentList.vue";
import SubjectControl from "./components/SubjectControl.vue";
import Input from "@/components/ui/Input.vue";
import Accordion from "@/components/Accordion.vue";
import Spinner from "@/components/Spinner.vue";
import { useRoute } from "vue-router";
import { onMounted, ref, type Ref } from "vue";
import MultiSelect from "vue-multiselect";
import { useGroupStore } from "@/stores/group";
import { useGeneralStore } from "@/stores/general";
import { useI18n } from "vue-i18n";

const currentRoute = useRoute();
const groupStore = useGroupStore();
const generalStore = useGeneralStore();
const { t } = useI18n();

let selectedSpecialization: Ref<{ title: string; id: number } | null> =
  ref(null);
let selectedCurator: Ref<{ fio: string; id: number } | null> = ref(null);

onMounted(async () => {
  await groupStore.getGroupInfoById(+currentRoute.params.id);

  if (groupStore.group?.specialization) {
    selectedSpecialization.value = groupStore.group.specialization;
  }

  if (groupStore.group?.curator) {
    selectedCurator.value = groupStore.group.curator;
  }
});

const handleSpecializationChange = () => {
  if (!groupStore.group || !selectedSpecialization.value) return;

  groupStore.updateSpecializationById(
    +currentRoute.params.id,
    selectedSpecialization.value.id,
  );
};

const handleChangeCurator = () => {
  if (!groupStore.group || !selectedCurator.value) return;

  groupStore.updateCuratorById(
    +currentRoute.params.id,
    selectedCurator.value.id,
  );
};

const subjects = ref([
  {
    id: "1",
    name: "Верстка Веб-Страниц",
    professor: "Татьяна Григорьевна",
  },
  {
    id: "2",
    name: "Основы Front-End",
    professor: "Денис Валентинович",
  },
  {
    id: "3",
    name: "Программирование",
    professor: "Рушан Багдатович",
  },
]);

const handleAddSubject = () => {
  const newSubject = {
    id: crypto.randomUUID(),
    name: "",
    professor: "",
  };

  subjects.value.push(newSubject);
};

const handleDeleteSubject = (id: string) => {
  subjects.value = subjects.value.filter((subject) => subject.id !== id);
};

const handleChangeSubject = ({
  id,
  field,
  value,
}: {
  id: string;
  field: keyof (typeof subjects.value)[0];
  value: string;
}) => {
  const subject = subjects.value.find((subject) => subject.id === id);

  if (subject) {
    subject[field] = value;
  }
  console.log(subjects);
};
</script>

<style lang="scss" scoped>
.info {
  width: 25rem;
  display: grid;
  gap: 1rem;
}

.label {
  font-size: var(--fs-300);
  color: var(--clr-neutral-300);
  font-weight: var(--fw-bold);
  margin-bottom: -0.5rem;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.accordion {
  margin-top: 1.5rem;
}

.literals-input {
  max-width: 18rem;
}
</style>
