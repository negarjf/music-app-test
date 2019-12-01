<template>
    <badge icon="heart"
           @click="like"
           :class="{'liked': isLiked}"
    >
        {{ label }}
    </badge>
</template>

<script>
    import BadgeMixin from '@/components/badges/BadgeMixin'

    export default {
        name: 'Like',

        mixins: [BadgeMixin],

        data() {
            return {
                isLiked: false,
            };
        },

        methods: {
            like () {
                if(this.isLiked) {
                    return;
                }

                this.$store.dispatch('likeTrack', this.id).then(() => {
                    this.isLiked = true;
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    };
</script>

<style scoped>
    .liked {
        color: var(--color-red)
    }
</style>
