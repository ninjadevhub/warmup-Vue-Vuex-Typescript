<template>
  <v-text-field
    :class="`input--${variant}`"
    :label="label"
    :placeholder="placeholder"
    v-bind="{ ...$attrs, ...$props }"
    outlined
    dense
    single-line
    height="30"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseInput extends Vue {
  @Prop({
    type: String,
    default: ''
  })
  readonly label?: string

  @Prop({
    type: String,
    default: ''
  })
  readonly placeholder?: string

  @Prop({
    type: String,
    default: 'main'
  })
  readonly variant?: string
}
</script>

<style lang="scss" scoped>
  ::v-deep {
    .v-text-field--outlined .v-input--dense .v-label--active {
      transform: translateY(0) scale(0) !important;
    }
    legend {
      display: none;
    }
    fieldset {
      border-radius: 0;
    }
    label {
      left: -10px !important;
      top: -26px !important;
      font-family: $label-font;
      font-weight: $font-weight-bold;
    }
  }
  .input {
    &--main {
      ::v-deep {
        label {
          font-size: $font-xs;
          opacity: 0.8;
          text-transform: uppercase;
          color: $color-mako;
        }
      }
    }
    &--normal {
      ::v-deep {
        label {
          font-size: 12px;
          color: $secondary-color;
        }
      }
    }
  }
</style>
