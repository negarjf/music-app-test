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
