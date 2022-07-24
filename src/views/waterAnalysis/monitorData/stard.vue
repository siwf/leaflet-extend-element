<template>
  <basic-container>
    <basic-wrapper>
      <div class="ya-row  row-title clearfix">
        <ya-radio
          :query="query"
          value-key="theme"
          title="主题:"
          :radio-op="themeOp"
          @updateQuery="initThemeSelectOp"
        />
      </div>
      <div class="ya-row clearfix">
        <!-- <select-single
          v-if="query.monitorType === 'auto'"
          :query="query"
          value-key="timeType"
          :select-op="timeTypeOp"
          title="时间"
          @updateQuery="updateQuery"
        /> -->
        <ya-time
          :query="query"
          value-key="timeVal"
          title="时间："
          type="monthrange"
          @updateQuery="updateQuery"
        />

        <select-single
          :query="query"
          value-key="riverLake"
          title=""
          :select-op="riverLakeOp"
          @updateQuery="initSectionCode"
          :disabled="radio === 'region'"
        >
          <el-radio v-model="radio" label="river" style="margin-right: 10px;">河流/湖库:</el-radio>
        </select-single>
        <select-single
          :query="query"
          value-key="region"
          title=""
          :disabled="radio === 'river'"
          :select-op="regionOp"
          @updateQuery="initSectionCode"
        >
          <template>
            <el-radio v-model="radio" label="region" style="margin-right: 10px;">行政区:</el-radio>
          </template>
        </select-single>
        <select-multiply
          :query="query"
          value-key="sectionCode"
          title="断面"
          :select-op="sectionCodeOp"
          @updateQuery="updateQuery"
        />
        <select-multiply
          :query="query"
          value-key="sectionCode"
          title="指标"
          :select-op="sectionCodeOp"
          @updateQuery="updateQuery"
        />
        <ya-checkbox
          :query="query"
          value-key="exceedFlag"
          title="结论"
          :selectOp="exceedFlagOp"
          @updateQuery="updateQuery"
        ></ya-checkbox>
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
            <div class="chart-desc">
        <!-- <div class="desc-left">对于结论的解释：</div> -->
        <div class="desc-right">
          对于结论的解释<br/>
          1、临界5%，定义为某指标的浓度均值与其目标限值相差5%，即达到临界状态。其取值范围为，目标限值≥浓度均值≥（0.95*目标限值）。<br />
          2、难以达标，定义为浓度均值＞目标限值。
        </div>
      </div>
    </basic-wrapper>
    <basic-wrapper>
      <!-- <zd-table v-if="query.monitorType === 'auto'" ref="table"></zd-table> -->
      <sg-table ref="table" url="/getSectionWaterQuality">
        <div class="excel-down-btn">
          <!-- <el-button v-if="showDown"  type="primary" icon="el-icon-upload2" plain size="mini" style="margin-right: 10px;">上传</el-button> -->
          <el-button
            type="primary"
            icon="el-icon-download"
            plain
            size="mini"
            :loading="loadingDown"
            @click="downLoadExcel"
            >下载</el-button
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
import SgTable from "./stardTable";
// import ZdTable from "../common/zdTable";
import { waterTheme } from "@/api/waterAnalysis";
import { downloadFile } from "@/utils";

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
    YaTime,
    SelectMultiply,
    YaCheckbox,
    YaSearch,
    SgTable,
    // ZdTable
  },
  data() {
    return {
      loadingDown: false,
      radio: "river",
      query: {
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
      param: {}
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
          this.query.monitorType = data.monitorType.value[0].key;
          this.query.exceedFlag = data.exceedFlag.value.map(v => v.key);

          this.monitorTypeOp = data.monitorType.value;
          this.riverLakeOp = data.riverLake.value;
          this.regionOp = data.region.value;
          this.waterTargetOp = data.waterTarget.value;
          this.exceedFlagOp = data.exceedFlag.value;
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
      const paramObj = {
        themeCode: this.query.theme,
        monitorType: this.query.monitorType,
        region: region,
        riverLake: riverLake
      };
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
    refreshDetail() {
      // 更新查询参数
      const paramObj = {
        endTime: "2019-01",
        exceedFlag: this.query.exceedFlag.join(","),
        frequency: this.frequency,
        monitorType: this.query.monitorType,
        sectionCode: this.query.sectionCode,
        startTime: "2018-01",
        waterTarget: this.query.waterTarget
      };
      this.$refs.table.refresh(paramObj);
    },
    // 特殊处理行政区和湖库互斥关系
    initReginRiverlake() {
      let region = null;
      let riverLake = null;
      // 河流湖库和行政区是互斥的
      // debugger
      if (this.radio === "region") {
        region = this.query.region;
      }
      if (this.radio === "river") {
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
    this.themeList();
  },
  watch: {
    frequency: function(n, o) {
      this.refreshDetail();
    }
  }
};
</script>
