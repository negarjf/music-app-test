import Vue from 'vue'
import Vuex from 'vuex'
import MusicServices from '@/services/MusicServices';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tracks: [],
        currentTrack: null,
        currentTrackIndex: null,
        playing: false,
        audio: null,
    },
    getters: {
        tracks(state) {
            return state.tracks;
        },
      
        playing(state) {
          return state.playing;
        },
        
        currentTrack(state){
            return state.currentTrack;
        },
        
        currentTrackIndex(state){
            return state.currentTrackIndex;
        },
        
        audio(state) {
          return state.audio;
        },
    },
    mutations: {
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
      
        setPlayingStatus(state,status) {
          state.playing = status;
        },
      
        setAudio(state, track) {
            if(track) {
                state.audio = new Audio(track.music_file_path);
            }else {
                state.audio = null;
            }
        },
        
        setLike(state, index) {
            Vue.set(state.tracks[index], 'isLiked', true);
            Vue.set(state.tracks[index], 'likes', state.tracks[index].likes + 1);
        },
        
        setUnlike(state, index) {
            Vue.set(state.tracks[index], 'isLiked', false);
            Vue.set(state.tracks[index], 'likes', state.tracks[index].likes - 1);
        },
    
        addPlayCount(state, index) {
            Vue.set(state.tracks[index], 'plays', state.tracks[index].plays + 1);
        },
        
        addCommentCount(state, index) {
            console.log(index);
            Vue.set(state.tracks[index], 'comments', state.tracks[index].comments + 1);
        },
    },
  
    actions: {
        getTracks({commit}, page = 1) {
            return MusicServices.getList({page}).then((response) => {
                commit('setTracks', response.data);
            });
        },
    
        increasePlays({commit}, {index}) {
            commit('addPlayCount', index);
        },
        
        increaseComments({commit}, {index}) {
            commit('addCommentCount', index);
        },
        
        likeTrack({commit}, {index, id}) {
            commit('setLike', index);
            return MusicServices.like({id});
        },
        
        unLikeTrack({commit}, {index}) {
            commit('setUnlike', index);
        },
        
        commentTrack(context, payload) {
            return MusicServices.comment({
                id: payload.id,
                type: payload.type
            });
        },
  
        initAudio ({commit, dispatch}, {track, index}) {
            dispatch('pause');
              commit('setCurrentTrack', track);
              commit('setCurrentTrackIndex', index);
              commit('setAudio', track);
        },
    
        clearAudio ({commit, dispatch}) {
            dispatch('pause');
            commit('setCurrentTrack', null);
            commit('setCurrentTrackIndex', null);
            commit('setAudio', null);
        },
      
        play ({commit, state}) {
          if(state.audio && state.audio.paused) {
            state.audio.play();
            commit('setPlayingStatus', true);
          }
        },
  
        pause ({commit, state}) {
          if(state.audio && !state.audio.paused) {
            state.audio.pause();
            commit('setPlayingStatus', false);
          }
        },
    }
})
