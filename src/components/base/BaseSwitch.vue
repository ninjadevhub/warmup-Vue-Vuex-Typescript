<template>
  <v-switch
    v-model="localValue"
    v-bind="{ ...$attrs, ...$props }"
    color="#00d474"
    :label="label"
    :ripple="false"
    flat
    inset
  />
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'

@Component
export default class BaseSwitch extends Vue {
  @Model('change', {
    type: Boolean
  })
  readonly value!: boolean

  @Prop({
    type: String,
    default: ''
  })
  readonly label!: string

  get localValue (): boolean | null {
    return this.value
  }

  set localValue (value: boolean | null) {
    this.$emit('change', value)
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep {
    .v-input {
      &--switch {
        &__track {
          opacity: 1;
        }
        &__thumb {
          color: #FFFFFF !important;
        }
      }
    }
    .v-label {
      font-size: 14px;
    }
  }
</style>
