<template>
  <el-upload
  ref="upload"
  class="avatar-uploader"
  :action="postImageUrl"
  :show-file-list="false"
  :http-request="(params)=>uploadImage(params)"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>

<script>
import {addBooksCover} from '@/api/Upload'
  export default {
    name: 'ImgUpload',
     data() {
      return {
        imageUrl: '',
        postImageUrl:'',
      };
    },
    methods: {
      //重新表单上传
      uploadImage(params){
        // console.log(params);
        // console.log(params.file);
        let uploadData = new FormData();
        uploadData.append('file', params.file);
        // console.log(uploadData);
        // console.log(uploadData.getAll("file"))
        addBooksCover(uploadData).then((res)=>{
          console.log(res);
          if(res.code===200){
            this.imageUrl = res.data.url;
            this.$set({},this.imageUrl,res.url)
            // console.log(this.url)
            this.$emit('onUpload')   //组件传值
            this.$message.success('上传成功')
          }
        }).catch((err)=>{
          console.log(err);
        })

      },
      //图片上传成功之后回调
      handleAvatarSuccess(res, file) {
        console.log("test");
      },
      beforeAvatarUpload(file) {
        const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt1M = file.size / 1024 /1024 < 1;

        if (!isJPGPNG) {
          this.$message.error('上传封面图片只能是 JPG或者PNG格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传封面图片大小不能超过 1M!');
        }
        return isJPGPNG && isLt1M;
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader ::v-deep.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader ::v-deep .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
