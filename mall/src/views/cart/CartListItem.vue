<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton @click.native="checkClick" :isChecked="cartListItem.checked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="cartListItem.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{cartListItem.title}}</div>
      <div class="item-desc">商品描述: {{cartListItem.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{cartListItem.price}}</div>

        <div class="item-count right">
          <button class="sub" @click="sub">－</button>
          x{{cartListItem.count}}
          <button class="add" @click="add">＋</button>
          <button class="del" @click="del(index)">X</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "",
  props: {
    cartListItem: Object,
    index: Number
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      this.cartListItem.checked = !this.cartListItem.checked;
    },
    sub() {
      if (this.cartListItem.count >= 2) {
        this.cartListItem.count--;
      } else {
        this.$toast.show("已经是最小数量");
      }
    },
    add() {
      this.cartListItem.count++;
    },
    del(index) {
      this.$store.state.cartList.splice(index, 1);
    }
  }
};
</script>

<style scoped>
/* .del {
  position: relative;
  right: -20px;
} */
.sub {
  position: relative;
  left: 0;
}
button {
  margin: 0 2px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  line-height: 20px;
  text-align: center;
  background-color: var(--color-tint);
  border: 1px solid var(--color-tint);
}
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>