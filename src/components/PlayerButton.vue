<template>
    <button class="player-button" type="button" @click="toggleAudio">
        <i class="fa" :class="this.playing ? 'fa-pause' : 'fa-play'" />
    </button>
</template>

<script>
    export default {
        name: 'PlayerButton',

        props: {
            playing: {
                type: Boolean,
                default: false
            },

            id: {
                type: String,
                default: null,
            }
        },

        methods: {
            toggleAudio() {
                return this.playing? this.pause() : this.play();
            },

            play () {
                this.$emit('update:playing', true);
                this.$emit('playing', this.id);
            },

            pause () {
                this.$emit('update:playing', false);
                this.$emit('paused', this.id);
            },
        }
    };
</script>
