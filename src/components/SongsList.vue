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

    // Services
    import MusicServices from '@/services/MusicServices';

    export default {
        name: 'SongsList',

        components: {
            TrackItem
        },

        data() {
            return {
                tracks: [],
            };
        },

        created() {
            MusicServices.getList().then((response) => {
                this.tracks = response.data;
            }).catch(error => {
                console.log(error);
            })
        }
    };
</script>

<style lang="scss" scoped>

    .songs-list {
        display: flex;
        list-style-type: none;
        flex-wrap: wrap;
        margin: 0;
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
