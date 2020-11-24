<template>
  <v-container class="py-0 pt-5" fluid>
    <v-row>
      <v-col cols="12">
        <div class="text-right">
          Don't have an account? <router-link to="/sign-up">Sign up</router-link>.
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="login mx-auto pa-4 px-11 mt-3" width="560px" elevation="0">
          <img class="d-block mx-auto mt-4" src="@/assets/img/full-logo.png" alt="">
          <v-card-title class="px-2 pb-0 pt-3">
            <div class="login__title text-capitalize">Log in</div>
          </v-card-title>
          <v-divider class="mx-2 my-2" />
          <v-container class="px-2" fluid>
            <v-row>
              <v-col col="12" class="py-0">
                <base-input custom-label="Email address" />
              </v-col>
            </v-row>
            <v-row>
              <v-col col="12" class="py-0">
                <base-input custom-label="Password" />
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions class="py-0">
            <base-button to="/inboxes" class="text-capitalize font-weight-bold" variant="secondary" large block tile>
              Sign in
            </base-button>
          </v-card-actions>
          <v-card-text class="px-2 login__footer">
            <div>
              Don’t have an account? <router-link to="/sign-up">Sign up</router-link>.
            </div>
            <div>
              Forgot your password? <router-link to="/password-reset">Reset your password</router-link>.
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
export default class TheLogin extends Vue {}
</script>

<style lang="scss" scoped>
  .login {
    &__title {
      font-family: $base-font;
      font-size: $font-md-x;
      color: $color-mako;
      font-weight: $font-weight-bold;
    }
    &__footer {
      font-size: $font-sm;
      a {
        text-decoration: none;
      }
    }
  }
</style>
