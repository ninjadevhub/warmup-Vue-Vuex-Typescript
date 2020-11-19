<template>
  <div class="account-details">
    <base-tabs v-model="activeTab">
      <v-tab>Details</v-tab>
    </base-tabs>
    <base-tabs-items v-model="activeTab">
      <v-tab-item>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="7">
              <div class="account-details__title mb-1">
                Account Information
              </div>
              <v-divider />
              <div class="mt-3 mb-2">Michael Benson</div>
              <div>mike@acme.com</div>
            </v-col>
          </v-row>
          <v-row class="mt-16">
            <v-col cols="12" md="7">
              <div class="account-details__title mb-1">
                Change password
              </div>
              <v-divider />
              <v-row class="mt-7">
                <v-col cols="12" sm="4">
                  <base-input custom-label="Old password" variant="normal" />
                </v-col>
                <v-col cols="12" sm="4">
                  <base-input custom-label="New password" variant="normal" />
                </v-col>
                <v-col cols="12" sm="4">
                  <base-button class="text-capitalize px-6">
                    Save
                  </base-button>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </base-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheAccountDetails extends Vue {
  activeTab = 0
}
</script>

<style lang="scss" scoped>
  .account-details {
    font-family: $label-font;
    width: 100%;
    background-color: #FFFFFF;
    &__title {
      font-size: $font-md-x;
      font-weight: $font-weight-bold;
    }
  }
</style>
