<template>
  <div id="app">
      <header-section />
      <songs-container/>
  </div>
</template>

<script>
  import HeaderSection from '@/components/Header';
  import SongsContainer from '@/components/SongsContainer';
export default {
  name: 'app',

  components: {
      HeaderSection,
      SongsContainer
  }
}
</script>

<style lang="scss">
  @import '~@/assets/scss/style.scss';
</style>
