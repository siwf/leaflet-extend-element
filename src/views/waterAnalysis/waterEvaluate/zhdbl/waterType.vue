 <!-- 综合达标率 -->
<template>
  <!-- <div class="ya-quality mr-b-10"> -->
  <!-- <title-name title="水质类别占比"></title-name> -->
  <ul class="ya-quality-chart">
    <li class="quality-item--left">
      <div class="ya-row mr-b-10 row-title h-40">
        <p class="ya-row--title">水质类别占比</p>
        <!-- <slot /> -->
      </div>
      <div class="left-chart">
        <ChartMap
        chart-id="lb1"
        :chart-op="chartOp"
        :style="{ width: '100%', height: '100%' }"
      />
      </div>
    </li>
    <li class="quality-item--right">
      <div class="ya-row mr-b-10 h-40 row-title">
        <p class="ya-row--title">主要污染指标（前10名）</p>
        <!-- <slot /> -->
      </div>
    <div class="left-chart">
        <ChartMap
        chart-id="lb2"
        :chart-op="chartOp1"
        :style="{ width: '100%', height: '100%' }"
      />
    </div>
    </li>
  </ul>
  <!-- </div> -->
</template>

<script>
import TitleName from "../../common/siteTotal";
import ChartMap from "@/components/AllChart";
import { objArrtransArr } from "@/utils/";
import echarts from "echarts";
export default {
  components: { TitleName, ChartMap },
  props: {
    waterObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartOp: {},
      chartOp1: {}
    };
  },
  watch: {
    waterObj: function(n, o) {
      // mainPollutants 主要污染指标对象 waterGrede 水质类别占比
      // const { waterGrede, mainPollutants } = n;
      this.updateChart(n);
    }
  },
  methods: {
    updateChart(data) {
      const { waterGrede, mainPollutants } = data;

      this.chartOp = {
        backgroundColor: "#ffffff",
        color: ["#82D3F8", "#6FB602", "#FFFF00", "#F59B23", "#D9021B"],
        grid: {
          left: "2%",
          top: "1%",
          bottom: 0,
          right: "5%",
          containLabel: true
        },

        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 12,
            color: "#ffffff"
          },
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          // icon: "circle",
          // x: "center",
        type: 'scroll',
        right: 10,
        bottom: 40,
        orient: 'vertical',
          textStyle: {
            color: "#333333",
            fontSize: 12
          },
          itemWidth: 16,
          itemHeight: 8,
          data: waterGrede.map(v => v.waterGrade)
        },
        toolbox: {
          show: true,
          width: 140,
          height: 24,
          feature: {
            // magicType: { type: ['line', 'bar'] },
            // restore: {},
            saveAsImage: {}
          },
          iconStyle: {
            borderColor: "#333333"
          }
        },
        calculable: true,
        series: [
          {
            type: "pie",
            radius: ["79.5%", "80%"],
            center: ["40%", "55%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            name: "",
            data: [
              {
                name: "",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#00A7F0"
                  }
                }
              }
            ]
          },
          {
            stack: "a",
            type: "pie",
            radius: ["54%", "65%"],
            center: ["40%", "55%"],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 10,
            // itemStyle: {
            //     normal: {
            //         color: function(params) {
            //             return colorList[params.dataIndex]
            //         }
            //     }
            // },
            label: {
              show: true,
              position: "outside",
              formatter: "{a|{b}：{d}%}\n{hr|}",
              rich: {
                hr: {
                  backgroundColor: "t",
                  borderRadius: 3,
                  width: 3,
                  height: 3,
                  padding: [3, 3, 0, -12]
                },
                a: {
                  padding: [-30, 15, -20, 15]
                }
              }
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 30,
                lineStyle: {
                  width: 1
                }
              }
            },
            data: objArrtransArr(waterGrede, "accord", "waterGrade")
          }
        ]
      };
      this.chartOp1 = {
        backgroundColor: "#ffffff",
        grid: {
          top: "10%",
          bottom: "25%",
          left: "8%",
          right: "8%"
        },
        legend: {
          show: false
        },
        // 图片下载，折线图，柱状图切换
        toolbox: {
          show: true,
          width: 140,
          height: 24,
          feature: {
            // magicType: { type: ['line', 'bar'] },
            // restore: {},
            saveAsImage: {}
          },
          iconStyle: {
            borderColor: "#333333"
          }
        },
        tooltip: {
          trigger: "axis",
          // formatter: (comp, value) => {
          //     const [serie] = comp;

          //     return `${serie.seriesName} ${serie.name}: ${Math.round(serie.value * 100)} %`
          // },
          axisPointer: {
            type: "cross",
            label: {
              show: false
            }
          },
          backgroundColor: "rgba(51, 51, 51, 0.8)",
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "category",
          name: '超标因子',
          boundaryGap: true,
          // nameLocation: "right",
          nameTextStyle: {
            padding: [6, 5, 6, 0],
            fontSize: "12",
            verticalAlign: 'middle'
            // fontWeight: "bold"
          },
          data: mainPollutants.map(v => v.name),
          axisLabel: {
            show: true,
            fontSize: 12,
            color: "#333333",
            formatter: function(value) {
              return value.split("").join("\n");
            }
          }
        },
        yAxis: {
          type: "value",
          name: "超标断面个数",
          nameGap: 40,
          boundaryGap: false,
          nameLocation: "center",
          nameTextStyle: {
            padding: [6, 5, 6, 0],
            fontSize: "12",
            verticalAlign: 'middle'
            // fontWeight: "bold"
          },
          position: "left",
          axisTick: {
            show: true,
            alignWithLabel: true,
            inside: true
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#333333",
              width: 1
            }
          }
        },
        series: [
          {
            data: mainPollutants.map(v => v.value),
            barWidth: 20,
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#83bff6"
                },
                {
                  offset: 0.5,
                  color: "#188df0"
                },
                {
                  offset: 1,
                  color: "#188df0"
                }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#2378f7"
                  },
                  {
                    offset: 0.7,
                    color: "#2378f7"
                  },
                  {
                    offset: 1,
                    color: "#83bff6"
                  }
                ])
              }
            }
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.ya-quality {
  // background-color: #F4F6F8;
}
.ya-quality-chart {
  display: flex;
  // justify-content: space-between;
}
.quality-item--left {
  flex: 2;
  // height: 480px;
  margin-right: 10px;
  background-color: #fff;
  padding: 10px;
}
.quality-item--right {
  flex: 3;
  // height: 480px;
  background-color: #fff;
  padding: 10px;
}
.left-chart {
  height: 300px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #D9D9D9;
}
</style>
