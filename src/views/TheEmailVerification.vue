<template>
  <v-container class="py-0 pt-15" fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="verify mx-auto pa-6 px-11 mt-3" width="560px" elevation="0">
          <img class="d-block mx-auto mt-4" src="@/assets/img/full-logo.png" alt="">
          <v-card-title class="px-2 mb-6">
            <div class="verify__title mb-2">Please verify your email address.</div>
            <div class="verify__sub-title">
              We just sent a verification code to {email_address}. Please enter the code below to verify your account.
            </div>
          </v-card-title>
          <base-input custom-label="Code" class="mb-4 px-2" />
          <v-card-actions class="py-0">
            <base-button class="text-capitalize font-weight-bold" variant="secondary" large block tile>
              Verify
            </base-button>
          </v-card-actions>
          <v-card-text class="verify__footer px-2">
            <div>
              <a href="#">Resend code</a>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheEmailVerification extends Vue {}
</script>

<style lang="scss" scoped>
  .verify {
    &__title {
      font-family: $base-font;
      font-size: $font-lg-x;
      color: $color-mako;
    }
    &__sub-title {
      font-family: $base-font;
      color: $color-oslo-gray;
      font-size: $font-md;
      line-height: 24px;
    }
    &__footer {
      a {
        text-decoration: none;
      }
    }
  }
</style>
