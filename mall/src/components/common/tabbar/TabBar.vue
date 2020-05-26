<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
import TabBarItem from "./TabBarItem";
export default {
  name: "TabBar",
  components: {
    TabBarItem
  }
};
</script>

<style scoped>
#tab-bar {
  width: 100%;
  display: flex;
  text-align: center;
  background-color: #f6f6f6;
  position: fixed;
  bottom: -3px;
  z-index: 9;
  box-shadow: 0 -1px rgba(100, 100, 100, 0.1);
}
</style>