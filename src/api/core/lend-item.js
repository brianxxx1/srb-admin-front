import request from '@/utils/request'

export default {
  list(id) {
    return request({
      url: '/admin/core/lendItem/list/' + id,
      method: 'get'
    })
  }
}
