<template>
    <ul class="songs-list" v-if="tracks && tracks.length">
        <li class="songs-list__item" v-for="track in tracks" :key="track.id">
            <track-item :info="track"/>
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

<style lang="scss" scoped>

    .songs-list {
        display: flex;
        list-style-type: none;
        flex-wrap: wrap;
        margin: 50px 0;
        padding: 0;

        &__item {
            width: 100%;

            @media (min-width: 576px) {
                width: 50%;
            }

            @media (min-width: 960px) {
                width: 33.33%;
            }
        }
    }

    .placeholder-text{
        font-size: 2rem;
        padding: 20px;
        text-align: center;
        margin-top: 50px;
    }

</style>
