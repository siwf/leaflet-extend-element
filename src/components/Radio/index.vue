<template>
  <div class="ya-form">
    <p v-if="title" class="ya-row--title" style="font-weight: 500;">{{ title }}</p>
    <el-radio-group v-model="query[valueKey]" @change="updateQuery">
      <el-radio :label="item.key" v-for="item in radioOp" :key="item.key">{{ item.value }}</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "YaRadio",
  props: {
    query: {
      type: Object,
      default: () => {}
    },
    valueKey: {
      type: String,
      required: true
    },
    radioOp: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      // title: "主题"
    };
  },
  created() {
    // console.log(this.valueKey)
  },
  methods: {
    updateQuery() {
       this.$emit('updateQuery', this.query)
    }
  },
};
</script>

<style lang="scss">

// .ya-row--title {
//   font-weight: 500;
//   margin-right: 10px;
//   // min-width: 60px;
//   float: left;
// }
</style>
