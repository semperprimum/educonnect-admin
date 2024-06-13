<template>
  <ContainerWithHeading :heading="getDynamicHello() + '!'">
    <div class="links-grid">
      <LinkTile
        v-if="authStore.checkPrivilege('Operator')"
        accent-color="#B3E277"
        :icon="Table"
        :title="t('substitutions_control')"
        class="links-grid__tile"
        to="/substitutions"
      />
      <LinkTile
        v-if="authStore.checkPrivilege('GroupManager')"
        accent-color="#F97316"
        :icon="Users"
        :title="t('groups')"
        class="links-grid__tile"
        to="/groups"
      />
      <LinkTile
        v-if="authStore.checkPrivilege('ScheduleCoordinator')"
        accent-color="var(--clr-red-500)"
        :icon="ListOl"
        :title="t('schedule')"
        class="links-grid__tile"
        to="/schedule"
      />
      <LinkTile
        v-if="authStore.checkPrivilege('SuperAdmin')"
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
import { useAuthStore } from "@/stores/auth";

const { t } = useI18n();
const authStore = useAuthStore();

const getDynamicHello = () => {
  const today = new Date();
  const currentHour = today.getHours();

  if (currentHour < 12) {
    return t("good_morning");
  } else if (currentHour < 18) {
    return t("good_afternoon");
  } else {
    return t("good_evening");
  }
};
</script>

<style lang="scss" scoped>
.links-grid {
  display: grid;
  grid-auto-rows: 15rem;
  gap: 1rem;
}

@media only screen and (min-width: 68.75em) {
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
