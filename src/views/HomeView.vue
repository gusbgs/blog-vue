<template>
  <div v-for="post in posts" :key="post">
    <router-link :to="{name: 'detailpost', params: {slug : post.slug}}" class="block">
      <h1 href="" class="text-3xl sm:text-4xl leading-10 font-extrabold tracking-tight text-gray-900">{{post.title}}</h1>
      <p v-html="post.body" class="mt-6 text-gray-600"></p>
    </router-link>
  </div>
</template>

<script>
import {onMounted} from 'vue'
import usePosts from "../api/usePosts";
import { useStore } from 'vuex';

export default {
  name: "HomeView",
  setup () {
    const {posts, fetchPosts} = usePosts()

    onMounted(fetchPosts)
    return {
      posts
    }
  }
};
</script>

<style scoped>

</style>