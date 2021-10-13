<template>
  <div class="books">
    <el-row :gutter="50" type="flex" justify="space-between">
      <el-col class="books-item">
         <el-tooltip effect="light"
                  placement="right"
                  v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :key="item._id"
                  :open-delay="500">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span> /
          <span>{{item.date}}</span> /
          <span>{{item.press}}</span>
        </p>
        <p slot="content">ISBN:{{item.ISBN}}</p>
        <p slot="content" style="width: 300px" class="abstract">简介：{{item.about}}</p>
        <el-card class="card"
                 :body-style="{padding: '10px'}"
                 shadow="hover">
          <div class="cover">
            <img 
            :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a style="color: #005cc5;">{{item.title}}</a>
            </div>
          </div>
          <div class="author">{{item.author}}</div>
          <el-button type="success"
                     @click="borrow(item)"
                     :key="item.id"
                     style="float: bottom; width: 180px">
              <i class="el-icon-collection"></i>    借  阅
          </el-button>
        </el-card>
      </el-tooltip>
      </el-col>
     
      </el-row>
    <el-row>
      <el-pagination
          style="margin-top: 15px"
          class="more"
          background
          :page-sizes="[5, 10, 15, 20]"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pagesize"    
          :total="books.length"
        >
        </el-pagination>
    </el-row>
  </div>
</template>

<script>
import {getBooksList} from '@/api/books'
import {borrowBooks} from '@/api/borrow'
import {parseTime} from '@/utils/index'
import store from '@/store'
  /* eslint-disable */

  export default {
    name: 'Books',
    data () {
      return {
        disabled: false,
        values: true,
        books: [],
        currentPage: 1,
        pagesize: 10,
        limit_day:30,  // 默认限制天数为30天
        limt_timestamp:'',  // 限制天数转换为时间戳
        borrowed: {
          uid: this.$store.getters.uid,   // 用户id
          title:'',
          uname:this.$store.getters.name,
          bid:'',   // 借阅书籍id
          borrow_time:'',   // 借阅时间
          should_return_time:'',
          real_return_time:'',
          borrow_state:1,  //是否归还 1 为未还 默认值
          late_state:0,  //是否逾期 0 为没有
          late_day:0,
        }
      }
    },
    mounted() {
      this.loadBooks()    //请求图书
    },
    methods: {
      borrow (item) {
        // console.log(item);
        this.borrowed.bid = item._id;
        this.borrowed.title = item.title;
        const time = new Date().getTime()
        const borrowTime = time;  // 借出时间戳
        console.log('sds',parseTime(borrowTime));
        let should_return__timestamp  = time + 2592000000;  //应还时间戳
        this.borrowed.should_return_time = should_return__timestamp  //
        this.borrowed.borrow_time = borrowTime;
        this.borrowed.title = item.title;
        console.log(this.borrowed);
        borrowBooks(this.borrowed).then((res)=>{
           if(res.code  === 200 ){
              this.$notify.success({
                title:"成功！",
                message: `你成功借阅${this.borrowed.title}！`
              })
           }
        })
        },
      
      
      //默认加载图书
      loadBooks() {
      getBooksList().then((res) => {
        this.books = res.data;
        // console.log(this.books);
      });
    },
  

      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange(size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
      }
    },
  }
</script>
<style scoped>
  .card{
    width: 200px;
    height: 350px;
    float: left;
    margin:20px
  } 
  .cover {
    width: 180px;
    height: 250px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 178px;
    height: 250px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 100%;
    font-size: 11px;
    margin-bottom: 8px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  .el-icon-delete {
    cursor: pointer;
    float: right;
  }

  .switch {
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }

</style>
