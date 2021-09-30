<template>
  <div class="app-container">
    
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
   <el-form-item label="输入原密码" prop="oldPassword">
    <el-input show-password v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="输入新密码" prop="pass">
    <el-input show-password v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input show-password v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import {editpassword, userEditPassword} from '@/api/user'
export default {
  name:"editpassword",
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else if(value.length <5 || value.length >12){
          callback(new Error('安全密码长度在5到12位之间'));
        }
        else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          uid:this.$store.getters.uid,
          oldPassword:'',
          pass: '',
          checkPass: '',
        },
        rules: {
          oldPassword:[
          {required: true, message: "请输入需要注册安全密码", trigger: "blur" },
         {min:2,max:12,message:"安全密码长度在5到12位之间",trigger:"blur"}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            userEditPassword(this.ruleForm)
            
          } else {
            console.log('错误提交!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>

</style>