<template>
  <div class="ya-tap mr-b-10">
    <p class="tap-left" @click="changeTap('singleCom')" :class="{ active: active === 'singleCom' }">
      单次达标评价
    </p>
    <span class="tap-line"></span>
    <p class="tap-right" @click="changeTap('yearCom')" :class="{ active: active === 'yearCom' }">
      年均值（累计值）达标评价
    </p>
    <span class="tap-line"></span>
    <p class="tap-right" @click="changeTap('pointCom')" :class="{ active: active === 'pointCom' }">
      点次达标评价
    </p>
  </div>
</template>

<script>
export default {
  name: "YaTap",
  data() {
    return {
      active: "singleCom"
    };
  },
  methods: {
    changeTap(val) {
      this.active = val;
      this.$emit('changeCom', val)
    }
  }
};
</script>