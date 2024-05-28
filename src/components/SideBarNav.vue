<template>
  <div class="overlay" :class="{ 'overlay-active': isNavOpen }"></div>
  <nav
    class="nav"
    @mouseenter="if (!isMobile) isNavOpen = true;"
    @mouseleave="if (!isMobile) isNavOpen = false;"
  >
    <div class="mobile-nav-header">
      <RouterLink to="/" class="logo-link">
        <Logo />
        <span>EduConnect <span>Admin</span></span>
      </RouterLink>

      <button @click="isNavOpen = !isNavOpen" class="mobile-nav-toggle">
        <Xmark v-if="isNavOpen" />
        <Bars v-else />
      </button>
    </div>

    <ul v-if="isMobile ? isNavOpen : true" class="nav__list">
      <li>
        <RouterLink
          @click="if (isMobile) isNavOpen = false;"
          to="/"
          class="logo-link"
        >
          <Logo />
          <span>EduConnect <span>Admin</span></span>
        </RouterLink>
      </li>
      <li @click="if (isMobile) isNavOpen = false;" class="nav__list-item">
        <RouterLink to="/" class="nav__link">
          <House class="icon" />
          <span>Главная</span>
        </RouterLink>
      </li>
      <li @click="if (isMobile) isNavOpen = false;" class="nav__list-item">
        <RouterLink to="/groups" class="nav__link">
          <Users class="icon" />
          <span>Группы</span>
        </RouterLink>
      </li>
      <li @click="if (isMobile) isNavOpen = false;" class="nav__list-item">
        <RouterLink to="/timetable" class="nav__link">
          <ListOl class="icon" />
          <span>Расписание</span>
        </RouterLink>
      </li>
      <li @click="if (isMobile) isNavOpen = false;" class="nav__list-item">
        <RouterLink to="/users" class="nav__link">
          <User class="icon" />
          <span>Пользователи</span>
        </RouterLink>
      </li>
      <li @click="if (isMobile) isNavOpen = false;" class="nav__list-item">
        <RouterLink to="/calendar" class="nav__link">
          <CalendarDays class="icon" />
          <span>Календарь</span>
        </RouterLink>
      </li>
      <li @click="if (isMobile) isNavOpen = false;" class="nav__image-item">
        <RouterLink to="/login">
          <img src="https://picsum.photos/200" alt="User Profile" />
        </RouterLink>

        <RouterLink class="nav__logout-btn" to="/login">Выход</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import {
  House,
  Users,
  ListOl,
  CalendarDays,
  Logo,
  User,
  Bars,
  Xmark,
} from "@/assets/icons/";
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";

const isMobile = useMediaQuery("(max-width: 48em)");

const isNavOpen = ref(false);
</script>

<style scoped lang="scss">
@media only screen and (max-width: 48em) {
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100vw;
    z-index: 1000;

    &__list {
      position: fixed;
      left: 0;
      top: 5.25rem;
      list-style: none;
      padding: 3rem 2rem;
      margin: 0;

      display: grid;
      gap: 1rem;
      place-items: end;
      width: 100%;
      max-width: 100vw;

      li {
        &:nth-child(1) {
          display: none;
        }
      }
    }

    &__list-item {
      .icon {
        width: 1.5rem;
        height: 100%;
        display: block;
        fill: white;
      }
    }

    &__image-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 2rem;

      img {
        width: 3rem;
        aspect-ratio: 1;
        border-radius: 100vmax;
      }
    }

    &__logout-btn {
      color: var(--clr-red-400);
      font-weight: var(--fw-bold);
    }

    &__link {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      gap: 0.75rem;
      font-size: var(--fs-600);
      font-weight: var(--fw-bold);
    }
  }

  .mobile-nav-header {
    display: flex;
    background-color: var(--clr-neutral-800);
    border-bottom: 1px solid var(--clr-neutral-700);
    padding: 1rem;

    align-items: center;
    justify-content: space-between;

    .logo-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-family: "Nunito Variable";
      font-weight: var(--fw-bold);
      font-size: var(--fs-400);
    }
  }

  .mobile-nav-toggle {
    background: none;
    border: none;

    svg {
      width: 1.5rem;
      height: 100%;
      display: block;
      fill: white;
    }
  }
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 500;

    pointer-events: none;
    display: none;
  }

  .overlay-active {
    display: block;

    opacity: 1;
    background-color: rgba(30, 30, 30, 0.65);
    backdrop-filter: blur(10px);
  }
}

@media only screen and (min-width: 48em) {
  .mobile-nav-header {
    display: none;
  }

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
      display: flex;
      align-items: center;
      gap: 1rem;

      img {
        border-radius: 50%;
        outline: 2px solid var(--clr-neutral-600);
        max-width: 3rem;
      }
    }

    &__logout-btn {
      color: rgb(227, 72, 72);
      display: none;
    }

    &:hover {
      width: 15.5rem;

      .nav__logout-btn {
        display: block;
        animation: fadeInFull 150ms ease;
      }

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
}
</style>
