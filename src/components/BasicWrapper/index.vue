<template>
  <div class="b-wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BasicWrapper'
}
</script>

<style lang="scss" scoped>
.b-wrapper {
  width: 100%;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}
</style>