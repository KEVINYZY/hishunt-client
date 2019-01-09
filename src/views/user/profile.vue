<template>
  <div class="main-container">
    <div class="user-card">
      <h1>个人资料</h1>
      <el-form ref="form" label-width="4.4rem" :model="form" size="mini" label-position="left">
        <el-form-item class="avatar" label="头像">
          <div v-if="showImg" class="user-avatar"
               v-bind:style="{backgroundImage: 'url('+ showImg +')',backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}">
          </div>
          <div v-if="!showImg" class="user-avatar"
               v-bind:style="{backgroundImage: 'url('+ avatar +')',backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}">
          </div>
          <div class="action-box">
            <div>支持 jpg、png 格式大小 5M 以内的图片</div>
            <div>
              <el-upload
                :on-change='changeAvatar' :auto-upload="false" class="avatar-uploader" action="/user/update"
                :show-file-list="false">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="用户名">
          <input placeholder="用户名"/>
        </el-form-item>
        <el-form-item label="职位">
          <input placeholder="职位"/>
        </el-form-item>
        <el-form-item label="公司">
          <input placeholder="公司名称"/>
        </el-form-item>
        <el-form-item label="个人介绍">
          <input type="text" placeholder="个人介绍">
        </el-form-item>
        <el-form-item label="个人主页">
          <input type="text" placeholder="个人主页">
        </el-form-item>
        <el-form-item class="form-btn">
          <el-button type="primary" @click="">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-null"></div>
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
        showImg: '',
        user: {},
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        isMe: true,
      }
    },
    computed: {
      ...
        mapGetters([
          'id'
        ])
    }, created() {
    }, computed: {
      ...
        mapGetters([
          'avatar'
        ])
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
      }, changeAvatar(file) {
        this.params = new FormData();
        this.params.append('file', file.raw);
        this.isUpload = true;
        this.$nextTick( //预览图片
          () => {
            this.showImg = URL.createObjectURL(file.raw);
          })
      }
    }
  }
</script>

<style scoped lang="scss">

  .main-container {
    input {
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border: 0px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      -webkit-transition: border-bottom .6s;
      transition: border-bottom .6s;
      border-bottom: 1px solid #fff;
      min-width: 20.6rem;
    }

    input:focus {
      border-bottom: 1px solid #2299dd;
    }

    input::-webkit-input-placeholder {
      color: #8590a6;
    }

    display: flex;
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 960px;

    .user-card {
      padding: 2rem 3rem 0;
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      background-color: #fff;

      h1 {
        margin: .67em 0;
        font-size: 2em;
        width: 100%;
      }

      .el-form {
        .form-btn {
          justify-content: start;
        }

        /*用户头衔表单*/
        .avatar {
          div {
            display: flex;
          }

          .user-avatar {
            flex-direction: row;
            display: inline-block;
            height: 60px;
            width: 60px;
            flex: 0 0 auto;
          }

          align-items: center;
          flex-direction: row;

          .action-box {
            margin-left: 1rem;
            display: inline-block;
            float: right;
          }
        }

        .el-form-item {
          align-items: center;
          padding-top: 22px;
          border-top: 1px solid #f1f1f1;
          display: flex;
        }
      }
    }

    .user-null {
      display: flex;
      flex: 1 1 auto;
    }
  }
</style>
