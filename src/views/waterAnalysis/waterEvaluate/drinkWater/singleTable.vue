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
        label="断面名称"
        align="center"
        min-width="200"
      >
      </el-table-column>
      <el-table-column width="78" prop="areaName" label="行政区" align="center">
      </el-table-column>
      <el-table-column prop="rlName" label="所属河流" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="waterResourceType" label="水源地性质" width="92" align="center">
      </el-table-column>
      <el-table-column width="128" prop="dataTime" label="监测时间" align="center">
      </el-table-column>
      <el-table-column width="78" prop="waterTarget" label="水质类别" align="center">
        <template slot-scope="{ row }">
          <p v-if="row.waterTarget === 1" class="water-type-1">Ⅰ类</p>
          <p v-if="row.waterTarget === 2" class="water-type-2">Ⅱ类</p>
          <p v-if="row.waterTarget === 3" class="water-type-3">Ⅲ类</p>
          <p v-if="row.waterTarget === 4" class="water-type-4">Ⅳ类</p>
          <p v-if="row.waterTarget === 5" class="water-type-5">Ⅴ类</p>
          <p v-if="row.waterTarget === 6" class="water-type-6">劣Ⅴ类</p>
        </template>
      </el-table-column>
      <el-table-column width="78" prop="exceedFlag" label="达标情况" align="center" />
      <el-table-column
        width="122"
        prop="exceedDetail"
        label="主要污染指标(超标倍数)"
        align="center"
      />
      <el-table-column width="78" prop="totalWater" label="取水总量（万吨）" align="center" />
      <el-table-column width="78" prop="waterTemp" label="水温(℃)" align="center" />
      <el-table-column width="98" prop="ph" label="pH(无量纲)" align="center" />
      <el-table-column width="78" prop="doxygen" label="溶解氧(mg/L)" align="center" />
      <el-table-column width="109" prop="pindex" label="高猛酸盐指数(mg/L)" align="center" />
      <el-table-column width="109" prop="cod" label="化学需氧量(mg/L)" align="center" />
      <el-table-column width="109" prop="bod5" label="五日生化需氧量(mg/L)" align="center" />
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
      <el-table-column width="112" prop="sulfate" label="硫酸盐(mg/L)" align="center" />
      <el-table-column width="112" prop="fe" label="铁(mg/L)" align="center" />
      <el-table-column width="112" prop="mn" label="锰(mg/L)" align="center" />
      <el-table-column width="92" prop="chcl3" label="三氯甲烷(mg/L)" align="center" />
      <el-table-column width="92" prop="ccl4" label="四氯化碳(mg/L)" align="center" />
      <el-table-column width="92" prop="c2hcl3" label="三氯乙烯(mg/L)" align="center" />
      <el-table-column width="92" prop="c2cl4" label="四氯乙烯(mg/L)" align="center" />
      <el-table-column width="82" prop="c8h8" label="苯乙烯(mg/L)" align="center" />
      <el-table-column width="98" prop="hcho" label="甲醛(mg/L)" align="center" />
      <el-table-column width="98" prop="c6h6" label="苯(mg/L)" align="center" />
      <el-table-column width="98" prop="c7h8" label="甲苯(mg/L)" align="center" />
      <el-table-column width="112" prop="c6h5c2h5" label="乙苯(mg/L)" align="center" />
      <el-table-column width="112" prop="c8h10" label="二甲苯(mg/L)" align="center" />
      <el-table-column width="112" prop="c9h12" label="异丙苯(mg/L)" align="center" />
      <el-table-column width="112" prop="c6h5cl" label="氯苯(mg/L)" align="center" />
      <el-table-column width="98" prop="c6h4cl212" label="1,2-二氯苯(mg/L)" align="center" />
      <el-table-column width="98" prop="c6h4cl214" label="1,4-二氯苯(mg/L)" align="center" />
      <el-table-column width="112" prop="c6h3cl3" label="三氯苯(mg/L)" align="center" />
      <el-table-column width="112" prop="c6h5no2" label="硝基苯(mg/L)" align="center" />
      <el-table-column width="92" prop="c6h4n2o4" label="二硝基苯(mg/L)" align="center" />
      <el-table-column width="92" prop="c6h4clno2" label="硝基氯苯(mg/L)" align="center" />
      <el-table-column width="136" prop="c16h22o4" label="邻苯二甲酸二丁酯(mg/L)" align="center" />
      <el-table-column
        width="152"
        prop="c24h38o4"
        label="邻苯二甲酸二（2-乙基己基）酯(mg/L)"
        align="center"
      />
      <el-table-column width="112" prop="c14h9cl5" label="滴滴涕(mg/L)" align="center" />
      <el-table-column width="112" prop="c6h6cl6" label="林丹(mg/L)" align="center" />
      <el-table-column width="92" prop="c8h16cln5" label="阿特拉津(mg/L)" align="center" />
      <el-table-column width="110" prop="c20h12" label="苯并（a）芘(mg/L)" align="center" />
      <el-table-column width="92" prop="mo" label="钼(mg/L)" align="center" />
      <el-table-column width="92" prop="co" label="钴(mg/L)" align="center" />
      <el-table-column width="92" prop="be" label="铍(mg/L)" align="center" />
      <el-table-column width="112" prop="b" label="硼(mg/L)" align="center" />
      <el-table-column width="112" prop="sb" label="锑(mg/L)" align="center" />
      <el-table-column width="112" prop="ni" label="镍(mg/L)" align="center" />
      <el-table-column width="112" prop="ba" label="钡(mg/L)" align="center" />
      <el-table-column width="112" prop="v" label="钒(mg/L)" align="center" />
      <el-table-column width="112" prop="tl" label="铊(mg/L)" align="center" />
      <el-table-column width="92" prop="chbr3" label="三溴甲烷(mg/L)" align="center" />
      <el-table-column width="92" prop="ch2cl2" label="二氯甲烷(mg/L)" align="center" />
      <el-table-column width="112" prop="ch2clch2cl" label="1.2-二氯乙烷(mg/L)" align="center" />
      <el-table-column width="110" prop="c3h5clo" label="环氧氯丙烷(mg/L)" align="center" />
      <el-table-column width="112" prop="c2h3cl" label="氯乙烯(mg/L)" align="center" />
      <el-table-column width="112" prop="c2h2cl211" label="1.1-二氯乙烯(mg/L)" align="center" />
      <el-table-column width="112" prop="c2h2cl212" label="1.2-二氯乙烯(mg/L)" align="center" />
      <el-table-column width="112" prop="cr" label="氯丁二烯(mg/L)" align="center" />
      <el-table-column width="110" prop="c4cl6" label="六氯丁二烯(mg/L)" align="center" />
      <el-table-column width="112" prop="ch3cho" label="乙醛(mg/L)" align="center" />
      <el-table-column width="112" prop="c3h4o" label="丙烯醛(mg/L)" align="center" />
      <el-table-column width="92" prop="c2hcl3o" label="三氯乙醛(mg/L)" align="center" />
      <el-table-column width="112" prop="c6h2cl4" label="四氯苯(mg/L)" align="center" />
      <el-table-column width="112" prop="c6cl6" label="六氯苯(mg/L)" align="center" />
      <el-table-column width="124" prop="c7h6n2o4" label="2.4-二硝基甲苯(mg/L)" align="center" />
      <el-table-column width="132" prop="c7h5o6n3" label="2.4.6-三硝基甲苯(mg/L)" align="center" />
      <el-table-column width="124" prop="c6h3cln2o4" label="2.4-二硝基氯苯(mg/L)" align="center" />
      <el-table-column width="118" prop="c6h4cl2o" label="2.4-二氯苯酚(mg/L)" align="center" />
      <el-table-column width="132" prop="c6h3ocl3" label="2.4.6-三氯苯酚(mg/L)" align="center" />
      <el-table-column width="112" prop="c6cl5oh" label="五氯酚(mg/L)" align="center" />
      <el-table-column width="112" prop="c6h7n" label="苯胺(mg/L)" align="center" />
      <el-table-column width="112" prop="c12h12n2" label="联苯胺(mg/L)" align="center" />
      <el-table-column width="92" prop="c3h5no" label="丙烯酰胺(mg/L)" align="center" />
      <el-table-column width="112" prop="c3h3n" label="丙烯腈(mg/L)" align="center" />
      <el-table-column width="112" prop="h6n2o" label="水合肼(mg/L)" align="center" />
      <el-table-column width="92" prop="c8h20pb" label="四乙基铅(mg/L)" align="center" />
      <el-table-column width="112" prop="c5h5n" label="吡啶(mg/L)" align="center" />
      <el-table-column width="112" prop="c10h16" label="松节油(mg/L)" align="center" />
      <el-table-column width="112" prop="c6h3n3o7" label="苦味酸(mg/L)" align="center" />
      <el-table-column width="92" prop="c5h9kos2" label="丁基黄原酸(mg/L)" align="center" />
      <el-table-column width="112" prop="ac" label="活性氯(mg/L)" align="center" />
      <el-table-column width="92" prop="c10h5cl7o" label="环氧七氯(mg/L)" align="center" />
      <el-table-column width="112" prop="c10h14no5ps" label="对硫磷(mg/L)" align="center" />
      <el-table-column width="92" prop="c8h10o5nps" label="甲基对硫磷(mg/L)" align="center" />
      <el-table-column width="92" prop="c10h19o6ps2" label="马拉硫磷(mg/L)" align="center" />
      <el-table-column width="112" prop="c5h12no3ps2" label="乐果(mg/L)" align="center" />
      <el-table-column width="112" prop="c4h7cl2o4p" label="敌敌畏(mg/L)" align="center" />
      <el-table-column width="112" prop="c4h8cl3o4p" label="敌百虫(mg/L)" align="center" />
      <el-table-column width="112" prop="c8h19o3ps2" label="内吸磷(mg/L)" align="center" />
      <el-table-column width="112" prop="c8cl4n2" label="百菌清(mg/L)" align="center" />
      <el-table-column width="112" prop="c12h10no2" label="甲萘威(mg/L)" align="center" />
      <el-table-column width="92" prop="c22h19br2no3" label="溴氰菊酯(mg/L)" align="center" />
      <el-table-column width="112" prop="ch3hg" label="甲基汞(mg/L)" align="center" />
      <el-table-column width="92" prop="c12h10xclx" label="多氯联苯(mg/L)" align="center" />
      <el-table-column width="118" prop="c52h72n10o13" label="微囊藻毒素-LR(mg/L)" align="center" />
      <el-table-column width="112" prop="p4" label="黄磷(mg/L)" align="center" />
      <el-table-column width="112" prop="ti" label="钛(mg/L)" align="center" />
      <el-table-column width="112" prop="transparency" label="透明度(mg/L)" align="center" />
      <el-table-column width="88" prop="chlorophyll" label="叶绿素a(mg/L)" align="center" />
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
        this.tableHeight = window.innerHeight - 92;
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
