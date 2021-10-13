<template>
  <el-table :data="list"  height="502px">
     <el-table-column
      label="读者名称"
      prop="uname"
      fix>
    </el-table-column>
        <el-table-column
      label="图书名称"
      prop="title"
      fix>
    </el-table-column>
    <el-table-column
      label="借出日期"
      prop="borrow_time"
      :formatter ="timeFormat"
      fix>
    </el-table-column>
    <el-table-column
      label="应还日期"
      prop="should_return_time"
      :formatter ="timeFormat"
      fix>
    </el-table-column>
  </el-table>
</template>

<script>
import { getTodayHistory } from '@/api/borrow'
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
      this.fetchData()
  },
  methods: {
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
    async fetchData() {
      const res = await getTodayHistory()
      if(res.code === 200 ){
        // console.log(res.data); 
        this.list = res.data
        

      }
      
    
    }
  }
}
</script>
