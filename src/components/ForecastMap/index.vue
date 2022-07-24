<template>
  <div class="map-wrapper">
    <div id="forecastMap" style="width: 100%; height: 100%"></div>
    <map-table v-bind="$attrs" v-on="$listeners"></map-table>
    <!-- <map-type @mapThemeFun="mapThemeFun" />
    <map-home @toCenter="toCenter" /> -->
    <time-bar></time-bar>
    <map-legend></map-legend>
    <weather-foeacast></weather-foeacast>
    <map-select :query="query"></map-select>
    <point-detail ref="point"></point-detail>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import chinaProvider from "leaflet.chinatmsproviders";
import "./warn/warn.js";
import "./warn/warn.css";
import MapType from "@/components/MapType";
import MapHome from "@/components/MapHome";
import MapTable from "@/components/ForecastTable";

import MapLegend from '@/components/ForecastLegend'
import WeatherFoeacast  from '@/components/WeatherFoeacast'
import MapSelect  from '@/components/MapSelect'
import PointDetail  from '@/components/ForecastDetail'
import TimeBar from "@/components/TimeLine";
import boundaryFile from "./geojson/yongan.js";
import { getPointInfo } from "@/api/waterMap";


// 地图
var map = null;
// 所有的图层组
var layerMap = null;
export default {
  name: "ForecastMap",
  components: { TimeBar, MapType, MapHome, MapTable, MapLegend, WeatherFoeacast, MapSelect, PointDetail },
  data() {
    return {
      themeArr: ["szdz"],
      query: {
        mode: 'lst'
      }
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
      map = L.map("forecastMap", {
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
      // L.control.zoom({ position: "bottomleft" }).addTo(map);
      //地图背景
      // const vectorLayer = L.tileLayer(this.url, {
      //   maxZoom: 18,
      //   minZoom: 4
      // })
      // this.vectorLayer = L.tileLayer.chinaProvider("GaoDe.Normal.Map", {
      //   maxZoom: 18,
      //   minZoom: 4
      // });
      this.vectorLayer = L.tileLayer.chinaProvider("GaoDe.Satellite.Map", { maxZoom: 18, minZoom: 4 })
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
        const data = res.content.filter(v => v.staType === 'szdz');
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
        this.updateMarkerLayer();
      });
    },
    // 根据不同的类型绑定不同的popup
    markPopup(type, marker, data) {
      if (type === "szdz") {
        marker.on('click', this.pointClick.bind(this, data));
      } 
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
        let mapDiv = document.getElementById("forecastMap");
        let divPopup = document.createElement("div");
        divPopup.setAttribute("id", "popup-box");
        divPopup.style.width = "504px";
        divPopup.style.height = "350px";
        mapDiv.appendChild(divPopup);
        provincePopup = divPopup;
      }
      provincePopup.innerHTML = `<div id="popup-wrapper"></div>`;
      document.getElementById("popup-wrapper").appendChild(component.vm.$el);
      map.flyTo([layer._latlng.lat, layer._latlng.lng], zoom, {
        duration: 0.3
      });
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
    },
    pointClick(v, layer) {
      this.$refs.point.show = true;
      this.$refs.point.pointDetail = v;
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
#forecastMap {
  background-color: #ffffff;
  // position: relative;
}
</style>
