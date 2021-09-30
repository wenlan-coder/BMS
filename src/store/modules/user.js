import { login, logout, getInfo} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    uid:'',
    roles:[],   //用户权限
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES:(state,roles)=>{
    state.roles= roles
  },
  SET_ID:(state,_id)=>{
    state.uid = _id;
  },
  SET_EMAIL:(state,email)=>{
    state.email = email;
  },
  SET_PHONE:(state,phone)=>{
    state.phone = phone;
  },
  SET_INTRO:(state,intro)=>{
    state.intro = intro;
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { token } = response
        console.log("登录请求数据",response);  //for debuge
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // console.log("getinfo获取数据",response);
        const { data } = response
        if (!data) {
          return reject('验证失败，请重新登录')
        }
        const { username, avatar,roles,_id,email,phone,intro,password} = data
        // console.log('用户信息',data);
        //根据登录账号设置权限
        // console.log(roles);
        commit('SET_ROLES',roles)
        commit('SET_NAME', username)
        commit('SET_ID',_id)
        commit('SET_EMAIL',email)
        commit('SET_PHONE',phone)
        commit('SET_INTRO',intro)
        console.log("用户id",_id);
        Message.success("登录成功")
        //头像先写死
        if(avatar){
          commit('SET_AVATAR',avatar)
        }
        else{
        commit('SET_AVATAR', "http://wenlan-bms.oss-cn-zhangjiakou.aliyuncs.com/e86d76361f12063c2ed723ce5cb9f3f0.jpg")
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // 清除token 后重置路由
        resetRouter()
        commit('RESET_STATE')
        resolve()
        Message.info("已退出")
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
