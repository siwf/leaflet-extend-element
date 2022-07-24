 <!-- 引用水源评价-->
<template>
  <basic-container>
    <single-tap @changeCom="changeCom"></single-tap>
      <keep-alive>
        <component :is="activeComponent" :frequency="frequency" />
      </keep-alive>
  </basic-container>
</template>

<script>
import SingleTap from "./singleTap";
import YearCom from "./year";
import SingleCom from "./singleCom";
import PointCom from "./point";

export default {
  name: "WaterEvaluate",
  components: {
    SingleTap,
    SingleCom,
    YearCom,
    PointCom
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
      } else if(this.activeComponent === 'yearCom') {
        this.frequency = "1";
      } else {
        this.frequency = "2"
      }
    }
  }
};
</script>
