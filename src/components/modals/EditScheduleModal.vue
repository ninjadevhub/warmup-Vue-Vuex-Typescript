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
        <base-input
          custom-label="starting baseline"
          help-text="(Suggested 0, Max 40)"
          tooltip="The starting number of emails we should send on day one."
        />
        <base-input
          custom-label="increase per day"
          help-text="(Suggested 2, Max 4)"
          tooltip="The number of emails we will increase by each day."
        />
        <base-input
          custom-label="max sends per day"
          help-text="(Suggested 40, Max 50)"
          tooltip="We will never send more than  this number of new inital emails per day."
        />
        <base-input
          custom-label="reply rate %"
          help-text="(Suggested 30%, Max 50%)"
          append-icon="mdi-percent-outline"
          tooltip="We automatically reply to X percent of the emails that are received within the inbox. These are additional emails added on top of the Max Send Per Day rate."
        />
        <div class="form__limit-hint pt-0">
          <i>Want to increase these limits? <a :href="`mailto:${supportEmail}`">Chat with us.</a></i>
        </div>
        <div class="d-flex justify-end">
          <base-button class="edit-schedule__submit mt-5 px-9 text-capitalize">Save</base-button>
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

  get supportEmail () {
    return process.env.VUE_APP_SUPPORT_EMAIL
  }
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
    &__submit {
      width: 95px;
      height: 30px;
    }
  }
</style>
