<template>
    <transition name="slide">
        <div v-if="currentTrack"
             class="player-container"
        >
            <div class="player-bar" v-if="percent">
                <div class="player-bar__fill"
                     :style="{transform: `scaleX(${percent})`}"
                ></div>
            </div>
            <track-item :info="currentTrack"
                        player
            />
        </div>
    </transition>
</template>

<script>
    import TrackItem from '@/components/TrackItem';
    import {mapGetters} from 'vuex';

    export default {
        name: 'Player',

        components: {
            TrackItem
        },

        data() {
            return {
                percent: 0,
            };
        },

        computed: {
            ...mapGetters(['currentTrack', 'audio'])
        },

        watch: {
            audio (newAudio ) {
                if(!newAudio) {
                    return;
                }

                this.audio.addEventListener('play', () => {
                    this.percent = 0;
                });

                this.audio.addEventListener('timeupdate', () => {
                    this.percent = (this.audio.currentTime / this.audio.duration);
                });

                this.audio.addEventListener('ended', () => {
                    this.$store.commit('setPlayingStatus', false);
                })
            },
        }

    };
</script>

<style scoped>
    .slide-enter-active {
        transition: all .3s ease;
    }

    .slide-enter, .slide-leave-to{
        transform: translateY(100%);
    }

    .slide-enter-to, .slide-leave{
        transform: translateY(0);
    }
</style>
