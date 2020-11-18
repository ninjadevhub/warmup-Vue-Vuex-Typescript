<template>
  <div class="inboxes d-flex justify-space-between flex-column">
    <div>
      <div class="inboxes__title pb-3">Inboxes</div>
      <v-divider class="pb-3"></v-divider>
      <div class="px-2">
        Thanks for signing up for Warmup Inbox! Get started by adding an inbox. If you get stuck just
        <a href="#">let us know</a>.
      </div>
      <div class="px-2 pt-5">
        <base-button class="inboxes__new text-capitalize" small elevation="0">
          <base-icon class="pr-0 pl-0" variant="secondary" size="14">mdi-plus</base-icon> Add Inbox
        </base-button>
      </div>
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
          <div class="help-text">
            <div class="mb-2 font-weight-bold">How Does This All Work?</div>
            <div>
              Building up and maintain a positive sending reputation is a complicated process.
              Thankfully we built an effortless way to keep your deliverability high. Learn how we do it.
            </div>
            <base-button to="#" class="help-text__action text-capitalize mt-5" small elevation="0">
              Lear more
            </base-button>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="help-text">
            <div class="mb-2 font-weight-bold">ABW: Always Be Warming</div>
            <div>
              Maintaining consistent positive engagement within your inboxes is critical for upholding the highest
              possible delivery rates for your emails.
            </div>
            <base-button to="#" class="help-text__action text-capitalize mt-5" small elevation="0">
              Lear why
            </base-button>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="help-text">
            <div class="mb-2 font-weight-bold">Refer A Friend, Make $ Each Month</div>
            <div>
              You can earn a 20% commission every month for every customer you refer. Use your unqiue link below so
              you can share on your blog, podcast, etc…
            </div>
            <base-button to="#" class="help-text__action text-capitalize mt-5" small elevation="0">
              Copy Referral Link
            </base-button>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheInboxes extends Vue {}
</script>

<style lang="scss" scoped>
  .inboxes {
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    &__title {
      font-size: $font-lg;
      font-weight: $font-weight-bold;
    }
    &__new {
      font-size: 11px;
    }

    .help-text {
      padding: 0 10%;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
      &__action {
        font-size: 11px;
        align-self: baseline;
      }
    }
  }
</style>
