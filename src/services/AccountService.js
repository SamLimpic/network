import { AppState } from '../AppState'
import { Notification } from '../utils/Notification'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      Notification.toast('Error: ' + err, 'error')
    }
  }

  async editAccount(edit) {
    try {
      const res = await api.put('/account', edit)
      AppState.account = res.data
    } catch (err) {
      Notification.toast('Error: ' + err, 'error')
    }
  }
}

export const accountService = new AccountService()
