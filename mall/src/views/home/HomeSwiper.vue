<template>
  <!-- 轮播图 -->
  <Swiper>
    <SwiperItem v-for="(item,index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banner: Array
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
</style>