<template>
  <div class="ya-form">
    <p class="ya-row--title">{{ title }}</p>
    <el-date-picker
      v-model="query[valueKey]"
      @change="updateQuery"
      :style="{ width: width + 'px' }"
      :type="type"
      :clearable="clearAble"
      unlink-panels
      :value-format="type === 'monthrange' ? 'yyyy-MM' : 'yyyy-MM-dd'"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
  </div>
</template>

<script>
import { parseTime, dateAdd } from "@/utils";
export default {
  name: "YaTime",
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
      default: () => "monthrange"
    },
    title: {
      type: String,
      default: () => "时间："
    },
    width: {
      type: String | Number,
      default: () => 244
    },
    // 是否清空日期
    emptyDate:{
      type:Boolean,
      default: false
    },
    // 清除日期
    clearAble:{
      type: Boolean,
      default: false
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
      this.query[this.valueKey] = [];
      if (this.type === "monthrange") {
        const endDate = parseTime(nowDate, "{y}-{m}");
        const startDate = parseTime(dateAdd(nowDate, "M", -1), "{y}-{m}");
        if (this.emptyDate == true) {
          this.query[this.valueKey] = ['', ''];
        } else {
          this.query[this.valueKey] = [startDate,endDate]
        }
      } else {
        const endDate = parseTime(nowDate, "{y}-{m}-{d}");
        const startDate = parseTime(dateAdd(nowDate, "d", -7), "{y}-{m}-{d}");
        this.query[this.valueKey] = [startDate, endDate];
      }
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
