<template>
    <div class="heatmap-container-substrate">
        test
        <div id="plotly-heatmap-substrate" >
        </div>
    </div>
</template>

<script>
  import generateHeatmap from '../plotlySubstrate/plotly'

  import categoricalColors from '../plotlySubstrate/colors/categoricalColors'

  let plot

  export default {
    name: "heatmap-container-substrate",
    computed: {
      clinicalTracks() {
        return this.$store.state.clinicalTracks
      },
      samples() {
        return this.$store.state.samples
      },
      top() {
        return this.$store.state.Top.filter(e => e && e.kinase === this.view)
      },
      bottom() {
        return this.$store.state.Bottom.filter(e => e && e.kinase === this.view)
      },
      foldchange() {
        return this.$store.state.Foldchange.filter(e => e && e.kinase === this.view)
      },
      view() {
        return this.$store.state.view
      },
      substrateTracks() {
        return this.$store.state.substrateTracks.filter(e => e && e.kinase === this.view)
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
        if (this.substrateTracks.length > 0) {          
          plot = generateHeatmap({ 
            samples: this.samples, 
            substrateTracks: this.substrateTracks, 
            clinicalTracks: this.clinicalTracks ,
            top: this.top,
            bottom: this.bottom,
            foldchange: this.foldchange,
        })
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



      }
    },
    mounted() {
      this.renderHeatmap()
    }
  }
</script>

<style scoped>
    .heatmap-container-substrate {
        width: 100%;
        min-width: 1200px;
    }
</style>