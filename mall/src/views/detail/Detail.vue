<template>
  <div id="detail">
    <!-- 详情页导航 -->
    <DetailNavBar @navClick="navClick" ref="nav"></DetailNavBar>
    <!-- 轮播图 -->
    <DetailSwiper :topImages="topImages" class="top"></DetailSwiper>
    <!-- 商品信息 -->
    <DetailContent :goods="goods"></DetailContent>
    <!-- 店铺信息 -->
    <DetailShopInfo :shop="shop"></DetailShopInfo>
    <!-- 效果图信息 -->
    <DetailGoodsInfo :detailInfo="detailInfo" @loadImg="loadImg"></DetailGoodsInfo>
    <!-- 参数信息 -->
    <DetailParamInfo ref="params" :paramInfo="paramInfo"></DetailParamInfo>
    <!-- 评论信息 -->
    <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
    <!-- 推荐信息 -->
    <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    <!-- 底部工具栏 -->
    <DetailBottom @addToCart="addToCart"></DetailBottom>
    <!-- 返回顶部 -->
    <BackTop></BackTop>
  </div>
</template>

<script>
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";
import DetailNavBar from "./DetailNavBar";
import DetailSwiper from "./DetailSwiper";
import DetailContent from "./DetailContent";
import DetailShopInfo from "./DetailShopInfo";
import DetailGoodsInfo from "./DetailGoodsInfo";
import DetailParamInfo from "./DetailParamInfo";
import DetailCommentInfo from "./DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/common/backtop/BackTop";
import DetailBottom from "./DetailBottom";

import { debounce } from "common/utils";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [], //轮播图
      goods: {}, //商品信息
      shop: {}, //店铺信息
      detailInfo: {}, //效果图
      paramInfo: {}, //参数信息
      commentInfo: {}, //评论信息
      recommends: [], //推荐信息
      scrollPositon: [], //详情页导航栏对应的位置
      shake: null, //防抖用
      currentIndex: 0
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailContent,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop,
    DetailBottom
  },
  created() {
    this._getDetail();
    this._getRecommend();
    this.shake = debounce(() => {
      this.scrollPositon = [];
      this.scrollPositon.push(0);
      this.scrollPositon.push(this.$refs.params.$el.offsetTop);
      this.scrollPositon.push(this.$refs.comment.$el.offsetTop);
      this.scrollPositon.push(this.$refs.recommend.$el.offsetTop);
      this.scrollPositon.push(Number.MAX_VALUE);
      // console.log(this.scrollPositon);
    });
    // window.addEventListener("scroll", this.scroll);
  },
  mounted() {},
  destroyed() {
    // window.removeEventListener("scroll", this.position);
  },
  updated() {},
  methods: {
    //   详情页信息获取
    _getDetail() {
      this.iid = this.$route.params.iid;
      getDetail(this.iid).then(res => {
        let data = res.data.result;
        // console.log(data);
        //   轮播图数据
        this.topImages = data.itemInfo.topImages;
        // 商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //店铺信息
        this.shop = new Shop(data.shopInfo);
        //效果图
        this.detailInfo = data.detailInfo;

        //参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    // 推荐信息获取
    _getRecommend() {
      getRecommend().then(res => {
        this.recommends = res.data.data.list;
        // console.log(this.recommends);
      });
    },
    //添加购物车
    addToCart() {
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      // this.$store.commit("addToCart", product);
      this.$store.dispatch("addToCart", product).then(res => {
        this.$toast.show(res, 1000);
      });
    },
    // 监听详情页图片加载完成
    loadImg() {
      this.shake();
    },
    // 监听滚动位置
    // scroll() {
    //   let top = document.documentElement.scrollTop;
    //   let length = this.scrollPositon.length;
    //   for (let i = 0; i < length; i++) {
    //     if (
    //       this.currentIndex !== i &&
    //       top >= this.scrollPositon[i] &&
    //       top < this.scrollPositon[i + 1]
    //     ) {
    //       index = i;
    //       console.log(this.currentIndex);
    //       console.log(i);
    //       this.$refs.nav.currentIndex = this.currentIndex;
    //     }
    //   }
    // },
    // 点击详情页导航，移动到对应位置
    navClick(index) {
      window.scrollTo(0, this.scrollPositon[index]);
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  margin-top: 44px;
}
</style>