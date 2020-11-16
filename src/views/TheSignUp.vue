<template>
  <v-container class="py-0">
    <v-row>
      <v-col cols="12">
        <v-card class="sign-up mx-auto pa-8 mx-11" width="560px">
          <v-card-title>
            <div class="sign-up__title">The easiest way to warm up your inboxes.</div>
            <div class="sign-up__sub-title">Create an account, no credit card required.</div>
          </v-card-title>
          <sign-up-form />
          <v-card-actions class="py-0">
            <base-button class="text-capitalize" variant="secondary" x-large block tile>
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
      font-family: 'Open Sans', sans-serif;
      font-size: 20px;
      color: #41494F;
    }
    &__sub-title {
      font-family: 'Open Sans', sans-serif;
      color: #80888F;
      font-size: 14px;
    }
  }
</style>
