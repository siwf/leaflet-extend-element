<template>
  <basic-container>
    <basic-wrapper>
      <div class="ya-row mr-b-10 clearfix">
        <ya-radio
          :query="query"
          value-key="timeType"
          title=""
          :radio-op="timeTypeOp"
          @updateQuery="updateQuery"
        />
        <date-picker
          :query="query"
          value-key="startTime"
          title="起报时间:"
          :type="query.timeType === 'day' ? 'day' : 'hour'"
          @updateQuery="updateQuery"
        />
        <ya-radio
          :query="query"
          value-key="mode"
          title="模式:"
          :radio-op="modeTypeOp"
          @updateQuery="updateQuery"
        />
      </div>
      <div class="ya-row mr-b-10 clearfix">
        <select-single
          :query="query"
          value-key="river"
          title="河流/湖库"
          :select-op="riverOp"
          @updateQuery="updateQuery"
          :disabled="!disabled"
        >
          <el-checkbox
            v-model="disabled"
            @change="checked = !checked"
            style="margin-right: 10px;"
          ></el-checkbox>
        </select-single>
        <select-single
          :query="query"
          value-key="admin"
          title="行政区"
          :disabled="!checked"
          :select-op="provinceOp"
          @updateQuery="updateQuery"
        >
          <template>
            <el-checkbox
              v-model="checked"
              @change="disabled = !disabled"
              style="margin-right: 10px;"
            ></el-checkbox>
          </template>
        </select-single>
        <select-multiply
          :query="query"
          value-key="dmType"
          title="断面"
          :select-op="dmOp"
          @updateQuery="updateQuery"
        />
        <ya-search @refresh="refresh" />
      </div>
    </basic-wrapper>
    <basic-wrapper>
      <history-table></history-table>
    </basic-wrapper>
  </basic-container>
</template>

<script>
import YaRadio from "@/components/Radio";
import SelectSingle from "@/components/SelectSingle";
import SelectMultiply from "@/components/SelectMultiply";

import YaSearch from "@/components/ButtonSearch";
import DatePicker from "@/components/DatePicker";
import HistoryTable  from './table'

export default {
  name: "ForecastHistory",
  components: {
    SelectSingle,
    YaRadio,
    SelectMultiply,
    YaSearch,
    DatePicker,
    HistoryTable
  },
  data() {
    return {
      disabled: true,
      checked: false,
      other: {
        zhibiao: ""
      },
      query: {
        timeType: "day",
        startTime: "",
        hour: "",
        mode: "LSTM",
        river: "all",
        admin: "all",
        dmType: [1]
      },
      waterThemeOp: [
        {
          value: "河流国省控",
          key: 1
        },
        {
          value: "湖库",
          key: 2
        },
        {
          value: "省控小流域",
          key: 3
        },
        {
          value: "水功能区",
          key: 5
        },
        {
          value: "河长办",
          key: 6
        },
        {
          value: "生态巡查",
          key: 7
        },
        {
          value: "饮用水",
          key: 9
        },
        {
          value: "地下水",
          key: 8
        }
      ],
      timeTypeOp: [
        {
          value: "日数据",
          key: "day"
        },
        {
          value: "小时数据",
          key: "hour"
        }
      ],
      modeTypeOp: [
        {
          value: "LSTM",
          key: "LSTM"
        },
        {
          value: "GRU",
          key: "GRU"
        }
      ],
      riverOp: [
        {
          value: "全部",
          key: "all"
        },
        {
          value: "沙溪",
          key: "1"
        },
        {
          value: "巴溪",
          key: "2"
        },
        {
          value: "九龙溪",
          key: "3"
        }
      ],
      provinceOp: [
        {
          value: "全部",
          key: "all"
        },
        {
          value: "燕东街道",
          key: "1"
        },
        {
          value: "燕西街道",
          key: "2"
        },
        {
          value: "燕南街道",
          key: "3"
        },
        {
          value: "燕北街道",
          key: "4"
        }
      ],
      dmOp: [
        {
          value: "永安洪田",
          key: 1
        },
        {
          value: "断面2",
          key: 2
        },
        {
          value: "断面3",
          key: 3
        },
        {
          value: "断面4",
          key: 4
        }
      ]
    };
  },
  methods: {
    updateQuery(val) {
      console.log(val);
    },
    refresh() {
      console.log("刷新");
    }
  }
};
</script>

<style lang="scss" scoped></style>
