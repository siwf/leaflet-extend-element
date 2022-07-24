<template>
  <div class="ya-form">
    <p class="ya-row--title">{{ title }}:</p>
    <el-select
      v-model="query[valueKey]"
      placeholder="请选择"
      multiple
      collapse-tags
      @change="updateQuery"
      size="small"
      :style="{width: width + 'px'}"
    >
      <el-option v-for="item in selectOp" :key="item.key" :label="item.value" :value="item.key">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "YaSelect",
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
      default: () => ''
    },
    width: {
      type: String | Number,
      default: () => 200
    },
    selectOp: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
    };
  },
  created() {
    // console.log(this.valueKey);
  },
  methods: {
    updateQuery() {
      this.$emit("updateQuery", this.query);
    }
  }
};
</script>

<style lang="scss" scoped>
// .ya-select {
//   height: 35px;
//   line-height: 35px;
//   float: left;
//   margin-right: 20px;
// }
</style>
