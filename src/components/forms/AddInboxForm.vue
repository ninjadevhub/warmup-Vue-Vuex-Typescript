<template>
  <validation-observer v-slot="{ invalid }">
    <v-container class="form px-1 py-0" fluid>
      <v-row>

        <!-- Authentication -->

        <v-col class="pt-5" cols="12" :md="isOther ? '4' : '6'" max-width="300">
          <div class="form__title">Authentication</div>
          <v-divider class="mb-5 mt-1" />
          <validation-provider v-slot="{ errors }" name="Email provider" rules="required">
            <base-select
              v-model="provider"
              class="mb-3"
              :error-messages="errors"
              :items="providers"
              custom-label="email provider"
              @change="$emit('resize', $event)"
            />
          </validation-provider>
          <a v-if="isGoogleWorkspace" href="#" class="form__setup-hint d-block pt-1 mb-2">
            Learn how to configure Gmail
            <base-icon class="pl-2 pt-0 pb-0">mdi-open-in-new</base-icon>
          </a>
          <a v-if="isMicrosoft365" href="#" class="form__setup-hint d-block pt-1 mb-2">
            Learn how to configure Microsoft 365
            <base-icon class="pl-2 pt-0 pb-0">mdi-open-in-new</base-icon>
          </a>
          <validation-provider v-slot="{ errors }" name="Email" rules="required|email">
            <base-input
              v-model="email"
              :error-messages="errors"
              custom-label="email"
              type="email"
            />
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="Password" rules="required" >
            <base-input
              v-model="password"
              :error-messages="errors"
              custom-label="password"
              type="password"
            />
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="Sender first name" rules="required">
            <base-input v-model="sender_first" :error-messages="errors" custom-label="sender first name"/>
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="Sender last name" rules="required">
            <base-input v-model="sender_last" :error-messages="errors" custom-label="sender last name"/>
          </validation-provider>
        </v-col>

        <!-- End of Authentication -->

        <!-- Custom Settings -->

        <v-col v-if="isOther" class="pt-5" cols="12" md="4" max-width="300">
          <div class="form__title">Custom Settings</div>
          <v-divider class="mb-5 mt-1" />
          <validation-provider v-slot="{ errors }" name="SMTP username" :rules="{ 'required': isOther }">
            <base-input v-model="smtp_username" :error-messages="errors" custom-label="SMTP username" />
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="SMTP password" :rules="{ 'required': isOther }">
            <base-input v-model="smtp_password" :error-messages="errors" custom-label="SMTP password" />
          </validation-provider>
          <v-row>
            <v-col cols="6" class="py-0">
              <validation-provider v-slot="{ errors }" name="SMTP host" :rules="{ 'required': isOther }">
                <base-input v-model="smtp_host" :error-messages="errors" custom-label="SMTP host" />
              </validation-provider>
            </v-col>
            <v-col cols="6" class="py-0">
              <validation-provider v-slot="{ errors }" name="SMTP port" :rules="{ 'required': isOther }">
                <base-input v-model="smtp_port" :error-messages="errors" custom-label="SMTP port" />
              </validation-provider>
            </v-col>
          </v-row>
          <base-checkbox v-model="smtp_ssl" class="mt-0" label="Use SMTP SSL/TLS" />
          <validation-provider v-slot="{ errors }" name="IMAP username" :rules="{ 'required': isOther }">
            <base-input v-model="imap_username" :error-messages="errors" custom-label="IMAP username" />
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="IMAP password" :rules="{ 'required': isOther }">
            <base-input v-model="imap_password" :error-messages="errors" custom-label="IMAP password" />
          </validation-provider>
          <v-row>
            <v-col cols="6" class="py-0">
              <validation-provider v-slot="{ errors }" name="IMAP host" :rules="{ 'required': isOther }">
                <base-input v-model="imap_host" :error-messages="errors" custom-label="IMAP host" />
              </validation-provider>
            </v-col>
            <v-col cols="6" class="py-0">
              <validation-provider v-slot="{ errors }" name="IMAP port" :rules="{ 'required': isOther }">
                <base-input v-model="imap_port" :error-messages="errors" custom-label="IMAP port" />
              </validation-provider>
            </v-col>
          </v-row>
          <base-checkbox v-model="imap_ssl" class="mt-0" label="Use IMAP SSL/TLS" />
        </v-col>

        <!-- End of Custom Settings -->

        <!-- Sending Schedule -->

        <v-col class="pt-5" cols="12" :md="isOther ? '4' : '6'" max-width="300">
          <div class="form__title">Sending Schedule</div>
          <v-divider class="mb-5 mt-1" />
          <validation-provider v-slot="{ errors }" name="Starting baseline" rules="required">
            <base-input
              v-model="starting_baseline"
              :error-messages="errors"
              custom-label="starting baseline"
              help-text="(Suggested 0, Max 40)"
              tooltip="The starting number of emails we should send on day one."
            />
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="Increase per day" rules="required">
            <base-input
              v-model="increase_per_day"
              :error-messages="errors"
              custom-label="increase per day"
              help-text="(Suggested 2, Max 4)"
              tooltip="The number of emails we will increase by each day."
            />
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="Max sends per day" rules="required">
            <base-input
              v-model="max_sends_per_day"
              :error-messages="errors"
              custom-label="max sends per day"
              help-text="(Suggested 40, Max 50)"
              tooltip="We will never send more than  this number of new inital emails per day."
            />
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="Reply rate" rules="required">
            <base-input
              v-model="reply_rate_percent"
              :error-messages="errors"
              custom-label="reply rate %"
              help-text="(Suggested 30%, Max 50%)"
              append-icon="mdi-percent-outline"
              tooltip="We automatically reply to X percent of the emails that are received within the inbox. These are additional emails added on top of the Max Send Per Day rate."
            />
          </validation-provider>
          <div class="form__limit-hint pt-2">
            Want to increase these limits? <a :href="`mailto:${supportEmail}`">Chat with us.</a>
          </div>
          <base-button
            class="float-right mt-5 px-9 text-capitalize form__submit"
            :disabled="invalid"
            :loading="isLoading"
            @click="$emit('submit')"
          >
            Save
          </base-button>
        </v-col>

        <!-- End of Sending Schedule -->

      </v-row>
    </v-container>
  </validation-observer>
</template>

<script lang="ts">
import EmailProvider from '@/constants/EmailProvider'
import { InboxForm } from '@/types/InboxForm'
import { Component, Vue, Model, Prop } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import RequestStatus from '@/constants/RequestStatus'

extend('required', required)
extend('email', email)

@Component({ components: { ValidationObserver, ValidationProvider } })
export default class AddInboxForm extends Vue {
  @Model('input', {
    type: Object as () => InboxForm,
    required: true
  })
  readonly inboxForm!: InboxForm

  @Prop({
    type: String,
    required: true
  })
  readonly status!: RequestStatus

  providers = [
    { text: 'Google Workspace', value: EmailProvider.GoogleWorkspace },
    { text: 'Microsoft 365', value: EmailProvider.Microsoft },
    { text: 'Other', value: EmailProvider.Other }
  ]

  get isLoading (): boolean {
    return this.status === RequestStatus.Loading
  }

  get isGoogleWorkspace () {
    return this.provider === EmailProvider.GoogleWorkspace
  }

  get isMicrosoft365 () {
    return this.provider === EmailProvider.Microsoft
  }

  get isOther () {
    return this.provider === EmailProvider.Other
  }

  get supportEmail () {
    return process.env.VUE_APP_SUPPORT_EMAIL
  }

  get provider (): EmailProvider {
    return this.inboxForm.provider
  }

  set provider (value: EmailProvider) {
    this.$emit('input', { ...this.inboxForm, ...{ provider: value } })
  }

  get email (): string {
    return this.inboxForm.email
  }

  set email (value: string) {
    this.$emit('input', { ...this.inboxForm, ...{ email: value } })
  }

  get password (): string {
    return this.inboxForm.password
  }

  set password (value: string) {
    this.$emit('input', { ...this.inboxForm, ...{ password: value } })
  }

  get sender_first (): string {
    return this.inboxForm.sender_first
  }

  set sender_first (value: string) {
    this.$emit('input', { ...this.inboxForm, ...{ sender_first: value } })
  }

  get sender_last (): string {
    return this.inboxForm.sender_last
  }

  set sender_last (value: string) {
    this.$emit('input', { ...this.inboxForm, ...{ sender_last: value } })
  }

  get smtp_username (): string | null {
    return this.inboxForm.smtp_username
  }

  set smtp_username (value: string | null) {
    this.$emit('input', { ...this.inboxForm, ...{ smtp_username: value } })
  }

  get smtp_password (): string | null {
    return this.inboxForm.smtp_password
  }

  set smtp_password (value: string | null) {
    this.$emit('input', { ...this.inboxForm, ...{ smtp_password: value } })
  }

  get smtp_host (): string | null {
    return this.inboxForm.smtp_host
  }

  set smtp_host (value: string | null) {
    this.$emit('input', { ...this.inboxForm, ...{ smtp_host: value } })
  }

  get smtp_port (): string | null {
    return this.inboxForm.smtp_port
  }

  set smtp_port (value: string | null) {
    this.$emit('input', { ...this.inboxForm, ...{ smtp_port: value } })
  }

  get smtp_ssl (): boolean | null {
    return this.inboxForm.smtp_ssl
  }

  set smtp_ssl (value: boolean | null) {
    this.$emit('input', { ...this.inboxForm, ...{ smtp_ssl: value } })
  }

  get imap_username (): string | null {
    return this.inboxForm.imap_username
  }

  set imap_username (value: string | null) {
    this.$emit('input', { ...this.inboxForm, ...{ imap_username: value } })
  }

  get imap_password (): string | null {
    return this.inboxForm.imap_password
  }

  set imap_password (value: string | null) {
    this.$emit('input', { ...this.inboxForm, ...{ imap_password: value } })
  }

  get imap_host (): string | null {
    return this.inboxForm.imap_host
  }

  set imap_host (value: string | null) {
    this.$emit('input', { ...this.inboxForm, ...{ imap_host: value } })
  }

  get imap_port (): string | null {
    return this.inboxForm.imap_port
  }

  set imap_port (value: string | null) {
    this.$emit('input', { ...this.inboxForm, ...{ imap_port: value } })
  }

  get imap_ssl (): boolean | null {
    return this.inboxForm.imap_ssl
  }

  set imap_ssl (value: boolean | null) {
    this.$emit('input', { ...this.inboxForm, ...{ imap_ssl: value } })
  }

  get starting_baseline (): string {
    return this.inboxForm.starting_baseline
  }

  set starting_baseline (value: string) {
    this.$emit('input', { ...this.inboxForm, ...{ starting_baseline: value } })
  }

  get increase_per_day (): string {
    return this.inboxForm.increase_per_day
  }

  set increase_per_day (value: string) {
    this.$emit('input', { ...this.inboxForm, ...{ increase_per_day: value } })
  }

  get max_sends_per_day (): string {
    return this.inboxForm.max_sends_per_day
  }

  set max_sends_per_day (value: string) {
    this.$emit('input', { ...this.inboxForm, ...{ max_sends_per_day: value } })
  }

  get reply_rate_percent (): string {
    return this.inboxForm.reply_rate_percent
  }

  set reply_rate_percent (value: string) {
    this.$emit('input', { ...this.inboxForm, ...{ reply_rate_percent: value } })
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
        font-size: $font-sm-x;
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
      font-size: $font-xs-x !important;
      font-weight: bold;
    }
  }
</style>
