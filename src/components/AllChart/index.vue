<template>
  <div :style="chartStyle" :id="chartId">
    <!-- 暂无数据 -->
  </div>
</template>
<script>
import echarts from "echarts";
import resize from "./resize";
export default {
  name: "ChartCard",
  mixins: [resize],
  props: {
    chartId: {
      type: String,
      default: () => ""
    },
    chartOp: {
      type: Object,
      default: () => ({})
    },
    chartStyle: {
      type: Object,
      default: () => ({})
    },
    classWrapper: {
      type: String,
      default: () => "b-wrapper"
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart(this.chartOp);
    });
  },
  data() {
    return {};
  },
  watch: {
    chartOp: {
      handler(n, o) {
        if (this.chart) {
          this.chart.showLoading({
            text: "加载中",
            color: "#c23531",
            textColor: "#000",
            maskColor: "rgba(255, 255, 255, 0.8)",
            zlevel: 0
          });
          setTimeout(() => {
            // setOption前隐藏loading事件
            this.chart.hideLoading();
            console.log(n)
            this.chart.setOption(n);
          }, 1000);
        }
      },
      deep: true
    }
  },
  methods: {
    initChart(option) {
      this.chart = echarts.init(document.getElementById(this.chartId));
      if (Object.keys(option).length) {
        this.chart.showLoading({
          text: "loading",
          color: "#c23531",
          textColor: "#000",
          maskColor: "rgba(255, 255, 255, 0.2)",
          zlevel: 0
        });
        setTimeout(() => {
          this.chart.hideLoading();
          this.chart.setOption(option);
        }, 1000);
      }
    }
  }
};
</script>
