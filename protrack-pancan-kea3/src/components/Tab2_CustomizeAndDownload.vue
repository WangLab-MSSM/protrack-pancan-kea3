<template>
    <div class="tab2-customize-and-download">
        <div class="heatmap-options">
            <div><b>Series: </b>{{ selectedSeries }}</div>
            <div><b>Sample: </b> {{ selectedSample }}</div>
            <div><b>Value: </b>{{ selectedValue }}</div>
            <sort-buttons :selectedSeries="selectedSeries" />
            <b-field>
                <b-switch v-model="tumorsLocked" class="tumor-lock-toggle">
                    {{ tumorsLocked ? "Tumors locked" : "Tumors will sort" }}
                </b-switch>
            </b-field>
        </div>
    </div>
</template>

<script>
  import SortButtons from "./SortButtons";

  export default {
    components: {SortButtons},
    name: "tab2-customize-and-download",
    computed: {
        selectedSeries() {
            return this.$store.state.selectedSeries;
        },
        selectedSample() {
            return this.$store.state.selectedSample;
        },
        selectedValue() {
            return this.$store.state.selectedValue;
        },
        tumorsLocked: {
            get() {
                return this.$store.state.tumorsLocked
            },
            set(v) {
                this.$store.dispatch('updateTumorsLocked', v)
            }
        },
    }
  }
</script>

<style scoped>
    .tumor-lock-toggle {
        margin-top: 10px;
    }

    .heatmap-options {
        border: solid 1px black;
        padding: 10px;
    }

    .score-selector {
        display: flex;
        flex-direction: row;
        justify-content: left;
    }
</style>