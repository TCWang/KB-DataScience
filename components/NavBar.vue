<template>
  <nav class="bg-indigo-800 text-white">
    <div class="container mx-auto px-4 md:flex items-center gap-6">
      <!-- Logo -->
      <div class="flex items-center justify-between md:w-auto w-full">
        <a href="/" class="flex items-center py-2 px-1 text-white flex-1">
          <span class="font-bold">Data Science</span>
        </a>
        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMobileMenu" class="mobile-menu-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <title>bars-3-bottom-left</title>
              <g fill="none">
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
      <!-- Primary Navigation -->
      <div
        :class="{
          hidden: !mobileMenuOpen,
          block: mobileMenuOpen,
          'md:flex': true,
        }"
        class="md:flex-row flex-col items-center justify-start md:space-x-1 navigation-menu pb-3 md:pb-0"
      >
        <a class="py-2 px-3 block text-white" href="/group">StudyGroup</a>
        <!-- Dropdown Menu -->
        <div class="relative" v-for="(item, index) in menuItems" :key="index">
          <button
            @click="toggleDropdown(index)"
            class="dropdown-toggle py-2 px-3 hover:bg-indigo-500 flex items-center gap-2 rounded"
          >
            <span class="pointer-events-none">{{ item.name }}</span>
            <svg
              class="w-3 h-3 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <title>chevron-down</title>
              <g fill="none">
                <path
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </button>
          <div
            v-if="item.open"
            class="dropdown-menu absolute bg-indigo-500 text-white rounded-b-lg pb-2 w-64 z-10"
          >
            <a
              v-for="(submenu, i) in item.submenu"
              :key="i"
              :href="submenu.link"
              class="block pl-4 md:pl-4 pr-2 py-2 hover:bg-indigo-800 text-white"
              >{{ submenu.name }}</a
            >
          </div>
        </div>

        <!-- Single Page -->
        <a class="py-2 px-3 block text-white" href="/notes">Study Notes</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false,
      menuItems: [
        {
          name: "Job Survey",
          open: false,
          submenu: [
            { name: "Job Description", link: "/survey/description" },
            { name: "Market Survey", link: "/survey/market" },
            { name: "Market Demand", link: "/survey/demand" },
          ],
        },
        {
          name: "Study Plan",
          open: false,
          submenu: [
            { name: "Pathway", link: "/plan/pathway" },
            { name: "Certification", link: "/plan/certification" },
            { name: "Training Material", link: "/plan/training" },
          ],
        },
      ],
    };
  },
  methods: {
    toggleDropdown(index) {
      this.menuItems.forEach((item, i) => {
        if (i === index) {
          item.open = !item.open;
        } else {
          item.open = false;
        }
      });
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
  },
};
</script>

<style scoped>
/* Ensure dropdown menu covers subsequent items in mobile mode */
.dropdown-menu {
  z-index: 10;
}
@media (max-width: 767px) {
  .dropdown-menu {
    position: static;
  }
  .dropdown-menu a {
    padding-left: 2rem; /* Adjust padding as needed */
  }
  .navigation-menu a {
    padding-left: 0.8rem; /* Align all items including StudyGroup */
  }
}
</style>
