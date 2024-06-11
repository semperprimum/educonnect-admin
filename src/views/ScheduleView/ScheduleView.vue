<template>
  <ContainerWithHeading :heading="t('schedule')">
    <div class="filter-bar">
      <Input
        v-model="searchQuery"
        :placeholder="t('search')"
        :trailing="MagnifyingGlass"
      />

      <Multiselect
        v-model="selectedDepartment"
        :placeholder="t('schedule')"
        track-by="id"
        label="title"
        class="select"
        :options="generalStore.specializations"
        :showLabels="false"
      />

      <Button
        @click="router.push('/substitutions')"
        :label="t('substitutions_control')"
      />
    </div>

    <div class="content">
      <GroupTile
        v-for="group in filteredGroups"
        :key="group.title"
        :group="group"
        @click="router.push(`/schedule/${group.id}`)"
      />
    </div>
  </ContainerWithHeading>
</template>

<script lang="ts" setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import Multiselect from "vue-multiselect";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import MagnifyingGlass from "@/assets/icons/MagnifyingGlass.vue";
import GroupTile from "@/components/GroupTile.vue";
import { useRouter } from "vue-router";
import { computed, ref, type Ref } from "vue";
import { useGeneralStore } from "@/stores/general";
import { useGroupStore } from "@/stores/group";
import { matchSorter } from "match-sorter";
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";

const router = useRouter();
const groupStore = useGroupStore();
const generalStore = useGeneralStore();
const selectedDepartment: Ref<{ id: number; title: string } | null> = ref(null);
const searchQuery: Ref<string | null> = ref(null);
const { t } = useI18n();

const filteredGroups = computed(() => {
  let groups = groupStore.groups;

  if (searchQuery.value) {
    groups = matchSorter(groups, searchQuery.value, { keys: ["title"] });
  }

  return groups;
});

onMounted(async () => {
  await groupStore.getGroups();
});
</script>

<style lang="scss" scoped>
.select {
  max-width: 23rem !important;
  z-index: 40;
}

.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    max-width: fit-content;
  }

  @media only screen and (min-width: 63rem) {
    flex-direction: row;

    button:nth-of-type(1) {
      margin-left: auto;
    }
  }
}

.content {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-top: 1rem;

  @media only screen and (min-width: 54em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 69em) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 90em) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
