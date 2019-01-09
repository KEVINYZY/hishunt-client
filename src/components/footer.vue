<template>
  <el-footer>
    <el-row>
      <el-col :span="12" :push="12">
        猎嗅网
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :push="8">
        <div>
          <span>Copyright © 2017 猎嗅网  |  All Rights Reserved.  |  <a href="http://www.miitbeian.gov.cn/"
                                                                     target="_blank">京ICP备17045580号</a><br></span>
        </div>
      </el-col>
    </el-row>
  </el-footer>
</template>

<script>
  export default {
    name: 'Hisfooter'
  }
</script>

<style lang="scss" scoped="">
  a {
    color: #3399ea;
    text-decoration: none;
  }

  a:hover {
    color: #fafafa;
  }

  .el-footer {
    background-color: rgb(46, 50, 62);
    color: #fafafa;
  }

  .el-col {
    line-height: 30px;
  }
</style>
