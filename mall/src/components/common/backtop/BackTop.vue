<template>
  <div class="back-top" @click="backClick" v-show="showBack">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  name: "BackTop",

  data() {
    return {
      showBack: false
    };
  },
  created() {
    window.addEventListener("scroll", this.position);
  },
  destroyed() {
    window.removeEventListener("scroll", this.position);
  },

  activated() {
    window.addEventListener("scroll", this.position);
  },
  deactivated() {
    window.removeEventListener("scroll", this.position);
  },
  methods: {
    //   滚动位置
    position() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;

      if (top > 1500) {
        this.showBack = true;
      } else {
        this.showBack = false;
      }
      return top;
    },
    // 回到顶部
    backClick() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      let timeTop = setInterval(() => {
        document.documentElement.scrollTop = document.body.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  }
};
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
  z-index: 99;
}
.back-top img {
  width: 43px;
  height: 43px;
}
</style>