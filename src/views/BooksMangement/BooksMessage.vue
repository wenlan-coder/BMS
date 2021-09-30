<template>
  <div class="app-conmtainer">
    <el-row class="message">
      <search-bar
      ref="searchBar"
      @onSearch ="searchResult"
      ></search-bar>
      <el-button
        class="add-button el-icon-plus"
        type="primary"
        @click="handleBooksCreate"
        size="small"
        >添加图书</el-button
      >
      <el-dialog
        :title="booksTitle"
        center
        :visible.sync="dialogFormVisible"
      >
        <el-form
          :model="form"
          style="text-align:left"
          ref="dataForm"
          :rules="rules"
        >
          <el-form-item label="书名" :label-width="formLabelWidth" prop="title">
            <el-input
              v-model="form.title"
              autocomplete="off"
              placeholder="不加《》"
            ></el-input>
          </el-form-item>
          <el-form-item label="ISBN" :label-width="formLabelWidth" prop="ISBN">
            <el-input v-model.number="form.ISBN" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="作者"
            :label-width="formLabelWidth"
            prop="author"
          >
            <el-input v-model="form.author" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="出版日期"
            :label-width="formLabelWidth"
            prop="date"
          >
            <el-input
              v-model="form.date"
              autocomplete="off"
              placeholder="请输入 xxxx-hh-mm格式"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="出版社"
            :label-width="formLabelWidth"
            prop="press"
          >
            <el-input v-model="form.press" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
            <el-input
              step="0.01"
              type="number"
              v-model.number="form.price"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">
            <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
          </el-form-item>
          <el-form-item label="简介" :label-width="formLabelWidth" prop="about">
            <el-input
              maxlength="300"
              type="textarea"
              show-word-limit
              v-model="form.about"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="分类"
            :label-width="formLabelWidth"
            prop="category._id"
          >
            <el-select
              name="分类"
              v-model="form.category._id"
              placeholder="请选择分类"
            >
              <el-option
                v-for="item in categoryList"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总数" :label-width="formLabelWidth" prop="total">
            <el-input
              min="0"
              v-model.number="form.total"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="id" style="height: 0">
            <el-input
              type="hidden"
              v-model="form._id"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="handleBooksClose">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-row>
      <el-table
        :data="books.slice((currentPage-1)*pagesize,currentPage*pagesize)"   
        stripe
        style="width: 100%"
        :border="true"
        :max-height="tableHeight"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item label="书籍唯一ID">
                <span>{{ props.row._id }}</span>
              </el-form-item>
              <el-form-item label="书籍介绍">
                <span>{{ props.row.about }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="ISBN" label="ISBN" width="120">
        </el-table-column>
        <el-table-column prop="title" label="书名" fit> </el-table-column>
        <el-table-column prop="category.name" label="分类" width="100">
        </el-table-column>
        <el-table-column prop="author" label="作者" fit> </el-table-column>
        <el-table-column prop="date" label="出版日期" width="100">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="50">
        </el-table-column>
        <el-table-column prop="press" label="出版社" fit> </el-table-column>
        <el-table-column prop="total" label="数量" width="45">
        </el-table-column>
        <el-table-column prop="tag" label="状态" width="60">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.total === 0 ? 'primary' : 'success'"
              disable-transitions
              >{{ scope.row.total === 0 ? "借出" : "在馆" }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作(展开查看介绍)">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editBook(scope.row)"
              type="primary"
              size="mini"
              class="el-icon-edit"
            >
              编辑
            </el-button>
            <el-button
              @click.native.prevent="handleDeleteBooks(scope.row)"
              type="danger"
              size="mini"
              class="el-icon-delete"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="margin: 20px 0 20px 0">
        <el-button class="el-icon-close" type="warning" >取消选择</el-button>
        <el-button class="el-icon-delete" type="danger" >批量删除</el-button>
      </div> -->
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
    </el-row>
  </div>
</template>

<script>
import { getCategoryList } from "@/api/category";
import { createBooks,deleteBooks, getBooksList,searchBooks,updateBooks} from "@/api/books";
import ImgUpload from "../../components/library/ImgUpload.vue";
import SearchBar from "@/components/library/SearchBar.vue";
export default {
  name: "BooksMessage",
  components: {
    SearchBar,
    ImgUpload,
  },
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        title: [{ required: true, message: "请输入书籍名称", trigger: "blur" }],
        ISBN: [
          { required: true, message: "请选择ISBN", trigger: "blur" },
          {
            type: "number",
            required: true,
            message: "请输入数字类型",
            trigger: "blur",
          },
        ],
        date: [{ required: true, message: "请输入出版时间", trigger: "blur" }],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        press: [{ required: true, message: "请输入出版社", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        cover: [{ required: true, message: "请上传图片", trigger: "blur" }],
        date: [{ required: true, message: "请输入出版时间", trigger: "blur" }],
        about: [
          { required: true, message: "请输入这本书的介绍", trigger: "blur" },
        ],
        "category._id": [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        total: [
          { required: true, message: "请输入总数", trigger: "blur" },
          {
            type: "number",
            required: true,
            message: "请输入数字类型",
            trigger: "blur",
          },
        ],
      },
      form: {
        // 表单数据
        id: "",
        title: "",
        ISBN: "",
        author: "",
        date: "",
        price: "",
        press: "",
        cover: "",
        about: "",
        total: "",
        cid: "",
        category: {
          _id: "", // mongodb 数据库_id 格式
        },
      },
      categoryList: [], // 动态表格数据
      formLabelWidth: "120px",
      booksClassify: 1, // 动态改变title以及区分编辑和新增
      books: [],
      currentPage: 1, //初始页1
      pagesize: 10,  // 每页的数据
    };
  },
  mounted() {
    this.fetchCategoryList(); // 获取分类数据
    this.loadBooks(); // 获取书的数据
  },
  computed: {
    booksTitle() {
      //动态改变title
      return this.booksClassify === 1 ? "新增图书" : "编辑图书";
    },
    //固定表头
    tableHeight() {
      return window.innerHeight - 150;
    },
    tag() {},
  },
  methods: {
    //请求分类数据渲染到options
    fetchCategoryList() {
      getCategoryList().then((res) => {
        // console.log(res);
        this.categoryList = res.data;
      });
    },

    //处理点击新增按钮
    handleBooksCreate() {
      this.booksClassify = 1;
      this.dialogFormVisible = true;
    },

    //处理编辑按钮
    editBook(item) {
      console.log(item);
      this.booksClassify = 0;
      this.dialogFormVisible = true;
       this.$nextTick(()=>{
        this.$refs.imgUpload.imageUrl = item.cover
      })

      this.form = {
          id: item._id,
          ISBN: item.ISBN,
          title: item.title,
          author: item.author,
          date: item.date,
          press: item.press,
          cover: item.cover,
          price: item.price,
          about: item.about,
          total: item.total,
          category: {
            _id: item.category._id,
            name: item.category.name,
          },
        };
    },
    //取消按钮
    handleBooksClose() {
      this.form = {
        id: "",
        title: "",
        ISBN: "",
        author: "",
        date: "",
        press: "",
        cover: "",
        about: "",
        cname: "",
        total: "",
        category: {
          id: "",
          name: "",
        },
      };
      this.dialogFormVisible = false;
      this.booksClassify = 0;
      this.$message({
        type: "info",
        message: "取消操作",
      });
      this.imgUpload.clear(); // 清空图片
    },

    //dialog 确定提交按钮
    onSubmit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (this.booksClassify === 1) {
            createBooks(this.form)
              .then((res) => {
                if (res.code === 200) {
                  this.dialogFormVisible = false;
                  this.loadBooks();
                  this.$message({
                    type: "success",
                    message: "添加成功",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
          else{
            updateBooks(this.form).then((res)=>{
              if(res.code ===200){
                this.dialogFormVisible = false;
                this.loadBooks();
                this.$message({
                    type: "success",
                    message: "修改成功",
                  });
              }
            })
          }
        }
      });
    },
    uploadImg() {
      this.form.cover = this.$refs.imgUpload.imageUrl; //将图片地址传给form展示
    },
    handleDeleteBooks(row) {
      console.log(row);
      this.$confirm('是否确定永久删除图书?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          // 要想使用await，函数必须使用async
          // await异步执行，待调用接口获取数据完成后再将值传给res，进行下一步操作
          const res = await deleteBooks(row._id);
          if (res.code === 200) {
            // 接口调用成功后，刷新页面
            this.loadBooks();
          }
        })
        .catch((err) => {
          console.log(err.message);
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    loadBooks() {
      getBooksList().then((res) => {
        this.books = res.data;
        // console.log(this.books);
      });
    },

    //分页数据展示 这里数据少就前端（假分页）来写，实际开发中数据量大需要后端分页
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size){
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
      },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },

    //处理搜索请求
    searchResult(){
      console.log(this.$refs.searchBar.keywords);
      if(!this.$refs.searchBar.keywords) this.loadBooks()
      searchBooks({"keyword":this.$refs.searchBar.keywords}).then((res)=>{
        if(res.code===200){
          this.books = res.data
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
},
}
</script>

<style scoped lang="scss">
.message {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .add-button {
    margin-left: 15px;
  }
  .edit {
    margin-left: 15px;
  }
}
</style>