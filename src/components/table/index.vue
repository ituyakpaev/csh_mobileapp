<template>
    <div class="table">
        <manage @add="$emit('add', $event )" @search="$emit('query:update', $event)"
                :meta="meta" :query="query"/>
        <query_parse @cancel="$emit('query:update', $event)" v-if="query && query_parse" :query="query"/>
        <div class="table__inner">
            <v_header @sort="$emit('sort', $event)" @select_all="all_is_selected = !!$event"/>
            <div class="table__row loading" v-if="isLoading && errorLog.length === 0">
                <div class="table__cell loading" :class="key" :style="{ width: item.width ? item.width + 'px' : '' }"
                     v-for="(item, key) in headers" :key="key" @click="$emit(`click:cell:${ key }`)">
                  <span class="loader">
                    {{ item.title }}
                  </span>
                </div>
            </div>
            <div class="table__body" v-if="!isLoading && errorLog.length === 0 && data.length > 0">
                <slot>
                    <row v-for="(row, index) in data" :key="row.link || row.id || index" @open='$emit("open", $event)'
                         :row="row" :index="index" @select="selectRow"/>
                </slot>
            </div>
            <div class="table__body-empty" v-if="!isLoading && (errorLog.length === 0) && data.length === 0">
                Таблица пуста.
            </div>
            <div class="table__body-empty-error" v-if="errorLog.length > 0">
                <span v-html="errorLog.map(error => `${ error.text } Код ошибки ${ error.code }` ).join(', ')"/>
            </div>
        </div>
        <pagination @paginate="$emit('query:update', $event)" :meta="meta" v-if="meta.count"/>
    </div>
</template>

<script>
import pagination from "./pagination";
import manage from './manage'
import v_header from './header'
import row from './row'
import query_parse from "./query_parse";

export default {
    name: "tableBox",
    components: {manage, pagination, v_header, row, query_parse},
    props: {
        isLoading: Boolean,
        id: String,
        errorLog: {
            type: Array,
            default: () => {
                return []
            }
        },
        headers: {
            type: Object,
            required: true
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        rows_route_name: {
            type: String
        },
        query: {
            default: () => {
                return {}
            }
        },
        query_parse: Object,
        manage: {
            type: Array,
            default: () => null
        },
        data: {
            type: Array,
            required: true
        },
        cell_manage: {},

        meta: {
            type: Object,
            default: () => {
                return {}
            }
        },
        mass_action_enabled: {
            type: Boolean,
            default: false,
        },
        mass_actions: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            selected: [],
            all_is_selected: false,
        }
    },
    provide() {
        return {
            isLoading: this.isLoading,
            errorLog: this.errorLog,
            headers: this.headers,
            showHeader: this.showHeader,
            rows_route_name: this.rows_route_name,
            manage: this.manage,
            data: this.data,
            cell_manage: this.cell_manage, // depricated !
            mass_actions: this.mass_actions,
            mass_action_enabled: this.mass_action_enabled,
            selected: this.selected,
            all_is_selected: this.all_is_selected,
            query_parse: this.query_parse
        }
    },
    methods: {
        selectRow(row) {
            let index = this.selected.findIndex(r => r.link === row.link)
            if (index === -1) {
                this.selected.push(row)
            } else {
                let result = this.selected.splice(index, 1)
                this.selected = result
            }
        }
    },
}
</script>

<style lang="scss">
.table {
    width: max-content;

    $color-grey: #ececec;
    $color-grey-light: #dcdcdc;
    $color-purple: #3e49c1;
    $color-purple-light: rgba(78, 89, 251, 0.58);

    &-query {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;

        &__item {
            padding: 0 0 0 5px;
            border-radius: 3px;
            height: 28px;
            background: #e4e5e7;
            display: flex;
            align-items: center;
            margin-right: 5px;

            &-close {
                display: flex;
                align-items: center;
                height: 100%;
                padding: 0 4px;
                border-radius: 0 3px 3px 0;
                margin-left: 5px;
                cursor: pointer;

                &:hover {
                    background-color: rgb(219, 221, 223)
                }

                svg {
                    fill: rgb(92, 95, 98);
                    width: 20px;
                }
            }
        }
    }

    &__manage {
        display: flex;
        height: 36px;

        &-addnew {
            width: 100px;
            outline: none;
            border-radius: 5px 0px 0px 5px;
            border: 1px solid #c4cdd5;
            background: linear-gradient(180deg, #fff, #f9fafb);
            flex-grow: 0;
            cursor: pointer;
        }

        &-search {
            border-radius: 0 5px 5px 0;
            outline: none;
            padding: 0 20px;
            font-size: 14px;
            background: linear-gradient(180deg, #fff, #f9fafb);
            flex-grow: 1;
            border: 1px solid rgb(196, 196, 196);
            border-left: 0;
        }
    }

    &__body {

        &-empty {
            text-align: left;
            padding: 15px 12px;
            opacity: .5;

            &-error {
                color: red
            }
        }
    }

    &-selected {
        position: absolute;
        padding-left: 45px;
        padding-right: 15px;
        background: #989ffe;
        right: 0;
        left: 0;
        top: 10px;
        bottom: 0;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        &__actions {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }
    }

    &__row {
        display: flex;
        text-decoration: none;
        color: inherit;


        &-header {
            display: flex;
            padding: 10px 0px;
            height: 36px;
            box-sizing: content-box;
            position: relative;
            font-weight: 600;
        }

        &:hover {
            background-color: rgb(245, 246, 247);
        }
    }

    &__cell {
        cursor: pointer;
        display: flex;
        border-bottom: 1px solid #c4cdd5;
        text-align: left;
        align-items: center;
        height: 54px;
        padding: 12px 10px 12px 0;
        width: 200px;

        & > span {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        &.img {
            padding: 4px 8px;
        }

        &.img, &-header.img {
            padding: 6px 6px 6px 12px;
            display: flex;

            img {
                border-radius: 3px;
                width: unset;
                min-width: 100%;
                max-width: 100%;
                object-fit: cover;
            }
        }

        &-header {
            width: 200px;
            padding-right: 10px;
            text-align: left;
            display: flex;
            align-items: center;

            &:first-child {
                padding-left: 12px;
            }

            &:last-child {
                padding-right: 12px;
            }

        }

        &-selection,
        &-header-selection {
            width: 30px;
            padding: 0;
            display: flex;
            position: relative;
            align-items: center;

            .checkbox {
                position: absolute;
                margin: auto;
                z-index: 1;
            }
        }

        &:hover {
            background-color: rgb(245, 246, 247);
        }

        &:first-child {
            padding-left: 12px;
        }

        &:last-child {
            padding-right: 12px;
        }

        &.loading {
            border-bottom: 0;
        }

        span {
            width: 100%;
            height: 22px;
            border-radius: 5px;
        }

        &-manage {
            position: relative;
            padding-right: 10px;

            &:hover .table__cell-manage-list,
            .table__cell-manage-list:hover {
                display: flex;
            }

            &-list {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                width: 200px;
                font-size: 14px;
                right: 0;
                border: $color-grey-light 1px solid;
                background-color: white;
            }

            &-item {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 2px;

                .icon {
                    margin: 0 10px;
                }

                &:hover {
                    background-color: $color-purple-light;
                    color: white;
                }
            }
        }
    }

    &__header {

        .th {
            width: 200px;
            padding-right: 10px;
            text-align: left;
            display: flex;
            align-items: center;

            &:first-child {
                padding-left: 12px;
            }

            &:last-child {
                padding-right: 12px;
            }

        }
    }

    &__footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 20px 12px 12px;
        color: rgb(173, 173, 173);
        font-weight: 500;
        font-size: 15px;

        &-numeric {

        }
    }

    &__pagination {
        display: flex;

        &-page {
            height: 25px;
            width: 25px;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            justify-content: center;
            box-sizing: content-box;

            &:hover {
                border-bottom: 3px solid rgb(219, 219, 219);
            }

            &.active {
                border-bottom: 3px solid #42b983;
            }
        }
    }
}
</style>
