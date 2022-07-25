<template>
  <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="post">
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

<script>
import { ref } from "vue";

export default {
  name: "Modal",
  props: {
    post : {
      type : Object,
      required : true
    },

  },
  setup () {
    const dialogFormVisible = ref(true)

    return {dialogFormVisible}
  }
};
</script>

<style scoped>

</style>