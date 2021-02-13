<template>
    <div class="table__row-header" v-if="showHeader">
        <div class="table__cell-header table__cell-header-selection" v-if="mass_action_enabled">
            <checkbox :value="all_is_selected" @change="selectAll($event)" :style="{ 'margin-bottom': 0 }" />
        </div>
        <div class="table__cell-header" :class="key" v-for="(item, key) in headers" :key="key"
             @click="$emit('sort',{ key: key, title: item.title })"
             :style="{ width: item.width ? item.width + 'px' : '' }">
            {{ item.title }}
        </div>
        <div class="table__cell-header" v-if="cell_manage" style="width: 30px;"/>

        <selected v-if="all_is_selected || selected.length > 0" />
    </div>
</template>

<script>
    import selected from "./selected";

    export default {
        name: "header_t",
        components: {selected},
        props: {
          meta: Object
        },
        inject: ['showHeader', 'cell_manage', 'headers', 'mass_action_enabled', 'all_is_selected', 'selected' ],
        methods: {
            selectAll(value) {
                this.$emit('select_all', value)
            }
        }
    }
</script>
