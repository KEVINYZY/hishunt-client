import api from '@/utils/api'

export function getInfo(token) {
  return api({
    url: '/login/GetInfo',
    method: 'get',
    params: {token}
  })
}


