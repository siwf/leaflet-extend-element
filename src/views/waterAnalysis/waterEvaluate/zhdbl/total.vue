<template>
  <div class="ya-site">
    <title-name title="站点统计"></title-name>
    <ul class="ya-site--wrapper">
      <li class="ya-site--item">
        <p class="site-bg">
          <img src="@/assets/img/zhdbl/zdzs-i.png" alt=""  style="width: 30px; height: 25px;"/>
        </p>
        <div class="site-content">
          <p class="content-top">站点总数</p>
          <p class="content-bottom">{{ stationStatistics.stationsTotal }}</p>
        </div>
      </li>
      <li class="ya-site--item">
        <p class="site-bg">
          <img src="@/assets/img/zhdbl/tjcs-i.png" alt=""  style="width: 31px; height: 30px;"/>
        </p>
        <div class="site-content" v-if="type === 'manual'">
          <p class="content-top">统计次数</p>
          <p class="content-bottom">{{ stationStatistics.dataTotal }}</p>
        </div>
        <div class="site-content" v-else>
          <p class="content-top">在线</p>
          <p class="content-bottom">5</p>
        </div>
      </li>
      <li class="ya-site--item">
        <p class="site-bg">
          <img src="@/assets/img/zhdbl/dbcs-i.png" alt=""  style="width: 26px; height: 30px;"/>
        </p>
        <div class="site-content" v-if="type === 'manual'">
          <p class="content-top">达标次数</p>
          <p class="content-bottom">{{ stationStatistics.accord }}</p>
        </div>
        <div class="site-content" v-else>
          <p class="content-top">离线</p>
          <p class="content-bottom">5</p>
        </div>
      </li>
      <li class="ya-site--item">
        <p class="site-bg">
          <img src="@/assets/img/zhdbl/cbcs-i.png" alt=""  style="width: 26px; height: 30px;"/>
        </p>
        <div class="site-content" v-if="type === 'manual'">
          <p class="content-top">超标次数</p>
          <p class="content-bottom">{{ stationStatistics.exceed }}</p>
        </div>
        <div class="site-content" v-else>
          <p class="content-top">超标</p>
          <p class="content-bottom">10</p>
        </div>
      </li>
      <li class="ya-site--item">
        <p class="site-bg">
          <img src="@/assets/img/zhdbl/dm-i.png" alt=""  style="width: 30px; height: 18px;"/>
        </p>
        <div class="site-content" v-if="type==='manual'">
          <p class="content-top">超标次数最高断面</p>
          <p class="content-bottom">{{ stationStatistics.exceedSectionName }}</p>
        </div>
        <div class="site-content" v-else>
          <p class="content-top">达标</p>
          <p class="content-bottom">10</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TitleName from "../../common/siteTotal";
export default {
  components: { TitleName },
  props: {
    type: {
      type: Number | String,
      default: () => 'manual'
    },
    stationStatistics: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
.ya-site--wrapper {
  display: flex;
}
.ya-site--item {
  padding: 12px 0 8px 10px;
  flex: 1;
  height: 77px;
  display: flex;
  margin-right: 10px;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
}
.ya-site--item:nth-child(1) {
  background-image: url('../../../../assets/img/zhdbl/zdzs.png');
}
.ya-site--item:nth-child(2) {
  background-image: url('../../../../assets/img/zhdbl/tjcs.png');
}
.ya-site--item:nth-child(3) {
  background-image: url('../../../../assets/img/zhdbl/dbcs.png');
}
.ya-site--item:nth-child(4) {
  background-image: url('../../../../assets/img/zhdbl/cbcs.png');
}
.ya-site--item:nth-child(5) {
  background-image: url('../../../../assets/img/zhdbl/dm.png');
}
.site-bg {
  width: 48px;
  height: 48px;
  background: #ffffff;
  // border: 1px solid #a2f0ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.site-content {
  display: flex;
  height: 64;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
}
.content-top,
.content-bottom {
  text-align: center;
  color: #fff;
  font-size: 14px;
}
.content-bottom {
  font-weight: bold;
}
</style>
