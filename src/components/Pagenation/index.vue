<!--分页-->
<template>
  <div class="pagination-box">
    <el-pagination
      :page-size="page.pageSize"
      :total="page.total"
       background
      :current-page="page.pageNum"
      :layout="layout"
      @current-change="pageChangeHandler"
    />
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    layout: {
      type: String,
      default: "total, prev, pager, next, jumper"
    },
    page: {
      type: Object,
      required: true
    }
  },
  methods: {
    pageChangeHandler(e) {
      this.$emit("updateTable", e);
    }
  }
};
</script>
<style scoped>
.pagination-box {
  width: 100%;
  display: flex;
  /* margin-top: 6px; */
  /* justify-content: flex-end; */
  justify-content: center;
  align-items: center;
}
</style>
