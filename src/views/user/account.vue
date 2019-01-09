<template>
  <div class="view-container">
    <navBar></navBar>
    <div class="user-container">
      <!--用户详细-->
      <div v-if="user.avatar" class="user-view">
        <div class="major-area">
          <!--用户信息-->
          <div class="user-info block shadow">
            <div class="user-avatar"
                 :style="{backgroundImage:'url(' + user.avatar + ')',backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"></div>
            <div class="user-info-box">
              <h1 class="username">{{user.nickname}}</h1>
              <div class="job">
                <svg-icon class="bind" iconClass="job"></svg-icon>
                <span class="content">java开发</span>
              </div>
              <div class="intro">
                <span class="content">你的人生格言是什么？</span>
              </div>
            </div>
            <div class="box-action">
              <div class="link-box">
                <a title="绑定邮箱" href="">
                  <svg-icon class="bind" iconClass="email"></svg-icon>
                </a>
                <a title="绑定QQ" href="">
                  <svg-icon class="bind" iconClass="qq"></svg-icon>
                </a>
                <a title="绑定微信" href="">
                  <svg-icon class="bind" iconClass="wechat"></svg-icon>
                </a>
              </div>
              <el-button @click="updateUser" v-if="isMe" type="primary" size="medium" plain>修改个人资料</el-button>
              <el-button v-if="!isMe" style="width: 126px" type="success" size="medium" plain>关注</el-button>
            </div>
          </div>
        </div>
        <div class="minor-area">
          <div class="user-deeds">
            <!--个人成就-->
            <div class="stat shadow bottom">
              <div class="stat-block ">
                <div class="title shadow">
                  个人成就
                </div>
                <div class="body">
                  <div class="item">
                    <svg-icon class="bind" iconClass="level"></svg-icon>
                    获得 <span class="level">学童</span> 称号
                  </div>
                </div>
              </div>
            </div>
            <div class="start shadow">
              <a href="">
                <div class="item-title">
                  我关注的
                </div>
                <div class="item-content">
                  1
                </div>
              </a>
              <a href="" class="after">
                <div class="item-title">
                  关注我的
                </div>
                <div class="item-content">
                  0
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import navBar from '@/components/app/navbar'//响应式导航栏
  export default {
    name: "account",
    components: {navBar},
    data() {
      return {
        user: {},
        isMe: true,
      }
    },
    computed: {
      ...
        mapGetters([
          'id'
        ])
    }, created() {
      this.queryUser();
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
        window.location.href = '/user/settings/profile'
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-container {
    .shadow {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    }

    .bind {
      width: 21px;
      height: 21px;
    }

    .bottom {
      margin-bottom: 1rem;
    }

    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 960px;

    .user-view {
      margin-top: 1rem;
      display: flex;
      margin-bottom: 6rem;

      .major-area {
        flex: 1 1 auto;
        min-width: 0;

        .user-info {
          display: flex;
          padding: 1.3rem;

          .user-info-box {
            flex: 1 1 auto;
            margin-right: 2rem;
            flex-direction: column;
            justify-content: center;

            .username {
              margin: 0;
              padding: 0;
              font-size: 1.7rem;
              font-weight: 600;
              line-height: 1.2;
              color: #000;
            }

            .job {
              color: #72777b;
              margin-top: .5rem;

              .bind {
                width: 20px;
                height: 22px;
                flex: 0 0 auto;
                margin-right: .3rem;
              }
            }

            .intro {
              margin-top: .5rem;
              color: #4a68ad;
              cursor: pointer;
              font-size: .9rem;
            }

            .intro:before {
              content: "+ ";
            }
          }

          .box-action {
            flex: 0 0 auto;
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .link-box {
              margin-bottom: auto;

              a {
                margin-left: 5px;
              }
            }
          }

          .user-avatar {
            flex: 0 0 auto;
            margin-right: 1rem;
            width: 5.5rem;
            height: 5.5rem;
            background-color: #f9f9f9;
            border-radius: 50%;
          }
        }

        .block {
          background-color: #fff;
          border-radius: 2px;
        }
      }

      .minor-area {
        flex: 0 0 auto;
        margin-left: 1rem;
        width: 15rem;
        line-height: 1.2;

        .user-deeds {
          /*用户经历*/
          .stat {
            background-color: #fff;

            .title {
              color: #31445b;
              padding: 1.2rem;
              font-weight: 600;
              font-size: 1rem;
            }

            .body {
              padding: 1rem;

              .item {
                .bind {
                  margin-right: 1rem;
                }

                /*等级样式*/
                .level {
                  margin: .3rem;
                  color: #4a68ad;
                  cursor: pointer;
                }

                text-align: center;
                display: flex;
                align-items: center;
                font-size: 1rem;
              }
            }
          }

          /*用户互动*/
          .start {

            display: flex;
            text-align: center;
            background-color: #fff;

            a {
              color: #72777b;
              flex: 1 1 auto;
              padding: 1rem 0 1rem 0;

              .item-content {
                margin-top: .3rem;
                color: #2e323e;
              }
            }

            .after:after {
              content: "";
              position: absolute;
              top: 82%;
              left: 88%;
              width: 1px;
              height: 20%;
              background-color: #f3f3f4;
              -webkit-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
            }
          }
        }
      }
    }
  }
</style>
