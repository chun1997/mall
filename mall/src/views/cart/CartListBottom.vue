<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :isChecked="checkAll" @click.native="allClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span @click="money" class="buy-product">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "",
  components: {
    CheckButton
  },

  computed: {
    //合计
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => item.checked)
        .reduce((pre, item) => {
          return pre + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    // 去计算
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    // 全选
    checkAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find(item => !item.checked);
    }
  },
  methods: {
    allClick() {
      if (this.checkAll) {
        this.$store.state.cartList.forEach(item => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach(item => (item.checked = true));
      }
    },
    money() {
      this.$toast.show(`正在结算中,请支付${this.totalPrice}元`);
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>