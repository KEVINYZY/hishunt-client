<template>
  <div>
    <navBar></navBar>
    <div class="his-content">
      <div class="his-content-detail">
        <userBar v-if="hasPerm('user:login')"></userBar>
        <el-tabs :stretch="true" tab-position="" class="his-content-tab" v-model="activeName">
          <el-tab-pane label="推荐" name="first">
            <zhiScroll class="scrolls" ref="zhiScroll" :on-pull="initArticle" :loaded="loaded"
                       :scroll-state="scrollState">
              <div slot="scrollList">
                <loadingAfter :show="articleList.length <= 0"></loadingAfter>
                <ul>
                  <li style="list-style: none;border-bottom: 1px solid gainsboro" v-for="(article,index) in articleList"
                      :key="index">
                    <el-row class="article-box">
                      <a :href="'/p/'+ article.id" style="display: block">
                        <el-row class="content-box">
                          <el-row class="info-box">
                            <el-row type="flex" style="font-size: .8rem;color: #b2bac2;">
                              <ul style="display: flex;align-items: baseline;white-space: nowrap;list-style: none">
                                <li style="color: #dd6161;">热</li>
                                <li><span class="info-box-title">·</span></li>
                                <li class="author"><a
                                  :href="'/user/' + article.author.id">{{article.author.nickname}}</a></li>
                                <li><span class="info-box-title">·</span></li>
                                <li>{{article.time | dataFormat('MM月dd日 hh时mm分')}}</li>
                                <li><span class="info-box-title">·</span></li>
                                <li>Vue.js</li>
                              </ul>
                            </el-row>
                            <el-row class="title-row">
                              <a class="article-title" :href="'/p/'+ article.id">{{article.title}}</a>
                            </el-row>
                            <el-row type="flex" class="info-row action-row">
                              <ul style="display: inline-flex">
                                <li class="his-article-btn-ul">
                                  <a href="/">
                                    <svg-icon iconClass="fabulous"></svg-icon>
                                    <span>28</span>
                                  </a>
                                </li>
                                <li class="his-article-btn-ul">
                                  <a>
                                    <svg-icon iconClass="discussion" style="height: 16px;width: 16px"></svg-icon>
                                    <span>22</span>
                                  </a>
                                </li>
                              </ul>
                            </el-row>
                          </el-row>
                        </el-row>
                      </a>
                    </el-row>
                  </li>
                </ul>
              </div>
            </zhiScroll>
          </el-tab-pane>
          <el-tab-pane label="关注" name="second">关注列表</el-tab-pane>
          <el-tab-pane label="热榜" name="third">热榜列表</el-tab-pane>
        </el-tabs>
      </div>
      <div class="hisSideBar">

        <div class="Card adve">
          <a target="_blank"
             href="https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=7rmbtbwh"><img
            src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/d467587b34de6f2c472e345868699a11_259_194.jpg"
            alt="云大使广告"></a>
        </div>
        <div class="Card user" v-if="hasPerm('user:login')">
          <ul>
            <li>
              <router-link to="/"><i class="el-icon-star-on"></i><span>我的收藏</span></router-link>
            </li>
            <li>
              <router-link to="/"><i class="el-icon-view"></i><span>我的关注</span></router-link>
            </li>
            <li>
              <router-link to="/"><i class="el-icon-share"></i><span>我的邀请</span></router-link>
            </li>
            <li>
              <router-link to="/"><i class="el-icon-sold-out"></i><span>我的礼券</span></router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import userBar from '@/components/user/userbar'//用户Bar

  import navBar from '@/components/app/navbar'//响应式导航栏

  import loadingAfter from '@/components/app/loading-After'//文章未加载前显示

  import zhiScroll from '@/components/app/zhi-Scroll'//下拉分页

  export default {
    components: {
      userBar,
      navBar,
      zhiScroll,
      loadingAfter
    },
    data() {
      return {
        activeName: 'first',
        articleList: [],
        scrollState: false, // 是否可以滑动
        loaded: false,
        listQuery: {
          pageNum: 1,//页码
          pageRow: 20,//每页条数
        },
      }
    },
    mounted() {
      this.initArticle()
    },
    methods: {
      initArticle() {
        this.api({
          url: '/article',
          method: 'get',
          params: this.listQuery
        }).then((res) => {
          this.$refs.zhiScroll.setState(1)
          let _this = this
          if (res.list.length > 0 && !_this.loaded) {
            if (_this.listQuery.pageNum == 1) {
              _this.articleList = res.list
            } else {
              _this.articleList.push(...res.list)
            }
            _this.listQuery.pageNum++
            _this.$refs.zhiScroll.setState(2)
          } else {
            if (_this.listQuery.pageNum == 1) {
              _this.articleList = []
            }
            _this.loaded = true
            _this.$refs.zhiScroll.setState(3)
          }

        })
      }
    }
  }
</script>
<style lang="scss" scoped>

  a:link, a:visited {
    color: #b2bac2;
    text-decoration: none;
  }


  .his-content {
    position: relative;
    margin: 1rem auto;
    width: 100%;
    max-width: 960px;

    .scrolls {
      font-size: 1rem;

      .article-box:hover {
        background-color: #f4f5f5;
      }
    }

    .list {
      height: 4rem;
      line-height: .9rem;
      border-bottom: 1px solid #dedede;
      color: #999;
      font-size: 1.7rem;
    }

    .user-bar {
      margin-bottom: 1rem;
    }

    .his-article {
      line-height: 27px;
    }

    @media (max-width: 768px) {
      .his-content-detail {
        width: 100% !important;
      }
      .content-box {
        padding: 0.5rem 1rem;
      }
    }

    .his-content-detail {
      .his-content-tab {
        background-color: white;

      }


      width: 700px;
      float: left;
    }
  }

  .content-box {
    display: flex;
    align-items: center;
    padding: 0.5rem 2rem;

    .info-box {
      .author {
        a:hover {
          color: #0084ff;
        }
      }
    }

    .info-box-title {
      font-weight: bold;
      margin: 0px 0.4em;
    }

    .title-row {
      margin: .5rem 0rem .5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      .article-title {
        color: #2e323e;
        font-size: 1rem;
        font-weight: 900;
      }

      .article-title:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    .hisSideBar {
      display: none;
    }
  }

  .hisSideBar {
    float: right;
    font-size: 18px;
    width: 240px;
    border-radius: 2px;

    .Card {
      padding: 20px;
      margin-bottom: 10px;
      background: #fff;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
      box-sizing: border-box;

    }

    /*用户功能按钮居中*/
    .UserBtn {
      text-align: center;
    }

    .adve {
      a {
        img {
          width: 100%;
        }
      }

      padding: 0px;
    }

    .user {
      padding: 0px;

      ul {
        li {
          padding: 0px 17px;

        }

        a {
          display: block;
          text-decoration: none;
          out-line: none;
          color: #8590a6;

          i {
            margin-right: 10px;
            border-bottom: 1px solid rgba(178, 186, 194, .15);
          }

          padding: 10px 10px;
          line-height: 20px;

          span {
            font-size: 14px;

          }
        }

        li:hover {
          background-color: #e6e6e6;
        }
      }
    }
  }

  .his-article-btn-ul {
    display: -webkit-flex;
    display: flex;
    align-items: baseline;
    white-space: nowrap;
    list-style: none;
    height: 1.6rem;
    color: #b2bac2;
    border-radius: 1px;
    border: 1px solid #edeeef;

    a {
      display: -webkit-flex;
      display: flex;
      align-items: center;
      padding: 0 .8rem;
      height: 100%;
    }

    a:hover {
      background-color: #FAFAFA;
    }


  }
</style>
