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

  <div class="container">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  heading: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss" scoped>
.heading {
  font-size: 3rem;
  font-weight: 700;
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
</style>
