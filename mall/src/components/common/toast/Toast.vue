<template>
  <div class="toast" v-show="isShow">
    <div>{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      msg: "",
      isShow: false
    };
  },
  methods: {
    show(message, duration = 1500) {
      this.isShow = true;
      this.msg = message;
      setTimeout(() => {
        this.isShow = false;
        this.msg = "";
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  width: 80%;
  text-align: center;
  z-index: 99999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 15px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>