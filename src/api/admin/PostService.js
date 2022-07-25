import { ref } from "vue"
import axios from "axios"
// Composeable
export default function useAdminPost() {
  //menampung semua data post
  const posts = ref([])
  // Mengambil semua data post
  const fetchPosts = async () => {
    let response = await axios.get('api/admin/post')
    posts.value = response.data.data
  }

  const editPost = async (slug) => {
    let response = await axios.get(`api/admin/post/${slug}`)
    posts.value = response.data.data
  }
  const showComments = async (slug) => {
    let response = await axios.get(`api/admin/comments/post/${slug}`)
    return response.data.data
  }
  const createPost = async () => {
    let response = await axios.post('api/admin/post')
    return response.data.data
  }

  const updatePost = async (uuid) => {
    let response = await axios.patch(`api/admin/comments/post/${uuid}`,posts.value)

    return response.data.data
  }


  return {createPost, posts, fetchPosts, editPost, updatePost,showComments}
}