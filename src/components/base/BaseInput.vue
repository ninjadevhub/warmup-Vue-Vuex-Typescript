<template>
  <v-text-field
    :label="label"
    :placeholder="placeholder"
    hide-details="auto"
    outlined
    dense
    single-line
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
      text-transform: uppercase;
      font-size: 10px;
      opacity: 0.8;
      font-family: 'Roboto', sans-serif;
      color: #41494F;
      font-weight: 600;
    }
  }
</style>
