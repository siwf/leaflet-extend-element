<template>
  <div class="ya-form">
    <p class="ya-row--title">时间：</p>
    <el-radio
      v-model="query[radio]"
      label="jd"
      @change="updataradion"
      style="margin-right: 10px;"
    >时间段</el-radio>
    <el-date-picker
      v-model="query[timeVal]"
      @change="updateQuery"
      style="width: 220px;"
      type="monthrange"
      :clearable="true"
      unlink-panels
      value-format="yyyy-MM"
      start-placeholder="开始日期"
      :disabled="query[radio]==='mounth'"
      end-placeholder="结束日期"
    >
    </el-date-picker>
    <el-radio
      v-model="query[radio]"
      @change="updataradion"
      label="mounth"
      style="margin-left: 20px;"
    >时间点</el-radio>
    <el-date-picker
      v-model="query[dateVal]"
      @change="updateQuery"
      :style="{width: width + 'px'}"
      style="margin-left: -20px;"
      type="month"
      :clearable="true"
      :disabled="query[radio]==='jd'"
      value-format="yyyy-MM"
      placeholder="选择年月"
    >
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
      width: {
        type: String | Number,
        default: () => 150
      },
      dateVal: {
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

      };
    },
    methods: {
      updataradion(e){
        if (e == 'mounth') {
          this.query[this.timeVal] = ['',''];
        } else {
          this.query[this.dateVal] = '';
        }
      },
      updateQuery() {
        this.$emit('updateQuery', this.query)
      }
    },
    created() {
      const nowDate = new Date();
      /*
      this.query[this.startKey] = parseTime(dateAdd(nowDate, "y", -2), "{y}");
      this.query[this.timeVal][1] = parseTime(nowDate, "{y}-{m}")
      this.query[this.timeVal][0] =  parseTime(dateAdd(nowDate, "M", -7), "{y}-{m}");
      */
      this.query[this.startKey] = '';
      this.query[this.timeVal][1] = '';
      this.query[this.timeVal][0] = '';
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
