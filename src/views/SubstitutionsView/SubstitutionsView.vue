<template>
  <ContainerWithHeading heading="Управление заменами">
    <div class="pair">
      <div class="left">
        <div v-if="selectedRequests">
          <Accordion
            v-for="requests in selectedRequests"
            manual
            manual-is-open
            big-name
            name="П-21-57к"
          >
            <div v-for="request in requests" class="request">
              <div class="request__info">
                <p class="request__professor">
                  {{ request.subject.teacher_subject.teacher.fio }}
                </p>
                <span class="request__details"
                  >{{ request.number }} пара, Основы Front-End, Вся группа</span
                >
              </div>

              <div class="request__buttons">
                <Button
                  @click="onReject(request.id)"
                  label="Отклонить"
                  danger
                />
                <Button
                  @click="onApprove(request.id)"
                  label="Одобрить"
                  elevated
                />
              </div>
            </div>
          </Accordion>
        </div>

        <div class="no-requests" v-else>
          <p>Нет запросов</p>
        </div>
      </div>
      <div class="right">
        <Calendar
          v-model="selectedDate"
          :attributes="substitutionStore.highlights ? attributes : undefined"
        />
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
import { onMounted } from "vue";
import { useSubstitutionStore } from "@/stores/substitution";
import { ref } from "vue";
import { watch } from "vue";
import type { Ref } from "vue";
import { computed } from "vue";
import { useGeneralStore } from "@/stores/general";

const substitutionStore = useSubstitutionStore();
const generalStore = useGeneralStore();

const selectedDate = ref(new Date());
const selectedDateIso = computed(
  () => selectedDate.value.toISOString().split("T")[0],
);
const selectedRequests = computed(
  () => substitutionStore.formattedList[selectedDateIso.value],
);

const attributes: Ref<[{ highlight: string; dates: Date[] }]> = ref([
  { highlight: "gray", dates: [] },
]);

onMounted(async () => {
  await substitutionStore.fetchRequestsListDateRange();
  updateAttributes();
});

const updateAttributes = () => {
  attributes.value = [
    {
      highlight: "gray",
      dates: substitutionStore.highlights,
    },
  ];
};

watch(() => substitutionStore.highlights, updateAttributes);

const onApprove = async (id: number) => {
  await substitutionStore.approveSubstitution(id);
};

const onReject = async (id: number) => {
  await substitutionStore.rejectSubstitution(id);
};
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

.no-requests {
  height: 100%;
  display: grid;
  place-items: center;

  p {
    color: var(--clr-neutral-300);
    font-size: var(--fs-500);
    font-weight: var(--fw-bold);
  }
}
</style>
