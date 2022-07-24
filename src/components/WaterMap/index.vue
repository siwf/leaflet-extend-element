<template>
  <div class="map-wrapper">
    <div id="waterMap" style="width: 100%; height: 100%"></div>
    <theme-control :theme-arr="themeArr"></theme-control>
    <layer-control @updateMapLayer="updateMapLayer" />
    <water-type />
    <map-legend />
    <map-type @mapThemeFun="mapThemeFun" />
    <map-home @toCenter="toCenter" />
  </div>
</template>

<script>
import Vue from "vue";
import ThemeControl from "@/components/ThemeControl";
// import WaterMap from '@/components/WaterMap'
import LayerControl from "@/components/LayerControl";
import WaterType from "@/components/WaterType";
import MapLegend from "@/components/MapLegend";
import MapType from "@/components/MapType";
import MapHome from "@/components/MapHome";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import chinaProvider from "leaflet.chinatmsproviders";
import "./warn/warn.js";
import "./warn/warn.css";
import boundaryFile from "./geojson/yongan.js";
import { getPointInfo } from "@/api/waterMap";

import dbsPopup from "./popup/dbs";
import wryPopup from "./popup/wry";
import sdzPopup from "./popup/sdz";
import rhpwkPopup from "./popup/rhpwk";
import szdzPopup from "./popup/szdz";
import ncwszPopup from "./popup/ncwsz";
import yysPopup from "./popup/yys";
import swzPopup from "./popup/swz";
import qxzPopup from "./popup/qxz";

const dbsInstance = Vue.extend(dbsPopup);
const wryInstance = Vue.extend(wryPopup);
const sdzInstance = Vue.extend(sdzPopup);
const rhpwkInstance = Vue.extend(rhpwkPopup);
const szdzInstance = Vue.extend(szdzPopup);
const ncwszInstance = Vue.extend(ncwszPopup);

const yysInstance = Vue.extend(yysPopup);
const swzInstance = Vue.extend(swzPopup);
const qxzInstance = Vue.extend(qxzPopup);

// 地图
var map = null;
// 所有的图层组
var layerMap = null;
export default {
  name: "WaterMap",
  components: { ThemeControl, LayerControl, WaterType, MapLegend, MapType, MapHome },
  data() {
    return {
      themeArr: ["dbs"],
      // 排污口类型弹框组件
      rhpwkComponent: null,
      // 污水处理厂类型弹框组件
      wryComponent: null,
      // 地表水类型弹框组件
      dbsComponent: null,
      // 水电站弹框组件
      sdzComponent: null,
      // 水自动站
      szdzComponent: null,
      // 农村污水站
      ncwszComponent: null,
      // 饮用水
      yysComponent: null,
      // 水文站
      swzComponent: null,
      // 气象战
      qxzComponent: null,
      vectorLayer: null,
      hoverLayer: null
    };
  },
  created() {
    layerMap = new Map();
    map = null;
    this.initPointLayer();
  },
  mounted() {
    this._initMap();
  },
  methods: {
    _initMap() {
      // 地图
      map = L.map("waterMap", {
        renderer: L.canvas(),
        center: [25.94136, 117.3651],
        zoom: 14, //初始化地图的缩放.
        minZoom: 4,
        keepInView: true,
        maxZoom: 18,
        crs: L.CRS.EPSG3857,
        fullscreenControl: false,
        zoomControl: false,
        doubleClickZoom: false,
        attributionControl: false
      });
      L.control.zoom({ position: "bottomleft" }).addTo(map);
      //地图背景
      // const vectorLayer = L.tileLayer(this.url, {
      //   maxZoom: 18,
      //   minZoom: 4
      // })
      // this.vectorLayer = L.tileLayer.chinaProvider("GaoDe.Normal.Map", {
      //   maxZoom: 18,
      //   minZoom: 4
      // });
      this.vectorLayer = L.tileLayer(
        "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 16, minZoom: 4 }
      );
      this.vectorLayer.addTo(map);
      // 永安市边界线
      const geoJson = L.geoJSON(boundaryFile, {
        style: function() {
          return {
            color: "#0098EE",
            fillColor: "#0098EE",
            fillOpacity: 0.1,
            stroke: true,
            weight: 2
          };
        }
      }).addTo(map);
      map.fitBounds(geoJson.getBounds());
    },
    // 更新marker
    updateMapLayer(val) {
      this.themeArr = val;
      this.updateMarkerLayer();
    },
    initPointLayer() {
      getPointInfo().then(res => {
        const data = res.content;
        data.map(v => {
          // 获取当前类型的图层组
          let layer = layerMap.get(v.staType);
          let waterColorMarker = null;
          let img = null;
          if (v.staType !== "dbs") {
            img = require(`@/assets/img/map/${v.staType}.png`);
          } else {
            if (v.staAttr === "国控") {
              img = require(`@/assets/img/map/gk-m.png`);
            } else {
              img = require(`@/assets/img/map/sk-m.png`);
            }
          }
          // 类别图标
          const marker = L.marker([v.latitude, v.longitude], {
            icon: L.icon({
              iconUrl: img,
              iconSize: [31, 39],
              iconAnchor: [12, 31]
            }),
            data: v
          });
          // 根据水质类别获取水质颜色
          const waterTypeColor = this.waterColorByType(v.waterGrade);
          // 超标图标
          if (v.alarm) {
            // 超标需要闪烁
            waterColorMarker = L.blinkMarker(
              [v.latitude, v.longitude],
              {
                iconSize: [18, 18],
                color: waterTypeColor,
                diveColor: "red",
                level: "3",
                speedTime: 1
              },
              v
            );
          } else {
            // 正常图标
            waterColorMarker = L.blinkMarker(
              [v.latitude, v.longitude],
              {
                iconSize: [18, 18],
                color: waterTypeColor,
                diveColor: "",
                level: "",
                speedTime: ""
              },
              v
            );
          }
          // 首次创建图层组
          if (!layer) {
            layerMap.set(v.staType, L.layerGroup());
            layer = layerMap.get(v.staType);
          }
          // 这里有顺序
          layer.addLayer(waterColorMarker);
          layer.addLayer(marker);

          this.markPopup(v.staType, marker, v);
          this.markPopup(v.staType, waterColorMarker, v);
        });
        // 默认首次加载地表水图层
        this.updateMarkerLayer();
      });
    },
    // 根据不同的类型绑定不同的popup
    markPopup(type, marker, data) {
      if (type === "dbs") {
        marker.bindPopup(this.popupEvent.bind(this, data, this.dbsComponent, dbsInstance));
      } else if (type === "szdz") {
        marker.bindPopup(this.popupEvent.bind(this, data, this.szdzComponent, szdzInstance));
      } else if (type === "yys") {
        marker.bindPopup(this.popupEvent.bind(this, data, this.yysComponent, yysInstance));
      } else if (type === "wry") {
        marker.bindPopup(this.popupEvent.bind(this, data, this.wryComponent, wryInstance));
      } else if (type === "ncwsz") {
        marker.bindPopup(this.popupEvent.bind(this, data, this.ncwszComponent, ncwszInstance));
      } else if (type === "rhpwk") {
        marker.bindPopup(this.popupEvent.bind(this, data, this.rhrhpwkComponent, rhpwkInstance));
      } else if (type === "sdz") {
        marker.bindPopup(this.popupEvent.bind(this, data, this.sdzComponent, sdzInstance));
      } else if (type === "swz") {
        marker.bindPopup(this.popupEvent.bind(this, data, this.swzComponent, swzInstance));
      } else if (type === "qxz") {
        marker.bindPopup(this.popupEvent.bind(this, data, this.qxzComponent, qxzInstance));
      }
      // marker.on("mouseover", this.throttle(this.hoverLayerOpen.bind(this,), 400));
      // marker.on("mouseout", this.throttle(this.hoverLayerDel.bind(this), 400));
    },
    // 根据类型获取水质颜色
    waterColorByType(waterType) {
      const colorArr = [
        "#999999",
        "#82D3F8",
        "#00A7F0",
        "#6FB602",
        "#FFFF00",
        "#F59B23",
        "#D9021B",
        "#1BC88D"
      ];
      return colorArr[waterType];
    },
    // 更新图层组
    updateMarkerLayer() {
      const allLayer = layerMap.entries();
      for (const [key, layer] of allLayer) {
        if (!this.themeArr.includes(key)) {
          map.hasLayer(layer) && map.removeLayer(layer);
        } else {
          !map.hasLayer(layer) && map.addLayer(layer);
        }
      }
    },
    // 初始化详情dom 和 点位缩放移动
    initDetailDom(component, layer) {
      const zoom = map.getZoom();
      let provincePopup = document.getElementById("popup-box");
      if (!provincePopup) {
        let mapDiv = document.getElementById("waterMap");
        let divPopup = document.createElement("div");
        divPopup.setAttribute("id", "popup-box");
        divPopup.style.width = "504px";
        divPopup.style.height = "350px";
        mapDiv.appendChild(divPopup);
        provincePopup = divPopup;
      }
      provincePopup.innerHTML = `<div id="popup-wrapper"></div>`;
      document.getElementById("popup-wrapper").appendChild(component.vm.$el);
      setTimeout(() => {
        map.flyTo([layer._latlng.lat, layer._latlng.lng], zoom, {
        duration: 0.3
      });
      }, 1000)
      return provincePopup;
    },
    mapThemeFun(value) {
      map.removeLayer(this.vectorLayer);
      this.vectorLayer = null;
      if (value === "normal") {
        this.vectorLayer = L.tileLayer(
          "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 18, minZoom: 4 }
        ).addTo(map);
      } else if (value === "satellite") {
        this.vectorLayer = L.tileLayer
          .chinaProvider("GaoDe.Satellite.Map", { maxZoom: 18, minZoom: 4 })
          .addTo(map);
      } else if (value === "night") {
        this.vectorLayer = L.tileLayer(
          "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 18, minZoom: 4 }
        ).addTo(map);
      }
    },
    toCenter() {
      const zoom = map.getZoom();
      map.flyTo([25.94136, 117.3651], zoom, {
        duration: 0.4
      });
    },
    popupEvent(data, component, instance, layer) {
      // this.hoverLayerDel()
      if (!component) {
        component = new instance({
          propsData: {
            popupData: data
          }
        });
        component.vm = component.$mount();
      }
      component.popupData = data;
      const provincePopup = this.initDetailDom(component, layer);
      return provincePopup;
    },
    beforeDestroy() {
      map = null;
      layerMap = null;
    },
    hoverLayerOpen(v) {
      // console.log(v)
      if (!this.hoverLayer) {
        this.hoverLayer = L.popup();
      }
      const htmlContent = `<div class="map-hover">${v.target.options.data.staName}</div>`;
      this.hoverLayer
        .setLatLng([v.target.options.data.latitude, v.target.options.data.longitude])
        .setContent(htmlContent);

      !map.hasLayer(this.hoverLayer) && map.addLayer(this.hoverLayer);
    },
    hoverLayerDel() {
      map.hasLayer(this.hoverLayer) && map.removeLayer(this.hoverLayer)
    },
    throttle(fn, interval = 1000) {
      let timer = null;
      return function(...args) {
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            fn.call(this, ...args);
          }, interval);
        }
      };
    }
  }
};
</script>
<style lang="scss">
.leaflet-bottom {
  bottom: 34px;
}
.leaflet-popup-content-wrapper {
  background: rgba(255, 255, 255, 1);
}

.leaflet-popup-content {
  width: auto !important;
  margin: 10px 10px;
}
.leaflet-container a.leaflet-popup-close-button {
  top: 4px;
  right: 6px;
  color: #00a7f0;
}

.leaflet-control-scale-line:not(:first-child) {
  display: none;
}

#popup-wrapper {
  width: 100%;
  height: 100%;
}
.leaflet-touch .leaflet-bar a {
  height: 24px;
  width: 24px;
  font-size: 16px;
  line-height: 24px;
}
.map-hover {
  min-width: 140px !important;
  text-align: center;
  padding-top: 10px;
}
</style>

<style lang="scss" scoped>
.map-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
}
#waterMap {
  background-color: #ffffff;
  // position: relative;
}
</style>
