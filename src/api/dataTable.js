import request from '@/utils/request'
export function initTableData(url, data, params) {
  return request({
    url,
    method: 'post',
    params,
    data
  })
}

export function exportExcel(url, params, data, method = 'get') {
  return request({
    url: url,
    method,
    params,
    data,
    responseType: 'blob'
  })
}

// 获取最新时间
export function getLastUpdateTime(url,method = 'get') {
    return request({
      url:url,
      method
    })
}
