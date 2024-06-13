<template>
  <ContainerWithHeading
    :heading="t('groups') + ' -> ' + (groupStore.group?.title || '')"
  >
    <div class="spinner-container" v-if="groupStore.isLoading">
      <Spinner class="spinner" />
    </div>
    <div v-else class="container">
      <div class="info">
        <span class="label">{{ t("literals") }}</span>
        <Input disabled :model-value="groupStore.group?.title" />

        <span class="label">{{ t("specialty") }}</span>
        <MultiSelect
          v-model="selectedSpecialization"
          :placeholde="t('specialty')"
          :options="generalStore.specializations"
          :allow-empty="false"
          :show-labels="false"
          label="title"
          track-by="id"
          @update:modelValue="handleSpecializationChange"
        />

        <span class="label">{{ t("curator") }}</span>

        <MultiSelect
          :options="generalStore.teachers"
          :allow-empty="false"
          :placeholde="t('curator')"
          :show-labels="false"
          label="fio"
          track-by="id"
          v-model="selectedCurator"
          @update:modelValue="handleChangeCurator"
        />

        <Accordion :name="t('subject_control')" class="accordion">
          <SubjectControl :subjects="groupStore.group?.subjects!" />
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
  await generalStore.fetchTeacherSubjects();

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
</script>

<style lang="scss" scoped>
.info {
  width: 25rem;
  display: grid;
  gap: 1rem;

  @media only screen and (max-width: 48em) {
    width: 20rem;
  }
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
  gap: 1rem;

  @media only screen and (max-width: 48em) {
    flex-direction: column;
  }
}

.accordion {
  margin-top: 1.5rem;
}

.literals-input {
  max-width: 18rem;
}

.spinner-container {
  min-height: 80vh;
  display: grid;
  place-items: center;
  width: 100%;

  .spinner {
    width: 5rem;
  }
}
</style>
