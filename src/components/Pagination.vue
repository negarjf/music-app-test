<template>
    <div class="pagination">
        <button class="button primary" :disabled="current === 1" @click="prev">
            <i class="fa fa-chevron-left"></i>
        </button>
        <button class="button primary" :disabled="current === 2" @click="next">
            <i class="fa fa-chevron-right"></i>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'Pagination',

        props: {
            // Current page number
            current: {
                type   : Number,
                default: 1,
            },
        },

        methods: {
            /**
             * Go to previous page
             */
            prev() {
                // Had to hard-code since API doesn't provide total page number
                this.$emit('change', 1);
            },

            /**
             * Go to next page
             */
            next() {
                this.$emit('change', 2);
            },
        },
    };
</script>

<style scoped>

</style>
