import { ref } from "vue"
import axios from "axios"
// Composeable
export default function usePosts() {
  //menampung semua data post
  const posts = ref([])
  // menampung detail data post
  const post = ref([])

  // Mengambil semua data post yang memiliki status publish
  const fetchPosts = async () => {
    let response = await axios.get('api/post')
    posts.value = response.data.data
    console.log(response)
  }
  // mengambil detail data post berdasarkan slug
  const fetchPost = async (slug) => {
    console.log(slug)
    let response = await axios.get(`api/post/${slug}`)
    post.value = response.data.data
  }
  return {post,posts, fetchPosts, fetchPost}
}