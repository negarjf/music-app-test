<template>
    <div class="container">
        <songs-list />
    </div>
</template>

<script>
    import SongsList from '@/components/SongsList';

    export default {
        name: 'SongsContainer',

        components: {
            SongsList,
        }
    };
</script>

<style lang="scss" scoped>
    .container{
        max-width: 960px;
        padding: 0 15px;
        margin: 0 auto;
    }


</style>
