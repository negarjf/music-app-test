<template>
  <div id="app">
      <div :class="{'loading':isLoading}">
          <header-section />
          <songs-container/>
          <music-player />
          <comment-box />
      </div>
  </div>
</template>

<script>
  import HeaderSection from '@/components/Header';
  import SongsContainer from '@/components/SongsContainer';
  import MusicPlayer from '@/components/Player';
  import CommentBox from '@/components/CommentBox';

export default {
    name: 'app',

    components: {
        HeaderSection,
        SongsContainer,
        MusicPlayer,
        CommentBox
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
