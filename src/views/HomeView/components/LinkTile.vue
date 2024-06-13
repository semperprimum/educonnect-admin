<template>
  <div class="tile" :style="{ '--clr-accent': accentColor }">
    <component :is="icon" class="tile__icon" />

    <h2 class="tile__title">{{ title }}</h2>

    <Button
      @click="router.push(to)"
      elevated
      center
      class="tile__btn"
      :label="t('go')"
      :trailing="ArrowRight"
    />
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import ArrowRight from "@/assets/icons/ArrowRight.vue";
import type { Component } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();

const { t } = useI18n();

defineProps<{
  title: string;
  icon: Component;
  accentColor: string;
  to: string;
}>();
</script>

<style lang="scss" scoped>
.tile {
  position: relative;
  border: 1px solid var(--clr-neutral-600);
  background: var(--clr-neutral-700);
  border-radius: 1rem;
  padding: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (min-width: 68.75em) {
    background: var(--clr-neutral-700)
      radial-gradient(var(--clr-accent) 0%, var(--clr-neutral-700) 50%);
    background-size: 100rem 100rem;
    background-position: bottom -55rem right -55rem;
    background-repeat: no-repeat;
  }

  /* &::before {
    content: "";
    height: 100%;
    aspect-ratio: 1;
    background-color: var(--clr-accent);
    position: absolute;
    right: -5rem;
    bottom: -5rem;
    border-radius: 100vmax;
    filter: blur(5rem);
    opacity: 0.4;
    z-index: 1;
  } */

  &__btn {
    position: relative;
    z-index: 20;
    mix-blend-mode: color-dodge;
    text-shadow: 0 0 10px black;
  }

  &__icon {
    position: absolute;
    left: -2.5rem;
    bottom: -2.5rem;
    rotate: 45deg;
    max-width: 20rem;
    max-height: 20rem;
    z-index: 5;

    fill: var(--clr-neutral-700);
    mix-blend-mode: color-dodge;
    opacity: 0.5;
  }

  &__title {
    font-size: var(--fs-600);
    position: relative;
    z-index: 50;
  }
}
</style>
