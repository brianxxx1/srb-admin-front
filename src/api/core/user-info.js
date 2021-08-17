import request from '@/utils/request'

export default {
  getPageList(page, limit, searchObj) {
    return request({
      url: '/admin/core/userInfo/listPage/' + page + '/' + limit,
      method: 'get',
      params: searchObj
    })
  },
  lock(id, status) {
    return request({
      url: '/admin/core/userInfo/lock/' + id + '/' + status,
      method: 'put'
    })
  },
  getTop50(id) {
    return request({
      url: '/admin/core/userLoginRecord/listTop50/' + id,
      method: 'get'
    })
  }
}
