<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<style lang="scss">
  @import url(./scss/_fonts.scss);

  #app {
    background-color: $bg-color;
    font-size: $font-md;
  }
</style>
