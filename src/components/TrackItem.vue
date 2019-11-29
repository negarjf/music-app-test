<template>
    <div class="track-item" v-if="info">
        <div class="track-item__thumb">
            <img :src="info.cover_image_path || require('@/assets/images/music_placeholder.png')" :alt="info.name || 'Album Art'">
        </div>

        <header class="track-item__header">
            <player-button class="track-item__button"/>
            <div class="track-item__title">
                <h1 class="title">
                    {{ info.name || '...' }}
                </h1>
                <p class="author">
                    {{ info.artist_name || '...' }}
                </p>
            </div>
            <div class="track-item__menu">
                <i class="fa fa-ellipsis-v"></i>
            </div>
        </header>

        <footer class="track-item__footer">
            <span class="track-item__badge" role="button">
                <i class="fa fa-heart" />
                {{ info.likes | showNum}}
            </span>
            <span class="track-item__badge" role="button">
                <i class="fa fa-comment-alt" />
                {{ info.comments | showNum}}
            </span>
            <span class="track-item__badge" role="button">
                <i class="fa fa-headphones-alt" />
                {{ info.plays | showNum}}
            </span>
        </footer>
    </div>
</template>

<script>
    import PlayerButton from '@/components/PlayerButton';

    export default {
        name: 'TrackItem',

        components: {
            PlayerButton
        },

        props: {
            info: {
                type: Object,
                default: null,
            }
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
    };
</script>
