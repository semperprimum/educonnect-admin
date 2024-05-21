<template>
  <h1
    v-if="heading"
    class="heading"
  >
    {{ heading }}
  </h1>
  <h1
    v-else
    class="sr-only"
  >
    EduConnect Admin
  </h1>

  <div
    class="container"
    :class="{ noContainerOverflow: 'no-overflow' }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  heading: {
    type: String,
    required: false,
  },
  noContainerOverflow: {
    type: Boolean,
    required: false,
  },
});
</script>

<style lang="scss" scoped>
.heading {
  font-size: var(--fs-800);
  font-weight: var(--fw-extrabold);
  margin-bottom: 1rem;
  line-height: 1;
}

.container {
  flex-grow: 1;

  scrollbar-color: var(--clr-neutral-600) transparent;
  scrollbar-width: thin;

  @media only screen and (min-width: 48em) {
    overflow-y: auto;

    background-color: var(--clr-neutral-800);
    border: 1px solid var(--clr-neutral-700);
    border-radius: 1.5rem;
    padding: 1rem;
  }
}

.no-overflow {
  overflow: hidden;
}
</style>
