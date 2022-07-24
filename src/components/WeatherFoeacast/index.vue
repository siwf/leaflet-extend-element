<template>
  <div class="weather-forecast">
    <div class="forecast-name">永安市未来7天水质预报</div>
    <div class="forecast-time">{{time}}</div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      time: ''
    }
  },
  created() {
    const nowTime = new Date()
    this.time = parseTime(nowTime, '{y}-{m}-{d}')
  }
}
</script>

<style lang="scss" scoped>
  .weather-forecast {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2111;
    width: 190px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    padding: 6px;
    color: #333333;
    font-size: 16px;
  }
  .forecast-name {
    height: 24px;
    line-height: 24px;
    font-weight: bold;
  }
  .forecast-time {
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    text-align: center;
  }
</style>