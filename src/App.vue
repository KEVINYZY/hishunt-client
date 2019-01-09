<template>
  <div id="app">
    <!--内容开始-->
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  /*自定义Tabs*/
  .el-tabs {
    .el-tabs__header {
      margin: 0px;
    }
    .el-tabs__nav-wrap::after{
      height: 1px;
    }
  }


  * {
    margin: 0px;
    padding: 0px;
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC', 'WenQuanYi Micro Hei', sans-serif;
  }

  /*body标签的默认高度*/
  body {
    background: #f6f6f6;
  }

  a {
    text-decoration: none
  }

  /*默认渲染标签内的高度*/
  #app, html, body {
    height: 100%;
  }
</style>
