<template>
    <transition name="fade">
        <div class="modal-overlay" v-if="show">
            <div class="modal">
                <header class="modal__header">
                    <h1 class="title" v-if="title">
                        {{ title }}
                    </h1>
                    <i class="modal__close fa fa-times" @click="close"></i>
                </header>

                <div class="modal__body">
                    <slot />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Modal',

        props: {
            // Modal title
            title: {
                type   : String,
                default: null,
            },
        },

        data() {
            return {
                show: false,
            };
        },

        methods: {
            /**
             * Close modal and raise event
             */
            close() {
                this.$emit('close');
                this.show = false;
            },

            /**
             * Open modal and raise event
             */
            open() {
                this.$emit('open');
                this.show = true;
            },
        },
    };
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s;

        .modal {
            transition: transform 0.5s;
        }
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;

        .modal {
            transform: translateY(-10%);
        }
    }
</style>
