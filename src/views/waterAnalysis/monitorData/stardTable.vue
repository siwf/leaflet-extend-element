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
      border
    >
      <el-table-column show-overflow-tooltip prop="sectionName" label="断面名称" align="center">
      </el-table-column>
      <el-table-column width="98" prop="countyName" label="监测指标" align="center">
      </el-table-column>
      <el-table-column width="128" prop="dataTime" label="监测时间" align="center">
      </el-table-column>
      <el-table-column width="78" prop="exceedFlag" label="样本数" align="center" />
      <el-table-column width="78" prop="waterTemp" label="最大值" align="center" />
      <el-table-column width="78" prop="doxygen" label="最小值" align="center" />
      <el-table-column width="78" prop="doxygen" label="平均值" align="center" />
      <el-table-column width="78" prop="doxygen" label="超标率" align="center" />
      <el-table-column width="78" prop="doxygen" label="超标率" align="center" />
      <el-table-column width="108" prop="doxygen" label="最高超标倍数" align="center" />
      <el-table-column width="98" prop="doxygen" label="目标值" align="center" />
      <el-table-column width="188" prop="doxygen" label="（本年度）达标所需均值" align="center" />
      <el-table-column width="98" prop="doxygen" label="结论" align="center" />
    </el-table>
    <ul class="table-desc">
      <li class="table-desc--info">
      备注：  1、若监测值低于检出限，按照国标方法检出限报出，并在检出限后加“L”；低于检出限的项目，按照1/2 检出限值参加计算各单项指标浓度的算术平均值。
      </li>
      <li class="table-desc--info" style="padding-left: 40px;">
        2、未监测则填写“-1”。
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
            this.page.total = res.total;
            this.tableData = res.content;
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