<template>
  <basic-container>
    <basic-wrapper>
      <div class="ya-row mr-b-10 row-title clearfix">
        <ya-radio
          :query="query"
          value-key="theme"
          title="主题:"
          :radio-op="themeOp"
          @updateQuery="updateQuery"
        />
      </div>
      <div class="ya-row mr-b-10 clearfix">
        <year-time
          start-key="startTime"
          end-key="endTime"
          mounth-key="mounth"
          :query="query"
          @updateQuery="updateQuery"
        />
        <select-single
          :query="query"
          value-key="riverLake"
          title=""
          :select-op="riverLakeOp"
          @updateQuery="initSectionCode"
          :disabled="radio==='region'"
        >
          <el-radio
            v-model="radio"
            label="river"
            style="margin-right: 10px;"
          >河流/湖库:</el-radio>
        </select-single>
        <select-single
          :query="query"
          value-key="region"
          title=""
          :disabled="radio==='river'"
          :select-op="regionOp"
          @updateQuery="initSectionCode"
        >
          <template>
            <el-radio
              v-model="radio"
              label="river"
              style="margin-right: 10px;"
            >行政区:</el-radio>
          </template>
        </select-single>
        <select-single
          :query="query"
          value-key="sectionCode"
          title="断面"
          :select-op="sectionCodeOp"
          @updateQuery="updateQuery"
        />
        <!-- <ya-checkbox :query="query" value-key="exceedFlag"></ya-checkbox> -->
        <ya-search @refresh="updateQuery" />
      </div>
    </basic-wrapper>
    <basic-wrapper>
      <div class="ya-row clearfix">
        <ya-radio
          :query="query"
          value-key="waterTarget"
          title="设定断面水质目标"
          :radio-op="waterTargetOp"
          @updateQuery="updateQuery"
        />
      </div>
    </basic-wrapper>
    <basic-wrapper>
      <div class="ya-row  row-title clearfix">
        <ya-radio
          :query="query"
          value-key="index"
          title="指标:"
          :radio-op="indexOp.slice(0, 5)"
          @updateQuery="updateNorm"
        />
        <select-single
          :query="query"
          value-key="otherIndex"
          :select-op="indexOp.slice(6)"
          title="其他指标"
          @updateQuery="updateOtherNorm"
        />
      </div>
    </basic-wrapper>
    <basic-wrapper>
      <div class="chart-wrapper">
        <div class="left-chart">
          <ChartMap
            chart-id="dm-year"
            :chart-op="chartOp"
            :style="{ width: '100%', height: '100%' }"
          />
        </div>
        <div class="right-info">
          <ul class="map-table--base">
            <li class="base-item">
              <p class="item-top">水质更好</p>
              <p class="chart-bottom">{{ sectionInfo.best }}</p>
            </li>
          </ul>
          <ul class="map-table--base">
            <li class="base-item">
              <p class="item-top">水质较差</p>
              <p class="chart-bottom">{{ sectionInfo.worst }}</p>
            </li>
          </ul>
        </div>
        <!-- <div class="right-info" v-else>
          <ul class="map-table--base">
            <li class="base-item">
              <p class="item-top">水质更好</p>
              <p class="chart-bottom">6、7、8月</p>
            </li>
          </ul>
          <ul class="map-table--base">
            <li class="base-item">
              <p class="item-top">水质较差</p>
              <p class="chart-bottom">1、11、12月</p>
            </li>
          </ul>
        </div> -->
      </div>
    </basic-wrapper>
    <basic-wrapper>
      <sg-table :url="'/getSectionWaterQualityPastYearsForList'" ref="table">

        <div class="excel-down-btn">
        <!-- <el-button v-if="showDown"  type="primary" icon="el-icon-upload2" plain size="mini" style="margin-right: 10px;">上传</el-button> -->
        <el-button type="primary" icon="el-icon-download" plain size="mini" :loading="loadingDown" @click="downLoadExcel" >下载</el-button>
      </div>
      </sg-table>
      <!-- <zd-table v-else></zd-table> -->
    </basic-wrapper>
  </basic-container>

  <!-- <title-name title="站点统计"></title-name> -->
  <!-- <title-name title="水环境质量"></title-name> -->
</template>

<script>
import echarts from "echarts";
import YaRadio from "@/components/Radio";
import SelectSingle from "@/components/SelectSingle";
import SelectMultiply from "@/components/SelectMultiply";
import YaTime from "@/components/TimePicker";
import YaCheckbox from "@/components/CheckBox";
import YaSearch from "@/components/ButtonSearch";
import YearTime from "@/components/TimeYear";
import SgTable from "../common/sgTable";
import ZdTable from "../common/zdTable";
import TitleName from "../common/siteTotal";
import ChartMap from "@/components/AllChart";
import { convert } from "@/utils";
import { waterTheme } from "@/api/waterAnalysis";
import { downloadFile } from "@/utils";
export default {
  name: "WaterAnalysis",
  components: {
    SelectSingle,
    YaRadio,
    YaTime,
    SelectMultiply,
    YaCheckbox,
    YaSearch,
    TitleName,
    YearTime,
    SgTable,
    ZdTable,
    ChartMap
  },
  data() {
    return {
      radio: 'river',
      loadingDown: false,
      chartOp: {},
      query: {
        theme: "",
        waterTarget: "",
        exceedFlag: [],
        mounth: "",
        region: "",
        riverLake: "",
        sectionCode: [],
        startTime: "",
        endTime: "",
        index: "",
        otherIndex: ""
      },
      themeOp: [],
      timeTypeOp: [],
      waterTargetOp: [],
      riverLakeOp: [],
      regionOp: [],
      sectionCodeOp: [],
      indexOp: [],
      sectionInfo: {},
      param: {}
    };
  },
  methods: {
    updateQuery(val) {
      this.refreshDetail();
    },
    updateNorm(val) {
      this.query.otherIndex = ""
      this.updateEchartData()
    },
    updateOtherNorm(val) {
      this.query.index = "";
      this.updateEchartData()
    },
    updateChart(data) {
      let yAxisName;
      const { sectionName, standard, indexName, indexData } = data;
      if (this.query.otherIndex) {
        yAxisName = this.indexOp.find(v => v.key === this.query.otherIndex).value;
      } else {
        yAxisName = this.indexOp.find(v => v.key === this.query.index).value;
      }
      const xData = indexData.map(v => v.date);
      const color = ["#3A85D3", "#5AD8A6", "#008000", "#5470c6", "#61a0a8"];
      if (indexName === "waterGrade") {
        this.chartOp = {
          backgroundColor: "#ffffff",
          grid: {
            top: "12%",
            bottom: "15%",
            left: "8%",
            right: "6%"
          },
          legend: {
            // icon: "roundRect",
            // data: ["断面1",],
            top: "0%",
            // x: "center",
            right: "10%",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              // color: "#333333",
              fontSize: "12"
            },
            show: false
          },
          // 图片下载，折线图，柱状图切换
          toolbox: {
            show: true,
            // width: 120,
            height: 12,
            top: "0%",
            feature: {
              // magicType: { type: ["line", "bar"] },
              // restore: {},
              myTool1: {
                show: true,
                title: '折线图',
                icon: 'path://M1.33333333,0 C1.425,0 1.5,0.0767045455 1.5,0.170454545 L1.5,0.170454545 L1.5,13.4659091 L15.8333333,13.4659091 C15.925,13.4659091 16,13.5426136 16,13.6363636 L16,13.6363636 L16,14.8295455 C16,14.9232955 15.925,15 15.8333333,15 L15.8333333,15 L0.166666667,15 C0.075,15 0,14.9232955 0,14.8295455 L0,14.8295455 L0,0.170454545 C0,0.0767045455 0.075,0 0.166666667,0 L0.166666667,0 Z M14.862059,3.04786061 C14.9283365,2.98404646 15.0373736,2.98404646 15.103651,3.04786061 L15.103651,3.04786061 L15.9502919,3.86303485 C16.0165694,3.92684899 16.0165694,4.03183355 15.9502919,4.0956477 L15.9502919,4.0956477 L10.0622893,9.76275548 C9.99601184,9.82656962 9.88697476,9.82656962 9.82069731,9.76275548 L9.82069731,9.76275548 L7.09263218,7.11961476 L4.13580298,9.95213939 C4.06738755,10.0159535 3.96048845,10.0159535 3.894211,9.95213939 L3.894211,9.95213939 L3.04970808,9.13490663 C2.98343064,9.07109249 2.98343064,8.96610793 3.04970808,8.90229378 L3.04970808,8.90229378 L6.97931913,5.14137627 C7.04559658,5.07756212 7.15463366,5.07756212 7.22091111,5.14137627 L7.22091111,5.14137627 L9.94470027,7.78039994 Z',
                onclick: () => {
                  // console.log(this.chartOp.)
                  const series = this.chartOp.series;
                  series.map(v => {
                    v.type = 'line'
                    v.smooth = true
                    v.symbolSize = 0
                    v.lineStyle.width = 4
                  })
                }
              },
              myTool2: {
                show: true,
                title: '柱状图',
                icon: 'path://M1.33333333,0 C1.425,0 1.5,0.0767045455 1.5,0.170454545 L1.5,0.170454545 L1.5,13.4659091 L15.8333333,13.4659091 C15.925,13.4659091 16,13.5426136 16,13.6363636 L16,13.6363636 L16,14.8295455 C16,14.9232955 15.925,15 15.8333333,15 L15.8333333,15 L0.166666667,15 C0.075,15 0,14.9232955 0,14.8295455 L0,14.8295455 L0,0.170454545 C0,0.0767045455 0.075,0 0.166666667,0 L0.166666667,0 Z M4.33333333,8.53846154 C4.425,8.53846154 4.5,8.61634615 4.5,8.71153846 L4.5,8.71153846 L4.5,11.8269231 C4.5,11.9221154 4.425,12 4.33333333,12 L4.33333333,12 L3.16666667,12 C3.075,12 3,11.9221154 3,11.8269231 L3,11.8269231 L3,8.71153846 C3,8.61634615 3.075,8.53846154 3.16666667,8.53846154 L3.16666667,8.53846154 Z M7.5,4.73076923 C7.59166667,4.73076923 7.66666667,4.80865385 7.66666667,4.90384615 L7.66666667,4.90384615 L7.66666667,11.8269231 C7.66666667,11.9221154 7.59166667,12 7.5,12 L7.5,12 L6.33333333,12 C6.24166667,12 6.16666667,11.9221154 6.16666667,11.8269231 L6.16666667,11.8269231 L6.16666667,4.90384615 C6.16666667,4.80865385 6.24166667,4.73076923 6.33333333,4.73076923 L6.33333333,4.73076923 Z M10.6666667,6.41826923 C10.7583333,6.41826923 10.8333333,6.49615385 10.8333333,6.59134615 L10.8333333,6.59134615 L10.8333333,11.8269231 C10.8333333,11.9221154 10.7583333,12 10.6666667,12 L10.6666667,12 L9.5,12 C9.40833333,12 9.33333333,11.9221154 9.33333333,11.8269231 L9.33333333,11.8269231 L9.33333333,6.59134615 C9.33333333,6.49615385 9.40833333,6.41826923 9.5,6.41826923 L9.5,6.41826923 Z M13.8333333,3 C13.925,3 14,3.07788462 14,3.17307692 L14,3.17307692 L14,11.8269231 C14,11.9221154 13.925,12 13.8333333,12 L13.8333333,12 L12.6666667,12 C12.575,12 12.5,11.9221154 12.5,11.8269231 L12.5,11.8269231 L12.5,3.17307692 C12.5,3.07788462 12.575,3 12.6666667,3 L12.6666667,3 Z',
                onclick: () => {
                  // console.log(this.chartOp.)
                  const series = this.chartOp.series;
                  series.map(v => {
                    v.type = 'bar'
                    v.barWidth = 20
                  })
                }
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
              let returnData = params[0].name + "</br>";
              for (let i = 0; i < params.length; i++) {
                // if (params[i].exceedStandard != "") {
                let indexColor = params[i].color;
                returnData +=
                  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:' +
                  indexColor +
                  '"></span>';
                returnData +=
                  (params[i].seriesName ? params[i].seriesName : "") +
                  " " +
                  (params[i].value ? convert(params[i].value) : "") +
                  " " +
                  (params[i].data.exceedStandard ? params[i].data.exceedStandard : "") +
                  "</br>";
                // }
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
                color: "#5B3AAE"
              }
            },
            {
              type: "inside",
              zoomLock: true,
              show: true,
              height: 15,
              start: 0,
              end: 100
            }
          ],
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
                    yAxis: standard,
                    lineStyle: {
                      width: 1,
                      color: "#FF0000"
                    },
                    label: {
                      show: true,
                      fontSize: "14",
                      position: "insideEndTop",
                      formatter: `水质目标 ${convert(standard)}`
                    }
                  }
                ]
              },
              yAxisIndex: 0,
              name: sectionName,
              data: indexData,
              type: "bar",
              connectNulls: true,
              barWidth: 20,
              lineStyle: {
                width: 1
              },
              itemStyle: {
                normal: {
                  color: color[1]
                }
              }
            }
          ]
        };
      } else {
        this.chartOp = {
          backgroundColor: "#ffffff",
          grid: {
            top: "12%",
            bottom: "15%",
            left: "8%",
            right: "6%"
          },
          legend: {
            // icon: "roundRect",
            // data: ["断面1",],
            top: "0%",
            // x: "center",
            right: "10%",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              // color: "#333333",
              fontSize: "12"
            },
            show: false
          },
          // 图片下载，折线图，柱状图切换
          toolbox: {
            show: true,
            // width: 120,
            height: 12,
            top: "0%",
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
            formatter: function(params) {
              let returnData = params[0].name + "</br>";
              for (let i = 0; i < params.length; i++) {
                let indexColor = params[i].color;
                returnData +=
                  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:' +
                  indexColor +
                  '"></span>';
                returnData +=
                  (params[i].seriesName ? params[i].seriesName : "") +
                  " " +
                  (params[i].value ? params[i].value : "") +
                  "</br>";
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
              margin: 8,
              formatter: function(value, index) {
                return value.substring(0, 8);
              }
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
                },
                formatter: function(params) {
                  return params.value.substring(0, 8);
                }
              }
            }
          },
          yAxis: {
            offset: 6,
            name: `${yAxisName}(mg/L)`,
            type: "value",
            min: 0,
            max: function(value) {
              if (standard > value.max) {
                return standard;
              } else {
                return Number(value.max);
              }
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
              },
              formatter: function(value, index) {
                return value;
              }
            },
            splitLine: {
              show: false
            }
          },
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
                color: "#5B3AAE"
              }
            },
            {
              type: "inside",
              zoomLock: true,
              show: true,
              height: 15,
              start: 0,
              end: 100
            }
          ],
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
              name: yAxisName,
              data: indexData,
              yAxisIndex: 0,
              markLine: {
                silent: true,
                lineStyle: {
                  normal: {
                    type: "dashed",
                    color: "red"
                  }
                },
                data: [
                  {
                    yAxis: standard,
                    lineStyle: {
                      width: 1
                    },
                    label: {
                      show: true,
                      position: "insideEndTop",
                      formatter: `许可限值 ${standard}`
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
                  )
                  // shadowColor: `#ff9a29`,
                  // shadowBlur: 10
                }
              }
            }
          ]
        };
      }
    },
    // 根据主题去查下拉列表
    initThemeSelectOp() {
      const url = "/tBusinessWaterTheme/getTheme";
      const paramObj = {
        themeCode: this.query.theme
      };
      waterTheme(url, paramObj).then(res => {
        const data = res.content;
        if (res.content) {
          // 初始化下拉列表
          this.query.riverLake = data.riverLake.value[0].key;
          this.query.region = data.region.value[0].key;
          this.query.waterTarget = data.waterTarget.value[0].key;
          this.query.index = data.index.value[0].key;

          this.indexOp = data.index.value;
          this.riverLakeOp = data.riverLake.value;
          this.regionOp = data.region.value;
          this.waterTargetOp = data.waterTarget.value;
          this.initSectionCode();
        }
      });
    },
    // 主题名称列表
    themeList() {
      const url = "/tBusinessWaterTheme/getThemeNames";
      // 历年同期业务id 是004
      const paramObj = {
        businessCode: "004"
      };
      waterTheme(url, paramObj).then(res => {
        console.log(res,"ewaewewq");
        this.themeOp = res.content;
        // 默认选中第一个
        this.query.theme = this.themeOp[0].key;
        this.initThemeSelectOp();
      });
    },
    // 断面下拉
    initSectionCode() {
      const url = "/tBaseWaterSection/getSections";
      const { region, riverLake } = this.initReginRiverlake();
      const paramObj = {
        themeCode: this.query.theme,
        // monitorType: this.query.monitorType,
        region: region,
        riverLake: riverLake
      };
      waterTheme(url, paramObj).then(res => {
        const data = res.content;
        if (res.content) {
          this.query.sectionCode = data[0].key;
          this.sectionCodeOp = data;
        }
        this.refreshDetail();
      });
    },
    // 历年同期详情
    refreshDetail() {
      this.updateEchartData()
      this.updateTableData()
    },
    // 特殊处理行政区和湖库互斥关系
    initReginRiverlake() {
      let region = null;
      let riverLake = null;
      // 河流湖库和行政区是互斥的
      // debugger
      if (this.radio === 'region') {
        region = this.query.region;
      }
      if (this.radio === 'river') {
        riverLake = this.query.riverLake;
      }
      return {
        region,
        riverLake
      };
    },
    // 只更新表格数据
    updateTableData() {
      const { region, riverLake } = this.initReginRiverlake();
      const paramObj = {
        endTime: this.query.endTime + "-" + this.query.mounth,
        startTime: this.query.startTime + "-" + this.query.mounth,
        sectionCode: [this.query.sectionCode],
        riverLake,
        region,
        waterTarget: this.query.waterTarget
      }
      this.$refs.table.refresh(paramObj)
    },
    // 只更新echarts数据
    updateEchartData() {
      const url = "/getSectionWaterQualityPastYears";
      const { region, riverLake } = this.initReginRiverlake();
      const paramObj = {
        theme: this.query.theme,
        endTime: this.query.endTime + "-" + this.query.mounth,
        startTime: this.query.startTime + "-" + this.query.mounth,
        sectionCode: [this.query.sectionCode],
        riverLake,
        region,
        index: this.query.index ? this.query.index : this.query.otherIndex,
        waterTarget: this.query.waterTarget
      };
      waterTheme(url, paramObj).then(res => {
        const data = res.content;
        if (res.content) {
          this.sectionInfo = {
            best: data[0].best,
            worst: data[0].worst
          };
          this.updateChart(data[0]);
        }
      });
    },
    // excelDownlaod
    downLoadExcel() {
      const url = '/getSectionWaterQualityPastYearsForListForExcel'
      const { region, riverLake } = this.initReginRiverlake();
      const paramObj = {
        endTime: this.query.endTime + "-" + this.query.mounth,
        startTime: this.query.startTime + "-" + this.query.mounth,
        sectionCode: [this.query.sectionCode],
        riverLake,
        region,
        waterTarget: this.query.waterTarget
      }
      this.loadingDown = true
      const promise = this.$refs.table.downLoadExcel(url, paramObj)
      promise.then(res => {
        downloadFile(res, "历年同期水质评价", "xlsx");
        this.loadingDown = false;
      })
    }
  },
  created() {
    this.themeList();
  }
};
</script>

<style lang="scss" scoped>
.right-info {
  flex: 1;
  height: 100%;
  margin-left: 20px;
}
.left-chart {
  width: 80%;
  height: 100%;
  padding: 0 10px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
}
.chart-wrapper {
  display: flex;
  align-items: center;
  height: 340px;
}
.chart-bottom {
  font-size: 14px;
  height: 38px;
  line-height: 38px;
  font-weight: bold;
  // background-color: #e0f0fb;
  text-align: center;
}
</style>
