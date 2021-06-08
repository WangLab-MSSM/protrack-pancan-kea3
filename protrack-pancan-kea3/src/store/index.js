import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getTracks, getClinicalTracks } from '../firebase'
import samples from '../samples'

export default new Vuex.Store({
  state: {
    activeTab: 0,
    clinicalTracks: {},
    kinases: [],
    Bottom: [],
    sampleMeta: {},
    samples: samples,
    Top: [],
    tracksMeta: {},
  },
  mutations: {
    SET_KINASE_LIST(state, kinases) {
      state.kinases = kinases
    },
    SET_CLINICAL_TRACKS(state, clinicalTracks) {
      state.clinicalTracks = clinicalTracks
    },
    SET_CLINICAL_TRACKS_META(state, clinicalTracks) {
      let clinicalTracksMeta = {}
      Object.keys(clinicalTracks).forEach(el => clinicalTracksMeta[el] = {
        clinical: true
      })
      state.tracksMeta = {...state.tracksMeta, ...clinicalTracksMeta}
    },
    SET_SAMPLE_META(state, clinicalTracks) {
      let sampleMeta = []
      let clinicalKeys = Object.keys(clinicalTracks)
      samples.forEach(s => {
        let meta = {}
        clinicalKeys.forEach(k => meta[k] = clinicalTracks[k][s].val)
        sampleMeta.push([
          s,
          meta
        ])
      })
      state.sampleMeta = sampleMeta
    },
    SET_TRACKS(state, { tracks, direction }) {
      state[direction] = tracks
    },
    UPDATE_ACTIVE_TAB(state, v) {
      state.activeTab = v
    },
  },
  actions: {
    async fetchClinicalTracks(store) {
      const clinicalTracks = await getClinicalTracks()
      store.commit('SET_CLINICAL_TRACKS', clinicalTracks)
      store.commit('SET_CLINICAL_TRACKS_META', clinicalTracks)
      store.commit('SET_SAMPLE_META', clinicalTracks)
      // store.commit('SET_FILTERS', clinicalTracks)
    },
    updateActiveTab(store, v) {
      store.commit('UPDATE_ACTIVE_TAB', v)
    },
    setKinases(store, kinases) {
      store.commit('SET_KINASE_LIST', kinases)
    },
    async submitKinases(store, { kinases, direction }) {
      const trackPromises = [...kinases].map((kinase) => {
        return getTracks(kinase, direction)
      });
      const tracks = await Promise.all(trackPromises)
      store.commit('SET_TRACKS', { tracks, direction })
    },
  }
})
