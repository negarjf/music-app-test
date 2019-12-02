import Vue from 'vue';
import Vuex from 'vuex';
import MusicServices from '@/services/MusicServices';

Vue.use(Vuex);

export default new Vuex.Store({
    state    : {
        tracks           : [],
        currentTrack     : null,
        currentTrackIndex: null,
        playing          : false,
        audio            : null,
    },
    getters  : {
        tracks(state) {
            return state.tracks;
        },
        
        playing(state) {
            return state.playing;
        },
        
        currentTrack(state) {
            return state.currentTrack;
        },
        
        currentTrackIndex(state) {
            return state.currentTrackIndex;
        },
        
        audio(state) {
            return state.audio;
        },
    },
    mutations: {
        /**
         * Sets tracks and add additional properties
         * @param state
         * @param tracks
         */
        setTracks(state, tracks) {
            state.tracks = tracks.map(track => {
                Vue.set(track, 'isLiked', false);
                return track;
            });
        },
        
        setCurrentTrack(state, track) {
            state.currentTrack = track;
        },
        
        setCurrentTrackIndex(state, index) {
            state.currentTrackIndex = index;
        },
        
        setPlayingStatus(state, status) {
            state.playing = status;
        },
    
        /**
         * Reset audio or initiate new Audio object
         * @param state
         * @param track
         */
        setAudio(state, track) {
            if (track) {
                state.audio = new Audio(track.music_file_path);
            } else {
                state.audio = null;
            }
        },
    
        /**
         * Change isLiked flag and increase likes count
         * @param state
         * @param index
         */
        setLike(state, index) {
            Vue.set(state.tracks[index], 'isLiked', true);
            Vue.set(state.tracks[index], 'likes', state.tracks[index].likes + 1);
        },
    
        /**
         * Change isLiked flag and decrease likes count
         * @param state
         * @param index
         */
        setUnlike(state, index) {
            Vue.set(state.tracks[index], 'isLiked', false);
            Vue.set(state.tracks[index], 'likes', state.tracks[index].likes - 1);
        },
    
        /**
         * Increase playing count
         * @param state
         * @param index
         */
        addPlayCount(state, index) {
            Vue.set(state.tracks[index], 'plays', state.tracks[index].plays + 1);
        },
    
        /**
         * Increase comments count
         * @param state
         * @param index
         */
        addCommentCount(state, index) {
            Vue.set(state.tracks[index], 'comments', state.tracks[index].comments + 1);
        },
    },
    
    actions: {
        /**
         * Fetch all tracks
         * @param commit
         * @param page
         * @returns {Promise<any> | PromiseLike<any>}
         */
        getTracks({ commit }, page = 1) {
            return MusicServices.getList({ page }).then((response) => {
                commit('setTracks', response.data);
            });
        },
    
        /**
         * Increase playing count
         * @param commit
         * @param index
         */
        increasePlays({ commit }, { index }) {
            commit('addPlayCount', index);
        },
    
        /**
         * Increase comment count
         * @param commit
         * @param index
         */
        increaseComments({ commit }, { index }) {
            commit('addCommentCount', index);
        },
    
        /**
         * Like a single track
         * @param commit
         * @param index
         * @param id
         * @returns {*}
         */
        likeTrack({ commit }, { index, id }) {
            commit('setLike', index);
            return MusicServices.like({ id });
        },
    
        /**
         * Unlike a single track
         * @param commit
         * @param index
         */
        unLikeTrack({ commit }, { index }) {
            commit('setUnlike', index);
        },
    
        /**
         * Submit comment for a track
         * @param context
         * @param payload
         * @returns {*}
         */
        commentTrack(context, payload) {
            return MusicServices.comment({
                id  : payload.id,
                type: payload.type,
            });
        },
    
        /**
         * Initialize new audio
         * @param commit
         * @param dispatch
         * @param track
         * @param index
         */
        initAudio({ commit, dispatch }, { track, index }) {
            dispatch('pause');
            commit('setCurrentTrack', track);
            commit('setCurrentTrackIndex', index);
            commit('setAudio', track);
        },
    
        /**
         * Clear existing audio
         * @param commit
         * @param dispatch
         */
        clearAudio({ commit, dispatch }) {
            dispatch('pause');
            commit('setCurrentTrack', null);
            commit('setCurrentTrackIndex', null);
            commit('setAudio', null);
        },
    
        /**
         * Play the audio
         * @param commit
         * @param state
         */
        play({ commit, state }) {
            if (state.audio && state.audio.paused) {
                state.audio.play();
                commit('setPlayingStatus', true);
            }
        },
    
        /**
         * Pause the audio
         * @param commit
         * @param state
         */
        pause({ commit, state }) {
            if (state.audio && !state.audio.paused) {
                state.audio.pause();
                commit('setPlayingStatus', false);
            }
        },
    },
});
