<template>
    <div class="sort-buttons">
        <div v-if="selectedSeries.length === 0">
            Click element on heatmap to enable sorting.
        </div>
        <div v-else>
        Sort by: <b>{{ selectedSeries }}</b>
        <div class="sort-buttons-buttons">
            <b-button
                    size="is-small"
                    rounded type="is-warning"
                    :disabled="selectedSeries.length === 0"
                    icon-left="arrow-up"
                    @click="sortBySeries(asc=true)"
                >
                    Asc
            </b-button>
            <b-button
                    size="is-small"
                    rounded type="is-warning"
                    :disabled="selectedSeries.length === 0"
                    icon-left="arrow-down"
                    @click="sortBySeries(asc=false)"
                >
                   Desc
            </b-button>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sort-buttons",
        props: ['selectedSeries'],
        methods: {
            sortBySeries(asc) {
                this.$store.dispatch('sortBySeries', { series: this.selectedSeries, asc })
            }
        }
    }
</script>

<style scoped>
    .sort-buttons {
        padding: 10px;
        background: #fafafa;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .sort-buttons-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

    }
</style>