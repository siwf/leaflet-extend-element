<template>
  <basic-container>
    <basic-wrapper>
      <div class="ya-row mr-b-10 row-title clearfix">
        <ya-radio
          :query="query"
          value-key="theme"
          title="主题:"
          :radio-op="themeOp"
          @updateQuery="updateQuery"
        />
      </div>
      <div class="ya-row mr-b-10 clearfix">
        <select-single
          :query="query"
          value-key="monitorType"
          :select-op="monitorTypeOp"
          title="监测类型:"
          @updateQuery="updateQuery"
        />
        <select-single
          v-if="query.monitorType === 'auto'"
          :query="query"
          value-key="timeType"
          :select-op="timeTypeOp"
          title="时间"
          @updateQuery="updateQuery"
        />
        <ya-time
          :query="query"
          value-key="timeVal"
          :title="query.monitorType === 'auto' ? '' : '时间：'"
          :type="query.monitorType === 'auto' ? 'daterange' : 'monthrange'"
          @updateQuery="updateQuery"
        />

        <select-single
          :query="query"
          value-key="riverLake"
          title=""
          :select-op="riverLakeOp"
          @updateQuery="updateQuery"
          :disabled="radio==='region'"
        >
          <el-radio
            v-model="radio"
            label="river"
            style="margin-right: 10px"
          >河流/湖库：</el-radio>
        </select-single>
        <select-single
          :query="query"
          value-key="region"
          title=""
          :disabled="radio==='river'"
          :select-op="regionOp"
          @updateQuery="updateQuery"
        >
          <template>
            <el-radio
              v-model="radio"
              label="region"
              style="margin-right: 10px"
            >行政区:</el-radio>
          </template>
        </select-single>
        <select-multiply
          :query="query"
          value-key="sectionCode"
          title="断面"
          :select-op="sectionCodeOp"
          @updateQuery="updateQuery"
        />
        <ya-search @refresh="updateQuery" />
      </div>
    </basic-wrapper>
    <basic-wrapper>
      <div class="ya-row clearfix">
        <ya-radio
          :query="query"
          value-key="waterTarget"
          title="设定断面水质目标"
          :radio-op="waterTargetOp"
          @updateQuery="updateQuery"
        />
      </div>
    </basic-wrapper>
        <thb-table ref="table">
                <div class="excel-down-btn">
                  <el-button type="primary" style="margin-right: 10px" icon="el-icon-download" plain size="mini" :loading="loading">下载</el-button>
                </div>
        </thb-table>
  </basic-container>
</template>

<script>
  import YaRadio from '@/components/Radio';
  import SelectSingle from '@/components/SelectSingle';
  import SelectMultiply from '@/components/SelectMultiply';
  import YaTime from '@/components/TimePicker';
  import YaCheckbox from '@/components/CheckBox';
  import YaSearch from '@/components/ButtonSearch';
  import thbTable from '../common/thbTable'
  import TitleName from '../common/siteTotal';
  export default {
    name: "yearMonthErlier",
    components:{
      YaRadio,SelectSingle,SelectMultiply,YaTime,YaCheckbox,YaSearch,TitleName,thbTable
    },
    data () {
      return {
        loading:false,
        radio: 'river',
        loadingDown: false,
        query:{
          theme:'hlgskh',
          waterTarget: "1",
          endTime:'',
          mounth:'',
          startTime:'',
          monitorType: "",
          riverLake: "",
          region: "",
          sectionCode:[],
        },
        timeTypeOp: [],
        waterTargetOp: [{key:'1',value:'Ⅱ类'},{key:'2',value: 'Ⅲ类'}],
        monitorTypeOp: [{key:'1',value:'手动'},{key:'2',value:'自动'}],
        regionOp:[{key:'1',value:'全部'},{key:'2',value:'燕东街道'},{key:'3',value:'燕南街道'},{key:'4',value:'燕西街道'},
          {key:'5',value:'燕北街道'},{key:'6',value:'西洋镇'},{key:'6',value:'贡川镇'},{key:'7',value:'小湖镇'}],
        themeOp:[{key:'hlgsk',value:'河流国省控'},
          {key:'hk',value:'湖库'},
          {key:'skxly',value:'省控小流域'},
          {key:'sgnq',value:'水功能区'}],
        riverLakeOp:[{key:'1',value:'沙溪'},{key:'2',value: '巴溪'},{key:'3',value: '九龙溪'},{key:'4',value: '洛溪'},{key:'5',value: '文川溪'},{key:'6',value:'益溪'}],
        sectionCodeOp:[{key:'1',value:'永安贡川桥'},{key:'2',value:'断面2'},{key:'3',value:'断面3'},{key:'4',value:'断面5'}]
      }
    },
    methods:{
      updateQuery(){
        console.log("主题选择");
      }
    }
  }
</script>

<style scoped>

</style>

