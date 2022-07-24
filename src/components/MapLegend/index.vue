<template>
  <div class="ya-legend">
    <p class="legend-title">图例</p>
    <ul class="legend-bg">
      <li class="bg-item">
        <div class="bg-wrapper">
          <img src="@/assets/img/map/gk.png" alt="" style="width: 29px; height: 30px;">
        </div>
        <p class="legend-name">国控</p>
      </li>
      <li class="bg-item">
        <div class="bg-wrapper">
        <img src="@/assets/img/map/sk.png" alt="" style="width: 29px; height: 30px;">
        </div>
        <p class="legend-name">省控</p>
      </li>
      <li class="bg-item">
        <div class="bg-wrapper">
       <img src="@/assets/img/map/zdz-l.png" alt="" style="width: 20px; height: 20px;">
       </div>
        <p class="legend-name">自动站</p>
      </li>
      <li class="bg-item">
        <div class="bg-wrapper">
       <img src="@/assets/img/map/wry-l.png" alt="" style="width: 29px; height: 30px;">
       </div>
        <p class="legend-name">污染源</p>
      </li>
      <li class="bg-item">
        <div class="bg-wrapper">
       <img src="@/assets/img/map/ncwsz-l.png" alt="" style="width: 20px; height: 20px;">
       </div>
        <p class="legend-name">农村污水站</p>
      </li>
      <li class="bg-item">
        <div class="bg-wrapper">
       <img src="@/assets/img/map/rhpwk-l.png" alt="" style="width: 20px; height: 20px;">
       </div>
        <p class="legend-name">排口</p>
      </li>
      <li class="bg-item">
        <div class="bg-wrapper">
        <img src="@/assets/img/map/sdz-l.png" alt="" style="width: 20px; height: 20px;">
        </div>
        <p class="legend-name">水电站</p>
      </li>
      <li class="bg-item">
        <div class="bg-wrapper">
        <img src="@/assets/img/map/swz-l.png" alt="" style="width: 20px; height: 20px;">
        </div>
        <p class="legend-name">水文站</p>
      </li>
      <li class="bg-item">
        <div class="bg-wrapper">
        <img src="@/assets/img/map/qxz-l.png" alt="" style="width: 20px; height: 20px;">
        </div>
        <p class="legend-name">气象站</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.ya-legend {
  width: 372px;
  padding: 6px;
  background: #FFFFFF;
  // box-shadow: 0px 2px 4px 0px rgb(142 155 176 / 50%);
  border-radius: 4px;
  position: absolute;
  right: 94px;
  bottom: 20px;
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
}
.bg-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29px;
  height: 30px;
}
</style>