<template>
  <el-container>
    <el-header>
      <el-row type="flex" class="writer-title">
        <el-col :span="15">
          <input type="text" v-model="article.title" placeholder="请输入文章标题..."/>
        </el-col>
        <el-col :span="9">
          <!--右边操作区域-->
          <el-row type="flex" justify="end" class="row-bg">
            <el-col :xs="13" :sm="15" :md="13" :lg="11" :xl="9">
              <div>
                <span type="text" style="color: #ddd;">文章会自动保存至</span>
                <el-button size="small" style="color: #ddd;margin-left: .2rem" plain><span>草稿</span>
                </el-button>
              </div>
            </el-col>
            <el-col :span="2" style="float: left">
              <div>
                <el-popover
                  placement="bottom"
                  width="15rem"
                  trigger="click"
                >
                  <el-row>
                    <h2>添加封面大图</h2>
                    <el-row>
                      <el-upload v-if="!uploadHas" :auto-upload="false"
                                 class="his-upload-btn"
                                 action="/"
                                 :show-file-list="false"
                                 :on-change="handleAvatarSuccess"
                                 :before-upload="beforeAvatarUpload">
                        <div style="padding:45px 30px">点击此处添加图片</div>
                      </el-upload>
                      <img style="width: 15rem;height: 8rem;" v-if="imageUrl" :src="imageUrl" class="avatar">
                    </el-row>
                  </el-row>
                  <el-button slot="reference" type="text">
                    <svg-icon style="height: 28px;width: 28px;color: #ccc" iconClass="imgBtn"></svg-icon>
                  </el-button>
                </el-popover>
              </div>
            </el-col>
            <!--切换文本编辑器-->
            <el-col :span="2">
              <div>
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                   <svg-icon style="height: 28px;width: 28px;cursor: pointer" iconClass="other"></svg-icon>
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="switchEditor">切换为富文本编辑器</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
            <el-col :span="2">
              <div>
                <el-button @click="sendArticle" type="text">发布</el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <div>
                <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <img class="userHead" title="用户头像" :src="avatar" width="50px" height="50px" alt="知书登录用户头像">
      </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="goHome"><i class="el-icon-back"></i><span style="margin-left: 3px">返回主页</span>
                    </el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-setting"></i><span style="margin-left: 3px">设置</span>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="logout"><i class="el-icon-circle-close-outline"></i><span
                      style="margin-left: 3px">退出</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>

        </el-col>

      </el-row>
    </el-header>
    <el-main id="editorMain">
      <mavonEditor v-bind:style="{height : height + 'px',width: width + 'px'}" placeholder="请输入文章内容"
                   v-model="article.content" ref="md"
                   @imgAdd="imgAdd"
                   @change="changeMavon"/>
    </el-main>
  </el-container>
</template>
<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      mavonEditor
    },
    data() {
      return {
        height: 0,
        width: 0,
        article: {
          title: '',
          content: ''
        },
        uploadHas: false,//是否上传完图片
        imageUrl: '',
        params: '',
        isUpload: false,
        toolbar: [
          [{'header': [1, 2, 3, 4, 5, 6, false]}, {'list': 'ordered'}, {'list': 'bullet'}, 'code-block', 'underline', 'bold', 'italic', 'image', 'video', 'clean']]
      }
    },
    mounted() {
      //赋初始值给编辑器
      this.height = document.getElementById("editorMain").offsetHeight
      this.width = document.getElementById("editorMain").offsetWidth
      //初始赋值
      const shu = this;
      window.onresize = function () {//动态为编辑器赋值高度宽度，适应所有屏幕
        shu.height = document.getElementById("editorMain").offsetHeight
        shu.width = document.getElementById("editorMain").offsetWidth
      };

    },
    computed: {
      ...
        mapGetters([
          'avatar'
        ])
    }
    ,
    methods: {
      handleAvatarSuccess(file) {
        this.uploadHas = true;
        this.$nextTick(
          () => {
            this.imageUrl = URL.createObjectURL(file.raw);
          });
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传封面图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传封面图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      changeMavon() {

      }
      ,
      imgAdd(pos, file) {
        const loading = this.$loading({
          lock: true,
          text: '正在上传图片',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 251, 240)'
        })
        const formData = new FormData()//富文本编辑器上传图片回显到编辑器中
        formData.append('file', file)
        this.api({
          url: '/article/fileUpload',
          method: 'post',
          data: formData
        }).then((res) => {
          if (res)
            this.$refs.md.$img2Url(pos, res)//更改图片内文章上传地址
          loading.close()
        })
      }, switchEditor() {
        this.$message({
          message: '此功能正在开发哦，谢谢您的使用！',
          type: 'warning'
        })
      }, goHome() {//返回首页
        window.location.href = '/'
      }, logout() {//登出
        this.$store.dispatch('LogOut').then(() => {
          window.location.href = '/'
        })
      }, sendArticle() {//发送文章
        if (!this.article.title) {
          this.$notify.error({
            title: '错误',
            message: '标题不能为空'
          })
        } else if (!this.article.content) {
          this.$notify.error({
            title: '错误',
            message: '内容不能为空'
          });
        } else {
          this.api({
            url: '/article',
            method: 'post',
            data: this.article
          }).then((res) => {
            this.$notify.success({
              title: '提示',
              message: '发布成功！'
            })
            window.setTimeout(() => {
              window.location.href = '/'
            }, 2000)
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .his-upload-btn {
    width: 15rem;
    height: 8rem;
    font-size: 1.334rem;
    color: rgba(51, 51, 51, .4);
    background-color: hsla(0, 0%, 87%, .6);
    border: none;
    outline: none;
    cursor: pointer;
  }

  .el-container {
    height: 100%;
    margin: 0px;
    background-color: white;

    .el-main {
      padding: 0px;

      .editor {
        min-height: 900px;
      }

    }

    .el-header {

      border-bottom: 1px solid #e6e6e6;
      /*用户头像描述*/
      .userHead {
        display: inline-block;
        border-radius: 50%;
        float: right;
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }

    .writer-title {
      height: 100%;

    }


    /*标题框*/
    input {
      width: 100%;
      margin: 0;
      padding: 0;
      font-size: 2rem;
      font-weight: 700;
      color: #000;
      border: none;
      height: 100%;
      outline: none;
    }

    .el-row {
      align-items: center; /*垂直居中*/
    }
  }
</style>
