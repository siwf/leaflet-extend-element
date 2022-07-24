<template>
  <div class="ya-forecast clearfix">
    <div class="theme-left fl">
      <div class="left-btn">
        <div class="map-switch" @click="switchChange">
          <i v-if="switchBtn" class="el-icon-arrow-left"></i>
          <i v-else class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ForecastSwitch",
  props: {
    showRight: {
      type: Boolean,
      default: () => true
    }
  },
  components: {},
  data() {
    return {
      switchBtn: this.showRight
    };
  },
  methods: {
    switchChange() {
      this.switchBtn = !this.switchBtn
      this.$emit('switchBtn')
    }
  }
};
</script>

<style scoped lang="scss">
.ya-forecast {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 2111;
}
.forecast-table {
  height: calc(100vh - 98px);
  width: 400px;
  background-color: #ffffff;
}
.theme-left {
  margin-right: 15px;
  display: flex;
  // flex-direction: column;
}
.map-switch {
  width: 29px;
  height: 29px;
  text-align: right;
  background: #ffffff;
  box-shadow: 0px 3px 5px 0px rgba(142, 155, 176, 0.5);
  border-radius: 5px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  position: relative;
}
.left-btn {
  display: flex;
  // justify-content: flex-end;
  align-items: center;
  margin-bottom: 9px;
}
</style>
