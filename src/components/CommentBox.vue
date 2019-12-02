<template>
    <modal :title="title"
           ref="comment"
           class="comment-modal"
           @close="clearComment"
    >
        <form @submit.prevent="postComment">
            <div class="field">
                <label for="comment">
                    {{ label }}
                </label>
                <textarea name="comment"
                          id="comment"
                          cols="30"
                          rows="7"
                          v-model="comment"
                />
            </div>

            <button class="button primary"
                    type="submit"
            >
                Send
            </button>
        </form>
    </modal>
</template>

<script>
    // Event bus
    import EventBus from '@/EventBus';

    // Components
    import Modal from '@/components/Modal';

    export default {
        name: 'CommentBox',

        components: {
            Modal,
        },

        data() {
            return {
                comment: '',
                title  : '',
                id     : '',
                index  : '',
            };
        },

        created() {

            // Open modal if event is raised
            EventBus.$on('openCommentModal', (e) => {
                const { id, title, index } = e;
                this.title = title;
                this.id = id;
                this.index = index;
                this.openComment();
            });
        },

        computed: {
            label() {
                return `What do you think about "${this.title}"?`;
            },
        },

        methods: {
            /**
             * Open Mmdal
             */
            openComment() {
                this.$refs.comment.open();
            },

            /**
             * Close modal
             */
            closeComment() {
                this.$refs.comment.close();
            },

            /**
             * Clear comment field
             */
            clearComment() {
                this.comment = '';
            },

            /**
             * Submit comment
             */
            postComment() {
                this.$store.dispatch('commentTrack', {
                    id  : this.id,
                    type: this.comment,
                }).then(() => {
                    this.$store.dispatch('increaseComments', { index: this.index });
                    this.closeComment();
                });
            },
        },
    };
</script>
