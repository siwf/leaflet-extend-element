<template>
  <div class="ya-quality mr-b-10">
    <title-name title="水环境质量"></title-name>
    <ul class="ya-quality-chart">
      <li class="quality-item">
        <ChartMap
          chart-id="dbl1"
          :chart-op="chartOp1"
          :style="{ width: '100%', height: '230px' }"
        />
        <div class="quality-cicle">
          <p class="cicle-num" :class="{'num-z': standard.comPercentage > 0, 'num-f': standard.comPercentage < 0}">{{standard.comPercentage }}%</p>
          <p class="cicle-label">同比去年</p>
        </div>
      </li>
      <li class="quality-item">
        <ChartMap
          chart-id="dbl2"
          :chart-op="chartOp2"
          :style="{ width: '100%', height: '230px' }"
        />
        <div class="quality-cicle">
          <p class="cicle-num" :class="{'num-z': good.comPercentage > 0, 'num-f': good.comPercentage < 0}">{{good.comPercentage }}%</p>
          <p class="cicle-label">同比去年</p>
        </div>
      </li>
      <li class="quality-item">
        <ChartMap
          chart-id="dbl3"
          :chart-op="chartOp3"
          :style="{ width: '100%', height: '230px' }"
        />

        <div class="quality-cicle">
          <p class="cicle-num" :class="{'num-z': inferior.comPercentage > 0, 'num-f': inferior.comPercentage < 0}">{{inferior.comPercentage }}%</p>
          <p class="cicle-label">同比去年</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TitleName from "../../common/siteTotal";
import ChartMap from "@/components/AllChart";
export default {
  components: { TitleName, ChartMap },
  props: {
    waterEnv: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartOp1: {},
      chartOp2: {},
      chartOp3: {},
      standard: {},
      good: {},
      inferior: {}
    };
  },
  watch: {
    waterEnv: function(n, o) {
      const { good, inferior,  standard } = n;
      this.updateChart(n)
      this.good = good
      this.inferior = inferior;
      this.standard = standard
    }
  },
  methods: {
    updateChart(data) {
      // standard:水质达标率 good:水质优良率 inferior:劣于Ⅲ类比例
      const { good, inferior,  standard } = data;
      this.chartOp1 = this.chartOption('水质达标率', standard);
      this.chartOp2 = this.chartOption('水质优良率', good);
      this.chartOp3 = this.chartOption('劣于Ⅲ类比例', inferior)
    },
    chartOption(title, data) {
     return {
        title: {
          text: title,
          textStyle: {
            color: "#333333",
            fontSize: 16
          },
          left: "center"
        },
        series: [
          {
            type: "gauge",
            axisLine: {
              lineStyle: {
                width: 12,
                color: [
                  [0.3, "#F15656"],
                  [0.7, "#00ABFF"],
                  [1, "#1BC88D"]
                ]
              }
            },
            min: 0,
            max: 100,
            pointer: {
              itemStyle: {
                color: "auto"
              },
              width: 2,
              length: "60%"
            },
            axisTick: {
              distance: -30,
              length: 5,
              lineStyle: {
                color: "#fff",
                width: 2
              }
            },
            splitLine: {
              distance: -30,
              length: 15,
              lineStyle: {
                color: "#fff",
                width: 2
              }
            },
            axisLabel: {
              color: "auto",
              distance: 0,
              fontSize: 12
            },
            detail: {
              valueAnimation: true,
              formatter: function(param) {
                // console.log(param)
                return `{a|${data.accord}/}` + data.total;
              },
              color: "auto",
              fontSize: 22,
              offsetCenter: ["0", "40%"],
              rich: {
                a: {
                  color: "auto",
                  lineHeight: 55,
                  fontSize: 22,
                  fontWeight: 700
                }
              },
              textStyle: {
                fontSize: 22,
                color: "#333333"
              }
            },
            title: {
              fontSize: 22,
              color: "auto",
              offsetCenter: [0, "90%"]
            },
            data: [
              {
                value: data.percentage,
                name: `${data.percentage}%`
              }
            ]
          }
        ]
      }
      
    }
  }
};
</script>

<style lang="scss" scoped>
.ya-quality-chart {
  display: flex;
  justify-content: space-between;
}
.quality-item {
  flex: 1;
  height: 260px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.quality-cicle {
  height: 30px;
  line-height: 24px;
  width: 100%;
  text-align: center;
  p {
    display: inline-block;
  }
}
.cicle-label {
  font-size: 14px;
  color: #333333;
  margin-left: 6px;
  font-weight: bold;
}
.cicle-num {
  color: #1bc88d;
}
.num-z,
.num-f {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 0;
    top: 8px;
    left: -18px;
    height: 0;
    border-bottom: 7px solid #1bc88d;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }
  font-size: 14px;
}
.num-f {
  color: red;
}
.num-f::before {
  border-bottom: 7px solid transparent;
  border-top: 7px solid red;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
}
</style>
