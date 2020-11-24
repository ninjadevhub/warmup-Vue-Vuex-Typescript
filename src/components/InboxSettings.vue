<template>
  <v-container class="pr-0 pr-md-16" fluid>
    <v-row class="mb-6">
      <div class="settings__title">
        <div class="font-weight-bold">john.smith@acme.com</div>
        <base-switch v-model="isRunning" class="d-inline-block py-0 mt-3" />
        <span v-if="isRunning" class="label label__running font-weight-bold">Running</span>
        <span v-else class="label label__paused font-weight-bold">Paused</span>
        <v-divider />
      </div>
    </v-row>
    <v-row class="settings__data data">
      <v-col cols="12" md="8">
        <div class="data__title">
          Sending
          <div class="float-right">
            <edit-schedule-modal />
          </div>
        </div>
        <v-divider class="mb-2 mt-1" />
        <v-row class="mb-13">
          <v-col cols="6" md="3">
            <div class="data__wrapper">
              <div class="data__value">0</div>
              <div class="data__info">Starting baseline</div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="data__wrapper">
              <div class="data__value">5</div>
              <div class="data__info">Increase per day</div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="data__wrapper">
              <div class="data__value">40</div>
              <div class="data__info">Max sends per day</div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="data__wrapper">
              <div class="data__value">30%</div>
              <div class="data__info">Reply rate percentage</div>
            </div>
          </v-col>
        </v-row>
        <div class="data__title">
          About This Inbox
        </div>
        <v-divider class="mb-2 mt-1" />
        <v-row class="mb-13">
          <v-col cols="6" md="3">
            <div class="data__wrapper">
              <div class="data__value">Google</div>
              <div class="data__info">Inbox type</div>
            </div>
          </v-col>
          <v-col cols="6" md="3">
            <div class="data__wrapper">
              <div class="data__value">80 days</div>
              <div class="data__info">Domain age</div>
            </div>
          </v-col>
        </v-row>
        <div class="data__title">
          Delete Inbox
        </div>
        <v-divider class="mb-2 mt-1" />
        Delete this inbox by  <a href="#" class="settings__delete-link">clicking once here</a>.
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditScheduleModal from '@/components/modals/EditScheduleModal.vue'

@Component({ components: { EditScheduleModal } })
export default class InboxSettings extends Vue {
  isRunning = false // TODO: need computed getter?
}
</script>

<style lang="scss" scoped>
  .settings {
    &__title {
      font-family: $label-font;
      font-size: $font-md-x;
      width: 100%;
      padding-left: 10px;
      .label {
        font-size: 15px;
        &__running {
          color: $color-mountain-meadow;
        }
        &__paused {
          color: $color-french-gray
        }
      }
    }
    &__data {
      font-family: $label-font;
      .data {
        &__wrapper {
          margin-bottom: 18px;
        }
        &__title {
          font-weight: $font-weight-bold;
          font-size: $font-md-x;
        }
        &__value {
          font-weight: $font-weight-bold;
          font-size: $font-lg;
        }
      }
    }
    &__delete-link {
      color: #d89a98;
      text-decoration: underline;
    }
  }
</style>
