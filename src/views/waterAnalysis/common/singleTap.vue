<template>
  <div class="ya-tap mr-b-10">
    <p class="tap-left" @click="changeTap('singleCom')" :class="{ active: active === 'singleCom' }">
      单次
    </p>
    <span class="tap-line"></span>
    <p class="tap-right" @click="changeTap('sumCom')" :class="{ active: active === 'sumCom' }">
      累计
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
