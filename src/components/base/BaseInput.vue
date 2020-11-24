<template>
  <div :class="`input--${variant} input__wrapper`">
    <label v-if="!tooltip" class="d-block">
      {{ customLabel }}
      <span v-if="helpText" class="input__help-text text-capitalize">
        <i>{{ helpText }}</i>
      </span>
    </label>
    <v-tooltip v-else max-width="300" top>
      <template v-slot:activator="{ on, attrs }">
        <label class="d-block" v-bind="attrs" v-on="on">
          {{ customLabel }}
          <span v-if="helpText" class="input__help-text text-capitalize">
            <i>{{ helpText }}</i>
          </span>
        </label>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
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

  @Prop({
    type: String
  })
  readonly tooltip?: string
}
</script>

<style lang="scss" scoped>
  ::v-deep {
    .v-text-field--outlined.v-input--is-focused fieldset {
      border-color: #000000 !important;
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
    .v-input {
      &__control {
        caret-color: #000000;
        font-size: 11px;
      }
    }
  }

  .v-tooltip__content {
    font-size: $font-xs !important;
    line-height: 12px;
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
