import request from '@/utils/request'
export function waterTheme(url, data, params) {
  return request({
    url,
    method: 'post',
    data,
    params: {
      ...params
    }
  })
}