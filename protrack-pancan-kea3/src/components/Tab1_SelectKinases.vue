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
    </div>
</template>

<script>
  export default {
    name: "tab1-select-kinases",
    data() {
        return {
            kinaseInput: 'AAK1\nAATK\nABL1',
        }
    },
    computed: {
      kinases() {
        return this.$store.state.kinases
      }
    },
    methods: {
        submitAndMoveTabs() {
            this.fetchTracks()
            this.$store.dispatch('updateActiveTab', 1)
        },
        fetchTracks() {
            const kinases = this.kinaseInput.split('\n').map(e => e.toUpperCase())
            this.$store.dispatch('setKinases', kinases)
            this.$store.dispatch('submitKinases', { kinases: this.kinases, direction: 'Bottom' })
            this.$store.dispatch('submitKinases', { kinases: this.kinases, direction: 'Top' })
        }
    },
    mounted() {
        this.fetchTracks()
    }
}
</script>

<style scoped>

</style>