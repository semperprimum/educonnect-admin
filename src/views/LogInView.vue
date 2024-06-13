<template>
  <main class="wrapper">
    <div class="container">
      <h1 class="heading">
        <span class="heading__pair">
          <Logo aria-hidden="true" class="heading__logo" />
          <span class="heading__span-edu">Edu</span>Connect
        </span>
        <span class="heading__span-admin">Admin</span>
      </h1>

      <form @submit.prevent="signIn" class="form">
        <Input placeholder="Логин" v-model="login" />
        <Input placeholder="Пароль" v-model="password" type="password" />

        <span class="error" v-if="authStore.error"
          >Неверный логин или пароль.</span
        >

        <GradientButton
          :is-loading="authStore.isLoading"
          class="button"
          label="Войти"
        />
      </form>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Logo from "@/assets/icons/Logo.vue";
import Input from "@/components/ui/Input.vue";
import GradientButton from "@/components/GradientButton.vue";

import { useRouter } from "vue-router";

import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const login = ref("");
const password = ref("");

const signIn = async () => {
  if (!login.value || !password.value) return;

  await authStore.login({ login: login.value, password: password.value });

  if (!authStore.token) return;

  router.replace("/");
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  place-content: center;
  height: 100vh;
}

.error {
  display: block;
  color: var(--clr-red-400);
}

.container {
  background-color: var(--clr-neutral-800);
  padding: 1.5rem 1rem;
  border-radius: 1.5rem;
  border: 1px solid var(--clr-neutral-700);

  min-width: 25.5rem;
}

.heading {
  text-align: center;
  font-family: "Nunito Variable", sans-serif;
  font-size: 3rem;
  line-height: 0.85;

  &__logo {
    margin-right: 1rem;
  }

  &__pair {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__span-edu {
    color: var(--clr-brand);
  }

  &__span-admin {
    font-size: 2rem;
  }
}

.form {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.button {
  margin-top: 0.5rem;
}
</style>
