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
      <el-table-column prop="rlName" label="河流" show-overflow-tooltip align="center" min-width="120">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="sectionName" label="断面名称" align="center" min-width="200">
      </el-table-column>
      <el-table-column width="78" prop="countyName" label="行政区" align="center">
      </el-table-column>
      <el-table-column width="78" prop="sectionAttr" label="控制级别" align="center">
        <template slot-scope="{ row }">
          <div class="control-level-guo" v-if="row.staAttr === '国控'">
            国
          </div>
          <div class="control-level-sheng" v-else>
            省
          </div>
        </template>
      </el-table-column>
      <el-table-column width="128" prop="dataTime" label="监测时间" align="center">
      </el-table-column>
      <el-table-column width="78" prop="waterGrade" label="水质类别" align="center">
            <template slot-scope="{ row }">
            <p v-if="row.waterGrade === 1" class="water-type-1">Ⅰ类</p>
            <p v-if="row.waterGrade  === 2" class="water-type-2">Ⅱ类</p>
            <p v-if="row.waterGrade === 3" class="water-type-3">Ⅲ类</p>
            <p v-if="row.waterGrade === 4" class="water-type-4">Ⅳ类</p>
            <p v-if="row.waterGrade === 5" class="water-type-5">Ⅴ类</p>
            <p v-if="row.waterGrade === 6" class="water-type-6">劣Ⅴ类</p>
          </template>
      </el-table-column>
      <el-table-column width="78" prop="exceedFlag" label="达标情况" align="center" />
      <el-table-column width="122" prop="exceedDetail" label="主要污染指标(超标倍数)" align="center" />
      <el-table-column width="78" prop="waterTemp" label="水温(℃)" align="center" />
      <el-table-column width="98" prop="ph" label="pH(无量纲)" align="center" />
      <el-table-column width="78" prop="doxygen" label="溶解氧(mg/L)" align="center" />
      <el-table-column width="109" prop="pindex" label="高猛酸盐指数(mg/L)" align="center" />
      <el-table-column width="104" prop="cod" label="COD(mg/L)" align="center" />
      <el-table-column width="112" prop="bod5" label="BOD5(mg/L)" align="center" />
      <el-table-column width="98" prop="anitrogen" label="氨氮(mg/L)" align="center" />
      <el-table-column width="98" prop="tp" label="总磷(mg/L)" align="center" />
      <el-table-column width="98" prop="tn" label="总氮(mg/L)" align="center" />
      <el-table-column width="98" prop="cu" label="铜(mg/L)" align="center" />
      <el-table-column width="98" prop="zn" label="锌(mg/L)" align="center" />
      <el-table-column width="120" prop="fluoride" label="氟化物(mg/L)" align="center" />
      <el-table-column width="98" prop="se" label="硒(mg/L)" align="center" />
      <el-table-column width="98" prop="arsenic" label="砷(mg/L)" align="center" />
      <el-table-column width="98" prop="hg" label="汞(mg/L)" align="center" />
      <el-table-column width="98" prop="cd" label="镉(mg/L)" align="center" />
      <el-table-column width="90" prop="hc" label="铬(六价)(mg/L)" align="center" />
      <el-table-column width="98" prop="pb" label="铅(mg/L)" align="center" />
      <el-table-column width="112" prop="cyanide" label="氰化物(mg/L)" align="center" />
      <el-table-column width="112" prop="vp" label="挥发酚(mg/L)" align="center" />
      <el-table-column width="112" prop="petroleum" label="石油类(mg/L)" align="center" />
      <el-table-column width="118" prop="anis" label="阴离子表面活性剂(mg/L)" align="center" />
      <el-table-column width="112" prop="sulfide" label="硫化物(mg/L)" align="center" />
      <el-table-column width="98" prop="fc" label="粪大肠菌群(个/L)" align="center" />
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