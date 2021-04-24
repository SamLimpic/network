import { AppState } from '../AppState'
// import router from '../router'
import { api } from './AxiosService'

class PeanutsService {
  async getAllPeanuts() {
    const res = await api.get('api/ads')
    AppState.peanuts = res.data
  }
}

export const peanutsService = new PeanutsService()
