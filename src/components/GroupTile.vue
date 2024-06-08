<template>
  <div class="tile" :style="{ '--accent-color': '#' + group.color + 'a6' }">
    <h2 class="tile__heading">{{ group.title }}</h2>
    <p class="tile__students">{{ group.students_count }} студентов</p>
    <p class="tile__curator">
      <component aria-hidden="true" class="tile__icon" :is="CircleUser" />
      {{ group.curator }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import CircleUser from "@/assets/icons/CircleUser.vue";
import type { Group } from "@/types";

defineProps<{
  accentColor?: string;
  group: Group;
}>();
</script>

<style lang="scss" scoped>
.tile {
  --accent-color: var(--clr-neutral-500);

  position: relative;
  // background-color: var(--clr-neutral-700);
  border: 1px solid var(--clr-neutral-600);
  border-radius: 1rem;
  padding: 1rem;
  overflow: hidden;
  z-index: 10;

  &__heading {
    font-size: var(--fs-600);
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5rem;
    color: var(--clr-neutral-100);
  }

  &__students {
    color: var(--clr-neutral-300);
    font-weight: var(--fw-medium);
  }

  &__curator {
    color: var(--clr-neutral-300);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: var(--fw-medium);

    margin-top: 1rem;
  }

  &__icon {
    width: 1rem;
    aspect-ratio: 1;
    fill: currentColor;
  }

  background: var(--clr-neutral-700)
    radial-gradient(circle, var(--accent-color) 0%, var(--clr-neutral-700) 50%);
  background-size: 20rem 20rem;
  background-position: center left -7rem;
  background-repeat: no-repeat;

  /* &::before {
    content: "";
    position: absolute;
    width: 50%;
    aspect-ratio: 1;
    background-color: var(--accent-color);
    opacity: 0.65;
    border-radius: 100vmax;
    filter: blur(100rem);
    z-index: -1;

    left: -2rem;
    top: 50%;
    transform: translateY(-50%);
  } */

  @media only screen and (min-width: 48em) {
    transition:
      filter 150ms ease,
      scale 150ms ease;
    cursor: pointer;

    &:hover {
      filter: brightness(1.25);
      scale: 1.015;
    }
  }
}
</style>
