<template>
  <base-modal max-width="550" title="Update Subscription" title-class="title--sm">
    <template #button>
      <v-btn
        class="edit-subscription__link text-capitalize pl-0"
        small
        text
        elevation="0"
      >
        Edit Subscription
      </v-btn>
    </template>

    <template #content>
      <div class="mt-5 d-block d-sm-flex align-center">
        <div class="d-flex align-end">
          <base-input v-model="updatedInboxes" class="edit-subscription__input d-inline-block" hide-details />
          <v-btn
            class="edit-subscription__input-control d-inline-block"
            elevation="0"
            tile
            @click="decrease"
          >
            <base-icon class="pr-0 pl-0 pt-0 pb-0">mdi-minus</base-icon>
          </v-btn>
          <v-btn
            class="edit-subscription__input-control d-inline-block"
            elevation="0"
            tile
            @click="increase"
          >
            <base-icon class="pr-0 pl-0 pt-0 pb-0">mdi-plus</base-icon>
          </v-btn>
        </div>
        <div class="d-inline-block ml-0 ml-sm-3 mt-3 mt-sm-0 edit-subscription__text">
          Please select the desired number of inboxes.
        </div>
      </div>
      <v-divider class="mt-6 mb-3" />
      <div>
        <v-container class="py-0 px-0">
          <v-row>
            <v-col cols="6" sm="4" class="py-0">
              <b>{{ inboxesChanged ? 'New total per month:' : 'Total per month:' }}</b>
            </v-col>
            <v-col cols="6" sm="8" class="py-0">
              <span class="edit-subscription__amount">{{ totalPerMonth }}</span>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-divider class="my-3" />
      <v-container v-if="inboxesChanged && dueDateVisible" class="py-0 px-0">
        <v-row>
          <v-col cols="6" sm="4" class="py-0">
            <b>Due today:</b>
          </v-col>
          <v-col cols="6" sm="8" class="py-0">
            <span class="edit-subscription__amount">$3.42</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pt-2">
            <div class="edit-subscription__info">The next charge after today will be $15.00 on Dec 1, 2020.</div>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="inboxesChanged && accountCreditVisible" class="py-0 px-0">
        <v-row>
          <v-col cols="6" sm="4" class="py-0">
            <b>Account credit:</b>
          </v-col>
          <v-col cols="6" sm="8" class="py-0">
            <span class="edit-subscription__amount">$1.42</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pt-2">
            <div class="edit-subscription__info">
              With this change your account will have a total credit balance of $1.42.
              The next charge will be $3.58 on Dec 1, 2020.
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-divider v-if="inboxesChanged" class="mt-1 mb-3" />
      <div class="d-flex justify-end edit-subscription__action">
        <base-button class="text-capitalize font-weight-bold" :disabled="!inboxesChanged">
          Confirm changes
        </base-button>
      </div>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddInboxForm from '@/components/forms/AddInboxForm.vue'

@Component({ components: { AddInboxForm } })
export default class UpdateSubscriptionModal extends Vue {
  dialog = false
  currentInboxes = 1
  updatedInboxes = 1
  rate = 500; // TODO: Add configuration (5$ in cents)

  dueDateVisible = true; // TODO: should be a computed getter
  accountCreditVisible = false; // TODO: should be a compted getter

  get inboxesChanged (): boolean {
    return this.currentInboxes !== this.updatedInboxes
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
}
</script>

<style lang="scss" scoped>
  ::v-deep {
    fieldset {
      border: 1px solid #E6E6E8 !important;
    }
    .v-input__slot {
      min-height: 29px !important;
      height: 29px;
    }
    .input__wrapper {
      label {
        margin-bottom: 0 !important;
      }
    }
  }
  .edit-subscription {
    &__link {
      font-size: $font-md;
      color: $color-dodger-blue !important;
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
      button {
        font-size: $font-xs-x;
      }
    }
  }
</style>
