<template>
  <NavBar class="nav-bar">
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt />
    </div>
    <div slot="center" class="title">
      <div
        class="title-item"
        v-for="(item,index) in titles"
        :key="index"
        :class="{active:currentIndex === index}"
        @click="itemClick(index)"
      >{{item}}</div>
    </div>
  </NavBar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("navClick", index);
    },
    backClick() {
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  z-index: 9;
  background-color: #fff;
  width: 100%;
  top: 0px;
}
.title {
  color: #000;
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back {
  margin-top: 5px;
  margin-left: -5px;
}
</style>