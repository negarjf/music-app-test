<template>
    <badge icon="heart"
           @click="toggleLike"
           :class="{'liked': isLiked}"
    >
        {{ label }}
    </badge>
</template>

<script>
    import BadgeMixin from '@/components/badges/BadgeMixin';

    export default {
        name: 'Like',

        mixins: [BadgeMixin],

        props: {
            isLiked: {
                type: Boolean,
                default: false,
            },
        },

        methods: {
            /**
             * Like and Unlike action
             */
            toggleLike() {
                if (this.isLiked) {
                    this.$store.dispatch('unLikeTrack', { index: this.index });
                } else {
                    this.$store.dispatch('likeTrack', {
                        index: this.index,
                        id   : this.id,
                    });

                }
            },
        },
    };
</script>
