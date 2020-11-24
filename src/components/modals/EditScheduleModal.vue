<template>
  <base-modal max-width="320" title="Edit Schedule">
    <template #button>
      <v-btn
        class="edit-schedule__link text-capitalize pl-0"
        small
        text
        elevation="0"
      >
        Edit Schedule
      </v-btn>
    </template>

    <template #content>
      <div class="pt-2">
        <base-input custom-label="starting baseline" help-text="(Suggested 0, Max 40)" />
        <base-input custom-label="increase per day" help-text="(Suggested 2, Max 4)" />
        <base-input custom-label="max sends per day" help-text="(Suggested 40, Max 50)" />
        <base-input
          custom-label="reply rate %"
          help-text="(Suggested 30%, Max 50%)"
          append-icon="mdi-percent-outline"
        />
        <div class="form__limit-hint pt-2">
          <i>Want to increase these limits? <a :href="`mailto:${process.env.VUE_APP_SUPPORT_EMAIL}`">Chat with us.</a></i>
        </div>
        <div class="d-flex justify-end">
          <base-button class="mt-5 px-9 text-capitalize">Save</base-button>
        </div>
      </div>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddInboxForm from '@/components/forms/AddInboxForm.vue'

@Component({ components: { AddInboxForm } })
export default class EditScheduleModal extends Vue {
  dialog = false
}
</script>

<style lang="scss" scoped>
  .form {
    &__limit-hint {
      font-size: 9px;
      font-family: $label-font;
      letter-spacing: 0.9px;
    }
  }

  .edit-schedule {
    &__link {
      font-size: $font-md;
      color: $color-dodger-blue !important;
      font-weight: $font-weight-bold;
    }
  }
</style>
