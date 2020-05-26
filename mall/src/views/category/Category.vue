<template>
  <div id="category">
    <!-- 分类页面头部 -->
    <NavBar class="center">
      <div slot="center">商品分类</div>
    </NavBar>
    <!-- 头部下的内容区域 -->
    <div class="content">
      <!-- 侧边栏导航 -->
      <Menu :menuList="menuList" @selectItem="selectItem"></Menu>
      <!-- 内容区域 -->
      <MenuContent :menuContentList="menuContentList"></MenuContent>
    </div>
  </div>
</template>

<script >
import { getCategory, getContent } from "network/category";

import NavBar from "components/common/navbar/NavBar";
import Menu from "./Menu";
import MenuContent from "./MenuContent";
export default {
  name: "Category",
  components: {
    NavBar,
    Menu,
    MenuContent
  },
  data() {
    return {
      menuList: [],
      menuContentList: []
    };
  },
  created() {
    this._getCategory();
  },

  methods: {
    // 获取侧边栏数据
    _getCategory() {
      getCategory().then(res => {
        // console.log(res);
        this.menuList = res.data.data.category.list;
        this._getContent(this.menuList[0].maitKey);
      });
    },
    // 点击侧边栏
    selectItem(index) {
      let maitkey = this.menuList[index].maitKey;
      this._getContent(maitkey);
    },
    // 获取侧边栏对应内容
    _getContent(maitkey) {
      getContent(maitkey).then(res => {
        console.log(res);
        this.menuContentList = res.data.data.list;
        console.log(this.menuContentList);
      });
    }
  }
};
</script>

<style scoped>
.center {
  background-color: var(--color-tint);
  width: 100%;

  position: fixed;
  z-index: 9;
  width: 100%;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}
</style>