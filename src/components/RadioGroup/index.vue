<template>
  <div class="ya-form">
    <p class="ya-row--title">{{ title }}</p>
    <el-radio-group v-model="query[valueKey]" size="small">
      <el-radio-button v-for="(radio) in radioGrup " :key="radio.key" :label="radio.key">{{radio.value}}</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "YaTime",
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
      default: () => "起报时间："
    },
    width: {
      type: String | Number,
      default: () => 244
    },
    // radioGrup: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data() {
    return {
      radioGrup: [
        {
          key: '1',
          value: '水质类别'
        },
        {
          key: '2',
          value: 'CODMn'
        },
        {
          key: '3',
          value: 'TN'
        },
        {
          key: '4',
          value: 'NH3-N'
        },
        {
          key: '5',
          value: 'TP'
        },
        {
          key: '6',
          value: 'DO'
        },
      ]
    };
  },
  methods: {
    updateQuery() {
      this.$emit("updateQuery", this.query);
    }
  }
};
</script>

<style lang="scss" scoped>
// .ya-time {
//   height: 35px;
//   line-height: 35px;
//   float: left;
//   margin-right: 20px;
// }
// .ya-row--title {
//   margin-right: 10px;
//   font-size: 14px;
// }
</style>