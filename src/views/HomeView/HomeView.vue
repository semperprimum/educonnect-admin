<template>
  <ContainerWithHeading heading="Добрый день, Денис Валентинович!">
    <div class="links-grid">
      <LinkTile
        accent-color="#B3E277"
        :icon="Table"
        title="Управление заменами"
        class="links-grid__tile"
        to="/substitutions"
      />
      <LinkTile
        accent-color="#F97316"
        :icon="Users"
        title="Группы"
        class="links-grid__tile"
        to="/groups"
      />
      <LinkTile
        accent-color="var(--clr-red-500)"
        :icon="ListOl"
        title="Расписание"
        class="links-grid__tile"
        to="/timetable"
      />
      <LinkTile
        accent-color="#3B82F6"
        :icon="User"
        title="Пользователи"
        class="links-grid__tile"
        to="/users"
      />
      <LinkTile
        accent-color="#EC4899"
        :icon="CalendarDays"
        title="Календарь"
        class="links-grid__tile"
        to="calendar"
      />
    </div>
  </ContainerWithHeading>
</template>

<script lang="ts" setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import LinkTile from "@/views/HomeView/components/LinkTile.vue";
import { Table, Users, ListOl, User, CalendarDays } from "@/assets/icons";
</script>

<style lang="scss" scoped>
.links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 100%;
  gap: 1rem;

  &__tile {
    &:first-child {
      grid-column: span 2;
    }
  }
}
</style>
