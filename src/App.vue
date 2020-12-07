<template>
  <v-app>
    <v-main>
      <flash-message />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import FlashMessage from '@/components/FlashMessage.vue'

@Component({ components: { FlashMessage } })
export default class App extends Vue {}
</script>

<style lang="scss">
  @import url(./scss/_fonts.scss);
  * {
    word-break: keep-all !important;
  }

  .drift-frame-controller {
    height: 78px !important;
  }

  #app {
    background-color: $bg-color;
    font-size: $font-md;
    font-family: $label-font;
  }
</style>
