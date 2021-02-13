<template>
    <div class="table-selected">
        <div class="table-selected__actions">
            <div class="table-selected__action" v-for="action in mass_actions" :key="action.key"
                 @click="$emit(`mass_action:${ action.key }`, selected)">
                {{ action.title }}
            </div>
        </div>
        <div class="table-selected__count">Выбрано: {{ all_is_selected ? meta.count : selected.length }}</div>
    </div>
</template>

<script>
    export default {
        name: "selected",
        inject: ['mass_actions', 'selected', 'all_is_selected' ]
    }
</script>
