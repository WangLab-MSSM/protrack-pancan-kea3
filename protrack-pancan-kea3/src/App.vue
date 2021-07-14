<template>
  <div id="app">
  <link rel="stylesheet" href="https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css">
  <introduction />
    <main class="main">
      <input-container class="input-container-main" />
      <heatmap-container v-if="view === 'all kinases'" />
      <heatmap-container-substrate v-else ></heatmap-container-substrate>
    </main>
  </div>
</template>

<script>
import Introduction from "./components/Introduction";
import InputContainer from "./components/InputContainer";
import HeatmapContainer from "./components/HeatmapContainer";
import HeatmapContainerSubstrate from './components/HeatmapContainerSubstrate.vue';

export default {
  name: 'App',
  components: {
    HeatmapContainer,
    InputContainer,
    Introduction,
    HeatmapContainerSubstrate,
  },
  computed: {
    view() {
      return this.$store.state.view
    },
    activeTab() {
      return this.$store.state.activeTab
    }
  },
  mounted() {
    this.$store.dispatch('fetchClinicalTracks')
  }
}
</script>

<style lang="scss">
    html {
        box-sizing: border-box;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .main {
        display: flex;
        flex-direction: row;
    }

    .input-container-main {
        min-width: 350px;
    }

    // Import Bulma's core
    @import "~bulma/sass/utilities/_all";


// Set your colors
$primary: #8c67ef;
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// sinai colors
$sinai-1000: #ececec;
$sinai-NA: #cdcdcd;
$sinai-1000-invert: findColorInvert($sinai-1000);
$sinai-1000-light: findLightColor($sinai-1000);
$sinai-1000-dark: findDarkColor($sinai-1000);
$sinai-5000: #56ebd3;
$sinai-5000-invert: findColorInvert($sinai-5000);
$sinai-5000-light: findLightColor($sinai-5000);
$sinai-5000-dark: findDarkColor($sinai-5000);
$sinai-5001: #fdba5e;
$sinai-5001-invert: findColorInvert($sinai-5001);
$sinai-5001-light: findLightColor($sinai-5001);
$sinai-5001-dark: findDarkColor($sinai-5001);
$sinai-5002: #a17bf2;
$sinai-5002-invert: findColorInvert($sinai-5002);
$sinai-5002-light: findLightColor($sinai-5002);
$sinai-5002-dark: findDarkColor($sinai-5002);
$sinai-5003: #c85221;
$sinai-5003-invert: findColorInvert($sinai-5003);
$sinai-5003-light: findLightColor($sinai-5003);
$sinai-5003-dark: findDarkColor($sinai-5003);
$sinai-5004: #a113b2;
$sinai-5004-invert: findColorInvert($sinai-5004);
$sinai-5004-light: findLightColor($sinai-5004);
$sinai-5004-dark: findDarkColor($sinai-5004);
$sinai-5005: #4ad32f;
$sinai-5005-invert: findColorInvert($sinai-5005);
$sinai-5005-light: findLightColor($sinai-5005);
$sinai-5005-dark: findDarkColor($sinai-5005);
$sinai-5006: #78583e;
$sinai-5006-invert: findColorInvert($sinai-5006);
$sinai-5006-light: findLightColor($sinai-5006);
$sinai-5006-dark: findDarkColor($sinai-5006);
$sinai-5007: #788c3b;
$sinai-5007-invert: findColorInvert($sinai-5007);
$sinai-5007-light: findLightColor($sinai-5007);
$sinai-5007-dark: findDarkColor($sinai-5007);
$sinai-5008: #155126;
$sinai-5008-invert: findColorInvert($sinai-5008);
$sinai-5008-light: findLightColor($sinai-5008);
$sinai-5008-dark: findDarkColor($sinai-5008);
$sinai-5009: #ef8ead;
$sinai-5009-invert: findColorInvert($sinai-5009);
$sinai-5009-light: findLightColor($sinai-5009);
$sinai-5009-dark: findDarkColor($sinai-5009);

$sinai-2000: #cdcdcd;
$sinai-2001: #80a7c8;
$sinai-2002: #4e7eaf;
$sinai-2003: #005795;

$sinai-3000: #cdcdcd;
$sinai-3001: #cfcfac;
$sinai-3002: #a3a265;
$sinai-3003: #78781b;

$sinai-4000: #cdcdcd;
$sinai-4001: #1b782a;
// Lists and maps
$custom-colors: (
  "sinai-1000": $sinai-1000,
  "sinai-NA": $sinai-NA,
    "sinai-5000": $sinai-5000,
    "sinai-5001": $sinai-5001,
    "sinai-5002": $sinai-5002,
    "sinai-5003": $sinai-5003,
    "sinai-5004": $sinai-5004,
    "sinai-5005": $sinai-5005,
    "sinai-5006": $sinai-5006,
    "sinai-5007": $sinai-5007,
    "sinai-5008": $sinai-5008,
    "sinai-5009": $sinai-5009,
    "sinai-2000": $sinai-2000,
    "sinai-2001": $sinai-2001,
    "sinai-2002": $sinai-2002,
    "sinai-2003": $sinai-2003,
    "sinai-3000": $sinai-3000,
    "sinai-3001": $sinai-3001,
    "sinai-3002": $sinai-3002,
    "sinai-3003": $sinai-3003,
    "sinai-4000": $sinai-4000,
    "sinai-4001": $sinai-4001,
) !default;
$custom-shades: null !default;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
    (
        "white": (
            $white,
            $black,
        ),
        "black": (
            $black,
            $white,
        ),
        "light": (
            $light,
            $light-invert,
        ),
        "dark": (
            $dark,
            $dark-invert,
        ),
        "primary": (
            $primary,
            $primary-invert,
            $primary-light,
            $primary-dark,
        ),
        "link": (
            $link,
            $link-invert,
            $link-light,
            $link-dark,
        ),
        "info": (
            $info,
            $info-invert,
            $info-light,
            $info-dark,
        ),
        "success": (
            $success,
            $success-invert,
            $success-light,
            $success-dark,
        ),
        "warning": (
            $warning,
            $warning-invert,
            $warning-light,
            $warning-dark,
        ),
        "danger": (
            $danger,
            $danger-invert,
            $danger-light,
            $danger-dark,
        )
    ),
    $custom-colors
    );

    // Links
    $link: $primary;
    $link-invert: $primary-invert;
    $link-focus-border: $primary;

    // Buefy variables -- https://bulma.io/documentation/customize/variables/
    $size-small: 0.85rem;

    // Import Bulma and Buefy styles
    @import "~bulma";
    @import "~buefy/src/scss/buefy";
</style>
