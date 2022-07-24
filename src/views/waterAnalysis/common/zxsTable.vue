<template>
<div class="table-wrapper">
  <slot />
  <el-table class="mr-b-10" style="width: 100%" :data="tableData" :height="tableHeight" row-key="id" border :tree-props="{children: 'child', hasChildren: 'hasChildren'}">
    <el-table-column width="180" prop="rivers" label="河流" align="center"  />
    <el-table-column width="180" prop="section" label="断面" align="center"  />
    <el-table-column width="180" prop="monitor" label="监测指标" align="center" />
    <el-table-column width="100" prop="year" label="年度" align="center" />
    <el-table-column width="80" prop="sample" label="样本数" align="center" />
    <el-table-column width="80" prop="Maximum" label="最大值" align="center" />
    <el-table-column width="100" prop="average" label="平均值" align="center" />
    <el-table-column label="秩相关系数计算" align="center">
      <el-table-column label="Xi(浓度序号)" align="center" prop="zjs.ndorder"> </el-table-column>
      <el-table-column label="Yi(时间序号)" align="center" prop="zjs.yearorder"> </el-table-column>
      <el-table-column label="di(Xi-Yi)" align="center" prop="zjs.di"> </el-table-column>
      <el-table-column label="di^2" align="center" prop="zjs.di1"> </el-table-column>
      <el-table-column label="Σdi^2" align="center" prop="zjs.di2"> </el-table-column>
      <el-table-column label="rs" align="center" prop="zjs.rs"> </el-table-column>
    </el-table-column>
  </el-table>
  <ul class="table-desc">
    <li class="table-desc--info">
      备注:
      1、若监测值低于检出限，按照国标方法检出限报出，并在检出限后加“L”；
      低于检出限的项目，按照1/2 检出限值参加计算各单项指标浓度的算术平均值。
    </li>
  </ul>
  <pagination :page="page" @updateTable="updateTable" />
</div>
</template>

<script>
  import pagination from "@/components/Pagenation";
  export default {
    name: "zxsTable",
    data () {
      return {
        tableHeight:0,
        page: {
          pageNum: 1,
          pageSize: 10,
          total: 3
        },
        tableData: [{rivers:'沙溪',section:'永安贡川桥、永安安砂水库下游',monitor:'氨氮（NH3-N）（mg/L）',year:'2016',sample:'12',Maximum:'7.8',average:'平均值',zjs:{ndorder:3,yearorder:'2015',di:'3',di1:'6',di2:'',rs:'5'}},
                  {rivers:'沙溪',section:'永安贡川桥、永安安砂水库下游',monitor:'氨氮（NH3-N）（mg/L）',year:'2016',sample:'12',Maximum:'7.8',average:'平均值',zjs:{ndorder:3,yearorder:'2015',di:'3',di1:'',di2:'6',rs:''}},
                  {rivers:'沙溪',section:'永安贡川桥、永安安砂水库下游',monitor:'氨氮（NH3-N）（mg/L）',year:'2016',sample:'12',Maximum:'7.8',average:'平均值',zjs:{ndorder:3,yearorder:'2015',di:'',di1:'6',di2:'6',rs:'5'}}]
      }
    },
    components:{pagination},
    methods:{
      fitTable(){
        this.$nextTick( (res)=>{
          this.tableHeight = window.innerHeight - 90;
        })
      },
      updateTable(e) {
        this.page.pageNum = e;
      },
    },
    created() {
        this.fitTable();
    }
  }
</script>

<style scoped>
  .excel-down-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
  }
  .table-desc--info {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    color: #666666;
  }
</style>
