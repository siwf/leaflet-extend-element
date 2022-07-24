<template>
  <basic-container>
    <basic-wrapper>
      <div class="ya-row row-title clearfix">

        <data-time
        :query="query"
        dateVal="dataTime"
        timeVal="timeVal"
        @updateQuery="updateQuery"
        radio="radio"
      ></data-time>
<!--        <ya-time-->
<!--          :query="query"-->
<!--          value-key="timeVal"-->
<!--          title="时间："-->
<!--          :disabled=" radioPicker = 'startEnd' "-->
<!--          type="monthrange"-->
<!--          :emptyDate="true"-->
<!--          :clearAble="true"-->
<!--          @updateQuery="updateQuery"-->
<!--        ></ya-time>-->
        <ya-checkbox
          :query="query"
          value-key="exceedFlag"
          :selectOp="exceedFlagOp"
          title="断面类型"
          @updateQuery="updateChange"
        ></ya-checkbox>
      </div>
      <div class="ya-row clearfix">
        <select-single
          :query="query"
          value-key="region"
          title=""
          :disabled="radio==='river'"
          :select-op="regionOp"
          @updateQuery="updateChange"
        >
          <template>
            <el-radio
              v-model="radio"
              label="region"
              style="margin-right: 10px;"
              @change="updateChange"
            >行政区:</el-radio>
          </template>
        </select-single>
        <select-single
          :query="query"
          value-key="riverLake"
          title=""
          :select-op="riverLakeOp"
          @updateQuery="updateChange"
          :disabled="radio==='region'"
        >
          <el-radio
            v-model="radio"
            label="river"
            style="margin-right: 10px;"
            @change="updateChange"
          >河流/湖库:</el-radio>
        </select-single>
        <select-multiply
          :query="query"
          value-key="sectionCode"
          title="断面"
          :select-op="sectionCodeOp"
          @updateQuery="updateQuery"
        />
        <ya-search @refresh="refresh" />
      </div>
    </basic-wrapper>
    <basic-wrapper>
      <div class="chart-desc">
        <div class="desc-left">说明：</div>
        <div class="desc-right">
          1、水质指数CWQI默认按由小到大的顺序进行排名，CWQI值越小说明城市地表水环境质量状况越好。<br>
          2、用ΔCWQI表征城市水质综合指数与去年同期水质综合指数变化率，按照ΔCWQI从小到大的顺序排名，ΔCWQI值越小表明该断面水质改善程度越高。ΔCWQI为负值，说明该城市国家地表水考核断面水环境
              质量变好；ΔCWQI为正值，说明该城市国家地表水考核断面水环境质量变差。
        </div>
      </div>
    </basic-wrapper>
    <basic-wrapper>
      <!-- <zd-table v-if="query.monitorType === 'auto'" ref="table"></zd-table> -->
      <sg-table ref="table" url="/selectSectionWqiTHb">
        <div class="excel-down-btn">
          <!-- <el-button v-if="showDown"  type="primary" icon="el-icon-upload2" plain size="mini" style="margin-right: 10px;">上传</el-button> -->
          <el-button
            type="primary"
            icon="el-icon-download"
            plain
            size="mini"
            :loading="loadingDown"
            @click="downLoadExcel"
            >导出</el-button
          >
        </div>
      </sg-table>
    </basic-wrapper>
  </basic-container>
</template>

<script>
import YaRadio from "@/components/Radio";
import SelectSingle from "@/components/SelectSingle";
import SelectMultiply from "@/components/SelectMultiply";
import YaTime from "@/components/TimePicker";
import YaCheckbox from "@/components/CheckBox";
import YaSearch from "@/components/ButtonSearch";
import SgTable from "./table";
// import ZdTable from "../../common/zdTable";
import { waterTheme } from "@/api/waterAnalysis";
import { downloadFile } from "@/utils";
import echarts from "echarts";
import {getLastUpdateTime} from "../../../../api/dataTable";
import * as dayjs from 'dayjs'
import DataTime from '@/components/dataTime';
// import ChartMap from "@/components/AllChart";

export default {
  props: {
    // 单次多次
    frequency: {
      type: String,
      default: "1"
    }
  },
  components: {
    SelectSingle,
    YaRadio,
    YaTime,
    SelectMultiply,
    YaCheckbox,
    YaSearch,
    SgTable,
    DataTime
    // ZdTable,
    // ChartMap
  },
  data() {
    return {
      loadingDown: false,
      radio: 'river',
      query: {
        dataTime: "",
        radio: "jd",
        theme: null,
        monitorType: null,
        timeVal: [],
        timeType: [],
        waterTarget: null,
        riverLake: null,
        region: null,
        sectionCode: [],
        exceedFlag: []
      },
      themeOp: [],
      monitorTypeOp: [],
      timeTypeOp: [],
      waterTargetOp: [],
      riverLakeOp: [],
      regionOp: [],
      sectionCodeOp: [],
      exceedFlagOp: [],
      param: {},
      chartOp: {},
      endTime:'',
      startTime:''
      // themeArr: []
    };
  },
  methods: {
    updateChange(e){
      this.initSectionCode();
    },
    updateQuery(val) {
      this.refreshDetail();
    },
    refresh() {
      this.refreshDetail();
    },
    // 根据主题去查下拉列表
    initThemeSelectOp() {
      const url = "/tBusinessWaterTheme/getTheme";
      const paramObj = {
        // themeCode: this.query.theme
        themeCode: 'dbs'
      };
      waterTheme(url, paramObj).then(res => {
        const data = res.content;
        if (data) {
          // 初始化下拉列表
          this.query.riverLake = data.riverLake.value[1].value;
          this.query.region = data.region.value[1].value;
          // this.query.waterTarget = data.waterTarget.value[0].value;
          // this.query.monitorType = data.monitorType.value[0].value;
          data.sectionType.value.length = 2;
          data.sectionType.value.map(v => {
            this.query.exceedFlag.push(v.value);
          });
          // this.monitorTypeOp = data.monitorType.value;
          // this.query.exceedFlag = data.sectionType.value.map( (e) => e.value)
          this.riverLakeOp = data.riverLake.value;
          this.regionOp = data.region.value;
          // this.waterTargetOp = data.waterTarget.value;
          this.exceedFlagOp = data.sectionType.value;
          this.initSectionCode();
        }
      });
    },
    // 主题名称列表
    themeList() {
      const url = "/tBusinessWaterTheme/getThemeNames";
      // 断面水质评价业务id 是002
      const paramObj = {
        businessCode: "002"
      };
      waterTheme(url, paramObj).then(res => {
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
      // const paramObj = {
      //   themeCode: this.query.theme,
      //   monitorType: this.query.monitorType,
      //   region: region,
      //   riverLake: riverLake
      // };
      let paramObj = {
        region:region,
        riverLake:riverLake,
        controlLevel: this.query.exceedFlag
      }
      waterTheme(url, paramObj).then(res => {
        const data = res.content;
        if (res.content) {
          this.query.sectionCode = data[0] ? [data[0].key] : [];
          this.sectionCodeOp = data;
        }
        this.refreshDetail();
      });
    },
    // 断面水质评价详情
    refreshDetail(val) {
      // 更新查询参数
      // const paramObj = {
      //   endTime: "2019-01",
      //   exceedFlag: this.query.exceedFlag.join(","),
      //   frequency: this.frequency,
      //   monitorType: this.query.monitorType,
      //   sectionCode: this.query.sectionCode,
      //   startTime: "2018-01",
      //   waterTarget: this.query.waterTarget
      // };
      let choiceEnd = this.query.timeVal[1]
      let choiceStart = this.query.timeVal[0]
      if (choiceStart=='' && choiceEnd=='' && this.query.dataTime == '') {
        let paramObj = {
          // 默认日期
          "endTime": this.endTime,
          "sectionCodes":this.query.sectionCode,
          "startTime": this.startTime
        }
        this.$refs.table.refresh(paramObj);
      } else if (this.query.timeVal !== []) {
          let paramObj = {
            // 时间段
            "endTime": choiceEnd,
            "sectionCodes": this.query.sectionCode,
            "startTime": choiceStart
          }
          this.$refs.table.refresh(paramObj);
      } else if (this.query.dataTime !== '' && choiceStart=='' && choiceEnd=='') {
        let paramObj = {
         // 时间点
          'dataTime': this.query.dataTime,
          "sectionCodes": this.query.sectionCode
        }
        this.$refs.table.refresh(paramObj);
      }
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
    // excelDownlaod
    downLoadExcel() {
      const url = "/getSectionWaterQualityForExcel";
      const paramObj = {
        endTime: "2019-01",
        exceedFlag: this.query.exceedFlag.join(","),
        frequency: this.frequency,
        monitorType: this.query.monitorType,
        sectionCode: this.query.sectionCode,
        startTime: "2018-01",
        waterTarget: this.query.waterTarget
      };
      this.loadingDown = true;
      const promise = this.$refs.table.downLoadExcel(url, paramObj);
      promise.then(res => {
        downloadFile(res, "断面水质评价", "xlsx");
        this.loadingDown = false;
      });
    },
    getLastDateTime(){
      let url = '/selectLastUpdateTime'
      getLastUpdateTime(url).then(res =>{
        let getDate = res.content.lastUpdateTime
        this.endTime = getDate
        this.startTime = dayjs(getDate).subtract(6,'month').format('YYYY-MM');
      })
    },
  },
  created() {
    this.themeList();
   this.getLastDateTime();
  },
  mounted() {
    this.chartOp = {
      backgroundColor: "#ffffff",
      grid: {
        top: "10%",
        bottom: "10%",
        left: "5%",
        right: "3%"
      },
      legend: {
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
            title: "折线图",
            icon:
              "path://M1.33333333,0 C1.425,0 1.5,0.0767045455 1.5,0.170454545 L1.5,0.170454545 L1.5,13.4659091 L15.8333333,13.4659091 C15.925,13.4659091 16,13.5426136 16,13.6363636 L16,13.6363636 L16,14.8295455 C16,14.9232955 15.925,15 15.8333333,15 L15.8333333,15 L0.166666667,15 C0.075,15 0,14.9232955 0,14.8295455 L0,14.8295455 L0,0.170454545 C0,0.0767045455 0.075,0 0.166666667,0 L0.166666667,0 Z M14.862059,3.04786061 C14.9283365,2.98404646 15.0373736,2.98404646 15.103651,3.04786061 L15.103651,3.04786061 L15.9502919,3.86303485 C16.0165694,3.92684899 16.0165694,4.03183355 15.9502919,4.0956477 L15.9502919,4.0956477 L10.0622893,9.76275548 C9.99601184,9.82656962 9.88697476,9.82656962 9.82069731,9.76275548 L9.82069731,9.76275548 L7.09263218,7.11961476 L4.13580298,9.95213939 C4.06738755,10.0159535 3.96048845,10.0159535 3.894211,9.95213939 L3.894211,9.95213939 L3.04970808,9.13490663 C2.98343064,9.07109249 2.98343064,8.96610793 3.04970808,8.90229378 L3.04970808,8.90229378 L6.97931913,5.14137627 C7.04559658,5.07756212 7.15463366,5.07756212 7.22091111,5.14137627 L7.22091111,5.14137627 L9.94470027,7.78039994 Z",
            onclick: () => {
              // console.log(this.chartOp.)
              const series = this.chartOp.series;
              series.map(v => {
                v.type = "line";
                v.smooth = true;
                v.symbolSize = 0;
                v.lineStyle.width = 4;
              });
            }
          },
          myTool2: {
            show: true,
            title: "柱状图",
            icon:
              "path://M1.33333333,0 C1.425,0 1.5,0.0767045455 1.5,0.170454545 L1.5,0.170454545 L1.5,13.4659091 L15.8333333,13.4659091 C15.925,13.4659091 16,13.5426136 16,13.6363636 L16,13.6363636 L16,14.8295455 C16,14.9232955 15.925,15 15.8333333,15 L15.8333333,15 L0.166666667,15 C0.075,15 0,14.9232955 0,14.8295455 L0,14.8295455 L0,0.170454545 C0,0.0767045455 0.075,0 0.166666667,0 L0.166666667,0 Z M4.33333333,8.53846154 C4.425,8.53846154 4.5,8.61634615 4.5,8.71153846 L4.5,8.71153846 L4.5,11.8269231 C4.5,11.9221154 4.425,12 4.33333333,12 L4.33333333,12 L3.16666667,12 C3.075,12 3,11.9221154 3,11.8269231 L3,11.8269231 L3,8.71153846 C3,8.61634615 3.075,8.53846154 3.16666667,8.53846154 L3.16666667,8.53846154 Z M7.5,4.73076923 C7.59166667,4.73076923 7.66666667,4.80865385 7.66666667,4.90384615 L7.66666667,4.90384615 L7.66666667,11.8269231 C7.66666667,11.9221154 7.59166667,12 7.5,12 L7.5,12 L6.33333333,12 C6.24166667,12 6.16666667,11.9221154 6.16666667,11.8269231 L6.16666667,11.8269231 L6.16666667,4.90384615 C6.16666667,4.80865385 6.24166667,4.73076923 6.33333333,4.73076923 L6.33333333,4.73076923 Z M10.6666667,6.41826923 C10.7583333,6.41826923 10.8333333,6.49615385 10.8333333,6.59134615 L10.8333333,6.59134615 L10.8333333,11.8269231 C10.8333333,11.9221154 10.7583333,12 10.6666667,12 L10.6666667,12 L9.5,12 C9.40833333,12 9.33333333,11.9221154 9.33333333,11.8269231 L9.33333333,11.8269231 L9.33333333,6.59134615 C9.33333333,6.49615385 9.40833333,6.41826923 9.5,6.41826923 L9.5,6.41826923 Z M13.8333333,3 C13.925,3 14,3.07788462 14,3.17307692 L14,3.17307692 L14,11.8269231 C14,11.9221154 13.925,12 13.8333333,12 L13.8333333,12 L12.6666667,12 C12.575,12 12.5,11.9221154 12.5,11.8269231 L12.5,11.8269231 L12.5,3.17307692 C12.5,3.07788462 12.575,3 12.6666667,3 L12.6666667,3 Z",
            onclick: () => {
              // console.log(this.chartOp.)
              const series = this.chartOp.series;
              series.map(v => {
                v.type = "bar";
                v.barWidth = 20;
              });
            }
          },
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
        // name: '超标因子',
        boundaryGap: true,
        // nameLocation: "right",
        nameTextStyle: {
          padding: [6, 5, 6, 0],
          fontSize: "12",
          verticalAlign: "middle"
          // fontWeight: "bold"
        },
        data: [
          '2020-01',
          '2020-01',
          '2020-01',
          '2020-01',
          '2020-01',
        ],
        axisLabel: {
          show: true,
          fontSize: 12,
          color: "#333333"
        }
      },
      yAxis: {
        type: "value",
        name: "CWQI",
        // nameGap: 40,
        // boundaryGap: false,
        // nameLocation: "start",
        nameTextStyle: {
          // padding: [6, 5, 6, 0],
          fontSize: "12",
          color: '#333333',
          verticalAlign: "center",
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
          data: [
            {
              name: '2020-01',
              value: 1
            },
            {
              name: '2020-01',
              value: 1
            },
            {
              name: '2020-01',
              value: 1
            },
            {
              name: '2020-01',
              value: 1
            },
            {
              name: '2020-01',
              value: 1
            },
            {
              name: '2020-01',
              value: 1
            },
          ],
          lineStyle: {
                width: 1
          },
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
  },
  watch: {
    frequency: function(n, o) {
      this.refreshDetail();
    }
  }
};
</script>

<style lang="scss" scoped>
.city-chart {
  height: 339px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
}
.chart-title {
  font-size: 16px;
  font-weight: 500;
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.desc-left {
  width: 60px;
}
.chart-desc {
  margin-top: 10px;
  font-size: 12px;
  display: flex;
  padding: 4px;
  background: #FFFAED;
  border-radius: 4px;
  line-height: 24px;
}
</style>
