<template>
  <div class="ya-potency">
    <ul class="p-right">
      <li class="potency-item">0</li>
      <li class="potency-item">2</li>
      <li class="potency-item">4</li>
      <li class="potency-item">6</li>
      <li class="potency-item">8</li>
      <li class="potency-item">10</li>
      <li class="potency-item">12</li>
      <li class="potency-item">14</li>
      <li class="potency-item">16</li>
    </ul>
      <p class="p-left">浓度(mg/L)</p>
  </div>
</template>

<style lang="scss" scoped>
.ya-potency {
  width: 15%;
  height: 54px;
  // position: absolute;
  // right: 0;
  // bottom: 82px;
  // height: 50px;
  background: rgba(35, 47, 73, 0.8);
  // border-radius: 9px 9px 9px 9px;
  color: #ffffff;
  display: flex;
  align-items: center;
  flex-direction: column;
  // z-index: 1111;
  font-size: 12px;
  padding: 0px 0px 0 0px;
}
.p-left {
  background: rgba(35, 47, 73, 0.8);
  height: 20px;
  line-height: 20px;
}
.p-right {
  width: 100%;
  background: linear-gradient(90deg, #82D3F8 0%, #00A7F0 13%, #6FB602 31%, #FFFF00 48%, #F59B23 81%, #D9021B 100%);
  // border-radius: 0px 9px 9px 0px;
  opacity: 0.89;
  display: flex;
  align-items: center;
}
.potency-item {
  flex: 1;
  // width: 28px;
  height: 34px;
  line-height: 34px;
  text-align: center;
}
</style>