<template>
  <section class="w-full max-w-6xl not-prose">
    <h2>Study Notes - Data Science</h2>
    <div class="column space-x-24 ml-6">
      <div>Category</div>
      <div>Title</div>
    </div>
    <ul>
      <li style="list-style: none" v-for="post in posts" :key="post._path">
        <NuxtLink
          :to="post._path"
          class="column hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <div
            :class="{
              'text-white ': !post.displayCategory,
              'text-gray-900': post.displayCategory,
            }"
          >
            {{ post.category }}
          </div>
          <div class="pl-6">{{ post.title }}</div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
useHead({
  title: "DS - Study Notes",
  meta: [{ name: "description", content: "Data Science - Study Notes " }],
});

const { data } = await useAsyncData("notes-list", () =>
  queryContent("/notes")
    .where({ _path: { $ne: "/notes" } })
    .only([
      "_path",
      "title",
      "publishedAt",
      "category",
      "sequence",
      "link",
      "image",
    ])
    .sort({ publishedAt: -1 })
    .sort({ category: 1 })
    .find()
);

const posts = computed(() => {
  if (!data.value) {
    return [];
  }

  const result = [];
  let lastCategory = null;

  for (const post of data.value) {
    const publishedDate = new Date(post.publishedAt);
    const year = publishedDate.getFullYear();
    const month = publishedDate.getMonth() + 1; // Adding 1 because getMonth returns a zero-based index (0 for January)
    const day = publishedDate.getDate();

    // Format the date as desired (e.g., YYYY-MM-DD)
    const fullDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;

    const category = post.category;

    const displayCategory = category !== lastCategory;

    post.displayCategory = displayCategory;
    post.categorykeep = category;
    post.fullDate = fullDate;
    result.push(post);
    lastCategory = category;
  }

  return result;
});
</script>

<style scoped>
.column {
  @apply flex  py-1;
}
</style>
