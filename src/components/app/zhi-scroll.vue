<template>
  <div class="zhi-scroll" ref="zhiScroll" @scroll.passive="onScroll($event)" @touchmove="onScroll($event)">
    <!-- top -->
    <div class="scroll-list">
      <slot name='scrollList'></slot>
      <div class="scroll-bottom">
        <!--正在加载-->
        <div v-if="state==1">
          <svg-icon class="loading" iconClass="loading"></svg-icon>
        </div>
        <!--加载完成-->
        <div v-if="state==2"></div>
        <!--全部数据-->
        <div v-if="state==3"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">

  export default {
    name: 'zhiScroll',
    props: {
      'onPull': { // 加载回调
        type: Function,
        require: true
      },
      loaded: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        timeoutId: null,
        state: 0,
        myScroll: null
      }
    },
    methods: {
      setState(index) { // 修改状态
        this.state = index
      },
      onScroll(e) {
        const _this = this
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (!this.loaded && window.innerHeight + scrollTop >= this.$refs.zhiScroll.offsetHeight) {
          clearTimeout(this.timeoutId)
          _this.timeoutId = setTimeout(() => {
            _this.bottomCallback()
          }, 100)
        }
      },
      bottomCallback() { // 加载回调
        if (this.state != 3) {
          this.state = 1
          this.onPull()
        }
      }
    }, mounted() {
      window.addEventListener('scroll', this.onScroll);
    }
  }
</script>
<style lang="scss" scoped>
  .allow {
    overflow: hidden;
    height: auto;
  }

  @-webkit-keyframes spin {

    0% {

      -webkit-transform: rotate(0deg);

      -ms-transform: rotate(0deg);

      transform: rotate(0deg);

    }

    100% {

      -webkit-transform: rotate(360deg);

      -ms-transform: rotate(360deg);

      transform: rotate(360deg);

    }

  }

  @keyframes spin {

    0% {

      -webkit-transform: rotate(0deg);

      -ms-transform: rotate(0deg);

      transform: rotate(0deg);

    }

    100% {

      -webkit-transform: rotate(360deg);

      -ms-transform: rotate(360deg);

      transform: rotate(360deg);

    }

  }

  .zhi-scroll {
    position: relative;

    .scroll-bottom {
      text-align: center;
      color: #007fff;

      .loading {
        height: 1.5rem;
        width: 1.5rem;
        -webkit-animation: spin 1.3s linear infinite;
        animation: spin 1s linear infinite;
      }
    }
  }
</style>
