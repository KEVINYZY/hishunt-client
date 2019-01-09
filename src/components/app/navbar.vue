<template>
  <div class="navBar">
    <!--响应式导航栏-->
    <hisHead class="pc"></hisHead>
    <mNavigation class="mobile"></mNavigation>
  </div>
</template>

<script>
  import {hisHead, mNavigation} from '@/components'//导入导航栏和页脚
  import topBar from '@/components/app/topbar'//TopBar

  export default {
    name: "nav-bar",
    components: {
      hisHead,
      mNavigation,
      topBar,
    }
  }
</script>

<style scoped lang="scss">
  @media (max-width: 768px) {
    .pc {
      display: none;
    }
    .mobile {
      display: block !important;
    }
  }

  .mobile {
    display: none;
  }
</style>
