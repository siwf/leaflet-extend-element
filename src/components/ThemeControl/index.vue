<template>
  <div class="ya-theme clearfix">
    <div class="theme-left fl">
      <div class="left-btn">
        <div class="map-switch" @click="switchBtn = !switchBtn">
          <i v-if="!switchBtn" class="el-icon-arrow-left"></i>
          <i v-else class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div v-if="switchBtn && themeArr.length && activeTheme === 'dbs'" class="fl">
        <dbs-table></dbs-table>
      </div>
      <div v-if="switchBtn && themeArr.length && activeTheme === 'szdz'" class="fl">
        <szdz-table></szdz-table>
      </div>
      <div v-if="switchBtn && themeArr.length && activeTheme === 'wry'" class="fl">
        <wry-table></wry-table>
      </div>
      <div v-if="switchBtn && themeArr.length && activeTheme === 'rhpwk'" class="fl">
        <rhpwk-table></rhpwk-table>
      </div>
      <div v-if="switchBtn && themeArr.length && activeTheme === 'qxz'" class="fl">
        <qxz-table></qxz-table>
      </div>
      <div v-if="switchBtn && themeArr.length && activeTheme === 'sdz'" class="fl">
        <sdz-table></sdz-table>
      </div>
      <div v-if="switchBtn && themeArr.length && activeTheme === 'swz'" class="fl">
        <swz-table></swz-table>
      </div>
      <div v-if="switchBtn && themeArr.length && activeTheme === 'ncwsz'" class="fl">
        <ncwsz-table></ncwsz-table>
      </div>
      <div v-if="switchBtn && themeArr.length && activeTheme === 'yys'" class="fl">
        <yys-table></yys-table>
      </div>
    </div>
    <ul v-if="themeArr.length" :class="{ 'theme-right': switchBtn, 'hidden-right': !switchBtn }">
      <li
        class="theme-item"
        v-for="(item, index) in hasShow"
        :key="index"
        @click="themeChange(item.value)"
        :class="{ 'active-theme': item.value === activeTheme }"
      >
        <img
          style="margin-bottom: 10px;"
          :style="item.style"
          :src="item.value === activeTheme  ? require(`@/assets/img/${item.value}-active.png`) : require(`@/assets/img/${item.value}.png`)"
          alt=""
        />
        <p class="theme-label">{{ item.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import DbsTable  from '../HomeTable/dbs'
import SzdzTable  from '../HomeTable/szdz'
import WryTable   from '../HomeTable/wry'
import RhpwkTable   from '../HomeTable/pwk'
import QxzTable   from '../HomeTable/qxz'
import SdzTable   from '../HomeTable/sdz'
import SwzTable   from '../HomeTable/swz'
import NcwszTable   from '../HomeTable/ncwsz'
import YysTable   from '../HomeTable/yys'
export default {
  name: "ThemeControl",
  components: {
    DbsTable,
    SzdzTable,
    WryTable,
    RhpwkTable,
    QxzTable,
    SdzTable,
    SwzTable,
    NcwszTable,
    YysTable
  },
  props: {
    themeArr: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      switchBtn: true,
      // themeArr : ['dbs', 'szdz'],
      activeTheme: "dbs",
      themeOp: [
        {
          label: "地表水",
          value: "dbs",
          style: { width: "25px", height: "16px" }
        },
        {
          label: "水自动站",
          value: "szdz",
          style: { width: "24px", height: "27px" }
        },
        {
          label: "饮用水",
          value: "yys",
          style: { width: "27px", height: "25px" }
        },
        // {
        //   label: "地下水",
        //   value: "dxs",
        //
        // },
        {
          label: "污染源",
          value: "wry",
          style: { width: "21px", height: "28px" }
        },
        {
          label: "农村污水站",
          value: "ncwsz",
          style: { width: "29px", height: "28px" }
        },
        {
          label: "入河排污口",
          value: "rhpwk",
          style: { width: "24px", height: "23px" }
        },
        {
          label: "水电站",
          value: "sdz",
          style: { width: "22px", height: "20px" }
        },
        {
          label: "水文站",
          value: "swz",
          style: { width: "31px", height: "28px" }
        },
        {
          label: "气象站",
          value: "qxz",
          style: { width: "26px", height: "20px" }
        }
      ]
    };
  },
  computed: {
    hasShow() {
      return this.themeOp.filter(v => this.themeArr.includes(v.value));
    }
  },
  methods: {
    themeChange(val) {
      this.activeTheme = val;
      this.$emit("updateTheme", val);
    }
  },
  watch: {
    themeArr(n, o) {
      // 重置
      if (n.length === 1) {
        this.activeTheme = n[0];
      }
    }
  }
};
</script>

<style scoped lang="scss">
.ya-theme {
  position: absolute;
  top: 15px;
  right: 10px;
  z-index: 1111;
}
.theme-left {
  margin-right: 15px;
  display: flex;
  flex-direction: column;
}
.theme-right {
  width: 70px;
  overflow: hidden;
  background-color: #ffffff;
  border-top: 1px solid #d9d9d9;
  border-radius: 0px 0px 3px 3px;
}
.hidden-right {
  width: 0;
  height: 0;
  overflow: hidden;
}
.map-switch {
  width: 29px;
  height: 29px;
  text-align: right;
  background: #ffffff;
  box-shadow: 0px 3px 5px 0px rgba(142, 155, 176, 0.5);
  border-radius: 5px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  position: relative;
}
.left-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 9px;
}
.active-theme {
  color: #fff;
  background: linear-gradient(274deg, #00B6FF 0%, #0084FF 100%);
}
.theme-item {
  height: 74px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  &:hover {
    background: linear-gradient(274deg, #00B6FF 0%, #0084FF 100%);
    color: #ffffff;
  }
}
.theme-label {
  font-size: 12px;
}
</style>
