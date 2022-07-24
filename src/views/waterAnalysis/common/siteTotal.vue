<template>
  <div class="ya-row row-title h-40">
    <p class="ya-row--title">{{ title }}：</p>
    <!-- <slot /> -->
  </div>
</template>

<script>
export default {
  name: 'TitleName',
  props: {
    title: {
      type: String,
      default: () => ''
    }
  }
}
</script>