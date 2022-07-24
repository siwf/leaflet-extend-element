<template>
  <div class="map-table">
    <div class="map-table--top">
      <p class="top-left">地表水</p>
      <div class="top-right">
        <span class="title-label">数据更新时间：</span>
        <span class="title-value">{{ baseInfoObj.updateTime }}</span>
      </div>
    </div>
    <div class="map-table--total">
      <p class="top-left">
        <img src="@/assets/img/table/dbs.png" alt="" style="width: 28px; height: 29px;" />
      </p>
      <p class="total--title">地表水站点总数</p>
      <div class="top-total">
        <span class="total-num">{{ baseInfoObj.total }}</span>
        <!-- <span>个</span> -->
      </div>
    </div>
    <ul class="map-table--base">
      <li class="base-item">
        <p class="item-top">优良比列</p>
        <p class="item-bottom">{{ baseInfoObj.standardRate }}</p>
      </li>
      <li class="base-item">
        <p class="item-top">差于Ⅲ类数</p>
        <p class="item-bottom">{{ baseInfoObj.badNum }}</p>
      </li>
      <!-- <li class="base-item">
        <p class="item-top">劣V类数</p>
        <p class="item-bottom">{{ baseInfoObj.standardRate}}</p>
      </li> -->
      <li class="base-item">
        <p class="item-top">考核目标</p>
        <p class="item-bottom">{{ baseInfoObj.target }}</p>
      </li>
    </ul>
    <div class="map-table-wrapper">
      <el-table :data="tableData" style="width: 100%" :height="340" v-loading="loading" border>
        <el-table-column show-overflow-tooltip prop="staName" label="断面" align="center">
        </el-table-column>
        <el-table-column width="78" prop="waterGrade" label="水质类别" align="center">
          <template slot-scope="{ row }">
            <p v-if="row.waterGrade === 'Ⅰ'" class="water-type-1">Ⅰ类</p>
            <p v-if="row.waterGrade  === 'Ⅱ'" class="water-type-2">Ⅱ类</p>
            <p v-if="row.waterGrade === 'Ⅲ'" class="water-type-3">Ⅲ类</p>
            <p v-if="row.waterGrade === 'Ⅳ'" class="water-type-4">Ⅳ类</p>
            <p v-if="row.waterGrade === 'Ⅴ'" class="water-type-5">Ⅴ类</p>
            <p v-if="row.waterGrade === '劣Ⅴ'" class="water-type-6">劣Ⅴ类</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="exceedStandard"
          label="超标情况"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column width="78" prop="staAttr" label="控制等级" align="center">
          <template slot-scope="{row}">
            <div class="control-level-guo" v-if="row.staAttr === '国控'">
              国
            </div>
            <div class="control-level-sheng" v-else>
              省
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getDbsThemeInfo } from "@/api/waterMap";
export default {
  name: "DbsTable",
  data() {
    return {
      tableData: [],
      loading: true,
      baseInfoObj: {
        themeName: "",
        updateTime: "",
        total: "",
        standardRate: "",
        badNum: "",
        target: ""
      }
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      getDbsThemeInfo()
        .then(res => {
          this.tableData = res.content.infos;
          this.baseInfoObj = {
            themeName: res.content.themeName,
            updateTime: res.content.updateTime,
            total: res.content.total,
            standardRate: res.content.standardRate,
            badNum: res.content.badNum,
            target: res.content.target
          };
          // time 毫秒后显示表格
          setTimeout(() => {
            this.loading = false;
          }, 500);
          // resolve(res);
        })
        .catch(err => {
          this.loading = false;
          // reject(err);
        });
    }
  }
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
</style>
