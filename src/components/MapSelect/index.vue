<template>
  <div class="weather-select">
    <span>模式</span>
    <el-select
      v-model="query.mode"
      placeholder="请选择"
      @change="updateQuery"
      style="width: 100px;"
    >
      <el-option v-for="item in selectOp" :key="item.key" :label="item.value" :value="item.key">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    query: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {
      selectOp: [
        {
          key: 'lst',
          value: 'LST'
        },
        {
          key: 'gru',
          value: 'GRU'
        }
      ]
    }
  },
  methods: {
    updateQuery(val) {
      this.$emit('updateQuery', this.query)
    }
  },
}
</script>
<style lang="scss">
  .weather-select {
    .el-input__inner {
      border: none;
      border-color: transparent;
    }
  }
</style>

<style lang="scss" scope>
  .weather-select {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2111;
    color: #333333;
    font-size: 14px;
    display: flex;
    align-items: center;
    font-weight: bold;
    background-color: #fff;
    border-radius: 4px;
    padding: 0 4px;
  }
</style>
