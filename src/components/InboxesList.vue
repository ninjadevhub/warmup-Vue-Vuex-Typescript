<template>
  <div class="inboxes">
    <div>
      <div class="inboxes__title pb-3">
        Inboxes
        <div class="float-right">
          <add-inbox-modal />
        </div>
      </div>
      <v-list class="inboxes__list" dense>
        <v-list-item-group>
          <template v-for="inbox in inboxes">
            <v-list-item v-if="inbox <= inboxesToShow" :key="inbox" class="pl-0" :ripple="false">
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  <base-switch class="pl-3" label="mike.benson@aol.com" />
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <v-divider class="pb-3"></v-divider>
      <v-btn
        class="d-block mx-auto text-capitalize font-weight-bold inboxes__more"
        elevation="0"
        :ripple="false"
        text
        @click="inboxesToShow += 3"
      >
        Load more
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddInboxModal from '@/components/modals/AddInboxModal.vue'

@Component({ components: { AddInboxModal } })
export default class InboxesList extends Vue {
  inboxes = 10 // TODO: fetch inboxes
  inboxesToShow = 3 // TODO: move to config file
}
</script>

<style lang="scss" scoped>
  .inboxes {
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    &__title {
      font-size: $font-lg;
      font-weight: $font-weight-bold;
    }
    &__new {
      font-size: 11px;
    }
    &__more {
      color: $color-dodger-blue !important;
    }
  }
</style>
