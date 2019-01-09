<template>
  <div v-if="show" class="loading">
    <el-row>
      <el-col :span="18">
        <div class="grid-content"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "loadingAfter",
    props: ['show']
  }
</script>

<style scoped lang="scss">
  .loading {
    padding: 0.5rem 2rem;

    .grid-content {
      border-radius: 4px;
      min-height: 1.5rem;
      margin-top: 1rem;
      background-color: #f6f6f6;
    }
  }
</style>
