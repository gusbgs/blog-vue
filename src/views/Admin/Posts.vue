<template>
  <el-button type="primary" class="mb-5" @click="newPost">Add Post</el-button>
  <el-button text @click="dialogFormVisible = true"
  >open a Form nested Dialog</el-button
  >
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Title
        </th>
        <th scope="col" class="px-6 py-3">
          Body
        </th>
        <th scope="col" class="px-6 py-3">
          Teaser
        </th>
        <th scope="col" class="px-6 py-3">
          Status Publish
        </th>
        <th scope="col" class="px-6 py-3">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="post in posts" :key="post.uuid" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
          {{post.title}}
        </th>
        <td class="px-6 py-4" v-html="post.body">
        </td>
        <td class="px-6 py-4">
          {{post.teaser}}
        </td>
        <td class="px-6 py-4">
          <span :class="[post.published == true ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-500']" class=" text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"> {{post.published ? 'Published' : 'Unpublished'}}</span>
        </td>
        <td class="px-6 py-4 text-right flex justify-between gap-4">
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="openModalShowComment(post.id)">Detail Comment</a>
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="showData(post)">Show</a>
          <a href="#" class="font-medium text-warning-500 dark:text-blue-500 hover:underline" @click="edit(post.slug)">Edit</a>
          <a href="#" class="font-medium text-red-500 dark:text-blue-500 hover:underline">Delete</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

<!--  <el-table :data="posts" border style="width: 100%" class="mt-5">-->
<!--    <el-table-column prop="title" label="title" width="180" />-->
<!--    <el-table-column  label="body" width="200">-->
<!--      <template #default="scope">-->
<!--          <p v-html="scope.row.body"></p>-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column prop="teaser" label="teaser" />-->
<!--    <el-table-column prop="published" label="published" width="150" >-->
<!--      <template #default="scope">-->
<!--        <el-tag-->
<!--          :type="scope.row.published == true ? 'success' : 'danger'"-->
<!--          disable-transitions-->
<!--        >{{ scope.row.published ? 'Published' : 'Unpublished' }}</el-tag-->
<!--        >-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--    <el-table-column prop="slug" label="Action" width="200">-->
<!--      <template #default="scope">-->
<!--        <el-button type="warning" class="mb-5" @click="edit(scope.row.slug)">Edit</el-button>-->
<!--        <el-button type="primary" class="mb-5">Show</el-button>-->
<!--        <el-button type="secondary" class="mb-5">Delete</el-button>-->
<!--      </template>-->
<!--    </el-table-column>-->
<!--  </el-table>-->
  <KeepAlive>
    <el-dialog v-model="dialogShowComment" title="Detail Comments">
      <el-table :data="comments">
        <el-table-column property="body" label="Comments" width="150" />
        <el-table-column property="created_at" label="Created At" width="200" />
        <el-table-column property="updated_at" label="Updated At" />
      </el-table>
    </el-dialog>

  </KeepAlive>

  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.title"  autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select  placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script >
import PostService from "../../api/admin/PostService"
import { onMounted, ref } from "vue";
import { useRouter} from "vue-router"
export default {
  setup() {
    const {fetchPosts, posts, createPost,showComments} = new PostService()
    const router = useRouter()
    const dialogFormVisible = ref(false)
    const dialogShowComment = ref(false)
    const formLabelWidth = '140px'
    const form = ref()
    const comments = ref([])
    const openModalShowComment = async (slug) => {
      let result = await showComments(slug)
      dialogShowComment.value = true
      comments.value = result
    }
    const showData = (data) => {
      dialogFormVisible.value = true
      console.log(form)
      form.value = data
    }
    const edit = async (slug) => {
      router.replace({name : 'admin.posts.edit', params: {slug: slug}})
    }

    const newPost = async () => {
      let post = await createPost()

      // Menambahkan data post ke  urutan terakhir dari array posts
      posts.value.unshift(post)
      //router.replace({name : 'admin.posts.edit', params: {slug: post.slug}})
    }

    // Ketika halaman ini diload maka fetch post / ambil data dari composeable
    // onMounted(fetchPosts, console.log(dialogFormVisible))
    onMounted(()=> {
      fetchPosts(), console.log(dialogFormVisible)
    })
    return { comments,posts, newPost, edit, dialogFormVisible, form,showData,formLabelWidth,openModalShowComment,dialogShowComment};
  },
};
</script>

<style scoped></style>
