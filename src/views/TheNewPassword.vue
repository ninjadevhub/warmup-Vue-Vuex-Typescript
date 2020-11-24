<template>
  <v-container class="py-0 pt-15" fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="new-password mx-auto pa-4 px-11 mt-3" width="560px" elevation="0">
          <img class="d-block mx-auto mt-4" src="@/assets/img/full-logo.png" alt="">
          <v-card-title class="px-2 pb-0 pt-6">
            <div class="new-password__title text-capitalize">Reset your password</div>
          </v-card-title>
          <v-divider class="mx-2 my-2" />
          <v-container class="px-2" fluid>
            <v-row>
              <v-col col="12" class="py-0">
                <base-input custom-label="New password" />
              </v-col>
            </v-row>
            <v-row>
              <v-col col="12" class="py-0">
                <base-input custom-label="Confirm password" />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions class="py-0 pb-6">
            <base-button class="text-capitalize font-weight-bold" variant="secondary" large block tile>
              Reset password
            </base-button>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheNewPassword extends Vue {}
</script>

<style lang="scss" scoped>
  .new-password {
    &__title {
      font-family: $base-font;
      font-size: $font-md-x;
      color: $color-mako;
      font-weight: $font-weight-bold;
    }
  }
</style>
