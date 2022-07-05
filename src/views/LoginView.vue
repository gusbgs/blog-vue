<template>
  <form @submit.prevent="login">
    <div class="mb-6">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
      <input v-model="form.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required="">
      <p class="mt-2 text-sm text-red-600" v-if="errors.email">{{errors.email[0]}}</p>
    </div>q
    <div class="mb-6">
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
      <input v-model="form.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
      <p class="mt-2 text-sm text-red-600" v-if="errors.password">{{errors.password[0]}}</p>
    </div>

    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form>
</template>

<script>
import {useStore} from "vuex";
import { reactive, ref } from "vue";
import {useRouter} from 'vue-router';
export default {
  name: "LoginView",
  setup () {
    const store = useStore()
    const router = useRouter()

    const form = reactive({
      email : '',
      password : ''
    })
    const errors = ref([])
    const login = () => {
      store.dispatch('login', form).then(() => {
          router.replace({name: 'admin.posts'})
      }).catch((e) => {
        if(e.response.status === 422){
          errors.value = e.response.data.errors
        }
      })
    }
    return {login,form,errors}
  }
};
</script>

<style scoped>

</style>