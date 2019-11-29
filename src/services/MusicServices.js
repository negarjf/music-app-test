import Http from '@/Http';
const API_KEY = '___agAFTxkmMIWsmN9zOpM_6l2SkZPPy21LGRlxhYD8';

export default {
    /**
     * Get a list of trending tracks
     * @returns {*}
     */
    getList () {
        return Http.get('/song/trending');
    },
    
    /**
     * Like a track
     * @param params
     * @returns {*}
     */
    like(params) {
        return Http.post('/interact/like', params, { params : {apikey: API_KEY}});
    },
    
    /**
     * Leave comment on a track
     * @param params
     * @returns {*}
     */
    comment(params) {
        return Http.post('/interact/like', params, { params : {apikey: API_KEY}});
    },
    
}
