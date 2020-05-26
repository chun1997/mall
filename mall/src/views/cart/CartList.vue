<template>
  <div class="cart">
    <CartListItem v-for="(item,index) in cartList" :key="index" :cartListItem="item" :index="index"></CartListItem>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";
export default {
  name: "",
  props: {
    cartList: Array
  },
  components: {
    CartListItem
  }
};
</script>

<style scoped>
</style>