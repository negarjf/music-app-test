<template>
    <div class="container">
        <header class="main-header">
            <h1>
                Trending
            </h1>
            <pagination @change="changePage" :current="currentPage"/>
        </header>

        <songs-list />
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination';
    import SongsList from '@/components/SongsList';

    export default {
        name: 'SongsContainer',

        components: {
            SongsList,
            Pagination,
        },

        data() {
            return {
                currentPage: 1,
            };
        },

        methods: {
            changePage(page) {
                this.$store.dispatch('getTracks', page).then(() => {
                    this.$store.dispatch('clearAudio');
                    this.currentPage = page;
                });
            }
        }
    };
</script>
