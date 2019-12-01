import Badge from '@/components/Badge';

export default {
    name: 'badge-mixin',
    
    components: {
        Badge
    },
    
    props: {
        count: {
            type: [String, Number],
            default: '-'
        },
        
        id: {
            type: String,
            default: null
        },
        
        index: {
            type: Number,
            default: null
        }
    },
    
    computed: {
        label() {
            return this.count;
        }
    },
}
