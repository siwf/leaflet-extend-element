<template>
  <div class="ya-center" @click="goCenter">
    <img src="@/assets/img/map/home.png" alt="" style="width: 16px; height:16px;">
  </div>
</template>

<script>
export default {
  methods: {
    goCenter() {
      this.$emit('toCenter')
    }
  }
}
</script>

<style lang="scss" scoped>
.ya-center {
  position: absolute;
  left: 12px;
  bottom: 100px;
  height: 24px;
  width: 24px;
  display: flex;
  z-index: 1111;
  align-items: center;
  background-color: #ffffff;
  border-radius: 2px;
  cursor: pointer;
  justify-content: center;
  box-shadow: 0px 2px 4px 0px rgba(142, 155, 176, 0.5);
}
</style>