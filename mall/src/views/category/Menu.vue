<template>
  <div class="menu">
    <div
      class="menu-item"
      v-for="(item,index) in menuList"
      :key="index"
      :class="{active:index===currentIndex}"
      @click="itemClick(index)"
    >{{item.title}}</div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    menuList: Array
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index);
    }
  }
};
</script>

<style scoped>
.menu {
  background-color: #f6f6f6;
  width: 100px;
  float: left;
  overflow: auto;
}
.menu-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.menu-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>