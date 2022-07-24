<template>
  <div class="map-popup">
    <div class="map-popup--header">
      <p class="popup-name">{{ baseinfoObj.staName  }}</p>
      <span class="popup-time">更新时间：{{ baseinfoObj.updateTime }}</span>
    </div>
    <ul class="map-popup--desc clearfix">
      <li class="popup-desc--item">
        <span class="desc-label">所属河流：</span>
        <span class="desc-value">{{ baseinfoObj.rlName }}</span>
      </li>
      <li class="popup-desc--item">
        <span class="desc-label">所在区域：</span>
        <span class="desc-value">{{ baseinfoObj.areaName  }}</span>
      </li>
      <li class="popup-desc--item">
        <span class="desc-label">设置单位：</span>
        <span class="desc-value">{{ baseinfoObj.unitName  }}</span>
      </li>
    </ul>
     <div class="map-table-wrapper" style="margin-top: 4px;">
       <p class="chart-title">水质监测数据</p>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column show-overflow-tooltip prop="cod" label="化学需氧量(mg/L)" align="center">
        </el-table-column>
        <el-table-column  prop="anitrogen" label="氨氮(mg/L)" align="center">
        </el-table-column>
        <el-table-column  prop="tp" label="总磷(mg/L)" align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPointDetailInfoNcwsz } from "@/api/waterMap";
export default {
  props: {
    popupData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      query: {
        staCode: null
      },
      baseinfoObj: {
        staName: null,
        unitName: null,
        updateTime: null,
        rlName: null,
        areaName: null
      }
    }
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
      getPointDetailInfoNcwsz(this.query.staCode).then(res => {
        if (res.content) {
          const data = res.content;
          this.tableData = []
          this.baseinfoObj = {
            staName: data.staName,
            unitName: data.unitName,
            updateTime: data.updateTime,
            rlName: data.rlName,
            areaName: data.areaName
          };
          const obj = {
            cod: data.cod,
            tp: data.tp,
            anitrogen: data.anitrogen
          }
          this.tableData.push(obj)
        }
      });
    },
  }
}
</script>
<style lang="scss">

</style>

<style lang="scss" scoped>

.map-popup-pwk {
  color: #333333;
  padding: 6px 0;
  border-bottom: 1px solid #D9D9D9;
}
.popup-select {
  margin-left: auto;
  display: flex;
  align-items: center;
}
// .desc--item {
//   height: 20px;
//   line-height: 20px;
// }
.chart-title {
  margin: 10px 0;
  font-size: 14px;
  font-weight: bold;
}
</style>