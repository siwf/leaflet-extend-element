<template>
  <div class="ya-form">
    <p class="ya-row--title">时间：</p>
      <el-radio
      v-model="query[radio]"
      label="jd"
      style="margin-right: 10px;"
      >按季度</el-radio>
      <el-date-picker
      v-model="query[startKey]"
      @change="updateQuery"
      :style="{width: width + 'px'}"
      style="margin-right: 10px;"
      type="year"
      :clearable="false"
      :disabled="query[radio]==='mounth'"
      value-format="yyyy"
      placeholder="选择年"
      >
    </el-date-picker>
    <el-select v-model="query[startJdKey]" placeholder="选择季度" style="margin-right: 10px;"   :style="{width: width + 'px'}" @change="updateQuery" :disabled="query[radio]==='mounth'">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
    <span style="margin-right: 10px;">至</span>
    <el-date-picker
      v-model="query[endKey]"
      @change="updateQuery"
      :style="{width: width + 'px'}"
       style="margin-right: 10px;"
      type="year"
      :clearable="false"
      :disabled="radio==='mounth'"
      value-format="yyyy"
      placeholder="选择年"
      >
    </el-date-picker>
    <el-select v-model="query[endJdKey]" placeholder="选择季度" style="margin-right: 10px;"   :style="{width: width + 'px'}" @change="updateQuery" :disabled="query[radio]==='mounth'">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-radio
      v-model="query[radio]"
      label="mounth"
      style="margin-right: 10px;"
      >按月份</el-radio>

    <el-date-picker
      v-model="query[timeVal]"
      @change="updateQuery"
      style="width: 220px;"
      type="monthrange"
      :clearable="false"
      unlink-panels
      value-format="yyyy-MM"
      start-placeholder="开始日期"
      :disabled="query[radio]==='jd'"
      end-placeholder="结束日期"
    >
    </el-date-picker>
  </div>
</template>

<script>
import { parseTime, dateAdd } from "@/utils";
export default {
  name: 'TimeYear',
  props: {
    query: {
      type: Object,
      default: () => {}
    },
    // title: {
    //   type: String,
    //   default: () => '时间：'
    // },
    width: {
      type: String | Number,
      default: () => 120
    },
    startKey: {
      type: String,
      default: ""
    },
    endKey: {
      type: String,
       default: ""
    },
    startJdKey: {
      type: String,
       default: ""
    },
    endJdKey: {
      type: String,
       default: ""
    },
    timeVal: {
      type: String,
      default: () => ""
    },
    radio: {
      type: String,
      default: 'jd'
    }
  },
  data() {
    return {
      options: [
        {
          label: '第一季度',
          value: '01'
        },
        {
          label: '第二季度',
          value: '02'
        },
        {
          label: '第三季度',
          value: '03'
        },
        {
          label: '第四季度',
          value: '04'
        }
      ],
      mounths: [
        {
          label: '一月',
          value: '01'
        },
        {
          label: '二月',
          value: '02'
        },
        {
          label: '三月',
          value: '03'
        },
        {
          label: '四月',
          value: '04'
        },
        {
          label: '五月',
          value: '05'
        },
        {
          label: '六月',
          value: '06'
        },
        {
          label: '七月',
          value: '07'
        },
        {
          label: '八月',
          value: '08'
        },
        {
          label: '九月',
          value: '09'
        },
        {
          label: '十月',
          value: '10'
        },
        {
          label: '十一月',
          value: '11'
        },
        {
          label: '十二月',
          value: '12'
        },
      ]
    };
  },
  methods: {
    updateQuery() {
      this.$emit('updateQuery', this.query)
    }
  },
  created() {
    const nowDate = new Date();
    this.query[this.endKey] = parseTime(nowDate, "{y}");
    this.query[this.startKey] = parseTime(dateAdd(nowDate, "y", -2), "{y}");
    this.query[this.startJdKey] = '01'
    this.query[this.endJdKey] = '01'
    this.query[this.timeVal][1] = parseTime(nowDate, "{y}-{m}")
    this.query[this.timeVal][0] =  parseTime(dateAdd(nowDate, "M", -7), "{y}-{m}");
  }
}
</script>

<style lang="scss" scoped>
// .ya-time {
//   height: 35px;
//   line-height: 35px;
//   float: left;
//   margin-right: 20px;
// }
</style>