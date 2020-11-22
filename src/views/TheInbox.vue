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
        Settings
        <!-- Settings component -->
      </v-tab-item>
    </base-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import InboxMetrics from '@/components/InboxMetrics.vue'

@Component({ components: { InboxMetrics } })
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
