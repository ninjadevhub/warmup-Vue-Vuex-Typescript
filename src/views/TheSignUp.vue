<template>
  <v-container class="py-0 pt-5" fluid>
    <v-row>
      <v-col cols="12">
        <div class="text-right">
          Already have an account? <router-link to="/login">Log in</router-link>.
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="sign-up mx-auto pa-8 mx-11 mt-10" width="560px" elevation="0">
          <v-card-title>
            <div class="sign-up__title">The easiest way to warm up your inboxes.</div>
            <div class="sign-up__sub-title">Create an account, no credit card required.</div>
          </v-card-title>
          <sign-up-form />
          <v-card-actions class="py-0 px-3">
            <base-button class="text-capitalize font-weight-bold" variant="secondary" large block tile>
              Sign up free
            </base-button>
          </v-card-actions>
          <v-card-text>
            <div>
              By signing up you agree to the <a href="#">terms of service</a> and <a href="#">privacy policy</a>.
            </div>
            <img class="d-block mx-auto mt-4" src="@/assets/img/full-logo.png" alt="">
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import SignUpForm from '@/components/forms/SignUpForm.vue'

@Component({ components: { SignUpForm } })
export default class TheSignUpForm extends Vue {}
</script>

<style lang="scss" scoped>
  .sign-up {
    &__title {
      font-family: $base-font;
      font-size: $font-lg-x;
      color: $color-mako;
    }
    &__sub-title {
      font-family: $base-font;
      color: $color-oslo-gray;
      font-size: $font-md;
    }
  }
</style>
