<template>
  <base-modal max-width="320" title="Edit Schedule">
    <template #button>
      <v-btn
        class="edit-schedule__link text-capitalize pl-0"
        small
        text
        elevation="0"
      >
        Edit Schedule
      </v-btn>
    </template>

    <template #content>
      <div class="pt-2">
        <base-alert v-if="isError" class="mt-3" variant="error">
          {{ errorMessage }}
        </base-alert>
        <validation-observer v-slot="{ invalid }">
        <validation-provider
          v-slot="{ errors }"
          name="Starting baseline"
          :rules="{ required: true, max_value: inboxCapabilities.starting_baseline }"
        >
          <base-input
            v-model="scheduleForm.starting_baseline"
            :error-messages="errors"
            custom-label="starting baseline"
            :help-text="`(Suggested 0, Max ${inboxCapabilities.starting_baseline})`"
            tooltip="The starting number of emails we should send on day one."
          />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Increase per day"
          :rules="{ required: true, max_value: inboxCapabilities.increase_per_day }"
        >
          <base-input
            v-model="scheduleForm.increase_per_day"
            :error-messages="errors"
            custom-label="increase per day"
            :help-text="`(Suggested 2, Max ${inboxCapabilities.increase_per_day})`"
            tooltip="The number of emails we will increase by each day."
          />
        </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Max sends per day"
            :rules="{ required: true, max_value: inboxCapabilities.max_sends_per_day }"
          >
            <base-input
              v-model="scheduleForm.max_sends_per_day"
              :error-messages="errors"
              custom-label="max sends per day"
              :help-text="`(Suggested 40, Max ${inboxCapabilities.max_sends_per_day})`"
              tooltip="We will never send more than  this number of new inital emails per day."
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Reply rate"
            :rules="{ required: true, max_value: inboxCapabilities.reply_rate }"
          >
            <base-input
              v-model="scheduleForm.reply_rate_percent"
              :error-messages="errors"
              custom-label="reply rate %"
              :help-text="`(Suggested 30%, Max ${inboxCapabilities.reply_rate}%)`"
              append-icon="mdi-percent-outline"
              tooltip="We automatically reply to X percent of the emails that are received within the inbox. These are additional emails added on top of the Max Send Per Day rate."
            />
          </validation-provider>
          <div class="form__limit-hint pt-0">
            <i>Want to increase these limits? <a :href="`mailto:${supportEmail}`">Chat with us.</a></i>
          </div>
          <div class="d-flex justify-end">
            <base-button
              class="edit-schedule__submit mt-5 px-9 text-capitalize"
              :disabled="invalid"
              :loading="isLoading"
              @click="onSubmit"
            >
              Save
            </base-button>
          </div>
        </validation-observer>
      </div>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AddInboxForm from '@/components/forms/AddInboxForm.vue'
import RequestStatus from '@/constants/RequestStatus'
import ScheduleForm from '@/types/ScheduleForm'
import Inbox from '@/types/Inbox'
import InboxRepository from '@/data/repository/InboxRepository'
import { FailureResponse, isFailureResponse } from '@/types/Response'
import { getErrorMessage } from '@/utils/misc'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, max_value } from 'vee-validate/dist/rules'
import AuthModule from '@/store/modules/AuthModule'
import InboxCapabilites from '@/types/InboxCapabilities'

extend('required', required)
extend('max_value', max_value)

@Component({ components: { AddInboxForm, ValidationObserver, ValidationProvider } })
export default class EditScheduleModal extends Vue {
  @Prop({
    type: Object as () => Inbox,
    required: true
  })
  readonly inbox!: Inbox

  status: RequestStatus = RequestStatus.Initial
  errorMessage = ''
  dialog = false
  scheduleForm: ScheduleForm = {
    inbox_id: this.inbox.inbox_id,
    starting_baseline: this.inbox.settings.sending.baseline,
    increase_per_day: this.inbox.settings.sending.increase_rate,
    max_sends_per_day: this.inbox.settings.sending.max_sends,
    reply_rate_percent: this.inbox.settings.sending.reply_rate
  }

  get isError (): boolean {
    return this.status === RequestStatus.Error
  }

  get isLoading (): boolean {
    return this.status === RequestStatus.Loading
  }

  get supportEmail () {
    return process.env.VUE_APP_SUPPORT_EMAIL
  }

  get inboxCapabilities (): InboxCapabilites | null {
    return AuthModule.inboxCapabilities
  }

  async onSubmit (): Promise<void> {
    if (this.isLoading) return

    this.status = RequestStatus.Loading

    const response = await new InboxRepository().editSchedule(this.scheduleForm)

    if (isFailureResponse(response)) {
      this.status = RequestStatus.Error
      this.errorMessage = getErrorMessage(response as FailureResponse)

      return
    }

    this.status = RequestStatus.Success
    this.dialog = false
    this.$emit('updated')
  }
}
</script>

<style lang="scss" scoped>
  .form {
    &__limit-hint {
      font-size: 9px;
      font-family: $label-font;
      letter-spacing: 0.9px;
    }
  }

  .edit-schedule {
    &__link {
      font-size: $font-md;
      color: $color-dodger-blue !important;
      font-weight: $font-weight-bold;
    }
    &__submit {
      width: 95px;
      height: 30px;
    }
  }
</style>
