<template>
  <el-form :rules="rules" :model="user">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model.trim="user.phone" />
    </el-form-item>
        <el-form-item label="简介" prop="intro">
      <el-input v-model.trim="user.intro" type="textarea" maxlength="30" show-word-limit />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {userEditProfile} from '@/api/user'
export default {
  name:"edit",
  data(){
    return {
       rules:{
      username:[
        { required: true, message: '用户名不为空', trigger: "blur" },
        { min: 2, max: 12, message: '用户名由2-12位的英文字母或数字或下划线或中文组成', trigger: "blur" }
      ],
       email:[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
       ],
       phone:[
         { required: true, message: "请输入手机号", trigger: "blur" },
         //手机号/电话号验证 正则
         { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号/电话号", trigger: "blur" }
       ],
       intro:[
         {required:true,message:"请输入简介",trigger:"blur"}
       ],
      },
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          email: '',
          phone:'',
          intro:'',
          uid:''
        }
      }
    }
  },
  methods: {
    submit() {
      console.log(this.user);
      userEditProfile(this.user).then((res)=>{
        console.log(res);
        if(res.code === 200) {
        
        this.$message({
        message: '更新成功',
        type: 'success',
        duration: 5 * 1000
      })
        }
      })
      
    }
  }
}
</script>
