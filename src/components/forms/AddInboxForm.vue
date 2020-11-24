<template>
  <v-container class="form px-1 py-0" fluid>
    <v-row>
      <v-col class="pt-5" cols="12" :md="isOther ? '4' : '6'" max-width="300">
        <div class="form__title">Authentication</div>
        <v-divider class="mb-10 mt-1" />
        <base-select
          v-model="form.provider"
          :items="providers"
          custom-label="email provider"
          @change="$emit('resize', $event)"
        />
        <a v-if="isGoogleWorkspace" href="#" class="form__setup-hint d-block pt-1 mb-2">
          Learn how to configure Gmail
          <base-icon class="pl-2 pt-0 pb-0">mdi-open-in-new</base-icon>
        </a>
        <a v-if="isMicrosoft365" href="#" class="form__setup-hint d-block pt-1 mb-2">
          Learn how to configure Microsoft 365
          <base-icon class="pl-2 pt-0 pb-0">mdi-open-in-new</base-icon>
        </a>
        <base-input custom-label="email" />
        <base-input custom-label="password" />
        <base-input custom-label="sender first name" />
        <base-input custom-label="sender last name" />
      </v-col>
      <v-col v-if="isOther" class="pt-5" cols="12" md="4" max-width="300">
        <div class="form__title">Custom Settings</div>
        <v-divider class="mb-10 mt-1" />
        <base-input custom-label="SMTP username" />
        <base-input custom-label="SMTP password" />
        <v-row>
          <v-col cols="6" class="py-0">
            <base-input custom-label="SMTP host" />
          </v-col>
          <v-col cols="6" class="py-0">
            <base-input custom-label="SMTP port" />
          </v-col>
        </v-row>
        <base-checkbox class="mt-0" label="Use SMTP SSL/TLS" />
        <base-input custom-label="IMAP username" />
        <base-input custom-label="IMAP password" />
        <v-row>
          <v-col cols="6" class="py-0">
            <base-input custom-label="IMAP host" />
          </v-col>
          <v-col cols="6" class="py-0">
            <base-input custom-label="IMAP port" />
          </v-col>
        </v-row>
        <base-checkbox class="mt-0" label="Use IMAP SSL/TLS" />
      </v-col>
      <v-col class="pt-5" cols="12" :md="isOther ? '4' : '6'" max-width="300">
        <div class="form__title">Sending Schedule</div>
        <v-divider class="mb-10 mt-1" />
        <base-input
          custom-label="starting baseline"
          help-text="(Suggested 0, Max 40)"
          tooltip="The starting number of emails we should send on day one."
        />
        <base-input
          custom-label="increase per day"
          help-text="(Suggested 2, Max 4)"
          tooltip="The number of emails we will increase by each day."
        />
        <base-input
          custom-label="max sends per day"
          help-text="(Suggested 40, Max 50)"
          tooltip="We will never send more than  this number of new inital emails per day."
        />
        <base-input
          custom-label="reply rate %"
          help-text="(Suggested 30%, Max 50%)"
          append-icon="mdi-percent-outline"
          tooltip="We automatically reply to X percent of the emails that are received within the inbox. These are additional emails added on top of the Max Send Per Day rate."
        />
        <div class="form__limit-hint pt-2">
          Want to increase these limits? <a :href="`mailto:${supportEmail}`">Chat with us.</a>
        </div>
        <base-button class="float-right mt-5 px-9 text-capitalize form__submit">Save</base-button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AddInboxForm extends Vue {
  // TODO: Check with BE
  providers = [
    { text: 'Google Workspace', value: 'google_workspace' },
    { text: 'Microsoft 365', value: 'microsoft_365' },
    { text: 'Other', value: 'other' }
  ]

  // TODO: Create a form
  form = {
    provider: ''
  }

  get isGoogleWorkspace () {
    return this.form.provider === 'google_workspace' // TODO: Use ENUM
  }

  get isMicrosoft365 () {
    return this.form.provider === 'microsoft_365' // TODO: Use ENUM
  }

  get isOther () {
    return this.form.provider === 'other' // TODO: Use ENUM
  }

  get supportEmail () {
    return process.env.VUE_APP_SUPPORT_EMAIL
  }
}
</script>

<style lang="scss" scoped>
  .form {
    &__title {
      font-family: $label-font;
      font-weight: $font-weight-bold;
    }
    &__setup-hint {
      font-size: $font-xs !important;
      font-style: italic;
      i {
        font-size: $font-sm;
        color: $color-denim !important;
      }
    }
    &__limit-hint {
      font-size: 9px;
      font-family: $label-font;
      letter-spacing: 0.9px;
      font-style: italic;
    }
    &__submit {
      font-size: 11px !important;
      font-weight: bold;
    }
  }
</style>
