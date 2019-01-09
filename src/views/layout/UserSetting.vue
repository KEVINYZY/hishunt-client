<template>
  <div class="view-container">
    <navBar></navBar>
    <div class="nav-box">
      <nav class="user-nav">
        <el-menu active-text-color="#409EFF" :router="true" :default-active="activeIndex" class="el-menu-demo"
                 mode="horizontal">
          <el-menu-item index="/user/settings/profile">个人资料</el-menu-item>
          <el-menu-item index="2">关联设置</el-menu-item>
          <el-menu-item index="3">修改密码</el-menu-item>
          <el-menu-item index="4">邮件推荐</el-menu-item>
          <el-menu-item index="5">推广奖励</el-menu-item>
        </el-menu>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import navBar from '@/components/app/navbar'//响应式导航栏
  export default {
    name: "UserSetting",
    components: {navBar},
    data() {
      return {
        user: {},
        activeIndex: '/user/settings/profile',
      }
    },
    computed: {
      ...
        mapGetters([
          'id'
        ])
    }, created() {
    }, methods: {
      /*查询用户*/
      queryUser() {
        this.api({
          url: '/user/' + this.$route.params.id,
          method: 'post'
        }).then(res => {
          this.user = res;
          if (this.$route.params.id != this.id) {
            this.isMe = false;//不是自己不能修改资料
          }
        })
      }, updateUser() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .navBar {
    border-bottom: 1px solid #f1f1f1;
  }

  .view-container {
    .nav-box {
      background-color: #fff;
    }

    .user-nav {
      .el-menu {
        display: flex;
        align-items: center;
        height: 3rem;
        border-bottom: none;
        /*导航item*/
        .el-menu-item {
          align-items: center;
          display: flex;
          flex-shrink: 0;
          padding: 0 1rem 0 0;
          border-bottom: none;
          justify-content: center;
          height: 100%;
        }
      }

      max-width: 960px;
      height: 100%;
      margin: auto;
      display: flex;
      align-items: center;
      line-height: 1;
    }
  }
</style>
