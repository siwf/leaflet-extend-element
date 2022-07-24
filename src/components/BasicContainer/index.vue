<template>
  <div class="b-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BasicContainer'
}
</script>

<style lang="scss" scoped>
.b-container {
  height: 100%;
  overflow-y: auto;
  width: 100%;
  margin: 0 auto;
  min-width: 1200px;
  position: relative;
  background-color: #F4F6F8;
  // padding: 10px 10px;
  overflow-x: hidden;
}
</style>