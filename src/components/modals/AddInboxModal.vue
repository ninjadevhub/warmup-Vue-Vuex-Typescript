<template>
  <base-modal
    :max-width="modalMaxWidth"
    title="Add inbox"
  >
    <template #button>
      <base-button class="text-capitalize" small>
        <base-icon class="pr-0 pl-0" variant="secondary" size="14">mdi-plus</base-icon> Add Inbox
      </base-button>
    </template>

    <template #content>
      <add-inbox-form @resize="onResize" />
    </template>
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddInboxForm from '@/components/forms/AddInboxForm.vue'

@Component({ components: { AddInboxForm } })
export default class AddInboxModal extends Vue {
  dialog = false;
  modalMaxWidth = '640'

  onResize (provider: string) {
    provider === 'other' ? this.modalMaxWidth = '960' : this.modalMaxWidth = '640'
  }
}
</script>
