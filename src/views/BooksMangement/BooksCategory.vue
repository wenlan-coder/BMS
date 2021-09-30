<template>
  <div class="app-container">
  <el-row class="addCategory">
    <el-input
      style=" width:400px;margin-right:12px"
      v-model="search"
      size="small"
      placeholder="输入分类关键字搜索"/>
    <el-button type="primary"
    @click="handleCreate"
    size="small">新增分类</el-button>
  </el-row>
  <el-dialog
  :title="categoryTitle"
  :visible.sync="dialogFormVisible"
  :before-close="handleClose">
    <!-- 阻止单input按下回车表单提交 -->
  <el-form
  @submit.native.prevent    
  :model="categoryForm">
    <el-form-item
    label="分类">
      <el-input
      required 
      placeholder="请输入简短的分类"
      v-model="categoryForm.name" 
      autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </div>
</el-dialog>
   <el-row class="category-table">
      <el-table
    :border="true" 
    :data="categoryData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="分类id"
      fix
      prop="_id">
    </el-table-column>
    <el-table-column
      label="分类名称"
      fix>
      <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   </el-row>
  </div>
</template>


<script>
import {getCategoryList,insertCategory,deleteCategory,updateCategory} from '@/api/category'
 export default {
   name:"booksCategory",
    data() {
      return {
        search: '',
        categoryForm:{
          name:"",
          id:"",
        },
        classify:'',
        dialogFormVisible: false,
        categoryData:[]
      }
    },
    computed:{
      categoryTitle(){
          return this.classify === 1 ? '新增分类':'编辑分类'
      }
    },
    methods: {
      //加载数据
      async fetchcategoryList(){
         let res = await getCategoryList()
        //  console.log(res);
         this.categoryData = res.data;
      },
      //dialoag 关闭
      close(){
        this.categoryForm.name="";
        this.dialogFormVisible=false;
        this.$message({
          type:"info",
          message:"取消操作"
        }) 
      },
      //关闭前回调
      handleClose(done){
        this.categoryForm.name="";
        this.categoryForm.id="";
        done()
        
      },
      //新增操作
      handleCreate(){
        this.classify = 1;
        this.dialogFormVisible = true;
      },


      //新增/编辑分类确定操作
      onSubmit(){
        if(this.classify===1){
           insertCategory(JSON.stringify(this.categoryForm)).then((res)=>{
          if(res.code===200){
          this.dialogFormVisible=false;
          this.fetchcategoryList()
          this.$message({
          message: '新增分类成功',
          type: 'success'
        });
          }
        }).catch((err)=>{
          console.log(err);
        })
        }
        else{
          updateCategory(this.categoryForm).then((res)=>{
            // console.log("sdwds",res);
            if(res.code===200){
              this.dialogFormVisible=false;
              this.classify=1;
              this.fetchcategoryList()
              this.$message({
                    type: 'success',
                    message: '修改完成'
                });   
            }
          }).catch((res)=>{
            console.log(res.message);
          })
          console.log(this.categoryForm.id);
        }
      },
      //编辑功能
      handleEdit(index, row) {
        this.classify=0;
        this.dialogFormVisible=true;
        console.log(index, row);
        this.categoryForm.name=row.name;
        this.categoryForm.id=row._id;
      },

      //删除功能
      handleDelete(index, row) {
        console.log(index, row);
         this.$confirm('是否确定要删除分类"' + row.name + '"?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 要想使用await，函数必须使用async
                // await异步执行，待调用接口获取数据完成后再将值传给res，进行下一步操作
                const res = await deleteCategory(row._id)
               if(res.code == 200){
                    // 接口调用成功后，刷新页面
                    this.fetchcategoryList()
                }
            }).catch((err) => {
              console.log(err.message);
                this.$message({
                    type: 'info',
                    message: '取消删除'
                });          
            });
        }
    },
    mounted(){
      this.fetchcategoryList()
    }
  }
</script>
<style scoped lang="scss">
.app-container{
  .addCategory{
    margin-bottom:30px;
    display: flex;
    justify-content: center;
  }
}

</style>