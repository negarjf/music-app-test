<template>
    <div class="comment-container">
        <badge icon="comment-alt"
               @click="openComment"
        >
            {{ label }}
        </badge>
    </div>
</template>

<script>
    import BadgeMixin from '@/components/badges/BadgeMixin';
    import EventBus from '@/EventBus';

    export default {
        name: 'Comment',

        mixins: [BadgeMixin],

        props: {
            // Track name
            name: {
                type: String,
                default: '',
            },
        },

        methods: {
            /**
             * Emit event to open comment box
             */
            openComment() {
                EventBus.$emit('openCommentModal', {
                    id   : this.id,
                    title: this.name,
                    index: this.index,
                });
            },
        },
    };
</script>

<style scoped>
    .comment-container {
        display: inline-flex;
    }
</style>
