<template>
  <div class="table-wrapper">
    <slot />
    <el-table
      v-loading="loading"
      :data="tableData"
      class="mr-b-10"
      style="width: 100%"
      :height="tableHeight"
      row-key="id"
      :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
      border
    >
      <el-table-column
      label="序号"
      align="center"
      type="index"
      width="50">
    </el-table-column>
      <el-table-column width="128" prop="dataTime" label="时间" align="center" sortable />
      <el-table-column show-overflow-tooltip prop="sectionName" label="参与计算断面" align="center" min-width="200">
      </el-table-column>
      <el-table-column width="108" prop="sectionWqi" label="CWQI" align="center" sortable>
      </el-table-column>
      <el-table-column width="138" prop="sectionWqiTb" label="ΔCWQI（%）" align="center" sortable>
      </el-table-column>
      <el-table-column label="pH值" align="center">
        <el-table-column label="浓度均值" align="center" prop="ph.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="ph.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="ph.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="溶解氧(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="doxygen.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="doxygen.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="doxygen.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="高锰酸盐指数(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="pindex.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="pindex.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="pindex.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="化学需氧量(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="cod.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="cod.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="cod.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="五日生化需氧量(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="bod5.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="bod5.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="bod5.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="氨氮(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="anitrogen.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="anitrogen.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="anitrogen.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="总磷(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="tp.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="tp.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="tp.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="铜(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="cu.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="cu.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="cu.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="锌(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="zn.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="zn.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="zn.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="氟化物(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="fluoride.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="fluoride.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="fluoride.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="硒(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="se.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="se.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="se.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="砷(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="arsenic.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="arsenic.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="arsenic.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="汞(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="hg.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="hg.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="hg.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="镉(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="cd.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="cd.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="cd.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="六价铬(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="hc.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="hc.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="hc.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="铅(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="pb.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="pb.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="pb.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="氰化物(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="cyanide.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="cyanide.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="cyanide.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="挥发酚(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="vp.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="vp.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="vp.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="石油类(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="petroleum.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="petroleum.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="petroleum.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="表面活性剂(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="anis.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="anis.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="anis.indexWQI"> </el-table-column>
      </el-table-column>
      <el-table-column label="硫化物(mg/L)" align="center">
        <el-table-column label="浓度均值" align="center" prop="sulfide.indexValue"> </el-table-column>
        <el-table-column label="Ⅲ类标准" align="center" prop="sulfide.limitValue"> </el-table-column>
        <el-table-column label="CWQI" align="center" prop="sulfide.indexWQI"> </el-table-column>
      </el-table-column>

    </el-table>
    <ul class="table-desc">
      <li class="table-desc--info">
      备注： 低于检出限的项目，按照1/2 检出限值参加计算各单项指标浓度的算术平均值。
      </li>
    </ul>
    <pagination :page="page" @updateTable="updateTable" />
  </div>
</template>

<script>
import pagination from "@/components/Pagenation";
import { initTableData } from "@/api/dataTable";
import { exportExcel } from '@/api/dataTable'

export default {
  components: {
    pagination
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    // downLoadUrl: {
    //   type: String,
    //   default: ''
    // }
  },
  data() {
    return {
      tableHeight: 0,
      loading: false,
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      queryCache: {}
    };
  },
  mounted() {
    this.fitTable()
  },
  methods: {
    updateTable(e) {
      this.page.pageNum = e;
      this.refresh();
    },
    refresh(paramObj) {
      paramObj = paramObj || this.queryCache
      this.queryCache = paramObj
      return new Promise((resolve, reject) => {
        this.loading = true;
        /**
         * 注意 这个参数要包含后端的所有参数
         */
        paramObj.pageSize = this.page.pageSize
        paramObj.pageNum = this.page.pageNum

        // 请求数据
        initTableData(this.url, paramObj)
          .then(res => {
            let tableData = res.content;
            if (tableData) {
              this.page.total = tableData.total;
              this.tableData = tableData.list;
            }
            // time 毫秒后显示表格
            setTimeout(() => {
              this.loading = false;
            }, 500);
            resolve(res);
          })
          .catch(err => {
            this.loading = false;
            reject(err);
          });
      });
    },
    fitTable() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 90;
      });
    },
    downLoadExcel(url, paramObj) {
      return exportExcel(url, {}, paramObj, "post")
    }
  },
  // watch: {
  //   query: {
  //     handler(n, o) {

  //       console.log(n, o)
  //       this.refresh()
  //     },
  //     deep: true
  //   },
  // }
};
</script>

<style lang="scss">
.excel-down-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
}
.table-desc--info {
  // padding: 5px 0;
  font-size: 12px;
  height: 32px;
  line-height: 32px;
  color: #666666;
}
</style>
