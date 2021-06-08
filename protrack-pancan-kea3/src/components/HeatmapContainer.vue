<template>
    <div class="heatmap-container">
        <div id="plotly-heatmap" >
        </div>
    </div>
</template>

<script>
  import generateHeatmap from '../plotly/plotly'

  import categoricalColors from '../plotly/colors/categoricalColors'

  let plot

  export default {
    name: "heatmap-container",
    computed: {
      clinicalTracks() {
        return this.$store.state.clinicalTracks
      },
      samples() {
        return this.$store.state.samples
      },
      top() {
        return this.$store.state.Top
      },
      bottom() {
        return this.$store.state.Bottom
      }
    },
    watch: {
      clinicalTracks() {
        this.renderHeatmap()
      },
      samples() {
        this.renderHeatmap()
      },
    },
    methods: {
      renderHeatmap() {
        plot = generateHeatmap(this.clinicalTracks, this.samples, this.top, this.bottom)

        plot.on('plotly_click', (data) => {
            const selectedSeries = data.points[0].y;
            const selectedSample = data.points[0].x;
            const selectedValue = selectedSeries in categoricalColors ?
              categoricalColors[selectedSeries][data.points[0].z].label
              : data.points[0].z;
            this.$store.dispatch(
                'updateSelectedData',
                { selectedSeries, selectedSample, selectedValue }
            )
        });
      }
    },
    mounted() {
      this.renderHeatmap()
    }
  }
</script>

<style scoped>
    .heatmap-container {
        width: 100%;
    }
</style>