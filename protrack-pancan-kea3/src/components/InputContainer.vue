<template>
    <div class="input-container">
    <section>
        <b-tabs v-model="activeTab" type="is-boxed" size="is-small">
            <b-tab-item label="1) Select kinases">
                <tab1-select-kinases/>
            </b-tab-item>

            <b-tab-item label="2) Customize/download">
                <!--<tab3-customize-and-download />-->
                2
            </b-tab-item>
        </b-tabs>
    </section>
    </div>
</template>

<script>
    // import Tab2RenderHeatmap from "./Tab2_RenderHeatmap";
    // import Tab3CustomizeAndDownload from "./Tab3_CustomizeAndDownload";

    import Tab1SelectKinases from "./Tab1_SelectKinases";

    export default {
        components: {
          Tab1SelectKinases
          // Tab3CustomizeAndDownload,
          // Tab2RenderHeatmap,
          // Tab1SelectPathways
        },
        name: "input-container",
        computed: {
            activeTab: {
                get() {
                    return this.$store.state.activeTab
                },
                set(v) {
                    this.$store.dispatch('updateActiveTab', v)
                }
            },
        }
    }
</script>

<style scoped>
    .input-container {
        min-width: 400px;
        border: solid 0.1em lightgray;
        border-top: none;
        padding-top: 8px;
        overflow-y: scroll;
    }

    .input-container > div {
        margin-bottom: 1em;
    }

    .mssm-logo {
        margin: 2em;
    }
</style>