<template>
  <div class="ya-form">
    <p class="ya-row--title">{{ title }}：</p>
    <el-checkbox-group v-model="query[valueKey]" @change="updateQuery" style="display: inline-block;">
      <el-checkbox  v-for="item in selectOp" :key="item.key" :label="item.key">{{item.value}}</el-checkbox>
      <!-- <el-checkbox label="more">超标</el-checkbox> -->
    </el-checkbox-group>
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
    selectOp: {
      type: Array,
      default: () => [
        {
          value: '达标',
          key: '1'
        },
        {
          value: '超标',
          key: '0'
        },
      ]
    },
    title: {
      type: String,
      default: () => '达标情况'
    }
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

<style lang="scss">
// .ya-row--title {
//   font-weight: 500;
// }

</style>

<style scoped lang="scss">

</style>
