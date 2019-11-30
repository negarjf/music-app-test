<template>
    <div class="track-item" :class="{'player': player}">
        <div class="track-item__thumb">
            <img :src="info && info.cover_image_path || require('@/assets/images/music_placeholder.png')"
                 :alt="info && info.name || 'Album Art'"
            >
        </div>

        <header class="track-item__header">
            <player-button class="track-item__button"
                           :id="info && info.id"
                           :disabled="!info"
                           @click="toggleAudio"
            />
            <div class="track-item__title">
                <h1 class="title">
                    {{ info && info.name || '...' }}
                </h1>
                <p class="author">
                    {{ info && info.artist_name || '...' }}
                </p>
            </div>
            <div v-if="!player"
                 class="track-item__menu"
            >
                <i class="fa fa-ellipsis-v"></i>
            </div>
        </header>

        <slot/>

        <footer class="track-item__footer">
            <span class="track-item__badge" role="button">
                <i class="fa fa-heart" />
                {{ info && info.likes | showNum}}
            </span>
            <span class="track-item__badge" role="button">
                <i class="fa fa-comment-alt" />
                {{ info && info.comments | showNum}}
            </span>
            <span class="track-item__badge" role="button">
                <i class="fa fa-headphones-alt" />
                {{ info && info.plays | showNum}}
            </span>
        </footer>
    </div>
</template>

<script>
    import PlayerButton from '@/components/PlayerButton';
    import { mapGetters } from 'vuex';

    export default {
        name: 'TrackItem',

        components: {
            PlayerButton
        },

        props: {
            info: {
                type: Object,
                default: null,
            },

            player: {
                type: Boolean,
                default: false
            },


        },

        filters: {
            /**
             * Shows only numbers
             * @param val
             * @returns {*}
             */
            showNum(val) {
                return isNaN(val) ? '-' : val;
            }
        },

        computed: {
            ...mapGetters(['currentTrack', 'playing']),
        },

        methods: {
            toggleAudio() {
                if (!this.currentTrack || (this.currentTrack.id !== this.info.id)) {
                    this.$store.dispatch('initAudio', this.info);
                }

                if(this.playing) {
                    this.$store.dispatch('pause');
                } else {
                    this.$store.dispatch('play');
                }
            }
        }
    };
</script>
