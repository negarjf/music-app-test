import Vue from 'vue'
import Vuex from 'vuex'
import MusicServices from '@/services/MusicServices';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tracks: [],
        currentTrack: null,
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
        
        audio(state) {
          return state.audio;
        }
    },
    mutations: {
        setTracks(state, tracks) {
          state.tracks = tracks;
        },
      
        setCurrentTrack(state, track) {
          state.currentTrack = track;
        },
      
        setPlayingStatus(state,status) {
          state.playing = status;
        },
      
        setAudio(state, track) {
          state.audio = new Audio(track.music_file_path);
        }
    },
  
    actions: {
        getTracks({commit}) {
            return MusicServices.getList().then((response) => {
                commit('setTracks', response.data);
            });
        },
  
        initAudio ({commit, dispatch}, track) {
          dispatch('pause');
          commit('setCurrentTrack', track);
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
