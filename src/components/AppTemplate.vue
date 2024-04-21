<template>
  <main class="app-wrapper">
    <SideBarNav />
    <div class="content-wrapper">
      <ContainerWithHeading :heading="heading || ''">
        <slot></slot>
      </ContainerWithHeading>
    </div>
  </main>
</template>

<script setup>
import SideBarNav from "@/components/SideBarNav.vue";
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";

const props = defineProps({
  heading: {
    required: false,
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.content-wrapper {
  padding: 2rem;
  margin-left: 6.25rem;

  display: flex;
  flex-direction: column;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 5px;
  }

  @media only screen and (min-width: 48em) {
    padding: 2rem 5rem;
  }
}
</style>
