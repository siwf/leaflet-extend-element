<template>
    <div class="table-wrapper">
        <slot/>
      <el-table v-loading="loading"
                :data="dataTable"
                class="mr-b-10"
                :height="tableHeight"
                style="width: 100%"
                row-key="id"
                :tree-props="{children: 'child', hasChildren: 'hasChildren'}"
                border>
        <el-table-column width="100" prop="sectionName" label="断面名称" align="center"></el-table-column>
        <el-table-column width="100" prop="region" label="行政区" align="center"></el-table-column>
        <el-table-column width="100" prop="river" label="所属河流" align="center"></el-table-column>
        <el-table-column width="100" prop="controlLevel" label="控制级别" align="center"></el-table-column>
        <el-table-column width="100" prop="monitorTime" label="监测时间" align="center"></el-table-column>
        <el-table-column width="100" prop="standard" label="达标情况" align="center"></el-table-column>
        <el-table-column width="180" prop="pollutionIndex" label="主要污染指标（超标倍数）" align="center"></el-table-column>
        <el-table-column label="水质评价" align="center">
            <el-table-column label="水质类别" align="center" prop="water.category">
<!--              <template slot-scope="{ col }">-->
<!--                <p v-if="col.water === 1" class="water-type-1">Ⅰ类</p>-->
<!--                <p v-if="col.water  === 2" class="water-type-2">Ⅱ类</p>-->
<!--                <p v-if="col.water === 3" class="water-type-3">Ⅲ类</p>-->
<!--                <p v-if="col.water === 4" class="water-type-4">Ⅳ类</p>-->
<!--                <p v-if="col.water === 5" class="water-type-5">Ⅴ类</p>-->
<!--                <p v-if="col.water === 6" class="water-type-6">劣Ⅴ类</p>-->
<!--              </template>-->
            </el-table-column>
            <el-table-column label="同比（%）" align="center" prop="water.with"> </el-table-column>
            <el-table-column label="环比（%）" align="center" prop="water.ring"> </el-table-column>
        </el-table-column>
        <el-table-column label="水温" align="center">
          <el-table-column label="浓度" align="center" prop="temperature.concentration"> </el-table-column>
          <el-table-column label="同比（%）" align="center" prop="temperature.with"> </el-table-column>
          <el-table-column label="环比（%）" align="center" prop="temperature.ring"> </el-table-column>
        </el-table-column>
        <el-table-column label="PH" align="center">
          <el-table-column label="浓度" align="center" prop="PH.concentration"></el-table-column>
          <el-table-column label="同比（%）" align="center" prop="PH.with"> </el-table-column>
          <el-table-column label="环比（%）" align="center" prop="PH.ring"> </el-table-column>
        </el-table-column>
        <el-table-column label="溶解氧" align="center">
          <el-table-column label="浓度" align="center" prop="oxygen.concentration"> </el-table-column>
          <el-table-column label="同比（%）" align="center" prop="oxygen.with"> </el-table-column>
          <el-table-column label="环比（%）" align="center" prop="oxygen.ring"> </el-table-column>
        </el-table-column>
        <el-table-column label="CODMn" align="center">
          <el-table-column label="浓度" align="center" prop="CODMn.concentration"> </el-table-column>
          <el-table-column label="同比（%）" align="center" prop="CODMn.with"> </el-table-column>
          <el-table-column label="环比（%）" align="center" prop="CODMn.ring"> </el-table-column>
        </el-table-column>
        <el-table-column label="COD" align="center">
          <el-table-column label="浓度" align="center" prop="COD.concentration"> </el-table-column>
          <el-table-column label="同比（%）" align="center" prop="COD.with"> </el-table-column>
          <el-table-column label="环比（%）" align="center" prop="COD.ring"> </el-table-column>
        </el-table-column>
        <el-table-column label="BOD5" align="center">
          <el-table-column label="浓度" align="center" prop="BOD5.concentration"> </el-table-column>
          <el-table-column label="同比（%）" align="center" prop="BOD5.with"> </el-table-column>
          <el-table-column label="环比（%）" align="center" prop="BOD5.ring"> </el-table-column>
        </el-table-column>
      </el-table>
      <ul class="table-desc">
          <li class="table-desc--info">
            备注：
            1、若监测值低于检出限，按照国标方法检出限报出，并在检出限后加“L”；低于检出限的项目，按照1/2 检出限值参加计算各单项指标浓度的算术平均值。
          </li>
          <li style="padding-left: 40px" class="table-desc--info">
            2、未监测则填写“-1”。
          </li>
      </ul>
      <pagination :page="page" @updateTable="updateTable" />
    </div>
</template>

<script>
  import pagination from '@/components/Pagenation';
  export default {
    name: "thbTable",
    components:{pagination},
    data () {
      return {
        loading:false,
        tableHeight: 0,
        page:{
          pageNum: 1,
          pageSize: 10,
          total: 1
        },
        dataTable:[{sectionName:'永安贡川桥',
                    region:'永安市',
                    river:'九龙溪',
                     controlLevel:'国控',
          monitorTime:'2019-01',
          standard:'超标',
          pollutionIndex:'总磷（0.9）',
          water:{
            category:'Ⅱ类',
            with:'1.2↑',
            ring:'1.2↓'
          },
          temperature:{
            concentration:'3',
            with:'1.2↑',
            ring:'1.2↓'
          },
          PH:{
            concentration:'3',
            with:'1.2↑',
            ring:'1.2↓'
          },
          oxygen:{
            concentration:'3',
            with:'1.2↑',
            ring:'1.2↓'
          },
          CODMn:{
            concentration:'3',
            with:'1.2↑',
            ring:'1.2↓'
          },
          COD:{
            concentration:'3',
            with:'1.2↑',
            ring:'1.2↓'
          },
          BOD5:{
            concentration:'3',
            with:'1.2↑',
            ring:'1.2↓'
          }
                    }]
      }
    },
    methods:{
      updateTable(e) {
        this.page.pageNum = e;
        // this.refresh();
      },
      fitTable() {
        this.$nextTick(() => {
          this.tableHeight = window.innerHeight - 90;
        });
      }
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
