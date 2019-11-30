<template>
    <div class="player-container" :class="{'playing': currentTrack}">
        <track-item :info="currentTrack"
                    player
        />
    </div>
</template>

<script>
    import TrackItem from '@/components/TrackItem';
    import {mapGetters} from 'vuex';

    export default {
        name: 'Player',

        components: {
            TrackItem
        },

        computed: {
            ...mapGetters(['currentTrack'])
        },

    };
</script>
