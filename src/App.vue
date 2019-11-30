<template>
  <div id="app">
      <div :class="{'loading':isLoading}">
          <header-section />
          <songs-container/>
          <music-player />
      </div>
  </div>
</template>

<script>
  import HeaderSection from '@/components/Header';
  import SongsContainer from '@/components/SongsContainer';
  import MusicPlayer from '@/components/Player';

export default {
    name: 'app',

    components: {
        HeaderSection,
        SongsContainer,
        MusicPlayer
    },

    data() {
        return {
            isLoading: true,
        };
    },

    created() {
        this.$store.dispatch('getTracks').then(() => {
            this.isLoading = false;
        });
    }
}
</script>

<style lang="scss">
  @import '~@/assets/scss/style.scss';
</style>
