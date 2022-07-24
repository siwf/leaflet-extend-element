 <!-- 综合达标率-->
<template>
  <basic-container>
    <basic-wrapper>
      <div class="ya-row row-title clearfix">
        <ya-radio
          :query="query"
          value-key="theme"
          title="主题:"
          :radio-op="themeOp"
          @updateQuery="initThemeSelectOp"
        />
      </div>
      <div class="ya-row clearfix">
        <select-single
          :query="query"
          value-key="monitorType"
          :select-op="monitorTypeOp"
          title="监测类型:"
          @updateQuery="updateQuery"
        />
        <select-single
          v-if="query.monitorType === 'auto'"
          :query="query"
          value-key="timeType"
          :select-op="timeTypeOp"
          title="时间"
          @updateQuery="updateQuery"
        />
        <ya-time
          :query="query"
          value-key="timeVal"
          :title="query.monitorType === 'auto' ? '' : '时间：'"
          :type="query.monitorType === 'auto' ? 'daterange' : 'monthrange'"
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
          :select-op="regionOp"
          @updateQuery="initSectionCode"
           :disabled="radio==='river'"
        >
          <template>
            <el-radio
              v-model="radio"
              label="region"
              style="margin-right: 10px;"
            >行政区:</el-radio>
          </template>
        </select-single>

        <select-multiply
          :query="query"
          value-key="sectionCode"
          title="断面"
          :select-op="sectionCodeOp"
          @updateQuery="updateQuery"
        />
      </div>
      <div class="ya-row clearfix ">
        <div style="height: 35px;" class="flex-center">
           <ya-search @refresh="refresh" />
        </div>
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
      <site-total :type="query.monitorType" :stationStatistics="stationStatistics"></site-total>
    </basic-wrapper>
    <basic-wrapper>
      <env-quality :waterEnv="waterEnv"></env-quality>
    </basic-wrapper>
    <water-type :waterObj="waterObj"></water-type>
  </basic-container>
</template>

<script>
import YaRadio from "@/components/Radio";
import SelectSingle from "@/components/SelectSingle";
import SelectMultiply from "@/components/SelectMultiply";
import YaTime from "@/components/TimePicker";
import YaCheckbox from "@/components/CheckBox";
import YaSearch from "@/components/ButtonSearch";
import SiteTotal from "./total";
import EnvQuality from "./env";
import WaterType from "./waterType";
import { waterTheme } from "@/api/waterAnalysis";

export default {
  name: "WaterAnalysis",
  components: {
    SelectSingle,
    YaRadio,
    YaTime,
    SelectMultiply,
    YaCheckbox,
    YaSearch,
    SiteTotal,
    EnvQuality,
    WaterType
  },
  data() {
    return {
      radio: 'river',
      query: {
        theme: null,
        monitorType: null,
        timeVal: [],
        timeType: [],
        waterTarget: null,
        riverLake: null,
        region: null,
        sectionCode: []
      },
      themeOp: [],
      monitorTypeOp: [],
      timeTypeOp: [],
      waterTargetOp: [],
      riverLakeOp: [],
      regionOp: [],
      sectionCodeOp: [],
      stationStatistics: {},
      waterEnv: {},
      waterObj: {}
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

          this.monitorTypeOp = data.monitorType.value;
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
      // 综合达标率业务id 是001
      const paramObj = {
        businessCode: "001"
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
          this.query.sectionCode = data[0] ? [ data[0].key] : []
          this.sectionCodeOp = data;
        }
        this.refreshDetail();
      });
    },
    // 综合达标率详情
    refreshDetail() {
      const url = "/getIntegratedSuccessRate";
      const { region, riverLake } = this.initReginRiverlake();
      const paramObj = {
        theme: this.query.theme,
        // endTime: this.query.timeVal[1],
        // startTime: this.query.timeVal[0],
        endTime: "2019-01",
        startTime: "2017-01",
        monitorType: this.query.monitorType,
        sectionCode: this.query.sectionCode,
        riverLake,
        region,
        waterTarget: this.query.waterTarget
      };
      waterTheme(url, paramObj).then(res => {
        const data = res.content;
        if (res.content) {
          this.stationStatistics = data.stationStatistics;
          this.waterEnv = data.waterEnv;
          this.waterObj = {
            waterGrede: data.waterGrede,
            mainPollutants: data.mainPollutants
          };
        }
      });
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
    }
  },
  created() {
    this.themeList();
  }
};
</script>

<style lang="scss"></style>
