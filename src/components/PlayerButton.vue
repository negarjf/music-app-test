<template>
    <button class="player-button"
            :class="{'bounce': isPlaying}" type="button"
            :disabled="disabled"
            @click="toggleAudio"
    >
        <i class="fa" :class="isPlaying ? 'fa-pause' : 'fa-play'" />
    </button>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'PlayerButton',

        props: {
            id: {
                type: String,
                default: null,
            },

            disabled: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            ...mapGetters(['currentTrack', 'playing']),

            isPlaying () {
                if (this.playing && this.currentTrack) {
                   return (this.id === this.currentTrack.id);
                }

                return false;
            }
        },

        methods: {
            toggleAudio(e) {
                this.$emit('click', e);
                return this.isPlaying
                    ? this.$emit('update:playing', false)
                    : this.$emit('update:playing', true);
            },
        }
    };
</script>
