<template>
  <div class="time-legend">
    <div id="time" class="time-wrapper clearfix" @click.capture.prevent="time" @mousemove.capture.stop="showTip" @mouseleave.capture.stop="hiddenTip">
    <div id="progress" class="time-progress">
      <div class="hover-tip">
        <!-- <div class="hover-arrow" /> -->
        <p class="tip-val">{{ timeHover }}</p>
      </div>
      <div class="line-tip">
        <!-- <div class="tip-arrow" /> -->
        <p class="tip-val">{{ timeClick }}</p>
      </div>
      <p class="time-now" />
    </div>
    <div class="time-line">
      <div class="line-left" />
      <ol class="line-right">
        <li v-for="(item, index) in 7" :key="index" class="fl time-cell-box time-line-box">
          <p v-for="(_item, _index) in 8" :key="_index" class="line-item fl" />
        </li>
      </ol>
    </div>
    <div class="time-bottom">
      <div class="time-left">
        <div v-show="play" class="left-play" />
        <div v-show="!play" class="left-stop">▐▐</div>
      </div>
      <ol class="time-right">
        <li v-for="(item, index) in week" :key="index" class="fl time-cell-box">
          <ol class="time-val">
            <li v-for="(_item, _index) in 8 " :key="_index" class="fl val-item">
              <template v-if="_index !==0">
                <!-- {{ formateDay(_index) }} -->
              </template>
            </li>
          </ol>
          <div class="time-day">
            <span>{{ item.day }}</span>
             <!-- <span>{{ item.week }}</span> -->
          </div>
        </li>
      </ol>
    </div>
    </div>
    <map-potency></map-potency>
  </div>
</template>
<script>
import MapPotency from '@/components/PotencyLegend'
import elementResizeDetector from 'element-resize-detector'
import { parseTime, dateAdd } from '@/utils'
export default {
  components: { MapPotency} ,
  name: 'TimeLine',
  props: {
    width: {
      type: String,
      default: () => '85%'
    }
  },
  data() {
    return {
      play: true,
      nowTime: new Date(),
      week: this.initTime(),
      timeClick: '',
      timeHover: '',
      timeFinally: '',
      timer: null,
      hour: 0
    }
  },
  mounted() {
    document.getElementById('time').style.width = this.width;
    // 7 天
    Array.from(document.getElementsByClassName('time-cell-box')).map(v => { v.style.width = `${100 / 7}%` })
    // 3 * 8 = 24小时 ，3小时间隔
    Array.from(document.getElementsByClassName('line-item')).map(v => { v.style.width = `${100 / 8}%`; v.style.height = '8px'; })
    // 缩放重置
    const erd = elementResizeDetector();
    const that = this;
    erd.listenTo(document.getElementById("time"), function(e) {
      that.$nextTick(() => {
        that.timeToWidth()
      })
    })
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
    this.timer = null;
  },
  methods: {
    /**
     * @author: siwenfeng
     * @description: 播放背景控制
     * @name:
     * @param {type}
     * @return {type}
     */
    playControl(e) {
      this.play = !this.play;
      if (!this.play) {
        // 获取tooltip
        const lineTip = document.getElementsByClassName('line-tip')[0];
        // 获取时间轴
        const progress = document.getElementById('progress');
        const item = document.getElementsByClassName('time-right')[0];
        const itemW = item.clientWidth
        // let w = progress.getBoundingClientRect().width;
        // const cell = item.clientWidth / (7 * 8 * 3);
        const cell = item.clientWidth / (7);
        let startWidth = progress.getBoundingClientRect().width 
        this.timer = setInterval(() => {
          if (progress.getBoundingClientRect().width - 40 + cell >= itemW) {
            progress.style.width = 40 + 'px'
            lineTip.style.left = -10 + 'px';
            this.hour = 0;
            startWidth = 41;
          } else {
            progress.style.width = progress.getBoundingClientRect().width + cell + 'px'
            lineTip.style.left = progress.getBoundingClientRect().width + cell - 56 + 'px';
            startWidth += cell;
            // 小时
            // this.hour = (this.hour + 1) % 24
          }
          // 小时
          // const dayNum = ( Math.floor((progress.getBoundingClientRect().width - 40) / (itemW / 7)) + 1) 
          const dayNum = ( Math.floor((startWidth - 40) / (itemW / 7))) % 7
          
          // console.log(dayNum)
          this.timeClick =  this.week[dayNum].day + " " + this.formateClickTime(this.hour)
          this.timeFinally = this.week[dayNum].day + this.timeClick
        }, 1000)
      } else {
        this.timer && clearInterval(this.timer)
      }
    },
    /**
     * @author: siwenfeng
     * @description:时间轴点击显示时间
     * @name:
     * @param {type}
     * @return {type}
     */
    time(e) {
      // console.log(e.target)
      // 阻止了事件捕获，委托给父元素，判断是否按下播放或者暂停
      if (e.target.className === 'line-left') {
        this.playControl(e);
      } else {
        const lineTip = document.getElementsByClassName('line-tip')[0];
        const item = document.getElementsByClassName('time-right')[0];
        const itemW = item.clientWidth / 7
        const cell = item.clientWidth / (7 * 8 * 3);
        const progress = document.getElementById('progress');
        
        const left = progress.getBoundingClientRect().left;

        const w = e.clientX - left;
        const lineW = w - 40 > 0 ? (w - 40) : 0
        const width = w + 'px';
        lineTip.style.display = 'block';
        lineTip.style.left = (lineW - 18) + 'px';
        progress.style.width = width

        this.hour = Math.floor((lineW % itemW) / cell)
        const dayNum = Math.floor(lineW / itemW)
        this.timeClick = this.week[dayNum].day + " " + this.formateClickTime(this.hour)
        this.timeFinally = this.week[dayNum].day + this.timeClick
        if (this.timer) {
          clearInterval(this.timer)
          this.play = true;
          // this.playControl(e)
        }
      }
    },
    /**
     * @author: siwenfeng
     * @description:格式化时间03 06 09
     * @name:
     * @param {type}
     * @return {type}
     */
    formateDay(_index) {
      return 3 * _index < 10 ? `0${3 * _index}` : 3 * _index
    },
    /**
     * @author: siwenfeng
     * @description:将数字转成整点时间
     * @name:
     * @param {type}
     * @return {type}
     */
    formateClickTime(num) {
      return num < 10 ? `0${num}:00` : `${num}:00`
    },
    /**
     * @author: siwenfeng
     * @description:将当前时间转成px宽度
     * @name:
     * @param {type}
     * @return {type}
     */
    timeToWidth() {
      if (this.timer) {
        clearInterval(this.timer)
        this.play = true;
      }
      this.hour = new Date().getHours();
      // now 盒子的宽是7px
      const nowDom = document.getElementsByClassName('time-now')[0];
      const progress = document.getElementById('progress');
      const lineTip = document.getElementsByClassName('line-tip')[0];
      const item = document.getElementsByClassName('time-right')[0];
      const itemW = item.clientWidth / 7
      // 一小时的宽度
      const cell = item.clientWidth / (7 * 8 * 3);
      const w = this.hour * cell;
      // 加上左侧宽度
      progress.style.width = (w + 40) + 'px';
      nowDom.style.left = (w + 40 - 7 ) + 'px';
      nowDom.style.display = 'block';
      lineTip.style.display = 'block';
      lineTip.style.left = (w - 18) + 'px';
      const lineW = w - 40 > 0 ? (w - 40) : 0
      const dayNum = Math.floor(lineW / itemW)
      this.timeClick = this.week[dayNum].day + " " + this.formateClickTime(this.hour)
    },
    /**
     * @author: siwenfeng
     * @description:初始化星期和天，默认显示6天时间
     * @name:
     * @param {type}
     * @return {type}
     */
    initTime() {
      const nowTime = new Date();
      const arr = []
      for (let i = 0; i < 7; i++) {
        const obj = {}
        obj.day = parseTime(dateAdd(nowTime, 'd', i), '{m}-{d}')
        obj.week = `(周${parseTime(dateAdd(nowTime, 'd', i), '{a}')})`
        arr.push(obj)
      }
      console.log(arr)
      return arr;
    },
    /**
     * @author: siwenfeng
     * @description:鼠标悬停显示时间轴时间
     * @name:
     * @param {type}
     * @return {type}
     */
    showTip(e) {
      const item = document.getElementsByClassName('time-right')[0];
      const itemW = item.clientWidth / 7
      const cell = item.clientWidth / (7 * 8 * 3);

      const hoverTip = document.getElementsByClassName('hover-tip')[0];
      const progress = document.getElementById('progress');
      // 距离窗口的距离
      // e.clientX 鼠标位置
      const left = progress.getBoundingClientRect().left;
      const w = e.clientX - left;
      const lineW = w - 40 > 0 ? (w - 40) : 0
      const timeHover = Math.floor(((lineW) % itemW) / cell)
      const dayNum = Math.floor(lineW / itemW)
      this.timeHover = this.week[dayNum].day  + " "+this.formateClickTime(timeHover)
      hoverTip.style.display = 'block';
      hoverTip.style.left = (lineW - 18) + 'px';
    },
    hiddenTip() {
      const hoverTip = document.getElementsByClassName('hover-tip')[0];
      hoverTip.style.display = 'none';
    }
  }
}
</script>

<style>
.time-legend {
  position: absolute;
  bottom: 0px;
  z-index: 1111;
  height: 54px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
}
.time-wrapper {
  cursor: pointer;
}
.time-line {
  height: 8px;
  width: 100%;
  background: #081E3A;
}
.time-bottom {
  width: 100%;
  height: 46px;
}
.time-progress {
  background: #1890FF;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 40px;
  transition:  width .5s ease;
  height: 8px;
}
.time-left {
  float: left;
  width: 40px;
  height: 46px;
  background: rgba(0, 0, 0, 0.5);
  border-right: 1px solid #fff;
  padding: 5px 10px;
}
.time-right {
  float: left;
  width: calc(100% - 40px);
  height: 46px;
  background: rgba(0, 0, 0, 0.5);
}
.line-left {
  float: left;
  width: 40px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-right: 1px solid #fff;
}
.line-right {
  float: left;
  width: calc(100% - 40px);
  height: 8px;
  position: absolute;
  top: 0;
  left: 40px;
}
.left-play {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-left: 20px solid #fff;
  border-bottom: 10px solid transparent;
  background: transparent;
  cursor: pointer;
  margin-top: 6px;
}
.left-stop {
  color: #fff;
  margin-top: 8px;
  font-size: 14px;
  margin-left: -4px;
}
.time-cell-box {
  height: 100%;
  text-align: center;
  line-height: 46px;
  border-right: 1px solid #fff;
}
.line-item {
  /* border-right: 1px solid #fff; */
}
.time-cell-box .line-item:last-child {
  border-right: none;
}
.time-line-box {
  border-right: none;
}
.time-line-box .line-item:last-child {
  border-right: 1px solid #fff;
}
.time-val {
  height: 14px;
  width: 100%;
  /* border-bottom: .5px solid hsla(0,0%,71%,.4); */
}
.tip-val {
  color: #fff;
  height: 26px;
  line-height: 26px;
}
.val-item {
  height: 14px;
  text-align: center;
  color: #fff;
  opacity: .7;
  width: 12.4%;
  line-height: 14px;
  font-size: 10px;
}
.time-day {
  height: 30px;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
}
.time-val .val-item:first-child {
  width: 6.5%;
}
.hover-tip, .line-tip {
  padding: 0px 4px;
  height: 26px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 113px;
  bottom: 18px;
  /* border: 1px solid #1890FF; */
  background: rgba(0,0,0,.3);
  color: #fff;
  z-index: 1002;
  display: none;
  border-radius: 4px;
  transition: left .5s ease;
  text-align: center;
  /* width: 80px; */
  pointer-events: none;
}
.hover-tip {
  background: #009845;
  /* left: 100px; */
}
.hover-tip::after, .line-tip::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  margin-left: -10px;
  left: 50%;
  top: 26px;
  border: 10px solid transparent;
  border-top-color: #009845;
}
.line-tip::after {
  border-top-color: rgba(0,0,0,.3);
}
.time-now {
  display: none;
  width: 7px;
  height: 8px;
  position: absolute;
  top: 0;
  /* left: 200px; */
  background: #a8cb09;
}
</style>
