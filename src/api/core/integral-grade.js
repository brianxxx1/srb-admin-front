import request from '@/utils/request'

export default {
  list() {
    return request({
      url: '/admin/core/IntegralGrade/list',
      method: 'get'
    })
  },
  deleteById(id) {
    return request({
      url: '/admin/core/IntegralGrade/remove/' + id,
      method: 'delete'
    })
  },
  save(IntegralGrade) {
    return request({
      url: '/admin/core/IntegralGrade/save',
      method: 'POST',
      data: IntegralGrade
    })
  },
  getById(id) {
    return request({
      url: '/admin/core/IntegralGrade/get/' + id,
      method: 'get'
    })
  },
  updateById(IntegralGrade) {
    return request({
      url: '/admin/core/IntegralGrade/update/',
      method: 'put',
      data: IntegralGrade
    })
  }
}
