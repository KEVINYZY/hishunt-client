<!--用户登录Bar 主要用于首页-->
<template>
  <el-row class="user-bar" type="flex" justify="start">
    <ul class="user-bar-left">
      <div class="user-bar-avatar"
           v-bind:style="{backgroundImage: 'url('+ avatar +')',backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}">

      </div>
      <li>
        <svg-icon class="user-bar-icon" iconClass="send"></svg-icon>
        <a href="/writer">
          发文章
        </a>
      </li>
      <li>
        <svg-icon class="user-bar-icon" iconClass="question"></svg-icon>
        <a href="/">
          问问题
        </a>
      </li>
      <li>
        <svg-icon class="user-bar-icon" iconClass="share"></svg-icon>
        <a href="/text">
          分享资源
        </a>
      </li>
    </ul>
    <ul class="user-bar-right">
      <a href="">草稿</a>
    </ul>
  </el-row>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "user-bar",
    data() {
      return {}
    }, computed: {
      ...
        mapGetters([
          'avatar'
        ])
    },
  }
</script>

<style scoped lang="scss">
  @media (max-width: 467px) {
    .user-bar {
      width: 100% !important;

      .user-bar-left {
        li {
          padding: 0 !important;
        }
      }
    }
  }

  .user-bar {
    color: #007fff;

    .user-bar-icon {
      height: 18px;
      width: 18px;
      margin-right: .2rem;
    }

    width: 700px;
    background-color: white;
  }

  /*bar左侧*/
  .user-bar-left {
    display: flex;

    li {
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
    }

    a {
      color: #409EFF;
      padding-right: 1rem;
      font-size: .8rem;
    }

    a:hover {
      color: #007fff;
    }
  }

  .user-bar-right {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding-right: 1rem;

    a {
      color: #909090;
      font-size: .9rem;
    }

    a:hover {
      color: #007fff;
    }

  }

  .user-bar-avatar {
    width: 50px;
    height: 50px;
  }
</style>
