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
            current: {
                type: Number,
                default: 1
            }
        },

        methods: {
            prev() {
                this.$emit('change', 1);
            },

            next() {
                this.$emit('change', 2);
            },
        }
    };
</script>

<style scoped>

</style>
