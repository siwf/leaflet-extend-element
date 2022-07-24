 <!-- 断面水质评价-->
<template>
  <basic-container>
    <single-tap @changeCom="changeCom"></single-tap>
      <keep-alive>
        <component :is="activeComponent" :frequency="frequency" />
      </keep-alive>
  </basic-container>
</template>

<script>
import SingleTap from "../../common/singleTap";
import SingleCom from "./singleCom";
import SumCom from "./sumCom";

export default {
  name: "WaterEvaluate",
  components: {
    SingleTap,
    SingleCom,
    SumCom
  },
  data() {
    return {
      activeComponent: "singleCom",
      frequency: "0"
    };
  },
  methods: {
    /**
     * 改变单次还是多次参数
     */
    changeCom(val) {
      this.activeComponent = val
      if (this.activeComponent === 'singleCom') {
        this.frequency = "0";
      } else {
        this.frequency = "1";
      }
    }
  }
};
</script>
