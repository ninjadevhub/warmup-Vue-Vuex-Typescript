<template>
  <base-modal max-width="550" title="Subscribe to Warmup Inbox" title-class="title--sm">
    <template #button>
      <a class="subscribe__link text-capitalize pl-0">
        Upgrade now
      </a>
    </template>

    <template #content>
      <div class="mt-5 d-block d-sm-flex align-center">
        <div class="d-flex align-end">
          <base-input v-model="updatedInboxes" class="subscribe__input d-inline-block" hide-details />
          <v-btn
            class="subscribe__input-control d-inline-block"
            elevation="0"
            tile
            @click="decrease"
          >
            <base-icon class="pr-0 pl-0 pt-0 pb-0">mdi-minus</base-icon>
          </v-btn>
          <v-btn
            class="subscribe__input-control d-inline-block"
            elevation="0"
            tile
            @click="increase"
          >
            <base-icon class="pr-0 pl-0 pt-0 pb-0">mdi-plus</base-icon>
          </v-btn>
        </div>
        <div class="d-inline-block ml-0 ml-sm-3 mt-3 mt-sm-0 subscribe__text">
          Please select the desired number of inboxes.
        </div>
      </div>
      <v-divider class="mt-6 mb-3" />
      <div>
        <v-container class="py-0 px-0">
          <v-row>
            <v-col cols="6" sm="4" class="py-0">
              <b>Total per month:</b>
            </v-col>
            <v-col cols="6" sm="8" class="py-0">
              <span class="subscribe__amount">{{ billing.per_month_value }}</span>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-divider class="my-3" />
      <v-container class="py-0 px-0">
        <v-row>
          <v-col cols="6" sm="4" class="py-0">
            <b>Due today:</b>
          </v-col>
          <v-col cols="6" sm="8" class="py-0">
            <span class="subscribe__amount">{{ billing.secondary_value }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pt-2">
            <div class="subscribe__info">{{ billing.helper_text }}</div>
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="mb-3" />
      <v-container class="py-0 px-0">
        <v-row>
          <v-col cols="12" class="py-0">
            <base-input custom-label="Card Number" variant="normal" />
          </v-col>
          <v-col cols="12" sm="4" class="py-0">
            <base-input custom-label="Expiration Date" variant="normal" placeholder="MM/YYYY" />
          </v-col>
          <v-col cols="12" sm="4" class="py-0">
            <base-input custom-label="Security Code" variant="normal" />
          </v-col>
          <v-col cols="12" sm="4" class="py-0">
            <base-input custom-label="Postal Code" variant="normal" />
          </v-col>
        </v-row>
      </v-container>
      <div class="d-flex justify-end subscribe__action">
        <base-button class="text-capitalize font-weight-bold">
          Subscribe & Pay $3.42
        </base-button>
      </div>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AddInboxForm from '@/components/forms/AddInboxForm.vue'
import Billing from '@/types/Billing'
import AuthModule from '@/store/modules/AuthModule'
import RequestStatus from '@/constants/RequestStatus'
import { FailureResponse, isFailureResponse } from '@/types/Response'
import { getErrorMessage, sendFlashMessage } from '@/utils/misc'
import BillingRepository from '@/data/repository/BillingRepository'
import { AxiosResponse } from 'axios'

@Component({ components: { AddInboxForm } })
export default class SubscribeModal extends Vue {
  dialog = false
  billing: Billing | null = null
  status: RequestStatus = RequestStatus.Initial
  updatedInboxes = 1
  rate = 500; // TODO: Add configuration (5$ in cents)
  mask = '/^[a-z][0-9]+(-[a-z][0-9]+)*$/'

  dueDateVisible = true; // TODO: should be a computed getter
  accountCreditVisible = false; // TODO: should be a compted getter

  get isLoading (): boolean {
    return this.status === RequestStatus.Loading
  }

  get planCredits (): number | null {
    return AuthModule.planCredits
  }

  get inboxesChanged (): boolean {
    return this.planCredits !== this.updatedInboxes
  }

  get totalPerMonth (): string {
    return (this.updatedInboxes * this.rate / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  increase (): void {
    this.updatedInboxes++
  }

  decrease (): void {
    if (this.updatedInboxes !== 0) this.updatedInboxes--
  }

  async fetch (): Promise<void> {
    if (this.isLoading || (this.planCredits === null)) return

    this.status = RequestStatus.Loading

    const response = await new BillingRepository().fetch(this.planCredits)

    if (isFailureResponse(response)) {
      this.status = RequestStatus.Error
      sendFlashMessage({
        status: 'error',
        message: getErrorMessage(response as FailureResponse)
      })

      return
    }

    this.status = RequestStatus.Success
    this.billing = (response as AxiosResponse<Billing>).data
  }

  mounted() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep {
    fieldset {
      border: 1px solid #E6E6E8 !important;
      caret-color: #000000 !important;
    }
    .v-input {
      &__slot {
        min-height: 29px !important;
        height: 29px;
      }
    }

    .v-card {
      &__title {
        font-size: $font-xs !important;
        color: red;
      }
    }

  }

  .subscribe {
    &__link {
      font-size: $font-md;
      color: $color-spring-rain !important;
      text-decoration: underline;
      font-weight: $font-weight-bold;
    }
    &__input {
      max-width: 90px;
      margin-bottom: 0 !important;
    }
    &__input-control {
      height: 29px !important;
      min-width: 29px !important;
      padding: 0 !important;
      border: 1px solid $color-iron !important;
      background-color: $color-concrete;
      border: 1px solid #000000;
      i {
        font-size: $font-md;
      }
    }
    &__text, &__amount, &__info {
      font-family: $label-font;
    }
    &__info {
      font-size: $font-sm;
    }
    &__action {
      font-family: $base-font;
      button {
        font-size: $font-xs-x;
      }
    }
  }
</style>
