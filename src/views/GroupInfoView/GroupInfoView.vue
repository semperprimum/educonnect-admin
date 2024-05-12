<template>
  <AppTemplate :heading="`Группа -> ${groupName}`">
    <div class="container">
      <div class="info">
        <InputGroup
          id="literals"
          label="Литеры группы"
          placeholder="Литеры"
        />
        <DropdownGroup
          id="branch"
          label="Отделение"
          :options="options"
          :selected="options[1]"
        />
        <DropdownGroup
          id="curator"
          label="Куратор"
          :options="curatorOptions"
          :selected="curatorOptions[0]"
        />
      </div>

      <StudentList />
    </div>
  </AppTemplate>
</template>

<script setup>
import AppTemplate from "@/components/AppTemplate.vue";
import StudentList from "./components/StudentList.vue";
import InputGroup from "@/components/ui/InputGroup.vue";
import DropdownGroup from "@/components/ui/DropdownGroup.vue";
import mockGroups from "@/views/mockGroups.json";
import { useRoute } from "vue-router";

const currentRoute = useRoute();

const groupName = mockGroups.filter(
  (group) => group.id == currentRoute.params.id
)[0].literals;

const options = [
  {
    name: "все",
    value: "all",
  },
  {
    name: "программирование",
    value: "programming",
  },
  {
    name: "дизайн",
    value: "design",
  },
  {
    name: "туризм",
    value: "tourism",
  },
];

const curatorOptions = [
  {
    name: "Гульнар Нурхамитовна",
    value: "1",
  },
  {
    name: "Денис Валентинович",
    value: "2",
  },
];
</script>

<style lang="scss" scoped>
.info {
  width: 25rem;
  display: grid;
  gap: 1rem;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: start;
}
</style>
