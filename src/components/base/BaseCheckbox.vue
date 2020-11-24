<template>
  <v-checkbox v-model="value" v-bind="{ ...$attrs, ...$props }" />
</template>

<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator'

@Component
export default class BaseCheckbox extends Vue {
  @Model('input', {
    type: Boolean
  })
  readonly value?: boolean
}
</script>

<style lang="scss" scoped>
 ::v-deep {
   label {
    font-size: $font-xs;
    font-family: $label-font;
  }
 }
</style>
