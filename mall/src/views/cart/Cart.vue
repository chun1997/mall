<template>
  <div>
    <!-- 购物车顶部 -->
    <NavBar class="center">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <!-- 购物车列表 -->
    <CartList :cartList="cartList" class="cart-list"></CartList>
    <!-- 结算区域 -->
    <CartListBottom></CartListBottom>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./CartList";
import CartListBottom from "./CartListBottom";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartListBottom
  },
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
    cartLength() {
      return this.$store.state.cartList.length;
    }
  }
};
</script>

<style scoped>
.center {
  background-color: var(--color-tint);
  position: fixed;
  top: 0;
  z-index: 9;
  width: 100%;
}
.cart-list {
  padding: 44px 0 88px;
}
</style>