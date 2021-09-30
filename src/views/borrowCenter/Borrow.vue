<template>
  <div class="books app-container">
    <el-row class="empty-bg" v-if="isShow">
        <div><img src="@/assets/empty.png" alt=""></div>
        <div class="notice"><p>暂无要归还的书籍！！</p></div>
    </el-row>
    <el-row :gutter="50" type="flex" justify="space-between">  
      <el-col class="books-item">
        <el-tooltip
          effect="light"
          placement="right"
          v-for="item in history"
          :key="item._id"   
          :open-delay="500"
        >
          <p slot="content" style="font-size: 14px; margin-bottom: 6px">
            {{ item.bid.title }}
          </p>
          <p slot="content" style="font-size: 13px; margin-bottom: 6px">
            <span>{{ item.bid.author }}</span> / <span>{{ item.bid.date }}</span> /
            <span>{{ item.bid.press }}</span>
          </p>
          <p slot="content">ISBN:{{ item.bid.ISBN }}</p>
          <p slot="content" style="width: 300px" class="abstract">
            {{ item.bid.about }}
          </p>
          <el-card
            class="card"
            :body-style="{ padding: '10px' }"
            shadow="hover"
          >
            <div class="cover">
              <img :src="item.bid.cover" alt="封面" />
            </div>
            <div class="info">
              <div class="title">
                <a style="color: #005cc5">{{ item.bid.title }}</a>
              </div>
            </div>
            <div class="author">{{ item.bid.author }}</div>
            <el-button
              type="warning"
              @click="handleReturnBooks(item)"
              :key="item._id"
              style="float: bottom; width: 180px"
            >
              <i class="el-icon-thumb"></i> 归 还
            </el-button>
          </el-card>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row class="pagation-row">
      <el-pagination
          :hide-on-single-page="true"
          v-show="isShow"
          style="margin-top: 15px"
          class="more"
          background
          :page-sizes="[5, 10, 15, 20]"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pagesize"    
          :total="history.length"
        >
        </el-pagination>   
    </el-row>
  </div>
</template>

<script>

/* eslint-disable */


import { parseTime } from "@/utils/index";
import { userBooksHistory,returnBooks} from "@/api/borrow";

export default {
  name: "Borrow",
  data() {
    return {
      late_price:0.01,
      disabled: false,
      values: true,
      history: [],
      currentPage: 1,
      uid: this.$store.getters.uid,
      pagesize: 5,
      returnBooks: {
        uid: this.$store.state.id,
        bid: 0,
        real_return_time: "",
      },
    };
  },
  mounted() {
    this.fetchBorrowBooks(); //请求未还图书
  },
  computed:{
    isShow(){
      return this.history.length === 0 ? true : false
    },
  },
  methods: {
    async fetchBorrowBooks() {
      const res =  await userBooksHistory({ uid:this.uid });
      // console.log(res.data);
      if(res.code === 200){
        // console.log(res.data);
        this.history = res.data
      
      }
    },
    //归还图书
    handleReturnBooks(item) {
      // console.log(item);
      if(item.late_state ===1 ){
        this.$confirm(`您已逾期,逾期天数为${item.late_day}天，共计${item.late_day*this.late_price}元，请在线支付进行图书归还！`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          //还书操作
          const res = await returnBooks(item)
          if (res.code === 200) {
            this.fetchBorrowBooks()
            // this.fetchAllHistroy()
              this.$notify.success({
                title:"成功！",
                message: `你成功归还${item.bid.title}！`
              })
          }
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消还书",
          });
        });
      }
      else{
        returnBooks(item).then((res)=>{
          if(res.code ===200){
            this.fetchBorrowBooks()  // 刷新页面
            this.$notify.success({
                title:"成功！",
                message: `你成功归还${item.bid.title}！`
              })
          }
        }).catch((err)=>{
          console.log(err);
        })   
      }
    },
    handleSizeChange(size) {
    this.pagesize = size;
    console.log(this.pagesize); //每页下拉显示数据
  },
    handleCurrentChange(currentPage) {
    this.currentPage = currentPage;
    console.log(this.currentPage); //点击第几页
  },
  },
  
};
</script>
<style scoped lang="scss">
.empty-bg{
  color:slateblue;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  .notice{
    position:absolute;
    top: 40px;
    font-size: 20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-align: center;
    font-weight:1000;
    color:#293241;
  }

 img{
   margin-top:120px ;
   width: 600px;
 }
}
.card {
  width: 200px;
  height: 350px;
  float: left;
  margin: 20px;
}
.pagation-row {
  margin-bottom:20px;

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

a:link,
a:visited,
a:focus {
  color: #3377aa;
}
</style>
