<template>
  <div class="ya-form">
    <slot />
    <p class="ya-row--title">{{ title }}</p>
    <el-select v-model="query[valueKey]" placeholder="请选择" @change="updateQuery" :style="{width: width + 'px'}" :disabled="disabled">
    <el-option
      v-for="item in selectOp"
      :key="item.key"
      :label="item.value"
      :value="item.key">
    </el-option>
  </el-select>
  </div>
</template>

<script>
export default {
  name: 'YaSelect',
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
    selectOp: {
      type: Array,
      default: () => []
    },
    width: {
      type: String | Number,
      default: () => 160
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      // title: "监测类型"
    };
  },
  methods: {
    updateQuery() {
       this.$emit('updateQuery', this.query)
    }
  },
  created() {
    // console.log(this.valueKey)
  },
}
</script>

<style lang="scss" scoped>

</style>
