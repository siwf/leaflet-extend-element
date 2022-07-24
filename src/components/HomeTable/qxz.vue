<template>
  <div class="map-table">
    <div class="map-table--top">
      <p class="top-left">气象站</p>
      <div class="top-right">
        <span class="title-label">数据更新时间：</span>
        <span class="title-value">{{ baseInfoObj.updateTime }}</span>
      </div>
    </div>
    <div class="map-table--total">
      <p class="top-left">
        <img src="@/assets/img/table/qxz.png" alt="" style="width: 28px; height: 29px;" />
      </p>
      <p class="total--title">气象站点总数</p>
      <div class="top-total">
        <span class="total-num">{{ baseInfoObj.total }}</span>
      </div>
    </div>
    <!-- <ul class="map-table--base">
      <li class="base-item">
        <p class="item-top">完成整治</p>
        <p class="item-bottom">{{ baseInfoObj.total }}</p>
      </li>
    </ul> -->
    <div class="map-table-wrapper">
      <el-table :data="tableData" style="width: 100%" :height="340" v-loading="loading" border>
        <el-table-column show-overflow-tooltip prop="staName" label="站点名称" align="center">
        </el-table-column>
        <el-table-column prop="areaName" label="行政区" align="center">
        </el-table-column>
        <!-- <el-table-column
          prop="exceedStandard"
          label="超标情况"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column> -->
        <!-- <el-table-column width="78" prop="staAttr" label="控制等级" align="center">
          <template slot-scope="{row}">
            <div class="control-level-guo" v-if="row.staAttr === '国控'">
              国
            </div>
            <div class="control-level-sheng" v-else>
              省
            </div>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
import { getThemeInfoQxz } from "@/api/waterMap";
export default {
  data() {
    return {
      tableData: [],
      loading: true,
      baseInfoObj: {
        themeName: "",
        updateTime: "",
        total: "",
      }
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      getThemeInfoQxz()
        .then(res => {
          this.tableData = res.content.infos;
          this.baseInfoObj = {
            themeName: res.content.themeName,
            updateTime: res.content.updateTime,
            total: res.content.total
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
