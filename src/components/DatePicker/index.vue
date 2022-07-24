<template>
  <div class="ya-form">
    <p class="ya-row--title" style="display: inline-block;">{{ title }}</p>
    <el-date-picker
      v-model="query[valueKey]"
      @change="updateQuery"
      :style="{ width: width + 'px' }"
      type="date"
      placeholder="选择日期"
    >
    </el-date-picker>

    <el-time-select
      v-if="type==='hour'"
      v-model="query[hourKey]"
      @change="updateQuery"
      :picker-options="{
        start: '00:00',
        step: '01:00',
        end: '23:00'
      }"
      :clearable="false"
      placeholder="小时"
      style="width: 100px; margin-left: 20px;"
    />
  </div>
</template>

<script>
import { parseTime } from "@/utils";
export default {
  props: {
    query: {
      type: Object,
      default: () => {}
    },
    valueKey: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: () => "起报时间："
    },
    width: {
      type: String | Number,
      default: () => 160
    },
    hourKey: {
      type: String,
      default: () => 'hour'
    },
    type: {
      type: String,
      default: () => 'day'
    }
  },
  data() {
    return {};
  },
  methods: {
    updateQuery() {
      this.$emit("updateQuery", this.query);
    },
    initTime() {
      const nowDate = new Date();
      this.query[this.valueKey] = parseTime(nowDate, "{y}-{m}-{d}");
      this.query[this.hourKey] = "00:00"
    }
  },
  created() {
    this.initTime();
  }
};
</script>

<style lang="scss" scoped>
// .ya-time {
//   height: 40px;
//   line-height: 40px;
//   float: left;
//   margin-right: 20px;
// }
// .ya-row--title {
//   margin-right: 10px;
//   font-size: 14px;
// }
</style>