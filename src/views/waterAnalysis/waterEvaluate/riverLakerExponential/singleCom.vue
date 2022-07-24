<template>
  <div style="background:#F4F6F8; ">
    <basic-wrapper>
      <div class="ya-row  row-title clearfix">
        <ya-radio
          :query="query"
          value-key="theme"
          title="主题:"
          :radio-op="themeOp"
          @updateQuery="initThemeSelectOp"
        />
         <ya-checkbox :query="query" title="控制级别" value-key="controlLevel" :selectOp="controlLevelOp" @updateQuery="updateQuery"></ya-checkbox>
      </div>
      <div class="ya-row clearfix">
        <select-single
          :query="query"
          value-key="riverLake"
          title="河流/湖库:"
          :select-op="riverLakeOp"
          @updateQuery="initSectionCode"
        >
        </select-single>
        <ya-time
          :query="query"
          value-key="timeVal"
          title="时间："
          :emptyDate="true"
          :clearAble="true"
          type="monthrange"
          @updateQuery="updateQuery"
        />
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
      <!-- <zd-table v-if="query.monitorType === 'auto'" ref="table"></zd-table> -->
      <sg-table :url="'/getLakeNutritionWaterQuality'" ref="table">
        <div class="excel-down-btn">
        <!-- <el-button v-if="showDown"  type="primary" icon="el-icon-upload2" plain size="mini" style="margin-right: 10px;">上传</el-button> -->
        <el-button type="primary" icon="el-icon-download" plain size="mini" :loading="loadingDown" @click="downLoadExcel" >下载</el-button>
      </div>
      </sg-table>
    </basic-wrapper>
  </div>

  <!-- <title-name title="站点统计"></title-name> -->
  <!-- <title-name title="水环境质量"></title-name> -->
</template>

<script>
import YaRadio from "@/components/Radio";
import SelectSingle from "@/components/SelectSingle";
import SelectMultiply from "@/components/SelectMultiply";
import YaTime from "@/components/TimePicker";
import YaCheckbox from "@/components/CheckBox";
import YaSearch from "@/components/ButtonSearch";
import SgTable from "./sgTable";
// import ZdTable from "./zdTable";
import  { waterTheme } from '@/api/waterAnalysis'
import { downloadFile } from "@/utils";

export default {
    props: {
        // 单次多次
    frequency: {
      type: String,
      default: '0'
    },
  },
  components: {
    SelectSingle,
    YaRadio,
    YaTime,
    SelectMultiply,
    YaCheckbox,
    YaSearch,
    SgTable,
    // ZdTable
  },
  data() {
    return {
      disabled: true,
      checked: false,
      loadingDown: false,
      query: {
        theme: null,
        timeVal: [],
        waterTarget: null,
        riverLake: null,
        sectionCode: [],
        controlLevel: []
      },
      themeOp: [],
      waterTargetOp: [],
      riverLakeOp: [],
      sectionCodeOp: [],
      controlLevelOp: []
    };
  },
  methods: {
    updateQuery(val) {
      this.refreshDetail()
    },
    refresh() {
      this.$refs.table.refresh()
    },
    // 根据主题去查下拉列表
    initThemeSelectOp() {
      const url = '/tBusinessWaterTheme/getTheme'
      const paramObj = {
        themeCode: this.query.theme
      }
      waterTheme(url, paramObj).then(res => {
        const data = res.content;
        if (res.content) {
          // 初始化下拉列表
          this.query.riverLake = data.riverLake.value[0].key
          this.query.waterTarget = data.waterTarget.value[0].key
          this.query.controlLevel = data.controlLevel.value.map(v => v.key)

          this.riverLakeOp = data.riverLake.value;
          this.waterTargetOp = data.waterTarget.value
          this.controlLevelOp = data.controlLevel.value
          this.initSectionCode()
        }
      })
    },
    // 主题名称列表
    themeList() {
      const url = '/tBusinessWaterTheme/getThemeNames'
      // 断面水质评价业务id 是002
      const paramObj = {
        businessCode: '009'
      }
      waterTheme(url, paramObj).then(res => {
        this.themeOp = res.content;
        // 默认选中第一个
        this.query.theme = this.themeOp[0].key;
        this.initThemeSelectOp()
      })
    },
    // 断面下拉
    initSectionCode() {
      const url = '/tBaseWaterSection/getSections'
      const paramObj = {
        themeCode: this.query.theme,
        // monitorType: this.query.monitorType,
        riverLake: this.query.riverLake
      }
      waterTheme(url, paramObj).then(res => {
        const data = res.content;
        if (res.content) {
          this.query.sectionCode = [data[0].key]
          this.sectionCodeOp = data
        }
        this.refreshDetail()
      })
    },
    // 断面水质评价详情
    refreshDetail() {
      // const paramObj= {
      //   "endTime": '2019-01',
      //   "frequency": '0',
      //   "controlLevel": this.query.controlLevel,
      //   "sectionCode": this.query.sectionCode,
      //   "startTime": '2018-01',
      //   "waterTarget": this.query.waterTarget
      //   }
      let paramObj = {
        // "monitorType":"manual",
        "waterTarget":this.query.waterTarget,
        // "exceedFlag":"",
        "sectionCode":this.query.sectionCode,
        "frequency":"0",
        "startTime":this.query.timeVal[0],
        "endTime":this.query.timeVal[1]
      }
        console.log(paramObj)
      this.$refs.table.refresh(paramObj)
    },
    // excelDownlaod
    downLoadExcel() {
      const url = '/getRiverLakeWaterQualityForExcel';
      const paramObj= {
        "endTime": '2019-01',
        "frequency": '0',
        "controlLevel": this.query.controlLevel,
        "sectionCode": this.query.sectionCode,
        "startTime": '2018-01',
        "waterTarget": this.query.waterTarget
        }
      this.loadingDown = true
      const promise = this.$refs.table.downLoadExcel(url, paramObj)
      promise.then(res => {
        downloadFile(res, "河流湖库水质评价", "xlsx");
        this.loadingDown = false;
      })
    }
  },
  created() {
    this.themeList();
  }
};
</script>
