<template>
  <div
    class="ya-forecast-dialog"
    :class="{ 'f-dialog-show': show, 'f-dialog-hidden': !show }"
  >
    <div class="forecast-header">
      <p class="f-title">{{ pointDetail.staName }}未来7日水质预报详情</p>
      <div class="f-header-right">
        <p class="f-time">
          超标预警次数：<span class="f-total">{{ 3 }}次</span>
        </p>
        <div class="f-mode">
          <span class="f-mode-label">模式：</span>
          <el-select
            v-model="query.mode"
            placeholder="请选择"
            style="width: 100px"
          >
            <el-option
              v-for="item in selectOp"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <img
          src="./close.png"
          @click="show = !show"
          class="f-close"
          style="width: 12px; height: 12px; cursor: pointer"
        />
      </div>
    </div>
    <div class="forecast-content clearfix">
      <div class="f-echart-l">
        <ChartMap
          chart-id="f-echart"
          :chart-op="chartOp"
          class-wrapper="map-wrapper"
          :style="{ width: '100%', height: '250px' }"
        />
      </div>
      <ul class="f-echart-r">
        <li
          class="f-echart-p"
          v-for="item in btnOp"
          :key="item.key"
          @click="changeBtn(item.key)"
          :class="{ 'f-index-active ': item.key === activeBtn }"
        >
          {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MapSelect from "@/components/MapSelect";
import ChartMap from "@/components/AllChart";
import { convert } from "@/utils";
export default {
  components: {
    MapSelect,
    ChartMap,
  },
  data() {
    return {
      pointDetail: {
        staName: "永安汞川桥",
        staCode: null,
      },
      query: {
        mode: "lst",
        startTime: "",
        index: "waterGrade",
      },
      activeBtn: "waterGrade",
      selectOp: [
        {
          key: "lst",
          value: "LST",
        },
        {
          key: "gru",
          value: "GRU",
        },
      ],
      btnOp: [
        {
          key: "waterGrade",
          value: "水质类别",
        },
        {
          key: "codmn",
          value: "CODMn",
        },
        {
          key: "tn",
          value: "TN",
        },
        {
          key: "nh3-n",
          value: "NH3-N",
        },
        {
          key: "tp",
          value: "TP",
        },
        {
          key: "do",
          value: "DO",
        },
      ],
      show: false,
      chartOp: {},
      yAxisName: "",
    };
  },
  mounted() {
    this.updateChart();
  },
  methods: {
    changeBtn(val) {
      this.activeBtn = val;
      this.query.index = val;
      console.log(this.query);
    },
    updateChart() {
      const waterType = 3;
      this.yAxisName = this.btnOp.find((v) => v.key === this.query.index).value;
      if (this.query.index === "waterGrade") {
        this.chartOp = {
          backgroundColor: "#ffffff",
          grid: {
            top: "10%",
            bottom: "20%",
            left: "7%",
            right: "5%",
          },
          legend: {
            // icon: "roundRect",
            // data: ["水质类别"],
            bottom: "0%",
            x: "center",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: "#333333",
              fontSize: "12",
            },
            show: false,
          },
          // 图片下载，折线图，柱状图切换
          toolbox: {
            show: true,
            // width: 140,
            height: 20,
            top: "-2%",
            feature: {
              // magicType: { type: ["line", "bar"] },
              // restore: {},
              saveAsImage: {},
            },
            iconStyle: {
              borderColor: "#333333",
            },
          },
          // 悬停提示
          tooltip: {
            trigger: "axis",
            formatter: function (param) {
              // console.log(param)
              let str = "";
              const name = "水质类别";
              str = param[0].axisValue + "<br /> ";
              let value = convert(param[0].value);
              if (param[0].data.exceedStandard) {
                let nameStr = "";
                param[0].data.exceedStandard.split(";").map((v) => {
                  nameStr += `<div style="font-size: 12px;">${v}</div>`;
                });
                str += `<div">
                                <span style="display: inline-block; min-width: 47px; font-size: 12px;" >${name}:</span>
                                <span style="display: inline-block; color: red; font-weight: bold; margin-left: 4px;font-size: 14px;">${value}</span>
                              ${nameStr}
                          </div>
                    `;
              } else {
                value = value || "";
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
                shadowOffsetY: 0,
              },
              lineStyle: {
                width: 1,
              },
            },
            backgroundColor: "rgba(51, 51, 51, 0.8)",
            textStyle: {
              color: "#fff",
            },
            padding: [5, 5],
            extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
          },
          xAxis: {
            type: "category",
            data: [
              "25日00时",
              "25日04时",
              "25日08时",
              "25日12时",
              "25日16时",
              "25日20时",
              "26日00时",
              "26日04时",
              "26日08时",
              "26日12时",
              "26日16时",
              "26日20时",
              "27日00时",
              "27日04时",
              "27日08时",
              "27日12时",
              "27日16时",
              "27日20时",
              "28日00时",
              "28日04时",
              "28日08时",
              "28日12时",
              "28日16时",
              "28日20时",
              "29日00时",
              "29日04时",
              "29日08时",
              "29日12时",
              "29日16时",
              "29日20时",
              "30日00时",
              "30日04时",
              "30日08时",
              "30日12时",
              "30日16时",
              "30日20时",
              "31日00时",
              "31日04时",
              "31日08时",
              "31日12时",
              "31日16时",
              "31日20时",
            ],
            axisLine: {
              lineStyle: {
                color: "#333333",
              },
            },
            axisTick: {
              show: false,
              // alignWithLabel: true
            },
            axisLabel: {
              interval: "auto",
              textStyle: {
                color: "#333333",
              },
              // 默认x轴字体大小
              fontSize: "12",
              // margin:文字到x轴的距离
              margin: 8,
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
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      offset: 0.86,
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      offset: 0.86,
                      color: "#33c0cd", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#33c0cd", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
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
              fontSize: "12",
            },
            position: "left",
            axisTick: {
              show: true,
              alignWithLabel: true,
              inside: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#333333",
                width: 1,
              },
            },
            axisLabel: {
              fontSize: "12",
              textStyle: {
                color: "#333333",
              },
              formatter: function (value, index) {
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
                }
                return texts;
              },
            },
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              markLine: {
                silent: true,
                symbolSize: 6,
                lineStyle: {
                  normal: {
                    type: "dashed",
                  },
                },
                data: [
                  {
                    yAxis: waterType,
                    lineStyle: {
                      width: 1,
                      color: "#FF0000",
                    },
                    label: {
                      show: true,
                      fontSize: "14",
                      position: "insideEndTop",
                      formatter: `水质目标 ${convert(waterType)}`,
                    },
                  },
                ],
              },
              yAxisIndex: 0,
              name: "水质类别",
              data: [
                {
                  date: "25日00时",
                  value: 4,
                  exceedStandard: "总氮(0.04倍)",
                },
                {
                  date: "25日04时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "25日08时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "25日12时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "25日16时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "25日20时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日00时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日04时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日08时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日12时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日16时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日20时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "27日00时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "27日04时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "27日08时",
                  value: 3,
                  exceedStandard: "",
                },
                {
                  date: "27日12时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "27日16时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "27日20时",
                  value: 5,
                  exceedStandard: "氨氮（0.12倍）",
                },
                {
                  date: "28日00时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "28日04时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "28日08时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "28日12时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "28日16时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "28日20时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "29日00时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "29日04时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "29日08时",
                  value: 2,
                  exceedStandard: "",
                },
              ],
              type: "bar",
              connectNulls: true,
              barWidth: 10,
              lineStyle: {
                width: 1,
              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    if (
                      params.data.value &&
                      Number(params.data.value) > waterType
                    ) {
                      return "#FF0000";
                    } else {
                      return "#5AD8A6";
                    }
                  },
                },
              },
            },
          ],
          dataZoom: [
            {
              show: true,
              height: 15,
              // xAxisIndex: [0],
              bottom: 10,
              start: 0,
              end: 100,
              // zoomLock: true,
              handleStyle: {
                color: "#5B3AAE",
              },
            },
            {
              type: "inside",
              zoomLock: true,
              show: true,
              height: 15,
              start: 0,
              end: 100,
            },
          ],
        };
      } else {
        this.chartOp = {
          backgroundColor: "#ffffff",
          grid: {
            top: "10%",
            bottom: "20%",
            left: "7%",
            right: "5%",
          },
          // 图例
          legend: {
            icon: "roundRect",
            itemWidth: 10,
            itemHeight: 10,
            data: [`${this.yAxisName}`],
            bottom: "0%",
            // right: "20%",
            x: "center",
            textStyle: {
              color: "#333333",
              fontSize: "12",
            },
            show: false
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
                fontSize: "12px",
                borderColor: "rgba(0,0,0,0)",
                shadowColor: "rgba(0,0,0,0)",
                shadowOffsetY: 0,
              },
              lineStyle: {
                width: 0,
              },
            },
            backgroundColor: "rgba(51, 51, 51, 0.8)",
            textStyle: {
              color: "#fff",
            },
            padding: [5, 5],
            extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
            formatter: function (params) {
              let returnData = params[0].axisValue + "</br>";
              for (let i = 0; i < params.length; i++) {
                if (params[i].seriesName != "") {
                  let indexColor = params[i].color;
                  returnData +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:' +
                    indexColor +
                    '"></span>';
                  returnData +=
                    params[i].seriesName + ":" + params[i].value + "</br>";
                }
              }
              return returnData;
            },
            // formatter: function(param) {
            //   let str = "";
            //   str = param[0].axisValue + "<br /> ";
            //   const value = param[0].value;
            //   // const name = param[0].data.date
            //   if (value) {
            //     str += `<div">
            //             <span style="display: inline-block; color: red; font-weight: bold; margin-left: 4px;font-size: 14px;">${value}</span>
            //           </div>
            //     `;
            //   }
            //   return str;
            // }
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
              saveAsImage: {},
            },
            iconStyle: {
              borderColor: "#333333",
            },
          },
          xAxis: {
            type: "category",
            data: [
              "25日00时",
              "25日04时",
              "25日08时",
              "25日12时",
              "25日16时",
              "25日20时",
              "26日00时",
              "26日04时",
              "26日08时",
              "26日12时",
              "26日16时",
              "26日20时",
              "27日00时",
              "27日04时",
              "27日08时",
              "27日12时",
              "27日16时",
              "27日20时",
              "28日00时",
              "28日04时",
              "28日08时",
              "28日12时",
              "28日16时",
              "28日20时",
              "29日00时",
              "29日04时",
              "29日08时",
              "29日12时",
              "29日16时",
              "29日20时",
              "30日00时",
              "30日04时",
              "30日08时",
              "30日12时",
              "30日16时",
              "30日20时",
              "31日00时",
              "31日04时",
              "31日08时",
              "31日12时",
              "31日16时",
              "31日20时",
            ],
            axisLine: {
              lineStyle: {
                color: "#333333",
                width: 1,
              },
            },
            axisTick: {
              show: false,
              // alignWithLabel: true
            },
            axisLabel: {
              interval: "auto",
              textStyle: {
                color: "#333333",
              },
              // 默认x轴字体大小
              fontSize: "12",
              // margin:文字到x轴的距离
              margin: 8,
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
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      offset: 0.86,
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      offset: 0.86,
                      color: "#33c0cd", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#33c0cd", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
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
                width: 1,
              },
              itemStyle: {
                normal: {
                  color: `#ff9a29`,
                },
              },
              name: `${this.yAxisName}`,
              data: [
                {
                  date: "25日00时",
                  value: 4,
                  exceedStandard: "总氮(0.04倍)",
                },
                {
                  date: "25日04时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "25日08时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "25日12时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "25日16时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "25日20时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日00时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日04时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日08时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日12时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日16时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "26日20时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "27日00时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "27日04时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "27日08时",
                  value: 3,
                  exceedStandard: "",
                },
                {
                  date: "27日12时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "27日16时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "27日20时",
                  value: 5,
                  exceedStandard: "氨氮（0.12倍）",
                },
                {
                  date: "28日00时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "28日04时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "28日08时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "28日12时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "28日16时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "28日20时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "29日00时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "29日04时",
                  value: 2,
                  exceedStandard: "",
                },
                {
                  date: "29日08时",
                  value: 2,
                  exceedStandard: "",
                },
              ],
              yAxisIndex: 0,
              markLine: {
                silent: true,
                lineStyle: {
                  normal: {
                    type: "dashed",
                    color: "red",
                  },
                },
                data: [
                  {
                    yAxis: 3,
                    lineStyle: {
                      width: 1,
                    },
                    label: {
                      show: true,
                      position: "insideEndTop",
                      formatter: `许可限值 ${3}`,
                    },
                  },
                ],
              },
              areaStyle: {
                normal: {
                  shadowColor: `#ff9a29`,
                  shadowBlur: 10,
                },
              },
            },
          ],
          dataZoom: [
            {
              show: true,
              height: 15,
              // xAxisIndex: [0],
              bottom: 10,
              start: 0,
              end: 100,
              // zoomLock: true,
              handleStyle: {
                color: "#5B3AAE",
              },
            },
            {
              type: "inside",
              zoomLock: true,
              show: true,
              height: 15,
              start: 0,
              end: 100,
            },
          ],
          yAxis: [
            {
              type: "value",
              name: `浓度(mg/L)`,
              nameLocation: "center",
              nameGap: 40,
              nameTextStyle: {
                padding: [6, 0, 6, 0],
                fontSize: "12",
              },
              position: "left",
              min: 0,
              max: function (value) {
                if (waterType > value.max) {
                  return waterType;
                } else {
                  return Number(value.max);
                }
              },
              axisTick: {
                show: true,
                inside: true,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#333333",
                  width: 1,
                },
              },
              axisLabel: {
                fontSize: "12",
                textStyle: {
                  color: "#333333",
                },
                formatter: function (value, index) {
                  return value;
                },
              },
              splitLine: {
                show: false,
              },
            },
          ],
        };
      }
    },
  },
  watch: {
    'query.index': function (n, o) {
      this.updateChart()
    }
  }
};
</script>

<style lang="scss" scoped>
.ya-forecast-dialog {
  box-sizing: border-box;
  width: 100%;
  height: 310px;
  background: #ffffff;
  position: absolute;
  bottom: 0;
  z-index: 1111;
  padding: 0 10px;
  box-shadow: 0px 2px 4px 0px rgba(142, 155, 176, 0.5);
  border-radius: 4px;
}
.forecast-header {
  display: flex;
  align-items: center;
  padding: 6px;
  border-bottom: 1px solid #d9d9d9;
}
.f-title {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}
.f-close {
  margin-left: auto;
  color: #1890ff;
}
.f-time,
.f-mode-label {
  font-size: 12px;
  margin-right: 10px;
  font-weight: bold;
  // margin-left: ;
}
.f-time {
  margin-left: 80px;
  height: 30px;
  line-height: 30px;
}
.f-mode {
  margin-left: 40px;
}
.f-total {
  font-weight: bold;
  color: red;
}
.f-header-right {
  height: 30px;
  // margin-left: auto;
  display: flex;
  align-items: center;
  flex: 1;
}
.f-dialog-hidden {
  height: 0;
  overflow: hidden;
}
.f-dialog-show {
  height: 310px;
}
.f-dialog-hidden,
.f-dialog-show {
  transition: height 0.4s ease;
}
.forecast-content {
  padding: 10px;
  display: flex;
  height: calc(100% - 45px);
}
.f-echart-l {
  flex: 1;
  // float: left;
  height: 100%;
}
.f-echart-r {
  width: 100px;
  // float: left;
  height: 100%;
  // background: slateblue;
  display: flex;
  flex-direction: column;
}
.f-echart-p {
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  text-align: center;
  margin-bottom: 4px;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: #1890ff;
    color: #ffffff;
  }
}
.f-index-active {
  background: #1890ff;
  color: #ffffff;
}
</style>
