<template>
  <keep-alive>
    <div id="home">
      <!-- 头部导航 -->
      <NavBar class="home-nav">
        <div slot="center">购物街</div>
      </NavBar>
      <!-- 轮播图 -->
      <HomeSwiper class="swiper1" :banner="banner"></HomeSwiper>
      <!-- 推荐 -->
      <Recommend :recommend="recommend"></Recommend>
      <!-- 流行 -->
      <Fashion></Fashion>
      <!-- 流行导航 -->
      <TabControl class="tab-control" :title="title" @tabClick="tabClick"></TabControl>
      <!-- 商品展示 -->
      <GoodsList :goods="goods[currentType].list" class="goodsList"></GoodsList>
      <!-- 回到顶部 -->
      <BackTop></BackTop>
    </div>
  </keep-alive>
</template>

<script>
import { getHomeData, getHomeGoods } from "network/home";
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/common/backtop/BackTop";

import HomeSwiper from "./HomeSwiper";
import Recommend from "./Recommend";
import Fashion from "./Fashion";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    Recommend,
    Fashion
  },
  data() {
    return {
      banner: [], //轮播图数据
      recommend: [], //推荐数据
      title: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      scroll: null //记录滚动位置
    };
  },
  created() {
    this.getHomeData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  destroyed() {},
  activated() {
    window.addEventListener("scroll", this.loadMore);
    window.scrollTo(0, this.scroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.loadMore);
  },
  methods: {
    // 流行导航栏切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    // 请求轮播加推荐数据
    getHomeData() {
      getHomeData().then(res => {
        // console.log(res);
        let data = res.data.data;
        this.banner = data.banner.list;
        this.recommend = data.recommend.list;
      });
    },
    // 请求商品展示列表
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        let data = res.data.data;
        this.goods[type].list.push(...data.list);
        this.goods[type].page += 1;
      });
    },
    //上拉加载更多
    loadMore() {
      let clientHeight = document.documentElement.clientHeight; //屏幕高度
      let scrollHeight = document.body.scrollHeight; //滚动区域的高度
      let scrollTop = document.documentElement.scrollTop; //滚动距离

      let distance = 2; //距离视窗还用2的时候，开始触发；
      this.scroll = scrollTop;
      if (scrollHeight - scrollTop - clientHeight <= distance) {
        this.getHomeGoods(this.currentType);
        console.log("---------");
      }
    }
  }
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  position: fixed;
  z-index: 9;
  width: 100%;
}
.swiper1 {
  padding-top: 44px;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>