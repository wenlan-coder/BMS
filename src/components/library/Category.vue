<template>
<div class="app-container">
      <el-menu
            default-active="0"
            class="el-category"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <i class="el-icon-reading text_eff"></i>
              <span slot="title" class="text_eff">全部</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-reading text_eff"></i>
              <span slot="title" class="text_eff">历史</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-reading text_eff"></i>
              <span slot="title" class="text_eff">文化</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-reading text_eff"></i>
              <span slot="title" class="text_eff">爱情</span></el-menu-item
            >
            <el-menu-item index="5">
              <i class="el-icon-reading text_eff"></i>
              <span slot="title" class="text_eff">爱情</span></el-menu-item
            >
            <el-menu-item index="6">
              <i class="el-icon-reading text_eff"></i>
              <span slot="title" class="text_eff">爱情</span></el-menu-item
            >
          </el-menu>
</div>
</template>

<script>
export default {
    name:"Category"

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