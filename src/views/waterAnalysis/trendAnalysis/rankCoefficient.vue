<template>
<basic-container>
    <basic-wrapper>
      <div class="ya-row mr-b-10 row-title clearfix">
        <ya-radion :query="query"
                   value-key="theme"
                   title="主题:"
                   :radio-op="themeOp"
                   @updateQuery="updateQuery"
        />
      </div>
      <div class="ya-row mr-b-10 clearfix">
<!--        <year-time-->
<!--          start-key="startTime"-->
<!--          end-key="endTime"-->
<!--          mounth-key="mounth"-->
<!--          :query="query"-->
<!--          @updateQuery="updateQuery"-->
<!--        />-->
        <div class="year" style="display: inline-block;margin-top: 10px;">
          <span>时间：</span>
          <el-date-picker style="width: 120px;height: 32px"
                          v-model="startyaer"
                          type="year"
                          placeholder="选择年"
                          format="yyyy">
          </el-date-picker>
          至
          <el-date-picker style="width: 120px;height: 32px"
                          v-model="endyear"
                          type="year"
                          placeholder="选择年"
                          format="yyyy">
          </el-date-picker>
        </div>

        <select-single
          :query="query"
          value-key="riverLake"
          title=""
          :select-op="riverLakeOp"
          @updateQuery="initSectionCode"
          :disabled="radio==='region'"
        >
          <el-radio
            v-model="radio"
            label="river"
            style="margin-right: 10px;"
          >河流/湖库:</el-radio>
        </select-single>
        <select-single
          :query="query"
          value-key="region"
          title=""
          :select-op="regionOp"
          @updateQuery="initSectionCode"
          :disabled="radio==='river'"
        >
          <template>
            <el-radio
              v-model="radio"
              label="region"
              style="margin-right: 10px;"
            >行政区:</el-radio>
          </template>
        </select-single>
      </div>
      <div class="ya-row mr-b-10 clearfix">
        <select-multiply
          :query="query"
          value-key="sectionIndex"
          title="断面"
          :select-op="sectionOp"
          @updateQuery="updateQuery"
        />
        <select-multiply
          :query="query"
          value-key="zhibiaoOpIndex"
          title="指标"
          :select-op="zhibiaoOp"
          @updateQuery="updateQuery"
        />
        <ya-search @refresh="updateQuery"/>
      </div>
    </basic-wrapper>
      <zxs-table ref="table">
          <div class="excel-down-btn">
              <el-button type="primary" style="margin-right: 10px" icon="el-icon-download" plain size="mini" :loading="loading">下载</el-button>
          </div>
      </zxs-table>
</basic-container>
</template>

<script>
  import YaRadion from '@/components/Radio';
  import SelectSingle from '@/components/SelectSingle';
  import SelectMultiply from '@/components/SelectMultiply';
  import YaTime from '@/components/TimePicker';
  import YaCheckbox from '@/components/CheckBox';
  import YaSearch from '@/components/ButtonSearch';
  import YearTime from '@/components/TimeYear';
  import zxsTable from "../common/zxsTable";
  import TitleName from '../common/siteTotal';
  export default {
    name: "rankCoefficient",
    components:{
      YaRadion,SelectSingle,SelectMultiply,YaTime,YaCheckbox,YaSearch,YearTime,zxsTable,TitleName
    },
    data () {
      return {
        loading:false,
        startyaer:'',
        endyear:'',
        radio:'river',
          query:{
            theme:'hlgsk',
            endTime:'',
              river:'',
            mounth:'',
            startTime:'',
            riverLake:'',
            region:'',
            sectionIndex:['1'],
            zhibiaoOpIndex:['1','3']
          },
        regionOp:[{key:'1',value:'全部'},{key:'2',value:'燕东街道'},{key:'3',value:'燕南街道'},{key:'4',value:'燕西街道'},
                          {key:'5',value:'燕北街道'},{key:'6',value:'西洋镇'},{key:'6',value:'贡川镇'},{key:'7',value:'小湖镇'}],
        themeOp:[{key:'hlgsk',value:'河流国省控'},
                {key:'hk',value:'湖库'},
                {key:'skxly',value:'省控小流域'},
                {key:'sgnq',value:'水功能区'}],
        riverLakeOp:[{key:'1',value:'沙溪'},{key:'2',value: '巴溪'},{key:'3',value: '九龙溪'},{key:'4',value: '洛溪'},{key:'5',value: '文川溪'},{key:'6',value:'益溪'}],
        sectionOp:[{key:'1',value:'永安贡川桥'},{key:'2',value:'断面2'},{key:'3',value:'断面3'},{key:'4',value:'断面5'}],
        zhibiaoOp:[{key:'1',value:'氨氮'},{key:'2',value:'总氮'},{key:'3',value:'五日生化需氧量'},{key:'4',value: 'COD'},{key:'5',value:'总磷'}]
      }
    },
    methods:{
      updateQuery(){
        console.log("主题选择");
      },
      initSectionCode(){
        console.log('下拉');
      },
      // pickerOptions(){
      //
      // }
    }
  }
</script>

<style scoped>

</style>
