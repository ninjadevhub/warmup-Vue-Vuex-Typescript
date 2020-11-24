<template>
  <div class="inboxes-wrapper">
    <empty-inboxes v-if="!hasInboxes" class="px-8 py-8" />
    <inboxes-list v-else class="px-8 py-8" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EmptyInboxes from '@/components/EmptyInboxes.vue'
import InboxesList from '@/components/InboxesList.vue'

@Component({ components: { EmptyInboxes, InboxesList } })
export default class TheInboxes extends Vue {
  hasInboxes = false; // TODO: add getter
}
</script>

<style lang="scss" scoped>
  .inboxes-wrapper {
    width: 100%;
  }
</style>
