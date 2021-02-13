<template>
    <router-link class="table__row" tag="a" :to="{ name: rows_route_name, params: { link: row.link || row.id } }" v-if="rows_route_name">
        <div class="table__cell table__cell-selection" v-if="mass_action_enabled">
            <checkbox :value="all_is_selected" @change="$emit('select', row)" />
        </div>
        <div class="table__cell" :class="key" :style="{ width: item.width ? item.width + 'px' : '' }"
             v-for="(item, key) in headers" :key="key" :inner-html.prop="row[key] | td(item, basePath)" />
    </router-link>
    <div v-else class="table__row">
        <div class="table__cell table__cell-selection" v-if="mass_action_enabled">
            <checkbox :value="all_is_selected" @change="$emit('select', row)" />
        </div>
        <div class="table__cell" :class="key" :style="{ width: item.width ? item.width + 'px' : '' }"
             @click='$emit("open", row, index)'
             v-for="(item, key) in headers" :key="key" :inner-html.prop="row[key] | td(item, basePath)" />
    </div>
</template>

<script>
    export default {
        name: "row",
        props: {
            row: {},
            index: {},
        },
        inject: [ 'headers', 'isLoading', 'cell_manage', 'selected', 'mass_action_enabled', 'all_is_selected', 'rows_route_name' ],
        filters: {
            td(value, header, basePath) {
                if (header.type) {
                    if (header.type === 'Boolean') {
                        return value ? 'Да' : 'Нет'
                    } else if (header.type === 'image') {
                        return `<img src="${value || (basePath + 'placeholder.png') }">`
                    } else {
                        return `<span title='${ value || ''}'>${ value || '' }</span>`
                    }
                } else {
                    return `<span title='${ value || ''}'>${ value || '' }</span>`
                }
            }
        }
    }
</script>
