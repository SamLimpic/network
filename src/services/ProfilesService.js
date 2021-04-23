import { AppState } from '../AppState'
// import router from '../router'
import { api } from './AxiosService'

class ProfilesService {
  // async getAll() {
  //   const res = await api.get('api/profiles')
  //   AppState.profiles = res.data
  // }

  async getProfilesByQuery(query) {
    const res = await api.get(`api/profiles?query=${query}`)
    AppState.profiles = res.data
  }

  async getActiveProfile(id) {
    const res = await api.get(`api/profiles/${id}`)
    AppState.activeProfile = res.data
  }

  async getPostsByProfileId(id) {
    const res = await api.get(`api/profiles/${id}/posts`)
    AppState.posts = res.data
  }
}

export const profilesService = new ProfilesService()
