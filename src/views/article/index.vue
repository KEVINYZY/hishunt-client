<template>
  <div v-if="article.author">
    <navBar></navBar>
    <el-container>
      <div class="his-article-content">
        <el-row class="his-article-detail">
          <el-row class="his-article-user-bar" type="flex">
            <a href="">
              <div class="his-article-user-avatar"
                   :style="{backgroundImage: 'url(' + article.author.avatar + ')'}"></div>
            </a>
            <div class="author-info-box">
              <a :href="'/user/' + article.author.id" class="username">{{article.author.nickname}}</a>
              <div class="meta-box">
                <time>{{article.time | dataFormat('yyyy年MM月dd日 hh时')}}</time>
                <span>阅读 888</span>
              </div>
            </div>
          </el-row>
          <el-col :push="1" :pull="1" :xs="22" :sm="22" :md="9" :lg="22" class="his-article-title">
            {{article.title}}
          </el-col>
          <el-col :push="1" :pull="1" :xs="22" :sm="22" :lg="22">
            <div v-html="article.content" class="markdown-body"></div>
          </el-col>
        </el-row>
        <!--文章和用户Bar-->
        <el-row class="his-article-sidebar">
          <!--用户Card-->
          <el-row class="sidebar-block">
            <el-row class="block-title">关于作者</el-row>
            <el-row class="block-body">
              <a :href="'/user/' + article.author.id" class="item user-item">
                <div class="block-body-avatar"
                     :style="{backgroundImage: 'url(' + article.author.avatar + ')'}"></div>
                <el-row class="block-body-username">
                  <el-row class="block-body-nickname">
                    {{article.author.nickname}}
                  </el-row>
                </el-row>
              </a>
            </el-row>
          </el-row>
        </el-row>
      </div>
    </el-container>
  </div>
</template>
<script>
  import navBar from '@/components/app/navbar'//响应式导航栏
  import marked from 'marked'//引入marked语法解释器
  import 'github-markdown-css' //引入代码高亮的css
  export default {
    components: {
      navBar
    },
    data() {
      return {
        article: {},
      }
    },
    created() {
      this.searchNew();
    }, mounted() {
      this.markdownInit()
    }, methods: {
      searchNew() {
        this.api({
          url: '/article/' + this.$route.params.id,
          type: 'get'
        }).then((res) => {
          this.article = res
          this.article.content = marked(res.content, {sanitize: true})
        })
      }, markdownInit() {
        marked.setOptions({
          renderer: new marked.Renderer(),
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

  .navUserWrap {
    position: fixed;
    top: 16px;
    right: 470px;
  }


  .el-container {
    .his-article-content {
      position: relative;
      margin: 1rem auto;
      width: 100%;
      max-width: 960px;
    }
  }

  .his-article-user-avatar {
    margin-right: 0.8rem;
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }

  @media (max-width: 768px) {
    .his-article-detail {
      width: 100% !important;
    }
    .his-article-sidebar {
      display: none;
    }
  }

  .his-article-detail {
    width: 700px;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    float: left;

    .his-article-title {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.5;
      margin: .67em 0;
    }
  }

  .his-article-user-bar {
    padding: 1rem 1rem 0 2rem;
    align-items: center;

    a {
      display: block;
      max-width: 100%;
      font-size: 1.3rem;
      font-weight: 700;
      color: #333;
    }

    .author-info-box {
      display: block;
      max-width: 100%;
      font-size: .7rem;
      font-weight: 700;
      color: #333;

      time, span {
        color: #909090;
      }
    }
  }

  .article-detail {
    margin-top: 2rem;
  }

  /*文章右边框*/
  .his-article-sidebar {
    float: right;
    font-size: 18px;
    width: 240px;
    border-radius: 2px;

    .sidebar-block {
      background-color: #fff;

      .block-title {
        padding: .5rem 1.3rem;
        font-size: 1.16rem;
        color: #333;
        border-bottom: 1px solid hsla(0, 0%, 58.8%, .1);
      }

      .block-body {
        .user-item {
          padding: 1rem;
        }

        .block-body-avatar {
          margin-right: 1rem;
          display: inline-block;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
        }

        .item {
          display: flex;
          align-items: center;
        }


        .block-body-username {
          display: inline-block;
          min-width: 0;

          .block-body-nickname {
            font-size: 1.333rem;
            font-weight: 600;
            color: #000;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
