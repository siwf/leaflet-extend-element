<template>
  <div class="ya-water">
    <p class="ya-water--title">水质类别：</p>
    <ul class="ya-water--point">
      <li class="water-point-item">
        I类
      </li>
      <li class="water-point-item">
        II类
      </li>
      <li class="water-point-item">
        III类
      </li>
      <li class="water-point-item">
        IV类
      </li>
      <li class="water-point-item">
        V类
      </li>
      <li class="water-point-item">
        劣V类
      </li>
      <li class="water-point-item">
        有数据
      </li>
      <li class="water-point-item">
        暂无数据
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'WaterType'
}
</script>

<style lang="scss" scoped>
.ya-water {
  position: absolute;
  left: 10px;
  bottom: 10px;
  height: 27px;
  display: flex;
  padding: 10px;
  font-size: 12px;
  z-index: 1111;
  align-items: center;
  border-radius: 4px;
  background-color: #ffffff;
  // background-image: url('../../assets/img/map/watertype.png');
  // background-repeat: no-repeat;
  // background-size: cover;

}
.ya-water--title {
  width: 60px;
  height: 42px;
  line-height: 42px;
  color: #333333;
}
.ya-water--point {
  margin-left: 20px;
  flex: 1;
  display: flex;
  // align-items: center;
}
.water-point-item {
  display: inline-block;
  position: relative;
  // flex: 1;
  height: 42px;
  width: 56px;
  line-height: 42px;
  // text-align: center;
  &::before {
    position: absolute;
    width: 12px;
    height: 12px;
    content: '';
    border-radius: 50%;
    top: 50%;
    left: -16px;
    transform: translateY(-50%);
  }
}
.water-point-item:nth-child(1)::before {
  background-color: #82D3F8;
}
.water-point-item:nth-child(2)::before {
  background-color: #00A7F0;
}
.water-point-item:nth-child(3)::before {
  background-color: #6FB602;
}
.water-point-item:nth-child(4)::before {
  background-color: #FFFF00;
}
.water-point-item:nth-child(5)::before {
  background-color: #F59B23;
}
.water-point-item:nth-child(6)::before {
  background-color: #D9021B;
}
.water-point-item:nth-child(7)::before {
  background-color: #1BC88D;
}
.water-point-item:nth-child(8)::before {
  background-color: #999999;
}
</style>