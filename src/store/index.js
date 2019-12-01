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
            console.log(state.currentTrackIndex);
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
          state.audio = new Audio(track.music_file_path);
        },
        
        setLike(state, index) {
            Vue.set(state.tracks[index], 'isLiked', true);
            Vue.set(state.tracks[index], 'likes', state.tracks[index].likes + 1);
        },
        
        setUnlike(state, index) {
            Vue.set(state.tracks[index], 'isLiked', false);
            Vue.set(state.tracks[index], 'likes', state.tracks[index].likes - 1);
        }
    },
  
    actions: {
        getTracks({commit}) {
            return MusicServices.getList().then((response) => {
                commit('setTracks', response.data);
            });
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
