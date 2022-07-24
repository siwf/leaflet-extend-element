<template>
  <div class="ya-form">
    <p class="ya-row--title">{{ title }}</p>
    <el-date-picker
      v-model="query[valueKey]"
       @change="updateQuery"
      :style="{ width: width + 'px' }"
      :type="type"
      :clearable="false"
      placeholder="选择月">
    </el-date-picker>
  </div>
</template>

<script>
import { parseTime, dateAdd } from "@/utils";
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
    type: {
      type: String,
      default: () => "month"
    },
    title: {
      type: String,
      default: () => "时间："
    },
    width: {
      type: String | Number,
      default: () => 120
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
      this.query[this.valueKey] = '';
      if (this.type === "month") {
        // const endDate = parseTime(nowDate, "{y}-{m}");
        const startDate = parseTime(dateAdd(nowDate, "M", -1), "{y}-{m}");
        this.query[this.valueKey] = startDate
      }
      // else {
      //   const endDate = parseTime(nowDate, "{y}-{m}-{d}");
      //   const startDate = parseTime(dateAdd(nowDate, "d", -7), "{y}-{m}-{d}");
      //   this.query[this.valueKey] = [startDate, endDate];
      // }
    }
  },
  created() {
    this.initTime();
  },
  watch: {
    type: function(n, o) {
      this.initTime();
    }
  }
};
</script>

<style lang="scss" scoped>
// .ya-time {
//   height: 35px;
//   line-height: 35px;
//   float: left;
//   margin-right: 20px;
// }
</style>
