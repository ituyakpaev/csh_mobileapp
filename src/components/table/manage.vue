<template>
    <div class="table__manage" v-if="!manage || manage.length > 0">
        <button class="table__manage-addnew" @click="$emit('add')" v-if="!manage || manage.indexOf('add') !== -1">
            Добавить
        </button>
        <input type="text" class="table__manage-search" placeholder="Поиск" v-model="q"
               @keyup.enter="performSearch" v-if="!manage || manage.indexOf('search') !== -1">
    </div>
</template>

<script>
    export default {
        name: "manage",
        props: {
            meta: Object,
            query: Object
        },
        data() {
            return {
                q: ''
            }
        },
        inject: [ 'manage' ],
        methods:{
            performSearch() {
                console.log('search is performed')
                this.$emit('search', { q: this.q, skip: 0 })
            }
        }
    }
</script>
