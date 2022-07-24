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
      :tree-props="{ children: 'child', hasChildren: 'hasChildren' }"
      border
    >
      <el-table-column
        show-overflow-tooltip
        prop="sectionName"
        label="名称"
        align="center"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        prop="rlName"
        label="所属河流"
        show-overflow-tooltip
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column width="78" prop="sectionAttr" label="控制级别" align="center">
        <template slot-scope="{ row }">
          <div class="control-level-guo" v-if="row.staAttr == '国控'">
            国
          </div>
          <div class="control-level-sheng" v-else>
            省
          </div>
        </template>
      </el-table-column>
      <el-table-column width="128" prop="dataTime" show-overflow-tooltip label="监测时间" align="center" />
      <el-table-column width="128" prop="comprehensiveChinese" label="营养状态" align="center" />
      <el-table-column width="128" prop="comprehensive" show-overflow-tooltip label="综合营养指数" align="center" />
      <el-table-column label="叶绿素a(chla)" align="center" prop="norms[0].name">
        <el-table-column label="浓度" align="center" show-overflow-tooltip prop="norms[0].data"> </el-table-column>
        <el-table-column label="指数" align="center" show-overflow-tooltip prop="norms[0].til"> </el-table-column>
        <el-table-column label="权重" align="center" show-overflow-tooltip prop="norms[0].w"> </el-table-column>
      </el-table-column>
      <el-table-column label="总磷(TP)" align="center" prop="norms[1].name">
        <el-table-column label="浓度" align="center" show-overflow-tooltip prop="norms[1].data"> </el-table-column>
        <el-table-column label="指数" align="center" show-overflow-tooltip prop="norms[1].til"> </el-table-column>
        <el-table-column label="权重" align="center" show-overflow-tooltip prop="norms[1].w"></el-table-column>
      </el-table-column>
      <el-table-column label="总氮(TN)" align="center" show-overflow-tooltip prop="norms[2].name">
        <el-table-column label="浓度" align="center" show-overflow-tooltip prop="norms[2].data"> </el-table-column>
        <el-table-column label="指数" align="center" show-overflow-tooltip prop="norms[2].til"> </el-table-column>
        <el-table-column label="权重" align="center" show-overflow-tooltip prop="norms[2].w"> </el-table-column>
      </el-table-column>
      <el-table-column label="透明度(SD)" align="center" prop="norms[3].name">
        <el-table-column label="浓度" align="center" show-overflow-tooltip prop="norms[3].data"> </el-table-column>
        <el-table-column label="指数" align="center" show-overflow-tooltip prop="norms[3].til"> </el-table-column>
        <el-table-column label="权重" align="center" show-overflow-tooltip prop="norms[3].w"> </el-table-column>
      </el-table-column>
      <el-table-column label="高锰酸盐指数(CODMn)" align="center" prop="norms[4].name">
        <el-table-column label="浓度" align="center" show-overflow-tooltip prop="norms[4].data"> </el-table-column>
        <el-table-column label="指数" align="center" show-overflow-tooltip prop="norms[4].til"> </el-table-column>
        <el-table-column label="权重" align="center" show-overflow-tooltip prop="norms[4].w"> </el-table-column>
      </el-table-column>
    </el-table>
    <ul class="table-desc">
      <li class="table-desc--info">
        备注：
        1、若监测值低于检出限，按照国标方法检出限报出，并在检出限后加“L”；低于检出限的项目，按照1/2
        检出限值参加计算各单项指标浓度的算术平均值。
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
import { exportExcel } from "@/api/dataTable";

export default {
  components: {
    pagination
  },
  props: {
    url: {
      type: String,
      default: ""
    }
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
      keyMap: {
        nd: "浓度",
        zs: "指数",
        qz: "权重"
      },
      tableData: [],
      queryCache: {}
    };
  },
  mounted() {
    this.fitTable();
  },
  methods: {
    updateTable(e) {
      this.page.pageNum = e;
      this.refresh();
    },
    refresh(paramObj) {
      paramObj = paramObj || this.queryCache;
      this.queryCache = paramObj;
      return new Promise((resolve, reject) => {
        this.loading = true;
        /**
         * 注意 这个参数要包含后端的所有参数
         */
        paramObj.pageSize = this.page.pageSize;
        paramObj.pageNum = this.page.pageNum;

        // 请求数据
        initTableData(this.url, paramObj)
          .then(res => {
            let data = res.content
            if (data) {
              this.tableData = data;
              this.page.total = data.length
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
      return exportExcel(url, {}, paramObj, "post");
    }
  }
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
