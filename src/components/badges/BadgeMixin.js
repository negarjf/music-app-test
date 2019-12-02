import Badge from '@/components/Badge';

export default {
    name: 'badge-mixin',
    
    components: {
        Badge
    },
    
    props: {
        // Badge label count
        count: {
            type: [String, Number],
            default: '-'
        },
        
        // Track Id
        id: {
            type: String,
            default: null
        },
        
        // Track Index
        index: {
            type: Number,
            default: null
        }
    },
    
    computed: {
        /**
         * Badge Label
         * @returns {*}
         */
        label() {
            return this.count;
        }
    },
}
