<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in title"
      :key="index"
      @click="itemClick(index)"
      :class="{active: index === currentIndex}"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: Array
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control > div {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active > span {
  padding: 5px;
  border-bottom: 2px solid var(--color-high-text);
}
</style>