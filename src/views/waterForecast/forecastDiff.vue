<template>
  <basic-container>
    <basic-wrapper>
      <div class="ya-row clearfix">
        <ya-time
          :query="query"
          value-key="waterTime"
          title="查询日期:"
          type="daterange"
          @updateQuery="updateQuery"
        />
        <ya-radio
          :query="query"
          value-key="timeType"
          title=""
          :radio-op="timeTypeOp"
          @updateQuery="updateQuery"
        />
        <select-single
          :query="query"
          value-key="dmType"
          title="断面"
          :select-op="dmOp"
          @updateQuery="updateQuery"
        />
        <ya-checkbox
          :query="query"
          title="模式"
          value-key="mode"
          :select-op="modeTypeOp"
        ></ya-checkbox>
        <ya-search @refresh="refresh" />
      </div>
    </basic-wrapper>
    <basic-wrapper>
      <chart-map
        chart-id="water-diff"
        :chart-op="chartOp1"
        :style="{ width: '100%', height: '260px' }"
      ></chart-map>
      <chart-map
        chart-id="codmn-diff"
        :chart-op="chartOp2"
        :style="{ width: '100%', height: '260px' }"
      ></chart-map>
      <chart-map
        chart-id="tn-diff"
        :chart-op="chartOp3"
        :style="{ width: '100%', height: '260px' }"
      ></chart-map>
      <chart-map
        chart-id="nh3n-diff"
        :chart-op="chartOp4"
        :style="{ width: '100%', height: '260px' }"
      ></chart-map>
      <chart-map
        chart-id="tp-diff"
        :chart-op="chartOp5"
        :style="{ width: '100%', height: '260px' }"
      ></chart-map>
      <chart-map
        chart-id="do-diff"
        :chart-op="chartOp6"
        :style="{ width: '100%', height: '260px' }"
      ></chart-map>
    </basic-wrapper>
  </basic-container>
</template>

<script>
import YaRadio from "@/components/Radio";
import SelectMultiply from "@/components/SelectMultiply";
import YaTime from "@/components/TimePicker";
import SelectSingle from "@/components/SelectSingle";
import YaCheckbox from "@/components/CheckBox";
import YaSearch from "@/components/ButtonSearch";
import ChartMap from "@/components/AllChart";
import { convert } from "@/utils";

export default {
  name: "WaterAnalysis",
  components: {
    YaRadio,
    YaTime,
    SelectMultiply,
    YaCheckbox,
    YaSearch,
    SelectSingle,
    ChartMap
  },
  data() {
    return {
      chartOp1: {},
      chartOp2: {},
      chartOp3: {},
      chartOp4: {},
      chartOp5: {},
      chartOp6: {},
      query: {
        waterTime: [],
        timeType: "hour",
        mode: ["LSTM", "GRU"],
        dmType: 1
      },
      timeTypeOp: [
        {
          value: "小时",
          key: "hour"
        },
        {
          value: "日均",
          key: "day"
        }
      ],
      dmOp: [
        {
          value: "永安洪田",
          key: 1
        },
        {
          value: "断面2",
          key: 2
        },
        {
          value: "断面3",
          key: 3
        },
        {
          value: "断面4",
          key: 4
        }
      ],
      modeTypeOp: [
        {
          key: "LSTM",
          value: "LSTM"
        },
        {
          key: "GRU",
          value: "GRU"
        }
      ]
    };
  },
  methods: {
    updateQuery(val) {
      console.log(val);
    },
    refresh() {
      console.log("刷新");
    },
    checkChange(scope) {
      console.log(scope);
    },
    updateChart() {
      const color = ["#3A85D3", "#5AD8A6", "#008000", "#5470c6", "#61a0a8"];
      this.chartOp1 = {
        backgroundColor: "#ffffff",
        grid: {
          top: "12%",
          bottom: "15%",
          left: "6%",
          right: "5%"
        },
        legend: {
          icon: "roundRect",
          data: ["LSTM", "GRU", "实测数据"],
          top: "0%",
          x: "center",
          // right: "10%",
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
          // width: 120,
          height: 12,
          top: "0%",
          feature: {
            myTool1: {
                show: true,
                title: "折线图",
                icon:
                  "path://M1.33333333,0 C1.425,0 1.5,0.0767045455 1.5,0.170454545 L1.5,0.170454545 L1.5,13.4659091 L15.8333333,13.4659091 C15.925,13.4659091 16,13.5426136 16,13.6363636 L16,13.6363636 L16,14.8295455 C16,14.9232955 15.925,15 15.8333333,15 L15.8333333,15 L0.166666667,15 C0.075,15 0,14.9232955 0,14.8295455 L0,14.8295455 L0,0.170454545 C0,0.0767045455 0.075,0 0.166666667,0 L0.166666667,0 Z M14.862059,3.04786061 C14.9283365,2.98404646 15.0373736,2.98404646 15.103651,3.04786061 L15.103651,3.04786061 L15.9502919,3.86303485 C16.0165694,3.92684899 16.0165694,4.03183355 15.9502919,4.0956477 L15.9502919,4.0956477 L10.0622893,9.76275548 C9.99601184,9.82656962 9.88697476,9.82656962 9.82069731,9.76275548 L9.82069731,9.76275548 L7.09263218,7.11961476 L4.13580298,9.95213939 C4.06738755,10.0159535 3.96048845,10.0159535 3.894211,9.95213939 L3.894211,9.95213939 L3.04970808,9.13490663 C2.98343064,9.07109249 2.98343064,8.96610793 3.04970808,8.90229378 L3.04970808,8.90229378 L6.97931913,5.14137627 C7.04559658,5.07756212 7.15463366,5.07756212 7.22091111,5.14137627 L7.22091111,5.14137627 L9.94470027,7.78039994 Z",
                onclick: () => {
                  // console.log(this.chartOp.)
                  const series = this.chartOp1.series;
                  series.map((v) => {
                    v.type = "line";
                    v.smooth = true;
                    // v.symbolSize = 0;
                    v.lineStyle.width = 2;
                  });
                },
              },
              myTool2: {
                show: true,
                title: "柱状图",
                icon:
                  "path://M1.33333333,0 C1.425,0 1.5,0.0767045455 1.5,0.170454545 L1.5,0.170454545 L1.5,13.4659091 L15.8333333,13.4659091 C15.925,13.4659091 16,13.5426136 16,13.6363636 L16,13.6363636 L16,14.8295455 C16,14.9232955 15.925,15 15.8333333,15 L15.8333333,15 L0.166666667,15 C0.075,15 0,14.9232955 0,14.8295455 L0,14.8295455 L0,0.170454545 C0,0.0767045455 0.075,0 0.166666667,0 L0.166666667,0 Z M4.33333333,8.53846154 C4.425,8.53846154 4.5,8.61634615 4.5,8.71153846 L4.5,8.71153846 L4.5,11.8269231 C4.5,11.9221154 4.425,12 4.33333333,12 L4.33333333,12 L3.16666667,12 C3.075,12 3,11.9221154 3,11.8269231 L3,11.8269231 L3,8.71153846 C3,8.61634615 3.075,8.53846154 3.16666667,8.53846154 L3.16666667,8.53846154 Z M7.5,4.73076923 C7.59166667,4.73076923 7.66666667,4.80865385 7.66666667,4.90384615 L7.66666667,4.90384615 L7.66666667,11.8269231 C7.66666667,11.9221154 7.59166667,12 7.5,12 L7.5,12 L6.33333333,12 C6.24166667,12 6.16666667,11.9221154 6.16666667,11.8269231 L6.16666667,11.8269231 L6.16666667,4.90384615 C6.16666667,4.80865385 6.24166667,4.73076923 6.33333333,4.73076923 L6.33333333,4.73076923 Z M10.6666667,6.41826923 C10.7583333,6.41826923 10.8333333,6.49615385 10.8333333,6.59134615 L10.8333333,6.59134615 L10.8333333,11.8269231 C10.8333333,11.9221154 10.7583333,12 10.6666667,12 L10.6666667,12 L9.5,12 C9.40833333,12 9.33333333,11.9221154 9.33333333,11.8269231 L9.33333333,11.8269231 L9.33333333,6.59134615 C9.33333333,6.49615385 9.40833333,6.41826923 9.5,6.41826923 L9.5,6.41826923 Z M13.8333333,3 C13.925,3 14,3.07788462 14,3.17307692 L14,3.17307692 L14,11.8269231 C14,11.9221154 13.925,12 13.8333333,12 L13.8333333,12 L12.6666667,12 C12.575,12 12.5,11.9221154 12.5,11.8269231 L12.5,11.8269231 L12.5,3.17307692 C12.5,3.07788462 12.575,3 12.6666667,3 L12.6666667,3 Z",
                onclick: () => {
                  // console.log(this.chartOp.)
                  const series = this.chartOp1.series;
                  series.map((v) => {
                    v.type = "bar";
                    v.barWidth = 10;
                  });
                },
              },
              saveAsImage: {},
          },
          iconStyle: {
            borderColor: "#333333"
          }
        },
        // 悬停提示
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            // console.log(params);
            let returnData = params[0].data.date + "</br>";
            for (let i = 0; i < params.length; i++) {
              if (params[i].seriesName != "") {
                let indexColor = params[i].color;
                returnData +=
                  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:' +
                  indexColor +
                  '"></span>';
                returnData +=
                  params[i].data.title +
                  " " +
                  convert(params[i].data.value) +
                  " " +
                  // params[i].data.name +
                  "</br>";
              }
            }
            return returnData;
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
          data: [
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18"
          ],
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
            // interval: 5,
            interval: "auto",
            textStyle: {
              color: "#333333"
            },
            // 默认x轴字体大小
            fontSize: "12",
            // margin:文字到x轴的距离
            margin: 8
            // formatter: function(value, index) {
            //   return value.substring(0, 8);
            // }
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
              // formatter: function(params) {
              //   return params.value.substring(0, 8);
              // }
            }
          }
        },
        yAxis: {
          offset: 6,
          name: "水质类别趋势对比",
          type: "value",
          min: 0,
          max: 6,
          nameGap: 22,
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
              }
              return texts;
            }
          },
          splitLine: {
            show: false
          }
        },
        // dataZoom: [
        //   {
        //     show: true,
        //     height: 15,
        //     // xAxisIndex: [0],
        //     bottom: 10,
        //     start: 0,
        //     end: 100,
        //     // zoomLock: true,
        //     handleStyle: {
        //       color: "#5B3AAE"
        //     }
        //   },
        //   {
        //     type: "inside",
        //     zoomLock: true,
        //     show: true,
        //     height: 15,
        //     start: 0,
        //     end: 100
        //   }
        // ],
        series: [
          {
            // markLine: {
            //   silent: true,
            //   symbolSize: 6,
            //   lineStyle: {
            //     normal: {
            //       type: "dashed"
            //     }
            //   },
            //   data: [
            //     {
            //       // 水质目标基线值
            //       yAxis: 2,
            //       lineStyle: {
            //         width: 1,
            //         color: color[0]
            //       },
            //       value: {
            //         show: true,
            //         fontSize: "14",
            //         position: "insideEndTop",
            //         formatter: `水质目标 ${convert(2)}`,
            //         color: "#ff0000",
            //         distance: [-50, 20]
            //       }
            //     }
            //   ]
            // },
            yAxisIndex: 0,
            name: "LSTM",
            // symbol: "none",
            data: [
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              }
            ],
            type: "line",
            smooth: true,
            connectNulls: true,
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[0]
                // color: function(params) {
                //   if (params.data.value === 1) {
                //     return '#82D3F8'
                //   } else if(params.data.value === 2) {
                //     return '#00A7F0'
                //   } else if(params.data.value === 3) {
                //     return '#6FB602'
                //   } else if(params.data.value === 4) {
                //     return '#FFFF00'
                //   } else if(params.data.value === 5) {
                //     return '#F59B23'
                //   } else if(params.data.value === 6) {
                //     return '#D9021B'
                //   }
                // }
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "GRU",
            data: [
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[1]
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "实测数据",
            data: [
              {
                date: "2020-01-18",
                value: 5,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[2]
              }
            }
          }
        ]
      };
      this.chartOp2 = {
        backgroundColor: "#ffffff",
        grid: {
          top: "12%",
          bottom: "15%",
          left: "6%",
          right: "5%"
        },
        legend: {
          icon: "roundRect",
          data: ["LSTM", "GRU", "实测数据"],
          top: "0%",
          x: "center",
          // right: "10%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            // color: "#333333",
            fontSize: "12"
          }
        },
        // 图片下载，折线图，柱状图切换
        toolbox: {
          show: true,
          // width: 120,
          height: 12,
          top: "0%",
          feature: {
            magicType: { type: ["line", "bar"] },
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
          axisPointer: {
            type: "shadow",
            value: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              fontSize: "10",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 0
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
          data: [
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18"
          ],
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
            // interval: 5,
            interval: "auto",
            textStyle: {
              color: "#333333"
            },
            // 默认x轴字体大小
            fontSize: "12",
            // margin:文字到x轴的距离
            margin: 8
            // formatter: function(value, index) {
            //   return value.substring(0, 8);
            // }
          },
          axisPointer: {
            value: {
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
              // formatter: function(params) {
              //   return params.value.substring(0, 8);
              // }
            }
          }
        },
        yAxis: {
          offset: 6,
          name: "CODmn趋势对比",
          type: "value",
          min: 0,
          max: function(value) {
            return Number(value.max);
          },
          nameGap: 22,
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
            }
            // formatter: function(value, index) {
            //   let texts = [];
            //   if (value == 0) {
            //     texts.push("");
            //   } else if (value == 1) {
            //     texts.push("Ⅰ");
            //   } else if (value == 2) {
            //     texts.push("Ⅱ");
            //   } else if (value == 3) {
            //     texts.push("Ⅲ");
            //   } else if (value == 4) {
            //     texts.push("Ⅳ");
            //   } else if (value == 5) {
            //     texts.push("Ⅴ");
            //   } else if (value == 6) {
            //     texts.push("劣Ⅴ");
            //   }
            //   return texts;
            // }
          },
          splitLine: {
            show: false
          }
        },
        // dataZoom: [
        //   {
        //     show: true,
        //     height: 15,
        //     // xAxisIndex: [0],
        //     bottom: 10,
        //     start: 0,
        //     end: 100,
        //     // zoomLock: true,
        //     handleStyle: {
        //       color: "#5B3AAE"
        //     }
        //   },
        //   {
        //     type: "inside",
        //     zoomLock: true,
        //     show: true,
        //     height: 15,
        //     start: 0,
        //     end: 100
        //   }
        // ],
        series: [
          {
            // markLine: {
            //   silent: true,
            //   symbolSize: 6,
            //   lineStyle: {
            //     normal: {
            //       type: "dashed"
            //     }
            //   },
            //   data: [
            //     {
            //       // 水质目标基线值
            //       yAxis: 2,
            //       lineStyle: {
            //         width: 1,
            //         color: color[0]
            //       },
            //       value: {
            //         show: true,
            //         fontSize: "14",
            //         position: "insideEndTop",
            //         formatter: `水质目标 ${convert(2)}`,
            //         color: "#ff0000",
            //         distance: [-50, 20]
            //       }
            //     }
            //   ]
            // },
            yAxisIndex: 0,
            name: "LSTM",
            symbol: "none",
            data: [
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              }
            ],
            type: "line",
            smooth: true,
            connectNulls: true,
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[0]
                // color: function(params) {
                //   if (params.data.value === 1) {
                //     return '#82D3F8'
                //   } else if(params.data.value === 2) {
                //     return '#00A7F0'
                //   } else if(params.data.value === 3) {
                //     return '#6FB602'
                //   } else if(params.data.value === 4) {
                //     return '#FFFF00'
                //   } else if(params.data.value === 5) {
                //     return '#F59B23'
                //   } else if(params.data.value === 6) {
                //     return '#D9021B'
                //   }
                // }
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "GRU",
            data: [
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[1]
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "实测数据",
            data: [
              {
                date: "2020-01-18",
                value: 5,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[2]
              }
            }
          }
        ]
      };
      this.chartOp3 = {
        backgroundColor: "#ffffff",
        grid: {
          top: "12%",
          bottom: "15%",
          left: "6%",
          right: "5%"
        },
        legend: {
          icon: "roundRect",
          data: ["LSTM", "GRU", "实测数据"],
          top: "0%",
          x: "center",
          // right: "10%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            // color: "#333333",
            fontSize: "12"
          }
        },
        // 图片下载，折线图，柱状图切换
        toolbox: {
          show: true,
          // width: 120,
          height: 12,
          top: "0%",
          feature: {
            magicType: { type: ["line", "bar"] },
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
          axisPointer: {
            type: "shadow",
            value: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              fontSize: "10",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 0
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
          data: [
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18"
          ],
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
            // interval: 5,
            interval: "auto",
            textStyle: {
              color: "#333333"
            },
            // 默认x轴字体大小
            fontSize: "12",
            // margin:文字到x轴的距离
            margin: 8
            // formatter: function(value, index) {
            //   return value.substring(0, 8);
            // }
          },
          axisPointer: {
            value: {
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
              // formatter: function(params) {
              //   return params.value.substring(0, 8);
              // }
            }
          }
        },
        yAxis: {
          offset: 6,
          name: "TN趋势对比",
          type: "value",
          min: 0,
          max: function(value) {
            return Number(value.max);
          },
          nameGap: 22,
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
            }
            // formatter: function(value, index) {
            //   let texts = [];
            //   if (value == 0) {
            //     texts.push("");
            //   } else if (value == 1) {
            //     texts.push("Ⅰ");
            //   } else if (value == 2) {
            //     texts.push("Ⅱ");
            //   } else if (value == 3) {
            //     texts.push("Ⅲ");
            //   } else if (value == 4) {
            //     texts.push("Ⅳ");
            //   } else if (value == 5) {
            //     texts.push("Ⅴ");
            //   } else if (value == 6) {
            //     texts.push("劣Ⅴ");
            //   }
            //   return texts;
            // }
          },
          splitLine: {
            show: false
          }
        },
        // dataZoom: [
        //   {
        //     show: true,
        //     height: 15,
        //     // xAxisIndex: [0],
        //     bottom: 10,
        //     start: 0,
        //     end: 100,
        //     // zoomLock: true,
        //     handleStyle: {
        //       color: "#5B3AAE"
        //     }
        //   },
        //   {
        //     type: "inside",
        //     zoomLock: true,
        //     show: true,
        //     height: 15,
        //     start: 0,
        //     end: 100
        //   }
        // ],
        series: [
          {
            // markLine: {
            //   silent: true,
            //   symbolSize: 6,
            //   lineStyle: {
            //     normal: {
            //       type: "dashed"
            //     }
            //   },
            //   data: [
            //     {
            //       // 水质目标基线值
            //       yAxis: 2,
            //       lineStyle: {
            //         width: 1,
            //         color: color[0]
            //       },
            //       value: {
            //         show: true,
            //         fontSize: "14",
            //         position: "insideEndTop",
            //         formatter: `水质目标 ${convert(2)}`,
            //         color: "#ff0000",
            //         distance: [-50, 20]
            //       }
            //     }
            //   ]
            // },
            yAxisIndex: 0,
            name: "LSTM",
            symbol: "none",
            data: [
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              }
            ],
            type: "line",
            smooth: true,
            connectNulls: true,
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[0]
                // color: function(params) {
                //   if (params.data.value === 1) {
                //     return '#82D3F8'
                //   } else if(params.data.value === 2) {
                //     return '#00A7F0'
                //   } else if(params.data.value === 3) {
                //     return '#6FB602'
                //   } else if(params.data.value === 4) {
                //     return '#FFFF00'
                //   } else if(params.data.value === 5) {
                //     return '#F59B23'
                //   } else if(params.data.value === 6) {
                //     return '#D9021B'
                //   }
                // }
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "GRU",
            data: [
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[1]
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "实测数据",
            data: [
              {
                date: "2020-01-18",
                value: 5,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[2]
              }
            }
          }
        ]
      };
      this.chartOp4 = {
        backgroundColor: "#ffffff",
        grid: {
          top: "12%",
          bottom: "15%",
          left: "6%",
          right: "5%"
        },
        legend: {
          icon: "roundRect",
          data: ["LSTM", "GRU", "实测数据"],
          top: "0%",
          x: "center",
          // right: "10%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            // color: "#333333",
            fontSize: "12"
          }
        },
        // 图片下载，折线图，柱状图切换
        toolbox: {
          show: true,
          // width: 120,
          height: 12,
          top: "0%",
          feature: {
            magicType: { type: ["line", "bar"] },
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
          axisPointer: {
            type: "shadow",
            value: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              fontSize: "10",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 0
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
          data: [
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18"
          ],
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
            // interval: 5,
            interval: "auto",
            textStyle: {
              color: "#333333"
            },
            // 默认x轴字体大小
            fontSize: "12",
            // margin:文字到x轴的距离
            margin: 8
            // formatter: function(value, index) {
            //   return value.substring(0, 8);
            // }
          },
          axisPointer: {
            value: {
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
              // formatter: function(params) {
              //   return params.value.substring(0, 8);
              // }
            }
          }
        },
        yAxis: {
          offset: 6,
          name: "NH3-N趋势对比",
          type: "value",
          min: 0,
          max: function(value) {
            return Number(value.max);
          },
          nameGap: 22,
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
            }
            // formatter: function(value, index) {
            //   let texts = [];
            //   if (value == 0) {
            //     texts.push("");
            //   } else if (value == 1) {
            //     texts.push("Ⅰ");
            //   } else if (value == 2) {
            //     texts.push("Ⅱ");
            //   } else if (value == 3) {
            //     texts.push("Ⅲ");
            //   } else if (value == 4) {
            //     texts.push("Ⅳ");
            //   } else if (value == 5) {
            //     texts.push("Ⅴ");
            //   } else if (value == 6) {
            //     texts.push("劣Ⅴ");
            //   }
            //   return texts;
            // }
          },
          splitLine: {
            show: false
          }
        },
        // dataZoom: [
        //   {
        //     show: true,
        //     height: 15,
        //     // xAxisIndex: [0],
        //     bottom: 10,
        //     start: 0,
        //     end: 100,
        //     // zoomLock: true,
        //     handleStyle: {
        //       color: "#5B3AAE"
        //     }
        //   },
        //   {
        //     type: "inside",
        //     zoomLock: true,
        //     show: true,
        //     height: 15,
        //     start: 0,
        //     end: 100
        //   }
        // ],
        series: [
          {
            // markLine: {
            //   silent: true,
            //   symbolSize: 6,
            //   lineStyle: {
            //     normal: {
            //       type: "dashed"
            //     }
            //   },
            //   data: [
            //     {
            //       // 水质目标基线值
            //       yAxis: 2,
            //       lineStyle: {
            //         width: 1,
            //         color: color[0]
            //       },
            //       value: {
            //         show: true,
            //         fontSize: "14",
            //         position: "insideEndTop",
            //         formatter: `水质目标 ${convert(2)}`,
            //         color: "#ff0000",
            //         distance: [-50, 20]
            //       }
            //     }
            //   ]
            // },
            yAxisIndex: 0,
            name: "LSTM",
            symbol: "none",
            data: [
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              }
            ],
            type: "line",
            smooth: true,
            connectNulls: true,
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[0]
                // color: function(params) {
                //   if (params.data.value === 1) {
                //     return '#82D3F8'
                //   } else if(params.data.value === 2) {
                //     return '#00A7F0'
                //   } else if(params.data.value === 3) {
                //     return '#6FB602'
                //   } else if(params.data.value === 4) {
                //     return '#FFFF00'
                //   } else if(params.data.value === 5) {
                //     return '#F59B23'
                //   } else if(params.data.value === 6) {
                //     return '#D9021B'
                //   }
                // }
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "GRU",
            data: [
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[1]
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "实测数据",
            data: [
              {
                date: "2020-01-18",
                value: 5,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[2]
              }
            }
          }
        ]
      };
      this.chartOp5 = {
        backgroundColor: "#ffffff",
        grid: {
          top: "12%",
          bottom: "15%",
          left: "6%",
          right: "5%"
        },
        legend: {
          icon: "roundRect",
          data: ["LSTM", "GRU", "实测数据"],
          top: "0%",
          x: "center",
          // right: "10%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            // color: "#333333",
            fontSize: "12"
          }
        },
        // 图片下载，折线图，柱状图切换
        toolbox: {
          show: true,
          // width: 120,
          height: 12,
          top: "0%",
          feature: {
            magicType: { type: ["line", "bar"] },
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
          axisPointer: {
            type: "shadow",
            value: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              fontSize: "10",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 0
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
          data: [
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18"
          ],
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
            // interval: 5,
            interval: "auto",
            textStyle: {
              color: "#333333"
            },
            // 默认x轴字体大小
            fontSize: "12",
            // margin:文字到x轴的距离
            margin: 8
            // formatter: function(value, index) {
            //   return value.substring(0, 8);
            // }
          },
          axisPointer: {
            value: {
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
              // formatter: function(params) {
              //   return params.value.substring(0, 8);
              // }
            }
          }
        },
        yAxis: {
          offset: 6,
          name: "TP趋势对比",
          type: "value",
          min: 0,
          max: function(value) {
            return Number(value.max);
          },
          nameGap: 22,
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
            }
            // formatter: function(value, index) {
            //   let texts = [];
            //   if (value == 0) {
            //     texts.push("");
            //   } else if (value == 1) {
            //     texts.push("Ⅰ");
            //   } else if (value == 2) {
            //     texts.push("Ⅱ");
            //   } else if (value == 3) {
            //     texts.push("Ⅲ");
            //   } else if (value == 4) {
            //     texts.push("Ⅳ");
            //   } else if (value == 5) {
            //     texts.push("Ⅴ");
            //   } else if (value == 6) {
            //     texts.push("劣Ⅴ");
            //   }
            //   return texts;
            // }
          },
          splitLine: {
            show: false
          }
        },
        // dataZoom: [
        //   {
        //     show: true,
        //     height: 15,
        //     // xAxisIndex: [0],
        //     bottom: 10,
        //     start: 0,
        //     end: 100,
        //     // zoomLock: true,
        //     handleStyle: {
        //       color: "#5B3AAE"
        //     }
        //   },
        //   {
        //     type: "inside",
        //     zoomLock: true,
        //     show: true,
        //     height: 15,
        //     start: 0,
        //     end: 100
        //   }
        // ],
        series: [
          {
            // markLine: {
            //   silent: true,
            //   symbolSize: 6,
            //   lineStyle: {
            //     normal: {
            //       type: "dashed"
            //     }
            //   },
            //   data: [
            //     {
            //       // 水质目标基线值
            //       yAxis: 2,
            //       lineStyle: {
            //         width: 1,
            //         color: color[0]
            //       },
            //       value: {
            //         show: true,
            //         fontSize: "14",
            //         position: "insideEndTop",
            //         formatter: `水质目标 ${convert(2)}`,
            //         color: "#ff0000",
            //         distance: [-50, 20]
            //       }
            //     }
            //   ]
            // },
            yAxisIndex: 0,
            name: "LSTM",
            symbol: "none",
            data: [
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              }
            ],
            type: "line",
            smooth: true,
            connectNulls: true,
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[0]
                // color: function(params) {
                //   if (params.data.value === 1) {
                //     return '#82D3F8'
                //   } else if(params.data.value === 2) {
                //     return '#00A7F0'
                //   } else if(params.data.value === 3) {
                //     return '#6FB602'
                //   } else if(params.data.value === 4) {
                //     return '#FFFF00'
                //   } else if(params.data.value === 5) {
                //     return '#F59B23'
                //   } else if(params.data.value === 6) {
                //     return '#D9021B'
                //   }
                // }
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "GRU",
            data: [
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[1]
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "实测数据",
            data: [
              {
                date: "2020-01-18",
                value: 5,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[2]
              }
            }
          }
        ]
      };
      this.chartOp6 = {
        backgroundColor: "#ffffff",
        grid: {
          top: "12%",
          bottom: "15%",
          left: "6%",
          right: "5%"
        },
        legend: {
          icon: "roundRect",
          data: ["LSTM", "GRU", "实测数据"],
          top: "0%",
          x: "center",
          // right: "10%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            // color: "#333333",
            fontSize: "12"
          }
        },
        // 图片下载，折线图，柱状图切换
        toolbox: {
          show: true,
          // width: 120,
          height: 12,
          top: "0%",
          feature: {
            magicType: { type: ["line", "bar"] },
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
          axisPointer: {
            type: "shadow",
            value: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              fontSize: "10",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0
            },
            lineStyle: {
              width: 0
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
          data: [
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18",
            "2020-01-18"
          ],
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
            // interval: 5,
            interval: "auto",
            textStyle: {
              color: "#333333"
            },
            // 默认x轴字体大小
            fontSize: "12",
            // margin:文字到x轴的距离
            margin: 8
            // formatter: function(value, index) {
            //   return value.substring(0, 8);
            // }
          },
          axisPointer: {
            value: {
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
              // formatter: function(params) {
              //   return params.value.substring(0, 8);
              // }
            }
          }
        },
        yAxis: {
          offset: 6,
          name: "DO趋势对比",
          type: "value",
          min: 0,
          max: function(value) {
            return Number(value.max);
          },
          nameGap: 22,
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
            }
            // formatter: function(value, index) {
            //   let texts = [];
            //   if (value == 0) {
            //     texts.push("");
            //   } else if (value == 1) {
            //     texts.push("Ⅰ");
            //   } else if (value == 2) {
            //     texts.push("Ⅱ");
            //   } else if (value == 3) {
            //     texts.push("Ⅲ");
            //   } else if (value == 4) {
            //     texts.push("Ⅳ");
            //   } else if (value == 5) {
            //     texts.push("Ⅴ");
            //   } else if (value == 6) {
            //     texts.push("劣Ⅴ");
            //   }
            //   return texts;
            // }
          },
          splitLine: {
            show: false
          }
        },
        // dataZoom: [
        //   {
        //     show: true,
        //     height: 15,
        //     // xAxisIndex: [0],
        //     bottom: 10,
        //     start: 0,
        //     end: 100,
        //     // zoomLock: true,
        //     handleStyle: {
        //       color: "#5B3AAE"
        //     }
        //   },
        //   {
        //     type: "inside",
        //     zoomLock: true,
        //     show: true,
        //     height: 15,
        //     start: 0,
        //     end: 100
        //   }
        // ],
        series: [
          {
            // markLine: {
            //   silent: true,
            //   symbolSize: 6,
            //   lineStyle: {
            //     normal: {
            //       type: "dashed"
            //     }
            //   },
            //   data: [
            //     {
            //       // 水质目标基线值
            //       yAxis: 2,
            //       lineStyle: {
            //         width: 1,
            //         color: color[0]
            //       },
            //       value: {
            //         show: true,
            //         fontSize: "14",
            //         position: "insideEndTop",
            //         formatter: `水质目标 ${convert(2)}`,
            //         color: "#ff0000",
            //         distance: [-50, 20]
            //       }
            //     }
            //   ]
            // },
            yAxisIndex: 0,
            name: "LSTM",
            symbol: "none",
            data: [
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 5,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "溶解氧",
                title: "LSTM"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "",
                title: "LSTM"
              }
            ],
            type: "line",
            smooth: true,
            connectNulls: true,
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[0]
                // color: function(params) {
                //   if (params.data.value === 1) {
                //     return '#82D3F8'
                //   } else if(params.data.value === 2) {
                //     return '#00A7F0'
                //   } else if(params.data.value === 3) {
                //     return '#6FB602'
                //   } else if(params.data.value === 4) {
                //     return '#FFFF00'
                //   } else if(params.data.value === 5) {
                //     return '#F59B23'
                //   } else if(params.data.value === 6) {
                //     return '#D9021B'
                //   }
                // }
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "GRU",
            data: [
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "GRU"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[1]
              }
            }
          },
          {
            yAxisIndex: 0,
            name: "实测数据",
            data: [
              {
                date: "2020-01-18",
                value: 5,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 2,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 6,
                name: "溶解氧",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 4,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 3,
                name: "",
                title: "实测数据"
              },
              {
                date: "2020-01-18",
                value: 1,
                name: "",
                title: "GRU"
              }
            ],
            smooth: true,
            connectNulls: true,
            type: "line",
            symbol: "none",
            // barWidth: 10,
            lineStyle: {
              width: 2
            },
            itemStyle: {
              normal: {
                color: color[2]
              }
            }
          }
        ]
      };
    }
  },
  mounted() {
    this.updateChart();
  }
};
</script>

<style lang="scss"></style>
