<template>
  <base-modal
    :max-width="modalMaxWidth"
    title="Add Inbox"
  >
    <template class="blablaaa" #button>
      <base-button class="text-capitalize" small>
        <base-icon class="pr-0 pl-0" variant="secondary" size="14">mdi-plus</base-icon> Add Inbox
      </base-button>
    </template>

    <template #content>
      <base-alert v-if="isError" class="mt-3" variant="error">
        {{ errorMessage }}
      </base-alert>
      <add-inbox-form
        v-model="inboxForm"
        :status="status"
        @resize="onResize"
        @submit="onSubmit"
      />
    </template>
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddInboxForm from '@/components/forms/AddInboxForm.vue'
import { InboxForm } from '@/types/InboxForm'
import EmailProvider from '@/constants/EmailProvider'
import RequestStatus from '@/constants/RequestStatus'
import InboxRepository from '@/data/repository/InboxRepository'
import { FailureResponse, isFailureResponse } from '@/types/Response'
import { getErrorMessage } from '@/utils/misc'

@Component({ components: { AddInboxForm } })
export default class AddInboxModal extends Vue {
  status: RequestStatus = RequestStatus.Initial
  errorMessage = ''
  dialog = false;
  modalMaxWidth = '640'
  inboxForm: InboxForm | null = null

  get isError (): boolean {
    return this.status === RequestStatus.Error
  }

  get isLoading (): boolean {
    return this.status === RequestStatus.Loading
  }

  initForm (provider: EmailProvider = '' as EmailProvider): void {
    this.inboxForm = {
      provider: provider,
      email: '',
      password: '',
      sender_first: '',
      sender_last: '',
      smtp_username: '',
      smtp_password: '',
      smtp_host: '',
      smtp_port: '',
      smtp_ssl: false,
      imap_username: '',
      imap_password: '',
      imap_host: '',
      imap_port: '',
      imap_ssl: false,
      starting_baseline: '',
      increase_per_day: '',
      max_sends_per_day: '',
      reply_rate_percent: ''
    }
  }

  onResize (provider: EmailProvider) {
    this.initForm(provider)
    provider === 'other' ? this.modalMaxWidth = '960' : this.modalMaxWidth = '640'
  }

  async onSubmit (): Promise<void> {
    if (this.isLoading || !this.inboxForm) return

    this.status = RequestStatus.Loading

    const response = await new InboxRepository().add(this.inboxForm)

    if (isFailureResponse(response)) {
      this.status = RequestStatus.Error
      this.errorMessage = getErrorMessage(response as FailureResponse)

      return
    }

    this.status = RequestStatus.Success
    this.dialog = false
    this.$emit('created')
  }

  mounted () {
    this.initForm()
  }
}
</script>
