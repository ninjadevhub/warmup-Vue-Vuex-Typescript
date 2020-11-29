<template>
  <div class="inbox">
    <base-tabs v-model="activeTab">
      <v-tab>Metrics</v-tab>
      <v-tab>Settings</v-tab>
    </base-tabs>
    <base-tabs-items v-model="activeTab">
      <v-tab-item :transition="false" :reverse-transition="false">
        <inbox-metrics v-if="inbox" :inbox="inbox" class="mx-0 px-0 p-2" />
      </v-tab-item>
      <v-tab-item :transition="false" :reverse-transition="false">
        <inbox-settings v-if="inbox" :inbox="inbox" class="mx-0 px-0 p-2" />
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
import { Component, Vue } from 'vue-property-decorator'
import InboxMetrics from '@/components/InboxMetrics.vue'
import InboxSettings from '@/components/InboxSettings.vue'
import Inbox from '@/types/Inbox'
import RequestStatus from '@/constants/RequestStatus'
import InboxRepository from '@/data/repository/InboxRepository'
import { FailureResponse, isFailureResponse } from '@/types/Response'

@Component({ components: { InboxMetrics, InboxSettings } })
export default class TheInbox extends Vue {
  activeTab = 0
  status: RequestStatus = RequestStatus.Initial
  errorMessage = ''
  inbox: Inbox | null = null

  get inboxId (): string {
    return this.$route.params.inboxId
  }

  get isError (): boolean {
    return this.status === RequestStatus.Error
  }

  get isLoading (): boolean {
    return this.status === RequestStatus.Loading
  }

  async fetch (): Promise<void> {
    if (this.isLoading || !this.inboxId) return

    this.status = RequestStatus.Loading

    const response = await new InboxRepository().fetch(this.inboxId)

    if (isFailureResponse(response)) {
      this.status = RequestStatus.Error
      this.errorMessage = (response as FailureResponse).reason

      return
    }

    this.inbox = response as Inbox
    this.status = RequestStatus.Success
  }

  mounted () {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
  .inbox {
    width: 100%;
    background-color: #FFFFFF;
  }
</style>
