<template>
    <div class="input-container">
    <section>
        <b-tabs v-model="activeTab" type="is-boxed" size="is-small">
            <b-tab-item label="1) Select kinases">
                <tab1-select-kinases/>
            </b-tab-item>

            <b-tab-item label="2) Customize/download">
                <tab2-customize-and-download />
            </b-tab-item>
        </b-tabs>
    </section>
    </div>
</template>

<script>
    import Tab1SelectKinases from "./Tab1_SelectKinases";
    import Tab2CustomizeAndDownload from "./Tab2_CustomizeAndDownload";

    export default {
        components: {
          Tab2CustomizeAndDownload,
          Tab1SelectKinases
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