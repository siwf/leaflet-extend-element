<template>
  <div class="map-popup">
    <div class="map-popup--header">
      <p class="popup-name">{{ baseinfoObj.staName }}</p>
      <span class="popup-time">更新时间：{{ baseinfoObj.updateTime }}</span>
    </div>
    <template v-show="baseinfoObj.updateTime">
      <ChartMap chart-id="swz" :chart-op="chartOp" :style="{ width: '100%', height: '310px' }" />
    </template>
  </div>
</template>

<script>
import { getPointDetailInfoSwz } from "@/api/waterMap";
import ChartMap from "@/components/AllChart";
export default {
  components: {
    ChartMap
  },
  props: {
    popupData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      baseinfoObj: {
        staName: null,
        updateTime: null
      },
      query: {
        staCode: "",
      },
      chartOp: {}
    };
  },
  created() {
    this.initPopupData();
  },
  watch: {
    popupData: function(n, o) {
      this.initPopupData();
    }
  },
  methods: {
    initPopupData() {
      this.query.staCode = this.popupData.staCode;
      this.updateEchart();
    },
    updateEchart() {
      // this.query.staCode = "71010600";
      getPointDetailInfoSwz(this.query.staCode).then(res => {
        if (res.content) {
          const data = res.content;
          this.baseinfoObj.staName = data.staName
          this.baseinfoObj.updateTime = data.updateTime
        }
        if (res.content) {
          const data = res.content;
          let xData = [];
          const seriesData1 = [];
          const seriesData2 = [];
          data.data.map(v => {
            xData.push(v.date);
            seriesData1.push(v.flux); // 流量
            seriesData2.push(v.waterLevel); // 水位
          });

            this.chartOp = {
              backgroundColor: "#ffffff",
              grid: {
                top: "30%",
                bottom: "10%",
                left: "11%",
                right: "15%"
              },
              // 图例
              legend: {
                icon: "roundRect",
                itemWidth: 10,
                itemHeight: 10,
                data: ['流量', '水位'],
                top: "10%",
                // right: "20%",
                x: "center",
                textStyle: {
                  color: "#333333",
                  fontSize: "12"
                }
              },
              toolbox: {
                show: true,
                // width: 140,
                height: 20,
                top: "4%",
                feature: {
                  // magicType: { type: ["line", "bar"] },
                  // restore: {},
                  saveAsImage: {}
                },
                iconStyle: {
                  borderColor: "#333333"
                }
              },
              // 图片下载，折线图，柱状图切换
              // 悬停提示
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross",
                  label: {
                    show: true,
                    backgroundColor: "#fff",
                    color: "#556677",
                    fontSize: "12",
                    borderColor: "rgba(0,0,0,0)",
                    shadowColor: "rgba(0,0,0,0)",
                    shadowOffsetY: 0
                  },
                  lineStyle: {
                    width: 1
                  }
                },
                backgroundColor: "rgba(51, 51, 51, 0.8)",
                textStyle: {
                  color: "#fff"
                },
                padding: [5, 5],
                extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
                // formatter: function(params) {
                //   let returnData = params[0].axisValue.substr(-4, 2) + ":" + params[0].axisValue.substr(-2, 2) + "</br>";
                //   for (let i=0;i<params.length;i++){
                //     if (params[i].seriesName!=""){
                //       let indexColor = params[i].color;
                //       returnData += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:'+ indexColor +'"></span>';
                //       returnData += params[i].seriesName +":" + params[i].value + "</br>";
                //     }
                //   }
                //   return returnData;
                // }
              },
              xAxis: {
                type: "category",
                data: xData,
                axisLine: {
                  lineStyle: {
                    color: "#333333",
                    width: 1
                  }
                },
                axisTick: {
                  show: false
                  // alignWithLabel: true
                },
                axisLabel: {
                  interval: 'auto',
                  // rotate: 45,
                  textStyle: {
                    color: "#333333"
                  },
                  // 默认x轴字体大小
                  fontSize: "12",
                  // margin:文字到x轴的距离
                  margin: 8,
                  // formatter: function(value) {
                  //   return value.substring(4, 6) + '.' +  value.substring(6, 8)
                  // }
                },
                axisPointer: {
                  label: {
                    padding: [0, 0, 5, 0],
                    margin: 5,
                    // 移入时的字体大小
                    fontSize: "12",
                    //  formatter: function(param) {
                    //     return param.value.substring(4, 6) + '.' +  param.value.substring(6, 8)
                    //  },
                    backgroundColor: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#fff" // 0% 处的颜色
                        },
                        {
                          offset: 0.86,
                          color: "#fff" // 0% 处的颜色
                        },
                        {
                          offset: 0.86,
                          color: "#33c0cd" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#33c0cd" // 100% 处的颜色
                        }
                      ],
                      global: false // 缺省为 false
                    }
                  }
                }
              },
              series: [
                {
                  type: "line",
                  connectNulls: true,
                  symbolSize: 1,
                  symbol: "circle",
                  smooth: true,
                  showSymbol: false,
                  lineStyle: {
                    width: 2
                  },
                  itemStyle: {
                    normal: {
                      color: `#BD10E0`
                    }
                  },
                  name: '流量',
                  data: seriesData1,
                  yAxisIndex: 0
                },
                {
                  type: "line",
                  connectNulls: true,
                  symbolSize: 1,
                  symbol: "circle",
                  smooth: true,
                  showSymbol: false,
                  lineStyle: {
                    width: 2
                  },
                  itemStyle: {
                    normal: {
                      color: `#40CDFF`
                    }
                  },
                  name: '水位',
                  data: seriesData2,
                  yAxisIndex: 1
                }
              ],
              yAxis: [
                {
                  type: "value",
                  name: '流量(m3/s)',
                  nameLocation: "center",
                  nameGap: 20,
                  nameTextStyle: {
                    padding: [6, 0, 6, 0],
                    fontSize: "12"
                  },
                  position: "left",
                  min: 0,
                  max: function(value) {
                    return Number(value.max);
                  },
                  axisTick: {
                    show: true,
                    inside: true
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: "#333333",
                      width: 1
                    }
                  },
                  axisLabel: {
                    fontSize: "12",
                    textStyle: {
                      color: "#333333"
                    }
                  },
                  splitLine: {
                    show: false
                  }
                },
                 {
                  type: "value",
                  name: '水位(m)',
                  nameLocation: "center",
                  nameGap: 30,
                  nameTextStyle: {
                    padding: [6, 0, 6, 0],
                    fontSize: "12"
                  },
                  position: "right",
                  min: 0,
                  max: function(value) {
                    return Number(value.max);
                  },
                  axisTick: {
                    show: true,
                    inside: true
                  },
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: "#333333",
                      width: 1
                    }
                  },
                  axisLabel: {
                    fontSize: "12",
                    textStyle: {
                      color: "#333333"
                    }
                  },
                  splitLine: {
                    show: false
                  }
                }
              ]
            };
        }
      });
    }
  }
};
</script>
<style lang="scss"></style>
