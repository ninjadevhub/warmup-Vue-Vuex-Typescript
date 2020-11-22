<template>
  <div class="inbox">
    <base-tabs v-model="activeTab">
      <v-tab>Metrics</v-tab>
      <v-tab>Settings</v-tab>
    </base-tabs>
    <base-tabs-items v-model="activeTab">
      <v-tab-item>
        <inbox-metrics class="mx-0" />
      </v-tab-item>
      <v-tab-item>
        <inbox-settings class="mx-0" />
      </v-tab-item>
    </base-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import InboxMetrics from '@/components/InboxMetrics.vue'
import InboxSettings from '@/components/InboxSettings.vue'

@Component({ components: { InboxMetrics, InboxSettings } })
export default class TheInbox extends Vue {
  activeTab = 0
}
</script>

<style lang="scss" scoped>
  .inbox {
    width: 100%;
    background-color: #FFFFFF;
  }
</style>
