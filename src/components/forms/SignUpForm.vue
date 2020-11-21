<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6" class="py-0">
          <base-input custom-label="First name" height="40" />
        </v-col>
        <v-col cols="6" class="py-0">
          <base-input custom-label="Last name" height="40" />
        </v-col>
        <v-col cols="12" class="py-0">
          <base-input custom-label="Email address" height="40" />
        </v-col>
        <v-col cols="12" class="py-0">
          <base-input custom-label="Create password" height="40" />
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
