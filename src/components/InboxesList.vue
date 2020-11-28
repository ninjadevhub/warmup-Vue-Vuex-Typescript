<template>
  <div class="inboxes">
    <div>
      <div class="inboxes__title pb-3">
        Inboxes
        <div class="float-right">
          <add-inbox-modal @created="$emit('created')" />
        </div>
      </div>
      <v-list class="inboxes__list" dense>
        <v-list-item-group>
          <template v-for="(inbox, key) in inboxes.results">
            <v-list-item v-if="key <= inboxesToShow" :key="key" class="pl-0" :ripple="false">
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  <base-switch class="pl-3" :label="inbox.email" />
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <v-divider class="pb-3"></v-divider>
      <v-btn
        v-if="inboxes.results > 3"
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import AddInboxModal from '@/components/modals/AddInboxModal.vue'
import Inboxes from '@/types/Inboxes'

@Component({ components: { AddInboxModal } })
export default class InboxesList extends Vue {
  @Prop({
    type: Object as () => Inboxes,
    required: true
  })
  readonly inboxes!: Inboxes

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
      font-size: $font-xs-x;
    }
    &__more {
      color: $color-dodger-blue !important;
    }
  }
</style>
