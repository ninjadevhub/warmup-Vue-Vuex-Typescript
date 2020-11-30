<template>
  <div class="account-details">
    <base-tabs v-model="activeTab">
      <v-tab>Details</v-tab>
    </base-tabs>
    <base-tabs-items v-model="activeTab">
      <v-tab-item>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="7">
              <div class="account-details__title mb-1">
                Account Information
              </div>
              <v-divider />
              <div class="mt-3 mb-2">{{ userFullName }}</div>
              <div>{{ user.data.email }}</div>
            </v-col>
          </v-row>
          <v-row class="mt-16">
            <v-col cols="12" md="7">
              <div class="account-details__title mb-1">
                Change password
              </div>
              <v-divider />
              <v-row class="mt-4">
                <v-col cols="12" sm="4" class="d-flex align-end">
                  <base-input custom-label="Old password" variant="normal" class="account-details__input" />
                </v-col>
                <v-col cols="12" sm="4" class="d-flex align-end">
                  <base-input custom-label="New password" variant="normal" class="account-details__input" />
                </v-col>
                <v-col cols="12" sm="4" class="d-flex align-end">
                  <base-button class="account-details__submit text-capitalize px-6">
                    Save
                  </base-button>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </base-tabs-items>
    <v-overlay :value="isLoading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import RequestStatus from '@/constants/RequestStatus'
import UserRepository from '@/data/repository/UserRepository'
import { FailureResponse, isFailureResponse } from '@/types/Response'
import User from '@/types/User'
import { getErrorMessage, sendFlashMessage } from '@/utils/misc'
import { AxiosResponse } from 'axios'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheAccountDetails extends Vue {
  activeTab = 0
  status: RequestStatus = RequestStatus.Initial
  user: User | null = null

  get isLoading (): boolean {
    return this.status === RequestStatus.Loading
  }

  get userFullName (): string | null {
    return this.user && `${this.user.data.first_name} ${this.user.data.last_name}`
  }

  async fetch (): Promise<void> {
    if (this.isLoading) return

    this.status = RequestStatus.Loading

    const response = await new UserRepository().fetch()

    if (isFailureResponse(response)) {
      this.status = RequestStatus.Error
      sendFlashMessage({
        status: 'error',
        message: getErrorMessage(response as FailureResponse)
      })
    }

    this.user = (response as AxiosResponse<User>).data
    this.status = RequestStatus.Success
  }

  mounted () {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
  .account-details {
    font-family: $label-font;
    width: 100%;
    background-color: #FFFFFF;
    &__title {
      font-size: $font-md-x;
      font-weight: $font-weight-bold;
    }
    &__input {
      margin-bottom: 0 !important;
      width: 100%;
    }
    &__submit {
      height: 40px !important;
    }
  }
</style>
