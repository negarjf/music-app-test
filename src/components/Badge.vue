<template>
    <span class="badge" @click="$emit('click')">
        <i class="fa"
           :class="'fa-' + icon"
           v-if="icon"
        />
        <slot>
            {{ label}}
        </slot>
    </span>
</template>

<script>
    export default {
        name: 'Badge',

        props: {
            icon: {
                type: String,
                default: null
            },

            label: {
                type: String,
                default: null
            }
        }
    };
</script>

<style scoped>

</style>
