<template>
  <div class="map-popup">
    <div class="map-popup--header">
      <p class="popup-name">{{ baseinfoObj.staName }}</p>
      <!-- <span class="popup-level level-guo" v-if="baseinfoObj.staAttr === '国控'">国控</span>
      <span class="popup-level level-sheng" v-if="baseinfoObj.staAttr === '省控'">省控</span>
      <span class="popup-water--type" :style="waterColorByType()">
        {{ baseinfoObj.waterGrade }}类
      </span> -->
      <span class="popup-time">更新时间：{{ baseinfoObj.updateTime }}</span>
    </div>
    <ul class="map-popup--desc clearfix">
      <li class="popup-desc--item">
        <span class="desc-label">行业名称：</span>
        <span class="desc-value">{{ baseinfoObj.industryName }}</span>
      </li>
      <li class="popup-desc--item">
        <span class="desc-label">企业规模：</span>
        <span class="desc-value">{{ baseinfoObj.enterpriseScale }}</span>
      </li>
      <li class="popup-desc--item">
        <span class="desc-label">详细地址：</span>
        <span class="desc-value">{{ baseinfoObj.address }}</span>
      </li>
      <li class="popup-desc--item">
        <span class="desc-label">主要污染指标：</span>
        <span class="desc-value">{{ baseinfoObj.exceedStandard }}</span>
      </li>
    </ul>
    <template v-show="baseinfoObj.updateTime">
      <div class="popup-time-select">
        <!-- <div class="popup-time-picker">
          <el-date-picker
            size="mini"
            type="monthrange"
            v-model="time"
            style="width:230px"
            range-separator="至"
            unlink-panels
            :clearable="false"
            @change="updateEchart"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div> -->
        <div class="popup-select">

          <el-select
            v-model="query.staCode"
            filterable
            placeholder="请选择"
            size="mini"
            style="width: 120px; margin-right: 10px;"
            @change="updateEchart"
          >
            <el-option
              v-for="item in sta"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
          <el-select
            v-model="query.index"
            filterable
            placeholder="请选择"
            size="mini"
            style="width: 160px"
            @change="updateEchart"
          >
            <el-option
              v-for="item in normList"
              :key="item.value"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </div>
      </div>
      <ChartMap chart-id="wry" :chart-op="chartOp" :style="{ width: '100%', height: '231px' }" />
    </template>
  </div>
</template>

<script>
import { convert } from "@/utils";
import { getPointDetailInfoWry, getPointMonitorInfoWry } from "@/api/waterMap";
import ChartMap from "@/components/AllChart";
import echarts from 'echarts'
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
      normList: [],
      waterGrade: null,
      baseinfoObj: {
        staName: null,
        updateTime: null,
        enterpriseScale: null,
        exceedStandard: null,
        address: null,
        industryName: null
      },
      yAxisName: "",
      query: {
        index: "",
        staCode: ""
      },
      sta: [],
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
      const staCode = this.popupData.staCode;
      // '210300000057';
      getPointDetailInfoWry('210300000057').then(res => {
        if (res.content) {
          const data = res.content;
          this.baseinfoObj = {
            staName: data.staName,
            updateTime: data.updateTime,
            exceedStandard: data.exceedStandard,
            enterpriseScale: data.enterpriseScale,
            address: data.address,
            industryName: data.industryName
          };
          this.query.index = data.defaultIndex;
          this.sta = data.points;
          
          this.query.staCode = data.points.length ? (data.points)[0].key : ''
          this.normList = data.index;
          this.yAxisName = data.index.find(v => v.key === this.query.index).value;

          if (data.updateTime) {
            this.updateEchart();
          }
        }
      });
    },
    updateEchart() {
      this.yAxisName = this.normList.find(v => v.key === this.query.index).value;
      getPointMonitorInfoWry({ ...this.query }).then(res => {
        if (res.content) {
          const data = res.content;
          let xData = [];
          const seriesData = [];
          const waterType = data.standard;
          data.data.map(v => {
            xData.push(v.date);
            const obj = {};
            obj.value = v.value;
            obj.date = v.date;
            obj.name = v.exceedStandard;
            seriesData.push(obj);
          });
          if (this.query.index === "waterGrade") {
            this.chartOp = {
              backgroundColor: "#ffffff",
              grid: {
                top: "10%",
                bottom: "15%",
                left: "10%",
                right: "10%"
              },
              legend: {
                // icon: "roundRect",
                data: ["水质类别"],
                show: false,
                bottom: "0%",
                x: "center",
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                  color: "#333333",
                  fontSize: "12"
                }
              },
              // 图片下载，折线图，柱状图切换
              toolbox: {
                show: true,
                // width: 140,
                height: 20,
                top: "-4%",
                feature: {
                  // magicType: { type: ["line", "bar"] },
                  // restore: {},
                  saveAsImage: {}
                },
                iconStyle: {
                  borderColor: "#333333"
                }
              },
              // 悬停提示
              tooltip: {
                trigger: "axis",
                formatter: function(param) {
                  let str = "";
                  const name = "水质类别";
                  str = param[0].axisValue + "<br /> ";
                  let value = convert(param[0].value);
                  if (param[0].data.name) {
                    let nameStr = "";
                    param[0].data.name.split(";").map(v => {
                      nameStr += `<div style="font-size: 12px;">${v}</div>`;
                    });
                    str += `<div">
                                <span style="display: inline-block; min-width: 47px; font-size: 12px;" >${name}:</span>
                                <span style="display: inline-block; color: red; font-weight: bold; margin-left: 4px;font-size: 14px;">${value}</span>
                              ${nameStr}
                          </div>
                    `;
                  } else {
                    value = value || '';
                    str += `<div>
                              <span style="display: inline-block; min-width: 47px; font-weight: bold;font-size: 12px;">${name}:</span>
                              <span style="display: inline-block; color: red; margin-left: 4px; font-weight: bold; font-size: 14px;">${value}</span>
                            </div>`;
                  }
                  return str;
                },
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
                extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)"
              },
              xAxis: {
                type: "category",
                data: xData,
                axisLine: {
                  lineStyle: {
                    color: "#333333"
                  }
                },
                axisTick: {
                  show: false
                  // alignWithLabel: true
                },
                axisLabel: {
                  interval: "auto",
                  textStyle: {
                    color: "#333333"
                  },
                  // 默认x轴字体大小
                  fontSize: "12",
                  // margin:文字到x轴的距离
                  margin: 8
                },
                axisPointer: {
                  label: {
                    padding: [0, 0, 5, 0],
                    margin: 5,
                    // 移入时的字体大小
                    fontSize: "12",
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
              yAxis: {
                offset: 6,
                name: "水质类别",
                type: "value",
                min: 0,
                max: 6,
                nameGap: 24,
                boundaryGap: false,
                nameLocation: "center",
                nameTextStyle: {
                  padding: [6, 5, 6, 0],
                  fontSize: "12"
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
                },
                axisLabel: {
                  fontSize: "12",
                  textStyle: {
                    color: "#333333"
                  },
                  formatter: function(value, index) {
                    let texts = [];
                    if (value == 0) {
                      texts.push("");
                    } else if (value == 1) {
                      texts.push("Ⅰ");
                    } else if (value == 2) {
                      texts.push("Ⅱ");
                    } else if (value == 3) {
                      texts.push("Ⅲ");
                    } else if (value == 4) {
                      texts.push("Ⅳ");
                    } else if (value == 5) {
                      texts.push("Ⅴ");
                    } else if (value == 6) {
                      texts.push("劣Ⅴ");
                    } else {
                      texts.push('')
                    }
                    return texts;
                  }
                },
                splitLine: {
                  show: false
                }
              },
              series: [
                {
                  markLine: {
                    silent: true,
                    symbolSize: 6,
                    lineStyle: {
                      normal: {
                        type: "dashed"
                      }
                    },
                    data: [
                      {
                        yAxis: waterType,
                        lineStyle: {
                          width: 1,
                          color: "#EB3737"
                        },
                        label: {
                          show: true,
                          fontSize: "12",
                          position: "insideEndTop",
                          formatter: `水质目标 ${convert(waterType)}`,
                          distance: [-50, 5]
                        }
                      }
                    ]
                  },
                  yAxisIndex: 0,
                  name: "水质类别",
                  data: seriesData,
                  type: "bar",
                  connectNulls: true,
                  barWidth: 8,
                  lineStyle: {
                    width: 1
                  },
                  itemStyle: {
                    normal: {
                      color: function(params) {
                        if (params.data.value && Number(params.data.value) > waterType) {
                          return "#FF0000";
                        } else {
                          return "#5AD8A6";
                        }
                      }
                    }
                  }
                }
              ]
            };
          } else {
            this.chartOp = {
              backgroundColor: "#ffffff",
              grid: {
                top: "10%",
                bottom: "15%",
                left: "15%",
                right: "12%"
              },
              // 图例
              legend: {
                icon: "roundRect",
                show: false,
                itemWidth: 10,
                itemHeight: 10,
                data: [`${this.yAxisName}`],
                bottom: "0%",
                // right: "20%",
                x: "center",
                textStyle: {
                  color: "#333333",
                  fontSize: "12"
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
                formatter: function(params) {
                  let returnData = params[0].axisValue + "</br>";
                  for (let i=0;i<params.length;i++){
                    if (params[i].seriesName!=""){
                      let indexColor = params[i].color;
                      returnData += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:'+ indexColor +'"></span>';
                      returnData += params[i].seriesName +":" + params[i].value + "</br>";
                    }
                  }
                  return returnData;
                }
              },
              // 图片下载，折线图，柱状图切换
              toolbox: {
                show: true,
                // width: 140,
                height: 20,
                top: "-4%",
                feature: {
                  // magicType: { type: ["line", "bar"] },
                  // restore: {},
                  saveAsImage: {}
                },
                iconStyle: {
                  borderColor: "#333333"
                }
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
                  interval: "auto",
                  textStyle: {
                    color: "#333333"
                  },
                  // 默认x轴字体大小
                  fontSize: "12",
                  // margin:文字到x轴的距离
                  margin: 8
                },
                axisPointer: {
                  label: {
                    padding: [0, 0, 5, 0],
                    margin: 5,
                    // 移入时的字体大小
                    fontSize: "12",
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
                    width: 1
                  },
                  itemStyle: {
                    normal: {
                      color: `#82D3F8`
                    }
                  },
                  name: `${this.yAxisName}`,
                  data: seriesData,
                  yAxisIndex: 0,
                  markLine: {
                    silent: true,
                    lineStyle: {
                      normal: {
                        type: "dashed",
                        color: "#EB3737"
                      }
                    },
                    data: [
                      {
                        yAxis: waterType,
                        lineStyle: {
                          width: 1
                        },
                        label: {
                          show: true,
                          position: "insideEndTop",
                          formatter: `许可限值 ${waterType}`,
                          distance: [-45, 5],
                          fontSize: 12
                        }
                      }
                    ]
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: `#82D3F8`
                          },
                          {
                            offset: 0.8,
                            color: `#EFF9FE`
                          }
                        ],
                        false
                      ),
                      // shadowColor: `#ff9a29`,
                      // shadowBlur: 10
                    }
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  name: `${this.yAxisName}(mg/L)`,
                  nameLocation: "center",
                  nameGap: 30,
                  nameTextStyle: {
                    padding: [6, 0, 6, 0],
                    fontSize: "12"
                  },
                  position: "left",
                  min: 0,
                  max: function(value) {
                    if (waterType > value.max) {
                      return waterType;
                    } else {
                      return Number(value.max);
                    }
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
                    },
                    formatter: function(value, index) {
                      return value;
                    }
                  },
                  splitLine: {
                    show: false
                  }
                }
              ]
            };
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.popup-level {
  margin-left: 20px;
  position: relative;
  color: #fff;
  padding: 3px 11px 4px 6px;
  &::before {
    position: absolute;
    content: "";
    width: 0px;
    height: 0px;
    transform: rotate(44deg);
    right: -8px;
    top: 4px;
    border-top: 16px solid;
    border-right: 16px solid;
  }
}
.popup-water--type {
  margin-left: 20px;
  color: #333333;
  width: 40px;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  text-align: center;
  // border-radius: 50%;
}
.level-guo {
  background-color: #184dff;
  &::before {
    border-color: #184dff;
  }
}
.level-sheng {
  background-color: #0fe3db;
  &::before {
    border-color: #0fe3db;
  }
}
</style>
