<template>
  <div class="modal fade"
       id="edit-account-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
       v-if="account && peanuts[0] != null"
  >
    >
    <div class="modal-dialog shadow" role="document">
      <div class="modal-content">
        <div class="modal-header text-left text-light bg-info my-auto">
          <h5 class="modal-title" id="exampleModalLabel">
            Edit Profile
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="editAccount">
          <div class="modal-body pt-0">
            <div class="row pb-4 position-relative">
              <div class="col-12 px-0">
                <img class="img-banner img-fluid" :src="account.coverImg" alt="Account Banner" v-if="account.coverImg" />
                <img class="img-banner img-fluid" :src="peanuts[1].banner" alt="Banner Peanut" v-else />
              </div>
            </div>
            <div class="row justify-content-between img-overlay m-0 p-0">
              <div class="col-4">
                <img class="profile-icon icon-border" :src="account.picture" alt="" />
              </div>
              <div class="col-4 ml-md-5 ml-0 input-group-sm">
                <input type="text"
                       class="form-control ml-md-4 ml-0"
                       id="banner-img"
                       placeholder="Img Url"
                       v-model="state.edit.coverImg"
                >
              </div>
            </div>
            <div class="row text-md-center text-right">
              <div class="col-10 ml-4">
                <h5>{{ account.name }}</h5>
              </div>
            </div>
            <div class="row form-group mt-3">
              <div class="col-md-5 col-4 input-group-sm">
                <label for="profile-img"><small>Profile Img</small></label>
                <input type="text"
                       class="form-control"
                       id="profile-img"
                       placeholder="Img Url"
                       v-model="state.edit.picture"
                >
              </div>
              <div class="col-5 input-group-sm">
                <label for="class"><small>Class Session</small></label>
                <input type="text"
                       class="form-control"
                       id="class"
                       placeholder="Session"
                       v-model="state.edit.class"
                >
              </div>
              <div class="col-md-2 col-3 text-md-center text-left pl-2">
                <label for="graduated"><small>Graduate</small></label>
                <div class="form-check text-center pt-1">
                  <input class="form-check-input position-static"
                         type="checkbox"
                         id="graduated"
                         value="option1"
                         aria-label="graduated"
                         v-model="state.edit.graduated"
                  >
                </div>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-4 input-group-sm">
                <label for="github"><small>GitHub</small></label>
                <input type="text"
                       class="form-control"
                       id="github"
                       placeholder="Url"
                       v-model="state.edit.github"
                >
              </div>
              <div class="col-4 input-group-sm">
                <label for="linkedin"><small>LinkedIn</small></label>
                <input type="text"
                       class="form-control"
                       id="linkedin"
                       placeholder="Url"
                       v-model="state.edit.linkedin"
                >
              </div>
              <div class="col-4 input-group-sm">
                <label for="resume"><small>Resume</small></label>
                <input type="text"
                       class="form-control"
                       id="resume"
                       placeholder="Url"
                       v-model="state.edit.resume"
                >
              </div>
            </div>
            <div class="row form-group">
              <div class="col input-group-sm">
                <label for="bio"><small>Bio</small></label>
                <textarea type="text"
                          class="form-control"
                          id="bio"
                          placeholder="Tell us about yourself!"
                          rows="3"
                          v-model="state.edit.bio"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-outline-info">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import Notification from '../utils/Notification'

export default {
  name: 'EditAccountModal',
  setup() {
    const state = reactive({
      edit: {}
    })
    return {
      state,
      async editAccount() {
        try {
          await accountService.editAccount(state.edit)
          // NOTE reseting to the empty object resets the input fields
          state.edit = {}
          // REVIEW CLOSING THE MODAL
          // eslint-disable-next-line no-undef
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      account: computed(() => AppState.account),
      peanuts: computed(() => AppState.peanuts)
    }
  }

}
</script>

<style lang="scss" scoped>
.img-banner {
  width: 100%;
  height: 8rem;
  object-fit: cover;
}
.img-overlay {
    position: absolute;
    top: 5rem;
}
.profile-icon {
  max-width: 7rem;
  height: auto;
}
</style>
