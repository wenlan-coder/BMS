<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>关于 我</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
         <pan-thumb :image="avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <img-upload ref="imgUpload" class="img-upload" @onUpload="uploadImg"></img-upload>
        </pan-thumb>
        </div>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.username }}</div>
        <div class="user-role text-center text-muted">{{ user.role  }}</div>
      </div>
    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><i class="el-icon-lollipop"></i><span>个人说明</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{intro}}
          </div>
        </div>
      </div>
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><i class="el-icon-edit-outline"></i><span>Skills</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="70" />
          </div>
          <div class="progress-item">
            <span>JavaScript</span>
            <el-progress :percentage="28" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <el-progress :percentage="12" />
          </div>
          <div class="progress-item">
            <span>node</span>
            <el-progress :percentage="20"  />
          </div>
          <div class="progress-item">
            <span>mongodb</span>
            <el-progress :percentage="20"  />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import {mapActions} from 'vuex'
import   PanThumb from '@/components/PanThumb'
import ImgUpload from '@/components/library/ImgUpload.vue'
import {updateAvatar} from '@/api/user'
export default {
  data(){
    return{
      intro:this.$store.getters.intro||'遇事不决，可问春风。',
      uid:this.$store.getters.uid,
      avatar:this.$store.getters.avatar
    }
  },
  computed:{
  },
  components:{
    PanThumb,
    ImgUpload
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          uid:'',
          name: '',
          email: '',
          avatar: '',
          role: '',
        }
      }
    }
  },
  methods:{
    ...mapActions('user',['getInfo']),  //actions 分发
    uploadImg(){
      updateAvatar({
        uid:this.uid,
        avatar:this.$refs.imgUpload.imageUrl,
      }).then((res)=>{
        console.log(res.data);
        if(res.code === 200){
          this.avatar = res.data.avatar
           this.getInfo()   //修改vuex里面状态

        }
      })
      console.log(this.$refs.imgUpload.imageUrl);
    },
  }
}
</script>

<style lang="scss" scoped>
 .img-upload ::v-deep .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
 .img-upload ::v-deep .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
