<template>
  <div class="app-conmtainer">
    <el-row class="message-search">
      <search-bar></search-bar>
      <edit-form></edit-form>
    </el-row>
    
  </div>
</template>

<script>
import SearchBar from '@/components/library/SearchBar.vue'
import EditForm from './EditForm.vue'
export default {
  name:"BooksMessage",
  components:{
    SearchBar,
    EditForm,
  }

}
</script>

<style>
.message-search{
  margin-top: 30px;


}


</style>