<template>
  <div class="dashboard ml-md-15 ml-0">
    <v-app-bar class="header" app flat>
      <img src="@/assets/img/logo_white.png" width="25px" @click.stop="sidebar = !sidebar">
      <div v-if="title" class="white--text text-center text-capitalize">
        <base-icon class="pr-1" variant="secondary">
          {{ title.icon }}
        </base-icon>
        {{ title.title }}
        <template v-if="title.subTitle">
          - <span class="grey--text">{{ title.subTitle }}</span>
        </template>
      </div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="align-items-center white--text"
            variant="secondary"
            v-bind="attrs"
            v-on="on"
            elevation="0"
            text
          >
            MB
            <base-icon class="pl-0 pr-0 pt-0 pb-0" variant="secondary" size="14">mdi-chevron-down</base-icon>
          </v-btn>
        </template>
        <v-list class="menu">
          <v-list-item link>
            <v-list-item-title>
              <router-link class="menu__link" to="/account">
                Account
              </router-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>
              <router-link class="menu__link" to="/logout">
                Log out
              </router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <div class="dashboard__content d-flex">
      <v-navigation-drawer
        v-model="sidebar"
        with="60"
        :permanent="$vuetify.breakpoint.mdAndUp"
        absolute
        left
      >
        <v-list-item class="sidebar px-0 justify-space-between flex-column">
          <v-list-item-content>
            <v-list-item-icon class="mx-0">
              <base-button
                to="/inboxes"
                class="mx-auto"
                :variant="isActiveRoute('inboxes') ? 'secondary' : 'text'"
                icon
              >
                <base-icon>mdi-inbox-outline</base-icon>
              </base-button>
            </v-list-item-icon>
            </v-list-item-content>
            <v-list-item-content class="py-0 align-content-end">
            <v-list-item-icon class="mx-0">
              <base-button
                to="/billing"
                class="mx-auto"
                :variant="isActiveRoute('billing') ? 'secondary' : 'text'"
                icon
              >
                <base-icon >mdi-label-outline mdi-rotate-270</base-icon>
              </base-button>
            </v-list-item-icon>
            <v-list-item-icon class="mx-0">
              <base-button
                to="/account-settings"
                class="mx-auto"
                :variant="isActiveRoute('account-settings') ? 'secondary' : 'text'"
                icon
              >
                <base-icon >mdi-account-outline</base-icon>
              </base-button>
            </v-list-item-icon>
            <v-list-item-icon class="mx-0 mb-0">
              <base-button to="/logout" class="mx-auto" variant="text" icon>
                <base-icon >mdi-exit-to-app</base-icon>
              </base-button>
            </v-list-item-icon>
          </v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>

      <router-view />

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheDashboard extends Vue {
  sidebar = null;

  isActiveRoute (route: string): boolean {
    return this.$route.name === route
  }

  get title (): { icon: string; title: string; subTitle: string } | undefined {
    switch (this.$route.name) {
      case 'inboxes':
        return {
          icon: 'mdi-inbox-outline',
          title: 'Inboxes',
          subTitle: this.$route.params.inbox
        }
      case 'account-settings':
        return {
          icon: 'mdi-account-outline',
          title: 'Account details',
          subTitle: 'Settings'
        }
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    height: 100%;
    &__content {
      height: inherit;
    }
  }

  .header {
    background-color: $secondary-color !important;
    ::v-deep {
      .v-toolbar__content {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .menu {
    &__link {
      color: #000000;
      text-decoration: none;
    }
  }

  aside {
    position: fixed;
    padding-top: 60px;
    max-width: 60px;
  }

  .sidebar {
    height: 100%;
    background-color: $bg-color;
  }

</style>
