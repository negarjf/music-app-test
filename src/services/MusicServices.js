import Http from '@/Http';
import { getFormData } from '@/scripts/helpers';
const API_KEY = process.env.VUE_APP_API_KEY;

export default {
    /**
     * Get a list of trending tracks
     * @returns {*}
     */
    getList (params) {
        let {page} = params;
        return Http.get('/song/trending/' + page);
    },
    
    /**
     * Like a track
     * @param params
     * @returns {*}
     */
    like(params) {
        return Http.post('/interact/like', getFormData(params), { params : {apikey: API_KEY} });
    },
    
    /**
     * Leave comment on a track
     * @param params
     * @returns {*}
     */
    comment(params) {
        return Http.post('/interact/like', getFormData(params), { params : {apikey: API_KEY}});
    },
    
}
