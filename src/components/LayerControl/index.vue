<template>
  <div class="ya-map">
    <div class="map-select">
      <div class="select-top" @click="layerSwitch">监管对象</div>
      <div :class="{showOp: switchBtn, hiddenOp: !switchBtn }">
        <ul class="select-content">
          <el-checkbox-group v-model="themeArr" @change="handlethemeArrChange">
            <li
              v-for="(city, index) in layerArr"
              :key="index"
              :class="{ 'content-active': isActive(city.themeCode) }"
              class="content-item"
            >
              <el-checkbox :label="city.themeCode">
                <span class="select-label">{{ city.themeName }}</span>
                <span class="select-num">{{ city.total }}</span>
              </el-checkbox>
            </li>
          </el-checkbox-group>
          <!-- <li v-for="item in layerArr" :key="item.value">{{ item.label }}</li> -->
        </ul>
        <div class="select-bottom">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            style="font-weight: 550;"
            >全选</el-checkbox
          >
          <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
          <div class="select-reset" @click="reset">
            <i class="el-icon-refresh" style="margin-right: 4px;" />重置
          </div>
        </div>
      </div>
    </div>
    <div class="map-switch" @click="layerSwitch">
      <i v-if="!switchBtn" class="el-icon-arrow-down"></i>
      <i v-else class="el-icon-arrow-up"></i>
    </div>
  </div>
</template>

<script>
import { getAllCount } from '@/api/waterMap'
export default {
  name: "LayerControl",
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      themeArr: ["dbs"],
      layerArr: [],
      switchBtn: true
    };
  },
  computed: {
    isActive(type) {
      return function(type) {
        return this.themeArr.includes(type);
      };
    }
  },
  created() {
    this.getThemeList()
  },
  methods: {
    handleCheckAllChange(val) {
      this.themeArr = val ? this.layerArr.map(v => v.themeCode) : [];
      this.isIndeterminate = false;
      this.$emit('updateMapLayer', this.themeArr)
    },
    handlethemeArrChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.themeArr.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.layerArr.length;
      this.$emit('updateMapLayer', this.themeArr)
    },
    reset() {
      this.themeArr = ["dbs"];
      this.isIndeterminate = true;
      this.checkAll = false;
      this.$emit('updateMapLayer', this.themeArr)
    },
    layerSwitch() {
      this.switchBtn = !this.switchBtn
      // this.$emit('updateMapLayer', this.themeArr)
    },
    getThemeList() {
      getAllCount().then(res => {
        this.layerArr = res.content;
      })
    }
  }
};
</script>
<style lang="scss">
.select-content {
  .el-checkbox {
    height: 38px;
    margin-right: 0;
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .select-label {
    color: #333333;
    font-weight: 550;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #fff;
  }
  .select-label {
    display: inline-block;
    width: 80px;
  }
  .content-active .el-checkbox__input.is-checked .el-checkbox__inner {
    background: linear-gradient(274deg, #00b6ff 0%, #0084ff 100%);
    border-color: #ffffff;
  }
  .content-active .el-checkbox__label,
  .content-active .select-label {
    color: #ffffff;
  }
}
</style>

<style lang="scss" scoped>
.ya-map {
  width: 220px;
  display: flex;
  font-size: 14px;
  color: #333333;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1111;
}
.content-item {
  padding: 0 10px;
  // margin-bottom: 1px;
  border-bottom: 1px solid #fff;
}
.map-select {
  width: 138px;
  background: #ffffff;
  box-shadow: 0px 3px 5px 0px rgba(142, 155, 176, 0.5);
  border-radius: 5px;
}
.select-top,
.select-bottom {
  padding: 0 10px;
  height: 32px;
  line-height: 32px;
  font-weight: 550;
}
.select-top {
  cursor: pointer;
  border-bottom: 1px solid #D9D9D9;
}
.select-content {
  border-bottom: 1px solid #d9d9d9;
}
.content-active {
  background: linear-gradient(274deg, #00b6ff 0%, #0084ff 100%);
  color: #fff;
}
.map-switch {
  width: 30px;
  height: 30px;
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
.select-bottom {
  display: flex;
  // height: 28px;
  align-items: center;
}
.select-reset {
  font-size: 14px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.showOp {
  max-height: 489px;
}
.hiddenOp {
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s ease-in-out;
}
</style>
