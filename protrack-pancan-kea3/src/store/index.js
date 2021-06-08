import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getSortedKeys from '../getSortedKeys'
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
    selectedSample: '',
    selectedSeries: '',
    selectedValue: '',
    Top: [],
    tracksMeta: {},
    tumorsLocked: true,
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
    SET_TRACKS_META(state, tracks) {
      let heatmapTracksMeta = {}
      tracks.forEach(({ name, direction, kinase }) => {
        heatmapTracksMeta[name] = {
          clinical: false,
          direction,
          kinase
        }
      })
      state.tracksMeta = {...state.tracksMeta, ...heatmapTracksMeta}
    },
    UPDATE_ACTIVE_TAB(state, v) {
      state.activeTab = v
    },
    UPDATE_DISPLAY_DATA(state, { selectedSeries, selectedSample, selectedValue }) {
      state.selectedSeries = selectedSeries;
      state.selectedSample = selectedSample;
      state.selectedValue = selectedValue;
    },
    UPDATE_SAMPLES(state, sortedSamples) {
      state.samples = sortedSamples
    },
    UPDATE_TUMORS_LOCKED(state, tumorsLocked) {
      state.tumorsLocked = tumorsLocked;
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
    sortBySeries(store, { series , asc }) {
      console.log(series)
      let scores = {}
      if (store.state.tracksMeta[series].clinical) {
        Object.entries(store.state.clinicalTracks[series]).forEach(el => scores[el[0]] = typeof el[1].colorKey === 'number' ? el[1].colorKey : -1000)
      } else {
        const direction = series[series.length - 1] === 'T' ? 'Top' : 'Bottom'
        Object.entries(store.state[direction].filter((e) => e.name === series)[0].data).forEach(el => scores[el[0]] = typeof el[1] === 'number' ? el[1] : -1000)
      }
      let tumorVals = {}
      Object.entries(store.state.clinicalTracks.Tumor).forEach(el => tumorVals[el[0]] = el[1].colorKey)
      console.log('tumor vals: ', tumorVals)
      const sortedSamples = getSortedKeys(
        scores,
        tumorVals,
        store.state.samples,
        asc,
        store.state.tumorsLocked
      )
      store.commit('UPDATE_SAMPLES', sortedSamples)
    },
    async submitKinases(store, { kinases, direction }) {
      const trackPromises = [...kinases].map((kinase) => {
        return getTracks(kinase, direction)
      });
      const tracks = await Promise.all(trackPromises)
      store.commit('SET_TRACKS', { tracks, direction })
      store.commit('SET_TRACKS_META', tracks)
    },
    updateSelectedData(store, selectedData) {
      store.commit('UPDATE_DISPLAY_DATA', selectedData)
    },
    updateTumorsLocked(store, tumorsLocked) {
      store.commit('UPDATE_TUMORS_LOCKED', tumorsLocked)
    },
  }
})
