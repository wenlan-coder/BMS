<template>
  <div class="app-container">
     <el-dialog
  title="延期设置"
  :visible.sync="dialogFormVisible">
    <!-- 阻止单input按下回车表单提交 -->
  <el-form
  @submit.native.prevent    
  :model="lateForm">
    <el-form-item
    label="设置延期时间">
      <el-input
      required 
      type="number"
      placeholder="请输入延期的天数"
      v-model.number="lateForm.limitDay" 
      autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="setDay">确 定</el-button>
  </div>
</el-dialog>
    <el-row  class="search">
      <el-date-picker
      style="margin-right:5px"
      v-model="value"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
       value-format="timestamp">
    </el-date-picker>

    <el-button type="primary" @click="onSubmit" style="margin-top:5px">查询</el-button>
     <el-button type="primary" @click="handleSetDay" style="margin-top:5px">延期借出时间</el-button>
    </el-row>
    <el-table
      :max-height="tableHeight"
      :border="true"
      :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
    >
      <el-table-column label="流水号" prop="_id" width="160"> </el-table-column>
      <el-table-column label="读者名称" prop="uname" width="60">
      </el-table-column>
      <el-table-column label="图书名称" prop="title" fix> </el-table-column>
      <el-table-column label="借出日期" prop="borrow_time"   :formatter ="timeFormat" fix>
      </el-table-column>
      <el-table-column label="应还日期" prop="should_return_time" fix  :formatter ="timeFormat">
      </el-table-column>
      <el-table-column label="归还日期" prop="real_return_time" fix  :formatter ="timeFormat">
      </el-table-column>
      <el-table-column label="逾期天数" prop="late_day" fix> </el-table-column>
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
    </el-table>
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
        :total="tableData.length"
      >
      </el-pagination>
    </el-row>
  </div>
</template>


<script>
import {HistoryfindByTime,editLimitDay} from '@/api/borrow'
import {parseTime} from '@/utils/index'
export default {
  name: "LateMangement",
  data() {
    return {
      dialogFormVisible:false,  //对话框
      lateForm:{

        },
      value:"",
      labelPosition: 120,
      tableData: [],
      filterData:[],
      currentPage: 1,
      pagesize: 10,
      startTime:'',
      endTime:'',
    };
  },
  computed: {
    //固定表头
    tableHeight() {
      return window.innerHeight - 150;
    },
  },
  methods: {
    handleSetDay(){
      if(this.tableData.length === 0){
         this.$confirm('请先确定查询的数据, 再进行延期?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      }
      else{
        this.dialogFormVisible = true
      }

    },
     //格式化时间
    timeFormat(row,column){
        // console.log(row,column);
        var date = row[column.property];
        // console.log(date);
        if (date == undefined) {
        return "";
      }
      return parseTime(date)
    },
    //取消
    close(){
        this.lateForm.limtday="";
        this.dialogFormVisible=false;
        this.$message({
          type:"info",
          message:"取消操作"
        }) 
      },
      //设置延期时间
    setDay(){
      console.log(this.lateForm);
      let startTime = this.startTime;
      let endTime = this.endTime;
      let limitStamp = this.lateForm.limitDay*86400000   //精确到毫秒
      console.log('DSDSA',limitStamp);
      editLimitDay({limitStamp,startTime,endTime}).then((res)=>{
        console.log(res);
        if(res.code ===200){
          this.dialogFormVisible = false;
          this.$message({
            type:"success",
            message:"延期成功"
          })
          
        }
      })
      // this.tableData = this.tableData.map(item=>{
      //     item.should_return_time =item.should_return_time + limitStamp 
      //     return item
      // })
      
    }, 
    onSubmit() {
        // console.log(parseTime(this.value[0]))
        this.startTime = this.value[0]
        this.endTime = this.value[1]
        console.log(this.startTime,this.endTime);
        HistoryfindByTime({
          "startTime":this.startTime,
          "endTime":this.endTime
        }).then((res)=>{
          this.tableData = res.data
          console.log(res.data);
        }).catch((err)=>console.log(err))
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
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
.app-container {
  text-align: center;
  // justify-content: center;
  .search{
    padding: 5px;
    margin: top 30px;
    margin-bottom: 30px;
    color: #909399;
    font-size: 16px;
    font-weight: 500;
  }
}
el-row {
  text-align: center;
}
</style>