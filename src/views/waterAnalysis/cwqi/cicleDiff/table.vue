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
      <el-table-column width="128" prop="dataTime" label="时间" align="center">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="sectionName" label="断面" align="center">
      </el-table-column>
      <el-table-column width="78" prop="sectionAttr" label="类型" align="center">
        <template slot-scope="{ row }">
          <div class="control-level-guo"  v-if="row.staAttr = '国控'">
            国
          </div>
          <div class="control-level-sheng" v-else>
            省
          </div>
        </template>
      </el-table-column>
      <el-table-column  prop="areaName" label="行政区" align="center">
      </el-table-column>
      <el-table-column prop="rlName" label="河流/湖库" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column  prop="sectionWqi" label="CWQI" align="center">
      </el-table-column>
      <el-table-column width="168" prop="sectionWqiTb" label="同比(%)" align="center">
      </el-table-column>
      <el-table-column width="168" prop="sectionWqiHb" label="环比(%)" align="center">
      </el-table-column>
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
            let data = res.content
            if (data) {
              this.page.total = data.total;
              this.tableData = data.list;
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
