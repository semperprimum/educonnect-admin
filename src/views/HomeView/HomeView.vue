<template>
  <ContainerWithHeading :heading="t('welcome')">
    <div class="links-grid">
      <LinkTile
        accent-color="#B3E277"
        :icon="Table"
        :title="t('substitutions_control')"
        class="links-grid__tile"
        to="/substitutions"
      />
      <LinkTile
        accent-color="#F97316"
        :icon="Users"
        :title="t('groups')"
        class="links-grid__tile"
        to="/groups"
      />
      <LinkTile
        accent-color="var(--clr-red-500)"
        :icon="ListOl"
        :title="t('schedule')"
        class="links-grid__tile"
        to="/timetable"
      />
      <LinkTile
        accent-color="#3B82F6"
        :icon="User"
        :title="t('users')"
        class="links-grid__tile"
        to="/users"
      />
      <LinkTile
        accent-color="#EC4899"
        :icon="CalendarDays"
        :title="t('calendar')"
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.links-grid {
  display: grid;
  grid-auto-rows: 15rem;
  gap: 1rem;
}

@media only screen and (min-width: 48em) {
  .links-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    height: 100%;

    &__tile {
      &:first-child {
        grid-column: span 2;
      }
    }
  }
}
</style>
