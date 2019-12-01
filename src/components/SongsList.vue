<template>
    <ul class="songs-list" v-if="tracks && tracks.length">
        <li class="songs-list__item" v-for="(track, index) in tracks" :key="track.id">
            <track-item :info="track" :index="index"/>
        </li>
    </ul>

    <div class="placeholder-text" v-else>
        Oops! Nothing Found! :(
    </div>
</template>

<script>
    // Components
    import TrackItem from '@/components/TrackItem';
    import {mapGetters} from 'vuex';

    export default {
        name: 'SongsList',

        components: {
            TrackItem
        },

        computed: {
            ...mapGetters(['tracks']),
        },
    };
</script>
