<template>
  {{posts}}
  <router-link :to="{name : 'admin.posts'}">
    <button type="button" class="mb-2 bg-gray-300 hover:bg-blue-800 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Back
    </button>
  </router-link>
  <div class="p-6  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <form>
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
        <input type="text" id="email" v-model="posts.title" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required="">
      </div>
      <div class="mb-6">
        <label for="teaser" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Teaser</label>
        <input type="text" id="teaser" v-model="posts.teaser" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="">
      </div>
      <div class="mb-6">
        <label for="body" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Body</label>
        <textarea id="message" v-model="posts.body"   rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
      </div>
      <div class="mb-6">
        <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Publish</label>
        <el-radio-group v-model="posts.published" >
          <el-radio label="1" size="large" border>Option A</el-radio>
          <el-radio label="2" size="large" border>Option B</el-radio>
        </el-radio-group>
      </div>

      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Data</button>
    </form>

<!--    <a href="#">-->
<!--      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {{post.title}}</h5>-->
<!--    </a>-->
<!--    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400" v-html="post.body"></p>-->

  </div>
</template>

<script>
import useAdminPost from '../../api/admin/PostService'
import { onMounted, watch } from "vue";
import _ from 'lodash'
export default {
  name: "EditPost",
  props : {
    slug : {
      required : true,
      type : String
    }
  },
  setup (props) {
    const {posts,updatePost,editPost } = useAdminPost()

    const ubahDataPost = async () => {
      await updatePost(props.slug)
    }

    onMounted(async () => {
      await editPost(props.slug)

      watch(() => _.cloneDeep(posts), _.debounce(()=> {
        ubahDataPost()
      }, 500))

    })
    return {posts}
  }
};
</script>

<style scoped>

</style>