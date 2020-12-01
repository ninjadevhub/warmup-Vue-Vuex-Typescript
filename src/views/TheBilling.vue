<template>
  <div class="billing">
    <base-tabs v-model="activeTab">
      <v-tab>Subscription</v-tab>
    </base-tabs>
    <base-tabs-items v-model="activeTab">
      <v-tab-item>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="7">
              <div class="billing__title mb-1">
                Current Subscription
                <div class="float-none float-sm-right">
                  <update-subscription-modal v-if="hasSubscription" />
                </div>
              </div>
              <v-divider />
              <div class="mt-3 mb-2">Using 0/1 Inboxes</div>
              <div v-if="hasSubscription">Your plan will renew on Dec 1, 2020 for $10.00.</div>
              <div v-else>
                Your free trial ends Nov 17, 2020
                (<div class="d-inline-block">
                  <subscribe-modal />
                </div>)
              </div>
            </v-col>
          </v-row>
          <v-row class="mt-16">
            <v-col cols="12" md="7">
              <div class="billing__title mb-1">
                Refer a Friend
              </div>
              <v-divider />
              <p class="mt-3">
                You can earn a 20% commission <b>every month</b> for every customer you refer to Warmup Inbox. Use your unqiue
                link below so you can share on your blog, podcast, twitter or to your email newsletter list. After your
                first sign up, we’ll email you a form to get you set up for payouts.
              </p>
              <base-button class="billing__referal text-capitalize mt-5 px-6 font-weight-bold" @click="onCopyLink">
                Copy Referral Link
              </base-button>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </base-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UpdateSubscriptionModal from '@/components/modals/UpdateSubscriptionModal.vue'
import SubscribeModal from '@/components/modals/SubscribeModal.vue'
import { copyToClipboard, sendFlashMessage } from '@/utils/misc'
import AuthModule from '@/store/modules/AuthModule'

@Component({ components: { UpdateSubscriptionModal, SubscribeModal } })
export default class TheBilling extends Vue {
  activeTab = 0
  hasSubscription = true // TODO: Make computed

  onCopyLink (): void {
    const shareableCode = AuthModule.shareableCode

    if (shareableCode) {
      copyToClipboard(`${process.env.VUE_APP_BASE_URL}/sign-up?code=${shareableCode}`)

      sendFlashMessage({
        status: 'success',
        message: 'Referal link copied to your clipbloard'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .billing {
    font-family: $label-font;
    width: 100%;
    background-color: #FFFFFF;
    &__title {
      font-size: $font-md-x;
      font-weight: $font-weight-bold;
    }
    &__referal {
      width: 130px !important;
      height: 30px !important;
      font-size: $font-xs-x !important;
      letter-spacing: -0.2px;
    }
  }
</style>
