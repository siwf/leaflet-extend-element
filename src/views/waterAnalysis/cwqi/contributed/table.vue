<template>
  <div class="table-wrapper">
    <slot />
    <el-table
      v-loading="loading"
      :data="tableData"
      class="mr-b-10"
      style="width: 100%"
      :height="tableHeight"
      border
    > 

      <el-table-column  prop="sectionName" label="序号" align="center" width="55">
      </el-table-column>
      <el-table-column width="78" prop="countyName" label="指标" align="center" />
      <el-table-column  prop="countyName" label="2017年一季度" align="center" />
      <el-table-column prop="countyName" label="2017年一季度" align="center" />
      <el-table-column  prop="countyName" label="2017年一季度" align="center" />
      <el-table-column prop="countyName" label="2017年一季度" align="center" />
      <el-table-column prop="countyName" label="2017年一季度" align="center" />
      <el-table-column prop="countyName" label="2017年一季度" align="center" />
      <el-table-column  prop="countyName" label="2017年一季度" align="center" />
      <el-table-column  prop="countyName" label="2017年一季度" align="center" />
      <el-table-column  prop="countyName" label="2017年一季度" align="center" />
      <el-table-column prop="average" label="占比均值" sortable align="center" />
    </el-table>
  </div>
</template>

<script>
// import pagination from "@/components/Pagenation";
import { initTableData } from "@/api/dataTable";
import { exportExcel } from '@/api/dataTable'

export default {
  components: {
    // pagination
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
      // page: {
      //   pageNum: 1,
      //   pageSize: 10,
      //   total: 0
      // },
      tableData: [],
      queryCache: {}
    };
  },
  mounted() {
    this.fitTable()
  },
  methods: {
    // updateTable(e) {
    //   this.page.pageNum = e;
    //   this.refresh();
    // },
    refresh(paramObj) {
      paramObj = paramObj || this.queryCache
      this.queryCache = paramObj
      return new Promise((resolve, reject) => {
        this.loading = true;
        /** 
         * 注意 这个参数要包含后端的所有参数
         */
        // paramObj.pageSize = this.page.pageSize
        // paramObj.pageNum = this.page.pageNum

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