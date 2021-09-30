<template>
  <div class="app-container">
    <el-backtop :bottom=100>
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
        ^-^
      </div>
    </el-backtop>
      <el-row>
        <search-bar @onSearch = "searchResult" ref="searchBar"></search-bar>
      </el-row>
      <el-row class="category">
        <category @indexSelect="listByCategory" ref="category"></category>
      </el-row>
        <books class="books-area" ref="booksArea"></books>

  </div>
</template>

<script>
import {selectCategory,searchBooks} from '@/api/books'
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
  data(){
    return{
      bottom:100,

    }
  },
  methods:{
        //处理搜索请求
    searchResult(){
      console.log(this.$refs.searchBar.keywords);
      if(!this.$refs.searchBar.keywords) this.$refs.loadBooks()
      searchBooks({"keyword":this.$refs.searchBar.keywords}).then((res)=>{
        if(res.code===200){
          this.$refs.booksArea.books = res.data
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    listByCategory(index){
      console.log("父组件里面",index);
      selectCategory({key:index}).then((res)=>{
        if(res.code === 200){
          this.$refs.booksArea.books = res.data
        }
        // console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
      
      
    }
  }
};
</script>
<style scoped>
.books-area {
    margin-left: auto;
    margin-right: auto;
}
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