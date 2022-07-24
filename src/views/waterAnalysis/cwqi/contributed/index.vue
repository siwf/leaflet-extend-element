<template>
  <basic-container>
    <div style="background:#F4F6F8; ">
      <basic-wrapper>
        <div class="ya-row row-title clearfix">
          <time-jd
            :query="query"
            startKey="startVal"
            endKey="endVal"
            startJdKey="startJdVal"
            endJdKey="endJdVal"
            timeVal="timeVal"
            @updateQuery="updateQuery"
            radio="radio"
          ></time-jd>
        </div>
        <div class="ya-row clearfix">
          <ya-checkbox
            :query="query"
            value-key="exceedFlag"
            title="断面类型"
            :selectOp="exceedFlagOp"
            @updateQuery="updateQuery"
          ></ya-checkbox>
          <select-single
            :query="query"
            value-key="riverLake"
            title=""
            :select-op="riverLakeOp"
            :disabled="radio === 'region'"
          >
            <el-radio v-model="radio" label="river" style="margin-right: 10px;"
              >河流/湖库:</el-radio
            >
          </select-single>
          <select-single
            :query="query"
            value-key="region"
            title=""
            :disabled="radio === 'river'"
            :select-op="regionOp"
          >
            <template>
              <el-radio v-model="radio" label="region" style="margin-right: 10px;"
                >行政区:</el-radio
              >
            </template>
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
        <div class="chart-title">各指标对CWQI的贡献率</div>
        <div class="city-chart">
          <ChartMap
            chart-id="city-single1"
            :chart-op="chartOp"
            :style="{ width: '100%', height: '100%' }"
          />
        </div>
        <!-- <div class="chart-desc">
          <div class="desc-left">说明：</div>
          <div class="desc-right">
            1、水质指数CWQI默认按由小到大的顺序进行排名，CWQI值越小说明城市地表水环境质量状况越好。<br />
            2、用ΔCWQI表征城市水质综合指数与去年同期水质综合指数变化率，按照ΔCWQI从小到大的顺序排名，ΔCWQI值越小表明该断面水质改善程度越高。ΔCWQI为负值，说明该城市国家地表水考核断面水环境
            质量变好；ΔCWQI为正值，说明该城市国家地表水考核断面水环境质量变差。
          </div>
        </div> -->
      </basic-wrapper>
      <basic-wrapper>
        <!-- <zd-table v-if="query.monitorType === 'auto'" ref="table"></zd-table> -->
        <table-com ref="table" url="/getSectionWaterQuality">
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
        </table-com>
      </basic-wrapper>
    </div>
  </basic-container>
</template>

<script>
import YaRadio from "@/components/Radio";
import TimeJd from "@/components/TimeJd";
import SelectSingle from "@/components/SelectSingle";
import SelectMultiply from "@/components/SelectMultiply";
import YaCheckbox from "@/components/CheckBox";
import YaSearch from "@/components/ButtonSearch";
// import SgTable from "../common/sgTable";
// import ZdTable from "../common/zdTable";
import TableCom from './table'
import { downloadFile } from "@/utils";
import ChartMap from "@/components/AllChart";
import { objArrtransArr } from "@/utils/";

export default {
  props: {
    // 单次多次
    frequency: {
      type: String,
      default: "0"
    }
  },
  components: {
    SelectSingle,
    YaRadio,
    TimeJd,
    SelectMultiply,
    YaCheckbox,
    YaSearch,
    // SgTable,
    TableCom,
    // ZdTable,
    ChartMap
  },
  data() {
    return {
      loadingDown: false,
      radio: "river",
      query: {
        startVal: "",
        endVal: "",
        startJdVal: "",
        endJdVal: "",
        timeVal: [],
        radio: "jd",
        exceedFlag: ["国控", "省控"]
      },
      riverLakeOp: [],
      regionOp: [],
      sectionCodeOp: [],
      exceedFlagOp: [
        {
          value: "国控",
          key: "国控"
        },
        {
          value: "省控",
          key: "省控"
        },
        {
          value: "省控小流域",
          key: "省控小流域"
        },
        {
          value: "河长办",
          key: "河长办"
        }
      ],
      param: {},
      chartOp: {}
      // themeArr: []
    };
  },
  methods: {
    updateQuery(val) {
      this.refreshDetail();
    },
    refresh() {
      this.refreshDetail();
    },
    // 断面水质评价详情
    refreshDetail() {
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
      // this.$refs.table.refresh(paramObj);
    },
    // 特殊处理行政区和湖库互斥关系
    initReginRiverlake() {
      let region = null;
      let riverLake = null;
      // 河流湖库和行政区是互斥的
      if (this.checked && !this.disabled) {
        region = this.query.region;
      } else {
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
    }
  },
  created() {
    // this.themeList();
  },
  mounted() {
    const waterGrede = [
      {
        waterGrade: "Ⅲ类",
        accord: 6,
        percentage: "40"
      },
      {
        waterGrade: "Ⅰ-Ⅱ类",
        accord: 0,
        percentage: "0"
      },
      {
        waterGrade: "Ⅳ类",
        accord: 8,
        percentage: "53.33"
      },
      {
        waterGrade: "Ⅴ类",
        accord: 1,
        percentage: "6.67"
      },
      {
        waterGrade: "劣Ⅴ类",
        accord: 0,
        percentage: "0"
      }
    ];
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
        type: "scroll",
        right: "30%",
        bottom: 40,
        orient: "vertical",
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
  background: #fffaed;
  border-radius: 4px;
  line-height: 24px;
}
</style>
