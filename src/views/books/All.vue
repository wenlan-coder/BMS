<template>
  <div class="app-container">
    <el-backtop bottom="100">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }
        "
      >
        T
      </div>
    </el-backtop>
      <el-row>
        <search-bar></search-bar>
      </el-row>
      <el-row class="category">
        <category></category>
      </el-row>
        <books></books>

  </div>
</template>

<script>
import SearchBar from "@/components/library/SearchBar.vue";
import Category from '@/components/library/Category.vue';
import Books from '@/components/library/Books.vue';
export default {
  mame: "all",
  components: {
    SearchBar,
    Category,
    Books,
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  /* background-color: #B3C0D1; */
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;

  height: 1000vh;
}
.books {
  display: block;
  margin: 20px 30px  20px
}
.el-category{
  margin: 0 auto;

}

</style>