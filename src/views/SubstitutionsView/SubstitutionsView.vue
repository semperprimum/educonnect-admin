<template>
  <ContainerWithHeading heading="Управление заменами">
    <div class="pair">
      <div class="left">
        <Accordion manual manual-is-open big-name name="П-21-57к">
          <div class="request">
            <div class="request__info">
              <p class="request__professor">Попов Денис Валентинович</p>
              <span class="request__details"
                >1 пара, Основы Front-End, Вся группа</span
              >
            </div>

            <div class="request__buttons">
              <Button label="Отклонить" danger />
              <Button label="Одобрить" elevated />
            </div>
          </div>
        </Accordion>
        <Accordion big-name name="П-21-56б" />
        <Accordion big-name name="П-21-55гб" />
        <Accordion big-name name="Ис-21-45к" />
        <Accordion big-name name="Ис-21-44б" />
        <Accordion big-name name="Ис-21-43гб" />
        <Accordion big-name name="Ди-21-44б" />
        <Accordion big-name name="Ди-20-43б" />
        <Accordion big-name name="Ди-20-43к" />
      </div>
      <div class="right">
        <Calendar :date="new Date()" :attributes="attributes" />
        <GroupSchedule />
      </div>
    </div>
  </ContainerWithHeading>
</template>

<script lang="ts" setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import GroupSchedule from "@/views/SubstitutionsView/components/GroupSchedule.vue";
import Calendar from "@/components/Calendar.vue";
import Accordion from "@/components/Accordion.vue";
import Button from "@/components/ui/Button.vue";

const attributes = [
  {
    highlight: "gray",
    dates: [
      new Date(2024, 5, 7),
      new Date(2024, 5, 12),
      new Date(2024, 5, 14),
      new Date(2024, 5, 20),
    ],
  },
];
</script>

<style lang="scss" scoped>
.pair {
  display: flex;
  gap: 1rem;

  @media only screen and (max-width: 48em) {
    flex-direction: column-reverse;
  }
}

.left {
  flex: 1;

  & > * {
    margin-bottom: 1rem;
  }
}

.right {
  display: grid;
  gap: 1rem;
}

.request {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  &__professor {
    font-weight: var(--fw-medium);
  }

  &__details {
    font-size: var(--fs-100);
    color: var(--clr-neutral-300);
  }

  &__buttons {
    display: flex;
    gap: 0.5rem;

    button {
      border-radius: 100vmax;
    }
  }

  @media only screen and (max-width: 48em) {
    flex-direction: column;
  }
}
</style>
