<template>
  <div
    class="overlay"
    :class="{ 'overlay-active': isNavHovered }"
  ></div>
  <nav
    class="nav"
    @mouseenter="isNavHovered = true"
    @mouseleave="isNavHovered = false"
  >
    <ul class="nav__list">
      <li>
        <RouterLink
          to="/"
          class="logo-link"
        >
          <Logo />
          <span>EduConnect <span>Admin</span></span>
        </RouterLink>
      </li>
      <li class="nav__list-item">
        <RouterLink
          to="/"
          class="nav__link"
        >
          <House class="icon" />
          <span>Главная</span>
        </RouterLink>
      </li>
      <li class="nav__list-item">
        <RouterLink
          to="/"
          class="nav__link"
        >
          <Table class="icon" />
          <span>Успеваемость</span>
        </RouterLink>
      </li>
      <li class="nav__list-item">
        <RouterLink
          to="/"
          class="nav__link"
        >
          <ListOl class="icon" />
          <span>Расписание</span>
        </RouterLink>
      </li>
      <li class="nav__list-item">
        <RouterLink
          to="/"
          class="nav__link"
        >
          <UsersRectangle class="icon" />
          <span>Класс</span>
        </RouterLink>
      </li>
      <li class="nav__list-item">
        <RouterLink
          to="/"
          class="nav__link"
        >
          <CalendarDays class="icon" />
          <span>Календарь</span>
        </RouterLink>
      </li>
      <li class="nav__list-item">
        <RouterLink
          to="/"
          class="nav__link"
        >
          <Book class="icon" />
          <span>Библиотека</span>
        </RouterLink>
      </li>
      <li class="nav__image-item">
        <RouterLink to="/">
          <img
            src="https://picsum.photos/200"
            alt="User Profile"
          />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import House from "@/assets/icons/House.vue";
import Table from "@/assets/icons/Table.vue";
import ListOl from "@/assets/icons/ListOl.vue";
import UsersRectangle from "@/assets/icons/UsersRectangle.vue";
import CalendarDays from "@/assets/icons/CalendarDays.vue";
import Book from "@/assets/icons/Book.vue";
import Logo from "@/assets/icons/Logo.vue";

import { ref } from "vue";
const isNavHovered = ref(false);
</script>

<style scoped lang="scss">
.nav {
  width: 6.25rem;
  height: 100vh;
  background-color: var(--clr-neutral-800);
  position: fixed;
  padding: 1.5rem;
  border-right: 1px solid var(--clr-neutral-700);
  z-index: 650;

  transition: width 150ms ease;

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;

    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__list-item {
    transition: filter 150ms ease;

    &:hover {
      filter: brightness(1.25);
    }
  }

  &__link {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: 0.75rem;
    font-weight: bold;

    border-radius: 0.5rem;
    background-color: var(--clr-neutral-700);
    outline: 1px solid var(--clr-neutral-600);

    padding: 0.5rem;
    padding-left: 0.6rem;

    span {
      display: none;
    }

    svg {
      flex-shrink: 0;
    }
  }

  &__image-item {
    margin-top: auto;

    img {
      border-radius: 50%;
      outline: 2px solid var(--clr-neutral-600);
      max-width: 3rem;
    }
  }

  &:hover {
    width: 15.5rem;

    .nav__link,
    .logo-link {
      span {
        display: block;
        animation: fadeInFull 150ms ease forwards;
        line-height: 1;
        text-align: center;
      }
    }
  }
}

.logo-link {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1.5rem;

  span {
    display: none;
    font-family: "Nunito Variable";
    font-size: 1.5rem;
    font-weight: bold;
  }

  svg {
    flex-shrink: 0;
  }
}

.icon {
  fill: var(--clr-neutral-100);
  width: 2rem;
  aspect-ratio: 1;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 500;

  background-color: var(--clr-neutral-900);
  opacity: 0.5;

  pointer-events: none;
  display: none;
}

.overlay-active {
  display: block;
  animation: fadeInHalf 150ms ease;
}
</style>
