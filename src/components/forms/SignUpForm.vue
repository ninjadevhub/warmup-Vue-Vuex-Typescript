<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <base-input label="First name" class="mb-4" />
        </v-col>
        <v-col cols="6">
          <base-input label="Last name" class="mb-4" />
        </v-col>
        <v-col cols="12">
          <base-input label="Email address" class="mb-4" />
        </v-col>
        <v-col cols="12">
          <base-input label="Create password" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SignUpform extends Vue {}
</script>
