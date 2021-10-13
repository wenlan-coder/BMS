<template>
  <div class="app-container">
    <el-row class="addUser">
      <el-input
        @keyup.enter.native="searchClick"
        style="width: 400px; margin-right: 12px"
        v-model="search"
        size="small"
        placeholder="输入用户名称"
      />
      <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
      <el-button type="primary" @click="handleCreate" size="small"
        >新增角色</el-button>
    </el-row>
    <el-dialog
      style="text-align: center"
      :title="userTitle"
      :visible.sync="dialogFormVisible"
    >
      <el-form
      ref="userForm"
      :rules="userRules"
        class="user-form"
        label-width="100px"
        label-position="right"
        :model="userForm"
      >
        <el-form-item  :label-width="formLabelWidth" label="用户ID"  prop="_id"  v-if="userClassify === 0 ? true : false">
          <el-input
            disabled
            v-model="userForm._id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户名称" prop="registerName">
          <el-input v-model="userForm.registerName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户密码" prop="registerPassword">
          <el-input v-model="userForm.registerPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户邮箱" prop="registerEmail">
          <el-input v-model="userForm.registerEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户电话" prop="registerPhone">
          <el-input v-model="userForm.registerPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" :label-width="formLabelWidth" prop="roles">
          <el-radio-group v-model="userForm.roles">
            <el-radio border label="editor">普通用户</el-radio>
            <el-radio border label="admin">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户状态" prop="userState">
          <el-switch v-model="userForm.userState"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
      <el-table
        :max-height="tableHeight"
        :border="true"
        :data="userData"
        style="width: 100%"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column label="用户ID" fix prop="_id">
        </el-table-column>
        <el-table-column label="用户名称" fix prop="username">
        </el-table-column>
        <el-table-column label="用户密码" fix prop="password">
        </el-table-column>
        <el-table-column label="用户邮箱" fix prop="email"> </el-table-column>
        <el-table-column label="角色权限" fix>
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.roles[0]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="用户状态" fix prop="suer_state">
           <template slot-scope="scope">
          <el-switch  
             @change="changeSwitch(scope.$index,scope.row)"
              v-model="scope.row.user_state"></el-switch>
          </template>     
        </el-table-column>

        <el-table-column label="操作" fix>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
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
          :total="userData.length"
        >
        </el-pagination>
    </el-row>
  </div>
</template>


<script>
import {getUserList,register,deleteUser,editUserState,editUserInfo,searchUser} from '@/api/user'
export default {
  name: "User",
  data() {
    return {
      //表单验证
      userRules:{
      registerName:[
        { required: true, message: '用户名不为空', trigger: "blur" },
        { min: 2, max: 12, message: '用户名由2-12位的英文字母或数字或下划线或中文组成', trigger: "blur" }
      ],
       registerEmail:[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
       ],
       registerPhone:[
         { required: true, message: "请输入手机号", trigger: "blur" },
         //手机号/电话号验证 正则
         { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号/电话号", trigger: "blur" }
       ],
       registerPassword:[
         { required: true, message: "请输入需要注册安全密码", trigger: "blur" },
         {min:2,max:12,message:"安全密码长度在5到12位之间",trigger:"blur"}
       ],
      },
      search: "",
      uid:this.$store.getters.uid,  // 当前登录id 后端返回所有用户时候先去查看roles权限
      formLabelWidth: "120px",
      userForm: {
        _id: "",  // 用户id
        registerName: "",
        registerPassword: "",
        registerEmail: "",
        registerPhone: "",
        roles:'editor',
        userState:true,
        
      },
      userClassify: '', 
      dialogFormVisible: false,
      userData: [],   // table 用户数据
      filterUserData:[],   // 原数据备份
      pagesize:5,
      currentPage:1
    };
  },
  mounted() {
    this.fetchUserList()  //获取用户数据
  },
  computed: {
    userTitle() {
      return this.userClassify === 1 ? "新增角色" : "编辑角色";
    },
    //固定表头
    tableHeight() {
      return window.innerHeight - 180;
    },
  },
  methods: {
    //搜索用户
    searchClick(){
      // console.log(this.search)
      if(!this.search) this.userData = this.filterUserData;  // 还原数据
      searchUser({"keyword":this.search}).then((res)=>{
        console.log(res);
        if(res.code === 200){
          this.userData = res.data;
        }
      }).catch((err)=>console.log(err))
    },

    //加载用户数据
    async fetchUserList(){
       let res = await getUserList({
         uid:this.uid
       })
      //  console.log('user',res);
       this.userData = res.data;
       this.filterUserData = res.data;
    },
    //dialoag 关闭
    close() {
      this.dialogFormVisible = false;
      this.userForm={};
      this.$message({
        type: "info",
        message: "取消操作",
      });
    },
    
    //改变用户状态
    changeSwitch(index,row){
      console.log(index,row)
      editUserState({
        _id:row._id,
        user_state:row.user_state,
      }).then((res)=>{
        // this.fetchUserList()  // 刷新数据
        if(res.code === 200 ){
          this.$message({
            type:"success",
            message:res.message
          })
        }
      }).catch((err)=>{
        console.log(err.message);
      })
    },

    //新增人员操作
    handleCreate() {
      this.userClassify = 1;
      this.dialogFormVisible = true;
    },

    //提交数据
    onSubmit() {
       this.$refs.userForm.validate((valid) => {
        if (valid) {
          if (this.userClassify === 1) {
            console.log(this.userForm);
               register(this.userForm)
              .then((res) => {
                if (res.code === 200) {
                  this.dialogFormVisible = false;
                  this.fetchUserList();  // 刷新数据
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
            // console.log(this.userForm);
            editUserInfo(this.userForm).then((res)=>{
              if(res.code ===200){
                console.log(res);
                this.dialogFormVisible = false;
                this.fetchUserList();  //刷新页面
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
    //编辑功能
    handleEdit(index, row) {
      this.userClassify = 0;
      this.dialogFormVisible = true;
      this.userForm ={
         _id: row._id,  // 用户id
        registerName:row.username,
        registerPassword:row.password,
        registerEmail: row.email,
        registerPhone: row.phone,
        roles:row.roles[0],
        userState:row.user_state,
      }
      console.log(index, row);
    },

    //删除功能
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('是否确定要删除用户为' + row.username + '的成员?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 要想使用await，函数必须使用async
          // await异步执行，待调用接口获取数据完成后再将值传给res，进行下一步操作
          const res = await deleteUser(row._id);
          if (res.code == 200) {
            // 接口调用成功后，刷新页面
            this.fetchUserList();
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

     // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange(size){
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
      },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
  },
};
</script>
<style scoped lang="scss">
.app-container {
  .addUser {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
  }

}
</style>