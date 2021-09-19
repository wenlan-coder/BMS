import { login, logout, getInfo} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
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

  }
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
        console.log("getinfo获取数据",response);
        const { data } = response
        if (!data) {
          return reject('验证失败，请重新登录')
        }
        const { username, avatar,roles} = data
        console.log('用户信息',data);
        //根据登录账号设置权限
        console.log(roles);
        commit('SET_ROLES',roles)
        commit('SET_NAME', username)
        //头像先写死
        commit('SET_AVATAR', "http://wenlan-blog.test.upcdn.net/BMS/src%3Dhttp___i0.hdslb.com_bfs_article_fc0a5dc88d37aaceab3135720fc4213317495393.jpg%26refer%3Dhttp___i0.hdslb.jpg")
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
