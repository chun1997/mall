<template>
  <div class="menu-content">
    <div v-for="(item,index) in menuContentList" :key="index" class="menu-item">
      <img :src="item.image" alt />
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    menuContentList: Array
  }
};
</script>

<style scoped>
.menu-content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  height: 100%;
  overflow: auto;
}
.menu-item {
  /* float: left; */
  width: 50px;
  height: 70px;
  margin: 8px;
}
.menu-item img {
  width: 80%;
}
</style>