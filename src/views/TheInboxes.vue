<template>
  <div class="inboxes-wrapper">
    <empty-inboxes v-if="!hasInboxes" class="px-8 py-8" @created="fetch" />
    <inboxes-list
      v-else
      :inboxes="inboxes"
      :current-page="currentPage"
      class="px-8 py-8"
      @page-change="onPageChange"
    />
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
import EmptyInboxes from '@/components/EmptyInboxes.vue'
import InboxesList from '@/components/InboxesList.vue'
import Inboxes from '@/types/Inboxes'
import RequestStatus from '@/constants/RequestStatus'
import InboxRepository from '@/data/repository/InboxRepository'
import { FailureResponse, isFailureResponse } from '@/types/Response'

@Component({ components: { EmptyInboxes, InboxesList } })
export default class TheInboxes extends Vue {
  status: RequestStatus = RequestStatus.Initial
  errorMessage = ''
  currentPage = 1
  inboxes: Inboxes | null = null

  get isError (): boolean {
    return this.status === RequestStatus.Error
  }

  get isLoading (): boolean {
    return this.status === RequestStatus.Loading
  }

  get hasInboxes (): boolean {
    return !!this.inboxes && this.inboxes.account_total > 0
  }

  async fetch (): Promise<void> {
    if (this.isLoading) return

    this.status = RequestStatus.Loading

    const response = await new InboxRepository().fetchAll(this.currentPage)

    if (isFailureResponse(response)) {
      this.status = RequestStatus.Error
      this.errorMessage = (response as FailureResponse).reason

      return
    }

    this.inboxes = response as Inboxes
    this.status = RequestStatus.Success
  }

  onPageChange (page: number): void {
    this.currentPage = page
    this.fetch()
  }

  mounted () {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
  .inboxes-wrapper {
    width: 100%;
  }
</style>
