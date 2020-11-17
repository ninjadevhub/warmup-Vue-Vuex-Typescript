<template>
  <div id="app" class="v-application">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import url(./scss/_fonts.scss);

  #app {
    background-color: $bg-color;
    min-height: 100vh;
  }
</style>
