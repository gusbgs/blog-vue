<template>
  <router-link :to="{name : 'home'}">
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </router-link>
  <h1 class="block text-center text-5xl sm:text-4xl leading-10 font-extrabold tracking-tight text-gray-900">
    {{post.title}}
  </h1>
  <div v-html="post.body" class="mt-16 text-gray-500 prose prose-sm lg:prose">

  </div>
</template>

<script>
import usePosts from "../api/usePosts";
import {onMounted} from "vue";

export default {
  name: "PostsView",
  props : {
    slug : {
      required : true,
      type : String
    }
  },
  setup (props) {
    const {post,fetchPost} = usePosts()
    onMounted(fetchPost(props.slug))
    return {post}
  }
};
</script>

<style scoped>

</style>