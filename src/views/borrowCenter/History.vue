<template>
  <div class="app-container">
    <el-row class="search">
      <el-dialog 
      center
      title="编辑记录" :visible.sync="dialogFormVisible">
  <el-form 
  style="text-align: left"
  :model="form">
    <el-form-item 
    
    label="流水号" :label-width="formLabelWidth">
      <el-input 
      :disabled="true"
      v-model="form._id"
       autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item 
    label="读者名称" :label-width="formLabelWidth">
      <el-input 
      :disabled="true"
      v-model="form.uname"
       autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item 
    label="图书ID" :label-width="formLabelWidth">
      <el-input 
      :disabled="true"
      v-model="form.bid"
       autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item 
    :label-width="formLabelWidth" label="借出日期">
    <el-col :span="24">
      <el-date-picker
      v-model="form.borrow_time"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-col>
  </el-form-item>
      <el-form-item 
      :label-width="formLabelWidth" label="应还时间">
    <el-col :span="24">
      <el-date-picker
      v-model="form.should_return_time"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-col>
  </el-form-item>
      <el-form-item   :label-width="formLabelWidth" label="归还日期">
    <el-col :span="24">
      <el-date-picker
      :disabled="true"
      v-model="form.real_return_time"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-col>
  </el-form-item>
       <el-form-item 
    label="逾期天数" :label-width="formLabelWidth">
      <el-input
      type="number" 
      v-model.number="form.late_day"
       autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="是否归还" :label-width="formLabelWidth">
      <el-select v-model="form.borrow_state" >
        <el-option label="未还" :value="1"></el-option>
        <el-option label="已还" :value="0"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="是否逾期" :label-width="formLabelWidth">
      <el-select v-model="form.late_state" >
        <el-option label="未逾期" :value="0"></el-option>
        <el-option label="逾期" :value="1"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleHistorySubmit">确 定</el-button>
  </div>
</el-dialog>
      <el-input
      style=" width:400px;margin-right:12px"
      v-model="search"
      size="small"
      @input="checkData"
      placeholder="输入图书名称或借阅者名称"/>
    </el-row>
    <el-table
     :max-height="tableHeight"
    :border="true"
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%">
    <el-table-column
      label="流水号"
      prop="_id"
      width="160">
    </el-table-column>
      <el-table-column
      v-if="false"
      label="读者ID"
      prop="uid"
      fix>
    </el-table-column>
        <el-table-column
      label="读者名称"
      prop="uname"
      width="60">
    </el-table-column>
        <el-table-column
        
      label="图书名称"
      prop="title"
      fix>
    </el-table-column>
    <el-table-column
      label="借出日期"
      prop="borrow_time"
      fix>
    </el-table-column>
    <el-table-column
      label="应还日期"
      prop="should_return_time"
      fix>
    </el-table-column>
    <el-table-column
      label="归还日期"
      prop="real_return_time"
      fix>
    </el-table-column>
     <el-table-column
      label="逾期天数"
      prop="late_day"
      fix>
    </el-table-column>
     <el-table-column prop="tag" label="是否归还" width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.borrow_state === 0 ? 'success' : 'warning'"
              disable-transitions
              >{{ scope.row.borrow_state === 0 ? "已还" : "未还" }}</el-tag
            >
          </template>
        </el-table-column>
     <el-table-column prop="tag" label="是否逾期" width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.late_day === 0 ? 'success' : 'warning'"
              disable-transitions
              >{{ scope.row.late_day === 0 ? "未逾期" : "逾期" }}</el-tag
            >
          </template>
        </el-table-column>
    <el-table-column
    label="操作"
    fix
    v-if="checkPermission(['admin'])" 
    >
      <template 
      slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          
      </template>
    </el-table-column>
  </el-table>
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
          :total="tableData.length"
        >
        </el-pagination>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import {userHistory,getAllHistory,deleteHistory,editHistory} from '@/api/borrow'
  export default {
    name:"History",
    data() {
      return {
        formLabelWidth: "120px",
        roles:this.$store.getters.roles,
        uid:this.$store.getters.uid,
        currentPage: 1,
        pagesize:10,
        tableData: [],
        filterData:[],  // 原数据
        search: '',
        dialogFormVisible: false,
        form:{
          _id:'',
          uname:'',
          uid:'',
          bid:'',
          borrow_time:'',
          should_return_time:'',
          real_return_time:'',
          borrow_state:'',
          late_state:'',
          late_day:0,
        },
      }
    },
    mounted(){
      if(this.roles.includes('admin')){
        this.fetchAllHistroy()
      }
      else {
        this.UserfetchHistoryById()
      }
    },
    computed:{
       //固定表头
    tableHeight() {
      return window.innerHeight - 150;
    },
    },
    methods: {
      //模糊查询
      checkData(){
        if(!this.search){
          this.tableData = this.filterData
        }
        this.tableData = this.tableData.filter(data => !this.search ||
         data.title.toLowerCase().includes(this.search.toLowerCase())
         ||data.uname.toLowerCase().includes(this.search.toLowerCase())) 

      },
       //普通用户记录书籍
       UserfetchHistoryById(){
         userHistory({
           uid:this.uid
         }).then((res)=>{
           if(res.code === 200){
             this.tableData = res.data;
             this.filterData = res.data;
           }
           console.log(res);
         }).catch((err)=>{
           console.log(err.message);
         })
       },
       //管理员获取用户记录
       fetchAllHistroy(){
         getAllHistory().then((res)=>{
           if(res.code === 200){
             this.tableData = res.data;
             this.filterData = res.data;
           }
          //  console.log(res);
         }).catch((err)=>{
           console.log(err.message);
         })
       },
       //对话框确定处理
        async handleHistorySubmit(){
        //  console.log(this.form);
         const res = await editHistory(this.form).catch((err)=>{console.log(err)})
        //  editHistory(this)
        if(res.code === 200){
          this.dialogFormVisible =false;
          this.fetchAllHistroy()  // 刷新数据
            this.$message({
            type: "success",
            message: "编辑成功",
          })
        }
        // console.log(res.data);

         

       },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
       //编辑处理
       handleEdit(index, row) {
         this.dialogFormVisible = true;
         this.form  = {
          _id:row._id,
          uname:row.uname,
          uid:row.uid,
          bid:row.bid,
          borrow_time:row.borrow_time,
          should_return_time:row.should_return_time,
          real_return_time:row.real_return_time,
          borrow_state:row.borrow_state,
          late_state:row.late_state,
          late_day:row.late_day
         }
        console.log(index, row);
      },

      //删除处理
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('建议您不要删除，此记录删除后讲无将找到书籍，是否继续？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          // 要想使用await，函数必须使用async
          // await异步执行，待调用接口获取数据完成后再将值传给res，进行下一步操作
          const res = await deleteHistory(row._id);
          if (res.code === 200) {
            // 接口调用成功后，刷新页面 注意这里只有管理员有权限 所有调用全数据
            this.fetchAllHistroy()
          }
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
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
      },
     
      //权限管理函数
      checkPermission,
    },
  }
</script>
<style scoped>
  .search{
    margin-bottom:30px;
    display: flex;
    justify-content: center;
  }
</style>