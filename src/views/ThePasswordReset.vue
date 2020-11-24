<template>
  <v-container class="py-0 pt-15" fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="reset mx-auto pa-5 px-11 mt-3" width="560px" elevation="0">
          <img class="d-block mx-auto mt-4" src="@/assets/img/full-logo.png" alt="">
          <v-card-title class="px-2">
            <div class="reset__title mb-2">Password Reset</div>
            <div class="reset__sub-title">
              Enter your email address below and we will send you a link for a password reset.
            </div>
          </v-card-title>
          <base-input custom-label="Email address" class="px-2" />
          <v-card-actions class="py-0">
            <base-button class="text-capitalize font-weight-bold" variant="secondary" large block tile>
              Send password reset
            </base-button>
          </v-card-actions>
          <v-card-text class="px-2 reset__footer">
            <div>
              <router-link to="/login">Back to login</router-link>
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
export default class ThePasswordReset extends Vue {}
</script>

<style lang="scss" scoped>
  .reset {
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
