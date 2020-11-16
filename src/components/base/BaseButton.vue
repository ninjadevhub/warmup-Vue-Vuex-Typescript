<template>
  <v-btn
    :class="`btn btn--${variant}`"
    v-bind="{ ...$attrs }"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseButton extends Vue {
  @Prop({
    type: String,
    default: 'primary'
  })
  readonly variant!: string
}
</script>

<style lang="scss" scoped>
  .btn {
    color: #FFFFFF !important;
    &--primary {
      background-color: #347EED !important;
    }
    &--secondary {
      background-color: #333333 !important;
    }
  }
</style>
