<template>
    <badge icon="headphones-alt">
        {{ label }}
    </badge>
</template>

<script>
    import BadgeMixin from '@/components/badges/BadgeMixin'

    export default {
        name: 'Visits',

        mixins: [BadgeMixin],
    };
</script>

<style scoped>

</style>
