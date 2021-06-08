<template>
    <div class="toggle-categorical">
        <b-collapse :open="true">
            <template #trigger="props">
                <div class="instructions">
                    <b>
                        {{ category }}
                         <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </b>
                    <b-button
                        size="is-small"
                        @click.stop="clearAllSelected"
                        v-if="props.open"
                    >
                        Clear all
                    </b-button>
                </div>
            </template>
        <b-checkbox-button
                v-for="(colorKey, val) in computedOptions"
                :key="val"
                v-model="selected"
                :native-value="val"
                size="is-small"
                is-text
                :type="`is-sinai-${colorKey}`"
        >
                <!--:type="`is-sinai-5000`"-->
                <span>{{ category === 'Survival status' && val !== 'NA' ? val === '0.0' ? 'Alive (0.0)' : 'Dead (1.0)' : val }}</span>
        </b-checkbox-button>
        </b-collapse>

    </div>
</template>

<script>
    export default {
        name: "toggle-categorical",
        props: ['options', 'category'],
        computed: {
            selected: {
                get() {
                    return this.$store.state.filters[this.category]
                },
                set(v) {
                    this.$store.dispatch('filterCategorical', {key: this.category, show: v})
                }
            },
            computedOptions() {
              let res = {}
              Object.entries(this.options).forEach(([colorKey, data]) => {
                res[data.label] = colorKey
              })
              res['NA'] = 1000
              return res
            }
        },
        methods: {
            clearAllSelected() {
                this.$store.dispatch('filterCategorical', {key: this.category, show: []})
            }
        }
    }
</script>

<style scoped>
    .toggle-categorical {
    }
    .instructions {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 2px;
    }
</style>