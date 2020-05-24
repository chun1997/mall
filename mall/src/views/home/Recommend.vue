<template>
  <div class="recommend">
    <div v-for="(item,index) in recommend" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    recommend: Array
  }
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 14px;

  padding: 10px 0 15px;
  border-bottom: 10px solid #eee;
}
.recommend > div {
  flex: 1;
}
.recommend img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>