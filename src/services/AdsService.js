import { AppState } from '../AppState'
// import router from '../router'
import { api } from './AxiosService'

class AdsService {
  async getAll() {
    const res = await api.get('api/ads')
    AppState.ads = res.data
  }
}

export const adsService = new AdsService()
