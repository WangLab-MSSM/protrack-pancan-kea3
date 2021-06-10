<template>
    <div class="tab1-select-kinases">
        <b-field label="Enter newline separated list of kinases">
            <b-input
                type="textarea"
                v-model="kinaseInput"
            >
            </b-input>
        </b-field>
        <b-button
            size="is-small"
            rounded type="is-primary"
            :disabled="kinaseInput.length === 0"
            @click="submitAndMoveTabs"
        >
            Visualize
        </b-button>

        <div v-if="notFound.length > 0" class="not-found-list">
            <b>Not found: </b> {{ notFound.join(' , ') }}
        </div>
    </div>
</template>

<script>
  import availableKinases from '../kinases'

  export default {
    name: "tab1-select-kinases",
    data() {
        return {
            kinaseInput: 'MAPK1\nMAPK3\nMAP2K1\nMAP2K3\nEGFR',
        }
    },
    computed: {
      kinases() {
        return this.$store.state.kinases
      },
      found() {
        return this.kinaseInput.split('\n').filter(e => e.length).map(e => e.toUpperCase()).filter(el => availableKinases[el])
      },
      notFound() {
        return this.kinaseInput.split('\n').filter(e => e.length).map(e => e.toUpperCase()).filter(el => !(el in availableKinases))
      }
    },
    methods: {
        submitAndMoveTabs() {
            this.fetchTracks()
            this.$store.dispatch('updateActiveTab', 1)
        },
        fetchTracks() {
            this.$store.dispatch('setKinases', this.found)
            this.$store.dispatch('submitKinases', { kinases: this.found, direction: 'Bottom' })
            this.$store.dispatch('submitKinases', { kinases: this.found, direction: 'Top' })
        }
    },
    mounted() {
        this.fetchTracks()
    }
}
</script>

<style scoped>
.not-found-list {
    margin: 20px 0;
}
</style>