<template>
  <el-header :class="navBarFixed ? 'navBarWrap' : ''">
    <!--导航容器-->
    <div class="container">
      <!--Logo-->
      <a href="/" class="logo">
        <h1>知书</h1>
      </a>
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="main-nav-list">
            <el-menu active-text-color="#409EFF" :default-active="pathIndex" class="menu" mode="horizontal"
                     @select="handleSelect">
              <el-menu-item class="nav-item" index="1"><a href="/">首页</a></el-menu-item>
              <el-menu-item class="nav-item" index="2"><a href="/404">动态</a></el-menu-item>
              <el-menu-item class="nav-item" index="3"><a href="/404">话题</a></el-menu-item>
              <el-menu-item class="nav-item" index="4"><a href="/404">工具</a></el-menu-item>
            </el-menu>
          </li>
          <li class="nav-item nav-search">
            <el-input placeholder="请输入搜索内容" v-model="input" size="small" suffix-icon="el-icon-search">
            </el-input>
          </li>
          <!--登录前样式-->
          <li v-if="!hasPerm('user:login')" class="nav-item auth">
            <el-button @click="goLink('/login')" type="text" class="login">
              登录
            </el-button>
            <el-button @click="goLink('/signup')" type="text" class="register">
              加入
            </el-button>
          </li>
          <li v-if="!hasPerm('user:login')" class="nav-item submit">
            <svg-icon class="create-icon" iconClass="create"></svg-icon>
            <el-button @click="goLink('/writer')" type="text" class="create">
              写文章
            </el-button>
          </li>
          <!--登录后样式-->
          <li v-if="hasPerm('user:login')" class="nav-item login-create">
            <el-button @click="goLink('/writer')" type="primary" class="create" size="medium">
              写文章
            </el-button>
          </li>
          <li v-if="hasPerm('user:login')" class="nav-item login-ding">
            <svg-icon class="login-remind" iconClass="remind"></svg-icon>
          </li>
          <li v-if="hasPerm('user:login')" class="nav-item avatar">
            <el-button type="text">
              <el-dropdown trigger="click" @command="goLink">
      <span class="el-dropdown-link">
             <img class="user-avatar" title="用户头像" :src="avatar" width="50px" height="50px" alt="知书登录用户头像">
      </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="'/user/'+ id"><i class="el-icon-news"></i><span
                    style="margin-left: 3px">我的主页</span>
                  </el-dropdown-item>
                  <el-dropdown-item><i class="el-icon-setting"></i><span style="margin-left: 3px">设置</span>
                  </el-dropdown-item>
                  <el-dropdown-item command="out"><i class="el-icon-circle-close-outline"></i><span
                    style="margin-left: 3px">退出</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-button>

          </li>
        </ul>
      </nav>
    </div>
  </el-header>
</template>

<script>
  import {mapGetters} from 'vuex'
  import store from '@/store'

  export default {
    name: 'Navigation',
    data() {
      return {
        activeIndex: '1',
        input: '',
        scrollTop: 0,
        navBarFixed: false,
      }
    }, mounted() {
    },
    methods: {
      handleSelect(key, keyPath) {

      }, goLink(href) {
        if (href == 'out') {//登出
          console.log(href)
          this.$store.dispatch('LogOut').then(() => {
            window.location.reload()
          })
        } else {
          window.location.href = href
        }
      }
    }, created: function () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    },
    computed: {
      ...mapGetters([
        'avatar', 'pathIndex', 'id'
      ])
    },
  }
</script>

<style scoped lang="scss">
  .el-header {
    padding: 0px;
    background: white;
    width: 100%;

    /*菜单容器*/
    .container {
      position: relative;
      margin: 0 auto;
      width: 100%;
      max-width: 960px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      height: 100%;

      .main-nav {
        height: 100%;
        flex: 1 0 auto;

        .nav-list {
          display: flex;
          align-items: center;
          height: 100%;
          margin: 0;
        }

        .main-nav-list {

        }

        .nav-item {
          color: #71777c;
          padding: 0 1.2rem;
          font-size: 1rem;
          margin: 0;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: default;
        }

        /*搜索框样式*/
        .nav-item.nav-search {
          .el-input {
            input {
              height: 12px !important;
            }

            width: 200px;
          }

          display: flex;
          flex: 1 1 auto;
          justify-content: flex-end;
          cursor: auto;
        }

        .login-create {
          padding-left: 0;
          margin-left: 1rem;
          justify-content: center;
        }

        .login-ding {
          justify-content: center;

          .login-remind {
            cursor: pointer;
            width: 20px;
            height: 20px;
          }
        }

        .user-avatar {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }

        .submit {
          .create {
            display: flex;
            margin-left: auto;
            font-size: 1rem;
          }

          .create-icon {
            margin-right: .2rem;
            width: 15px;
            height: 15px
          }

          padding: 0;
        }

        /*用户头像*/
        .avatar {
          padding-right: 0px;
        }

        .auth {
          padding: 0;
          flex: .7 1 auto;

          .login {

            font-size: 1rem;
            padding: 0;
          }

          .register {
            font-size: 1rem;
            margin: 0;
          }

          .login::after {
            content: "·";
            margin: 0px 0.4rem;
          }
        }

        ul {
          li {
            display: flex;
            list-style: none;
          }

        }
      }

      .menu {
        display: flex;

        .el-menu-item:hover {
          color: #409EFF;
        }

        .el-menu-item {

          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1rem;
          color: #71777c;
          /*去除element自带底部选中*/
          border-bottom: none;

          a {
            display: block;
          }

        }
      }

      /*Logo样式*/
      .logo {
        text-decoration: none;
        cursor: pointer;
        color: #0084ff;
        margin-right: 1.3rem;

        h1 {
          width: 4rem;
        }
      }
    }
  }


</style>
