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
            <like-button class="track-item__badge"
                         role="button"
                         :count="info && info.likes | showNum"
                         :id="info && info.id"
                         :isLiked="info && info.isLiked"
                         :index="index"
            />
            <comment-button class="track-item__badge"
                            role="button"
                            :id="info && info.id"
                            :name="info && info.name || ''"
                            :count="info && info.comments | showNum"
                            :index="index"
            />
            <visits-button class="track-item__badge"
                           role="button"
                           :count="info && info.plays | showNum"
                           :index="index"
            />
        </footer>
    </div>
</template>

<script>
    // Components
    import PlayerButton from '@/components/PlayerButton';
    import LikeButton from '@/components/badges/Like';
    import CommentButton from '@/components/badges/Comment';
    import VisitsButton from '@/components/badges/Visits';
    // Vuex
    import { mapGetters } from 'vuex';

    export default {
        name: 'TrackItem',

        components: {
            PlayerButton,
            LikeButton,
            CommentButton,
            VisitsButton
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

            index: {
                type: Number,
                default: null
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
                    this.$store.dispatch('initAudio', {track: this.info, index: this.index});
                    this.$store.dispatch('increasePlays', {index: this.index});
                }

                if(this.playing) {
                    this.$store.dispatch('pause');
                } else {
                    this.$store.dispatch('play');
                }
            },
        }
    };
</script>
