import request from '@/utils/request'

export default {
  getList(id) {
    return request({
      url: '/admin/core/lendReturn/list/' + id,
      method: 'get'
    })
  }
}
