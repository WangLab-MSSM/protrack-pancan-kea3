<template>
    <div class="heatmap-container">
        <div id="plotly-heatmap" >
        </div>
    </div>
</template>

<script>
  import generateHeatmap from '../plotly/plotly'

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
      }
    },
    methods: {
      renderHeatmap() {
        plot = generateHeatmap(this.clinicalTracks, this.samples, this.top, this.bottom)
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