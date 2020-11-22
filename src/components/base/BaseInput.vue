<template>
  <div :class="`input--${variant} input__wrapper`">
    <label class="d-block">
      {{ customLabel }}
      <span v-if="helpText" class="input__help-text text-capitalize">
        <i>{{ helpText }}</i>
      </span>
    </label>
    <v-text-field
      :placeholder="placeholder"
      v-bind="{ ...$attrs, ...$props }"
      outlined
      dense
      single-line
      hide-details="auto"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseInput extends Vue {
  @Prop({
    type: String,
    default: ''
  })
  readonly customLabel?: string

  @Prop({
    type: String,
    default: ''
  })
  readonly helpText?: string

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
    .v-text-field--outlined.v-input--is-focused fieldset {
      border-color: #000000;
    }
    .v-text-field--outlined .v-input--dense .v-label--active {
      transform: translateY(0) scale(0) !important;
    }
    fieldset {
      border-radius: 0;
    }
    label {
      font-family: $label-font;
      font-weight: $font-weight-bold;
    }
  }
  .input {
    &__wrapper {
      margin-bottom: 12px;
      label {
        margin-bottom: 8px;
      }
    }
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

    &__help-text {
      font-size: $font-xs;
      color: $secondary-color;
      opacity: 0.8;
      font-weight: $font-weight-normal;
    }
  }
</style>
