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
            <v-list-item :key="key" class="pl-0" :ripple="false">
              <v-list-item-content class="py-0">
                <v-list-item-title @click.self="onInboxClick(inbox.inbox_id)">
                  <inbox-control :inbox="inbox" :label="inbox.email" class="d-inline-block pl-3" />
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <!-- <v-divider class="pb-3"></v-divider>
      <v-btn
        v-if="inboxes.results.length > 3"
        class="d-block mx-auto text-capitalize font-weight-bold inboxes__more"
        elevation="0"
        :ripple="false"
        text
        @click="inboxesToShow += 3"
      >
        Load more
      </v-btn> -->
      <div v-if="inboxes.total_pages < 1" class="text-center">
        <base-pagination
          :value="inboxes.current_page"
          :length="inboxes.total_pages"
          :total-visible="7"
          @input="$emit('page-change', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AddInboxModal from '@/components/modals/AddInboxModal.vue'
import Inboxes from '@/types/Inboxes'
import InboxControl from '@/components/InboxControl.vue'

@Component({ components: { AddInboxModal, InboxControl } })
export default class InboxesList extends Vue {
  @Prop({
    type: Object as () => Inboxes,
    required: true
  })
  readonly inboxes!: Inboxes

  @Prop({
    type: Number
  })
  readonly currentPage!: number

  // inboxesToShow = 3 // TODO: move to config file

  onInboxClick (inboxId: string): void {
    this.$router.push({
      name: 'inbox-details',
      params: { inboxId }
    })
  }
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
    &__list {
      min-height: 70vh;
    }
    &__new {
      font-size: $font-xs-x;
    }
    &__more {
      color: $color-dodger-blue !important;
    }
  }

  ::v-deep {
    .v-pagination {
      &__item {
        &--active {
          color: #000000 !important;
          &.primary {
            border: 1px solid #333333 !important;
            background-color: #FFFFFF !important;
          }
        }
        background-color: #333333 !important;
        color: #FFFFFF !important;
        box-shadow: none;
        font-size: $font-sm !important;
        height: 25px;
        min-width: 25px;
      }
      &__navigation {
        background-color: #333333 !important;
        box-shadow: none;
        height: 25px;
        min-width: 25px;
        width: 25px;
        i {
          color: #FFFFFF !important;
          font-size: $font-md-x;
        }
      }
    }
  }
</style>
