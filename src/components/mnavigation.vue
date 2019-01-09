<template>
  <el-header :class="showTop ? 'navBarWrap' : ''">
    <el-menu :default-active="activeIndex" class="his-menu" mode="horizontal" @select="handleSelect">
      <li class="el-menu-item h1">
        <a href="/"><h1>知书</h1></a>
      </li>
      <li class="el-menu-item menu">
        <el-dropdown trigger="click" @command="goLink">
      <span class="el-dropdown-link">
        首页 <svg-icon class="icon" iconClass="lower"></svg-icon>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/">首页</el-dropdown-item>
            <el-dropdown-item>动态</el-dropdown-item>
            <el-dropdown-item>话题</el-dropdown-item>
            <el-dropdown-item>工具</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li class="el-menu-item his-menu" v-if="!hasPerm('user:login')">
        <ul class="his-menu-btn">
          <li>
            <el-button @click.native="goLink('/login')" type="text">登录</el-button>
          </li>
          <li>
            <el-button type="text">·</el-button>
          </li>
          <li>
            <el-button @click.native="goLink('/signup')" type="text">加入</el-button>
          </li>
        </ul>
      </li>
      <li class="el-menu-item his-pop" v-if="hasPerm('user:login')">
        <a title="消息" href="/writer">
          <el-button class="his-btn-reg" type="text">
            <svg-icon style="height: 22px;width: 22px" iconClass="remind"></svg-icon>
          </el-button>
        </a>
      </li>
      <li class="el-menu-item his-m-user" v-if="hasPerm('user:login')">
        <el-button class="his-btn-reg" type="text">
          <el-dropdown trigger="click">
      <span class="el-dropdown-link">
             <img class="userHead" title="用户头像" :src="avatar" width="50px" height="50px" alt="知书登录用户头像">
      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="el-icon-news"></i><span style="margin-left: 3px">我的主页</span>
              </el-dropdown-item>
              <el-dropdown-item><i class="el-icon-setting"></i><span style="margin-left: 3px">设置</span>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout"><i class="el-icon-circle-close-outline"></i><span
                style="margin-left: 3px">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-button>
      </li>
    </el-menu>
  </el-header>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'mNavigation',
    data() {
      return {
        activeIndex: '1',
        input: '',
        scrollTop: 0
      }
    }, mounted() {
      // 事件监听滚动条
      window.addEventListener('scroll', this.watchScroll)
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }, logout() {
        this.$store.dispatch('LogOut').then(() => {
          window.location.href = '/' // 为了重新实例化vue-router对象 避免bug
        })
      }, watchScroll() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      }, goLink(href) {
        window.location.href = href
      }
    },
    computed: {
      ...mapGetters([
        'avatar'
      ]),
      showTop: function () {
        let value = this.scrollTop > 30 ? true : false;
        return value;
      }
    }
  }
</script>

<style scoped lang="scss">

  .navBarWrap {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
  }

  /*His Nav导航栏内部样式*/
  .el-header {
    .el-menu {
      width: 96%;
      margin: 0 auto;

    }

    h1 {
      color: #0084ff;
    }

    /*去除按钮的下划线样式【特意指登录和注册】*/
    a {
      text-decoration: none;
    }

    padding: 0px;
    background-color: white;

    /*导航栏按钮样式*/
    .his-menu {
      display: flex;
      align-items: center;
      justify-content: start;
      margin-left: auto;
      padding: 0;
      /*注册登录按钮*/
      .his-menu-btn {
        display: flex;
        align-items: center;
        justify-items: end;

        li {
          margin-left: .3rem;

          .el-button {
            font-size: 16px;
          }

          list-style: none;
        }
      }

      /*移动端消息icon*/
      .his-pop {
        padding: 0px;
        display: flex;
        align-items: center;
        justify-items: end;
        margin-left: auto;
      }

      /*用户头像*/
      .his-m-user {
        padding: 0px;
        display: flex;
        align-items: center;
        justify-items: end;
        margin-left: 1rem;

        .userHead {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
      }
    }

    .menu {

      span {
        color: #007fff;
        font-size: 16px;
      }

      .el-dropdown-link {
        .icon {
          margin-left: .5rem;
        }

        display: flex;
        align-items: center;
        justify-content: center;

        .el-dropdown-menu {

          .el-dropdown-item {
            font-size: 16px !important;
          }
        }
      }

      display: flex;
      align-items: center;
      justify-items: center;
    }
  }
</style>
