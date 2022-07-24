import request from '@/utils/request'
// import routesMenu from './routesTree'

export function getPoint() {
  return request({
    url: '/water/getAllpoint',
    method: 'get'
  })
}
// 获取各个主题总数
export function getAllCount() {
  return request({
    url: '/getAllCount',
    method: 'get'
  })
}
// 获取右侧地表水主题信息
export function getDbsThemeInfo() {
  return request({
    url: '/getThemeInfoDbs',
    method: 'get'
  })
}
// 获取右侧水自动站主题信息
export function getSzdzThemeInfo() {
  return request({
    url: '/getThemeInfoSzdz',
    method: 'get'
  })
}
// 获取右侧入河排污口主题信息
export function getThemeInfoRhpwk() {
  return request({
    url: '/getThemeInfoRhpwk',
    method: 'get'
  })
}

// 获取右侧气象主题信息
export function getThemeInfoQxz() {
  return request({
    url: '/getThemeInfoQxz',
    method: 'get'
  })
}
// 获取右侧水电站主题信息
export function getThemeInfoSdz() {
  return request({
    url: '/getThemeInfoSdz',
    method: 'get'
  })
}
// 获取右侧水文站主题信息
export function getThemeInfoSwz() {
  return request({
    url: '/getThemeInfoSwz',
    method: 'get'
  })
}

// 获取各个主题点位信息
export function getPointInfo() {
  return request({
    url: '/getPointInfo',
    method: 'get'
  })
}

// 获取地表水弹框基本信息
export function getPointDetailInfoDbs(staCode) {
  return request({
    url: '/getPointDetailInfoDbs',
    method: 'get',
    params: {
      staCode
    }
  })
}
// 获取地表水弹框echart图表数据
export function getPointMonitorInfoDbs(params) {
  return request({
    url: '/getPointMonitorInfoDbs',
    method: 'get',
    params
  })
}
// 获取水自动站基本信息
export function getPointDetailInfoSzdz(staCode) {
  return request({
    url: '/getPointDetailInfoSzdz',
    method: 'get',
    params: {
      staCode
    }
  })
}

// 获取水自动站弹框echart图表数据
export function getPointMonitorInfoSzdz(params) {
  return request({
    url: '/getPointMonitorInfoSzdz',
    method: 'get',
    params
  })
}
// 获取入河排污口基本信息
export function getPointDetailInfoRhpwk(staCode) {
  return request({
    url: '/getPointDetailInfoRhpwk',
    method: 'get',
    params: {
      staCode
    }
  })
}
// 获取农村污水站基本信息
export function getPointDetailInfoNcwsz(staCode) {
  return request({
    url: '/getPointDetailInfoNcwsz',
    method: 'get',
    params: {
      staCode
    }
  })
}
// 获取水电站基本信息
export function getPointDetailInfoSdz(staCode) {
  return request({
    url: '/getPointDetailInfoSdz',
    method: 'get',
    params: {
      staCode
    }
  })
}
// 获取水文站基本信息
export function getPointDetailInfoSwz(staCode) {
  return request({
    url: '/getPointDetailInfoSwz',
    method: 'get',
    params: {
      staCode
    }
  })
}
// 获取气象站基本信息
export function getPointDetailInfoQxz(staCode) {
  return request({
    url: '/getPointDetailInfoQxz',
    method: 'get',
    params: {
      staCode
    }
  })
}

// 获取右侧饮用水主题信息
export function getThemeInfoYys() {
  return request({
    url: '/getThemeInfoYys',
    method: 'get'
  })
}
// 获取右侧农村污水站主题信息
export function getThemeInfoNcwsz() {
  return request({
    url: '/getThemeInfoNcwsz',
    method: 'get'
  })
}

// 获取饮用水基本信息
export function getPointDetailInfoYys(staCode) {
  return request({
    url: '/getPointDetailInfoYys',
    method: 'get',
    params: {
      staCode
    }
  })
}

// 获取引用水弹框echart图表数据
export function getPointMonitorInfoYys(params) {
  return request({
    url: '/getPointMonitorInfoYys',
    method: 'get',
    params
  })
}

// 获取污染源基本信息
export function getPointDetailInfoWry(staCode) {
  return request({
    url: '/getPointDetailInfoWry',
    method: 'get',
    params: {
      staCode
    }
  })
}

// 获取污染源图表数据
export function getPointMonitorInfoWry(params) {
  return request({
    url: '/getPointMonitorInfoWry',
    method: 'get',
    params
  })
}

// 水质分析 水质指数CWQI 断面CWQI单次柱状图
export function getChartData(url, data, params) {
  return request({
    url,
    method: 'post',
    data,
    params: {
      ...params
    }
  })
}
