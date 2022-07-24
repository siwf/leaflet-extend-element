<template>
  <div class="ya-form">
    <p class="ya-row--title">{{ title }}</p>
      <el-date-picker
      v-model="query[startKey]"
      @change="updateQuery"
      :style="{width: width + 'px'}"
      style="margin-right: 10px;"
      type="year"
      :clearable="false"
      value-format="yyyy"
      placeholder="选择年"
      >
    </el-date-picker>
    <span style="margin-right: 10px;">至</span>
    <el-date-picker
      v-model="query[endKey]"
      @change="updateQuery"
      :style="{width: width + 'px'}"
       style="margin-right: 10px;"
      type="year"
      :clearable="false"
      value-format="yyyy"
      placeholder="选择年"
      >
    </el-date-picker>
    <el-select v-model="query[mounthKey]" placeholder="选择月" style="margin-right: 10px;"   :style="{width: width + 'px'}" @change="updateQuery">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
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
    title: {
      type: String,
      default: () => '时间：'
    },
    width: {
      type: String | Number,
      default: () => 120
    },
    startKey: {
      type: String,
      required: true
    },
    endKey: {
      type: String,
      required: true
    },
    mounthKey: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      options: [
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
    this.query[this.startKey] = parseTime(dateAdd(nowDate, "y", -5), "{y}");
    this.query[this.mounthKey] = parseTime(nowDate, "{y}-{m}").substr(-2,)
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