<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个性分享" name="activity">
                <activity />
              </el-tab-pane>
               <el-tab-pane label="密码修改" name="editpassword">
                <edit-pswword></edit-pswword>
              </el-tab-pane>
              <el-tab-pane label="个人设置" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Account from './components/Account'
import EditPswword from './components/EditPassword.vue'
export default {
  name: 'Profile',
  components: { UserCard, Activity, Account,EditPswword},
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'uid',
      'name',
      'avatar',
      'roles',
      'email',
      'phone',
      'intro'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        uid:this.uid,
        username: this.name,
        email: this.email,
        phone:this.phone,
        intro:this.intro,
        role:this.roles.join(' | '),
        avatar: this.avatar
      }
    }
  }
}
</script>
