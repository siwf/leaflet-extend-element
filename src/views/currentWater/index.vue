<template>
<!-- <div> -->
  <!-- <theme-control :theme-arr="themeArr" @updateTheme="updateTheme"></theme-control> -->
 <water-map />
 <!-- <layer-control @updateMapLayer="updateMapLayer" /> -->
<!-- </div> -->
</template>

<script>
// import ThemeControl from '@/components/ThemeControl'
import WaterMap from '@/components/WaterMap'
// import LayerControl from '@/components/LayerControl'
export default {
  name: 'CurrentWater',
  components: { WaterMap },
  data() {
    return {
      // themeArr: []
    }
  },
  methods: {

  },
}
</script>