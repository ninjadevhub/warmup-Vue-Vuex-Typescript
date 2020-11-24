<template>
  <v-dialog
    v-model="dialog"
    v-bind="{ ...$attrs, ...$props }"
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot name="button" />
      </div>
    </template>
    <v-card>
      <v-card-title class="modal__title d-flex justify-space-between px-0 py-0" :class="titleClass">
        {{ title }}
        <v-btn v-if="closeButton" class="black--text" icon dark text @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider class="mb-1 mt-2" />
      <slot name="content" />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseModal extends Vue {
  @Prop({
    type: String
  })
  readonly title?: string

  @Prop({
    type: Boolean,
    default: true
  })
  readonly closeButton!: boolean

  @Prop({
    type: String
  })
  readonly titleClass?: string

  dialog = false;
}
</script>

<style lang="scss" scoped>
  .v-dialog {
    &__content {
      margin-top: 40px;
      align-items: flex-start;
    }
  }

  .v-card {
    padding: 20px 25px;
  }

  .modal {
    &__title {
      font-family: $label-font;
      font-weight: $font-weight-bold !important;
      font-size: $font-lg !important;
    }
  }

  .title--sm {
    font-size: $font-md-x !important;
  }
</style>
