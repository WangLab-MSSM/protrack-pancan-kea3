<template>
    <div class="tab2-customize-and-download">
        <div class="view-selector">
            <b-field label="View: " horizontal>
                <b-select v-model="view">
                    <option
                        v-for="option in kinaseViews"
                        :value="option"
                        :key="option"
                    >
                        {{ option }}
                    </option>
                </b-select>
        </b-field>
        </div>
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
        <toggle-categorical
               v-for="(colors, category) in categoricalColors"
                :key="category"
                :options="colors"
                :category="category"
        >

        </toggle-categorical>
    </div>
</template>

<script>
  import SortButtons from "./SortButtons";

  import categoricalColors from '../plotly/colors/categoricalColors'
  import ToggleCategorical from "./ToggleCategorical";

  export default {
    components: {
      ToggleCategorical,
      SortButtons
    },
    name: "tab2-customize-and-download",
    data() {
      return {
          categoricalColors,
      }
    },
    computed: {
        view: {
            get() { return this.$store.state.view },
            set(v) { this.$store.dispatch('setView', v)}
        },
        kinaseViews() {
            return ['all kinases', ...this.$store.state.kinases]
        },
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

    .view-selector {
        display: flex;
        flex-direction: row;
        justify-content: left;
    }
</style>