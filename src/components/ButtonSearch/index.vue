<template>
  <div class="ya-form"><el-button type="primary" icon="el-icon-search" size="mini" round @click="refresh">查询</el-button></div>
</template>

<script>
export default {
  // name "ButtonSearch",
  methods: {
    refresh() {
      // console.log(1)
      this.$emit('refresh')
    }
  },
}
</script>
