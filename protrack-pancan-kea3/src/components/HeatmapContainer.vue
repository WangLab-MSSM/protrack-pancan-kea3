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
      },
      foldchange() {
        return this.$store.state.Foldchange
      },
      substrateTracks() {
        return this.$store.state.substrateTracks
      },
    },
    watch: {
      clinicalTracks() {
        this.renderHeatmap()
      },
      samples() {
        this.renderHeatmap()
      },
      bottom() {
        this.renderHeatmap()
      },
      top() {
        this.renderHeatmap()
      },
      foldchange() {
        this.renderHeatmap()
      },
      substrateTracks() {
        this.renderHeatmap()
      },
    },
    methods: {
      renderHeatmap() {
        plot = generateHeatmap(
          this.clinicalTracks,
          this.samples.slice(),
          this.top.slice(),
          this.bottom.slice(),
          this.foldchange.slice(),
        )

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
        min-width: 1200px;
    }
</style>