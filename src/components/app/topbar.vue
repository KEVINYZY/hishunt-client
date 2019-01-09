<template>
  <el-row v-show="showTop" @click.native="toTop" type="flex" class="his-top">
    <svg-icon class="top-bar-icon" iconClass="bartop"></svg-icon>
  </el-row>
</template>

<script>
  export default {
    name: "top-bar",
    data() {
      return {
        scrollTop: 0,
        time: 0,
        dParams: 20,
        scrollState: 0
      }
    }, computed: {
      showTop: function () {
        let value = this.scrollTop > 200 ? true : false;
        return value;
      },
    },
    mounted() {
      window.addEventListener('scroll', this.getScrollTop);
    },
    methods: {
      toTop(e) {
        if (!!this.scrollState) {
          return;
        }
        this.scrollState = 1;
        e.preventDefault();
        let distance = document.documentElement.scrollTop || document.body.scrollTop;
        let _this = this;
        this.time = setInterval(function () {
          _this.gotoTop(_this.scrollTop - _this.dParams)
        }, 10);
      },
      gotoTop(distance) {
        this.dParams += 20;
        distance = distance > 0 ? distance : 0;
        document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
        if (this.scrollTop < 10) {
          clearInterval(this.time);
          this.dParams = 20;
          this.scrollState = 0;
        }
      },
      getScrollTop() {
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      }
    },
  }
</script>

<style scoped lang="scss">
  .his-top {
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    z-index: 1000;

    .top-bar-icon {
      height: 2.3rem;
      width: 2.3rem;
      margin: 1rem 0 0;
      padding: 0;
      line-height: 1;
      color: #909090;
      background-color: #fff;
      border: 1px solid #f1f1f1;
      border-radius: 50%;
      box-shadow: 0 0 5px rgba(0, 0, 0, .05);
      cursor: pointer;

    }
  }
</style>
