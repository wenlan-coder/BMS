<template>
  <div class="app-container">
    <el-row  class="search">
      <el-date-picker
      style="margin-right:5px"
      v-model="value"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>

    <el-button type="primary" @click="onSubmit" style="margin-top:5px">查询</el-button>
     <el-button type="primary" @click="onSubmit" style="margin-top:5px">延期借出时间</el-button>
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
      <el-table-column label="借出日期" prop="borrow_time" fix>
      </el-table-column>
      <el-table-column label="应还日期" prop="should_return_time" fix>
      </el-table-column>
      <el-table-column label="归还日期" prop="real_return_time" fix>
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
import {HistoryfindByTime} from '@/api/borrow'
import {parseTime} from '@/utils/index'
export default {
  name: "LateMangement",
  data() {
    return {
      value:"",
      labelPosition: 120,
      tableData: [],
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
    onSubmit() {
        console.log(parseTime(this.value[0]))
        this.startTime = parseTime(this.value[0].getTime())
        this.endTime = parseTime(this.value[1])
        console.log(this.startTime,this.endTime);
        HistoryfindByTime({
          "startTime":this.startTime,
          "endTime":this.endTime
        }).then((res)=>{
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