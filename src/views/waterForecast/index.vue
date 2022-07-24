<template>
  <basic-container>
    <basic-wrapper>
      <div class="ya-row clearfix">
        <date-picker
          :query="query"
          value-key="startTime"
          title="起报时间:"
          @updateQuery="updateQuery"
        />
        <radio-group :query="query" value-key="index" title="参数:" @updateQuery="updateQuery" />
      </div>
    </basic-wrapper>
    <div class="m-forecast">
      <div class="m-left">
        <forecast-map @switchBtn="showRight = !showRight" :show-right="showRight"></forecast-map>
      </div>
      <div class="m-right" :class="{ hidden: !showRight }">
        <el-table :data="tableData" style="width: 100%" border :span-method="objectSpanMethod">
          <el-table-column label="永安市国考断面预报信息" align="center">
            <el-table-column prop="date" label="模型" align="center" width="60"> </el-table-column>
            <el-table-column prop="name" label="断面" align="center"> </el-table-column>
            <el-table-column
              v-for="value in theader"
              :key="value"
              :prop="value"
              :label="value"
              width="63"
              align="center"
            >
              <template slot-scope="{ row }">
                <p v-if="row[value] === 1" class="water-type-1">Ⅰ类</p>
                <p v-if="row[value] === 2" class="water-type-2">Ⅱ类</p>
                <p v-if="row[value] === 3" class="water-type-3">Ⅲ类</p>
                <p v-if="row[value] === 4" class="water-type-4">Ⅳ类</p>
                <p v-if="row[value] === 5" class="water-type-5">Ⅴ类</p>
                <p v-if="row[value] === 6" class="water-type-6">劣Ⅴ类</p>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <time-bar></time-bar> -->
  </basic-container>
</template>

<script>
import DatePicker from "@/components/DatePicker";
import RadioGroup from "@/components/RadioGroup";
import ForecastMap from "@/components/ForecastMap";
import { objectSpanMethod, mergeTableRow } from "@/utils";
export default {
  components: { DatePicker, RadioGroup, ForecastMap },
  data() {
    return {
      query: {
        startTime: "",
        index: 1
      },
      showRight: false,
      tableData: [
        {
          date: "LSTM",
          name: "永安贡川桥",
          "03-24": 5,
          "03-25": 4,
          "03-26": 4,
          "03-27": 4,
          "03-28": 4,
          "03-29": 4,
          "03-30": 5
        },
        {
          date: "LSTM",
          name: "杨梅岚",
          "03-24": 4,
          "03-25": 5,
          "03-26": 4,
          "03-27": 4,
          "03-28": 4,
          "03-29": 5,
          "03-30": 4
        },
        {
          date: "LSTM",
          name: "北区水厂",
          "03-24": 4,
          "03-25": 4,
          "03-26": 5,
          "03-27": 4,
          "03-28": 5,
          "03-29": 4,
          "03-30": 4
        },
        {
          date: "LSTM",
          name: "永安贡川桥",
          "03-24": 4,
          "03-25": 4,
          "03-26": 4,
          "03-27": 5,
          "03-28": 4,
          "03-29": 4,
          "03-30": 4
        },
        {
          date: "LSTM",
          name: "北区水厂",
          "03-24": 4,
          "03-25": 4,
          "03-26": 5,
          "03-27": 4,
          "03-28": 5,
          "03-29": 4,
          "03-30": 4
        },
        {
          date: "GRU",
          name: "永安贡川桥",
          "03-24": 4,
          "03-25": 5,
          "03-26": 4,
          "03-27": 4,
          "03-28": 4,
          "03-29": 5,
          "03-30": 4
        },
        {
          date: "GRU",
          name: "永安贡川桥",
          "03-24": 5,
          "03-25": 4,
          "03-26": 4,
          "03-27": 4,
          "03-28": 4,
          "03-29": 4,
          "03-30": 5
        }
      ],
      theader: []
    };
  },
  created() {
    const obj = this.tableData[0];
    for (const key in obj) {
      if (key !== "date" && key !== "name") {
        this.theader.push(key);
      }
    }
    this.tableData = mergeTableRow(this.tableData, ["date"]);
    this.$nextTick(() => {
      this.showRight = true
    })
  },
  methods: {
    updateQuery(e) {
      console.log(e);
    },
    objectSpanMethod
  }
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.m-forecast {
  background-color: #fff;
  padding: 0px 0px;
  // margin-bottom: 10px;
  height: calc(100vh - 90px);
  width: 100%;
  position: relative;
  display: flex;
  border-radius: 4px;
}
.m-left {
  flex: 1;
}
.m-right {
  width: 39%;
  overflow: hidden;
  transition: width 0.4s ease-in-out;
  padding: 0 10px;
}
.hidden {
  width: 0;
  transition: width 0.4s ease-in-out;
}

</style>
