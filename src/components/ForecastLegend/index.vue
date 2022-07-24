<template>
  <div class="ya-legend">
    <p class="legend-title">图例</p>
    <ul class="legend-bg">
      <li class="bg-item">
        <div class="bg-wrapper">
       <img src="@/assets/img/map/zdz-l.png" alt="" style="width: 20px; height: 20px;">
       </div>
        <p class="legend-name">自动站</p>
      </li>
  
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.ya-legend {
  width: 110px;
  padding: 6px;
  background: #FFFFFF;
  border-radius: 4px;
  position: absolute;
  right: 4px;
  bottom: 70px;
  z-index: 1111;
  color: #333333;
}
.legend-title {
  padding-left: 20px;
  position: relative;
  &::before {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #333333;
    content: '';
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
.legend-bg {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
}
.bg-item {
  display: flex;
  width: 90px;
  height: 24px;
  line-height: 24px;
  // justify-content: space-around;
  // text-align: center;
  align-items: center;
  justify-content: center;
}
.bg-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29px;
  height: 30px;
}
</style>