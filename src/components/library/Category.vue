<template>
<div class="app-container">
      <el-menu
            default-active="0"
            class="el-category"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="0">
              <i class="el-icon-reading text_eff"></i>
              <span slot="title" class="text_eff">全部</span>
            </el-menu-item>
            <el-menu-item 
            v-for="item in categoryList"
            :key="item._id"
            :index="item._id">
              <i class="el-icon-reading text_eff"></i>
              <span slot="title" class="text_eff">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
</div>
</template>

<script>
import {getCategoryList} from '@/api/category'
export default {
    name:"Category",
    index:0,
    mounted(){
      this.fetchCategoryList()
    },
    data(){
      return {
        categoryList:[]}
    },
    methods:{
      handleSelect(index,inexPath){
        // console.log(index);
        this.$emit('indexSelect',index)
      },
      fetchCategoryList(){
        getCategoryList().then((res)=>{
          this.categoryList = res.data;
          // console.log(this.categoryList); 
        })
      }
    }

}
</script>

<style scoped>
 .text_eff:hover{
    padding: 1px;
    color: cornflowerblue;
  }
.el-category .el-menu-item:hover{
  color: royalblue;
}

</style>