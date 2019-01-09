import {default as api} from '@/utils/api'

const app = {
  state: {
    validate: false,
    pathIndex: '1'
  },
  mutations: {
    CHECK_VALIDATE: (state, status) => {
      console.log('我被改变了啦' + status)
      state.validate = status;
    },
    CHANAGE_INDEX: (state, index) => {
      state.pathIndex = index;
    }
  },
  actions: {
    // 是否验证成功密码
    CheckPhoneNumber({commit, state}, value) {
      commit('CHECK_VALIDATE', value)
    },
    ChanageNavIndex({commit, state}, index) {
      commit('CHANAGE_INDEX', index)
    }
  }
}
export default app
