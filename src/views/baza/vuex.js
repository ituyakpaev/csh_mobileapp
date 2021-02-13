import baza from "@/middleware/v1/api/baza";

export default {
    namespaced: true,
    state: {
        rubrics: {
            rows: [],
            loaded: false
        },

        subscription: {
            data: {},
            loaded: false
        },

        favorites: {
            count: 0,
            loaded: false
        }
    },

    mutations: {
        setRubrics(state, payload) {
            state.rubrics.rows = payload
            state.rubrics.loaded = true
        },
        setSubscription(state, payload) {
            state.subscription.data = payload
            state.subscription.data.attempts_count = state.subscription.data.attempts_count ? Number(state.subscription.data.attempts_count) : null
            state.subscription.loaded = true
        },
        setFavoritesCount(state, payload) {
            state.favorites.count = payload
            state.favorites.loaded = true
        }
    },

    actions: {
        getRubrics({ commit }) {
            baza.getRubrics()
                .then(res => {
                    commit('setRubrics', res.data.rows)
                })
                .catch(err => {

                })
        },

        getSubscription({ commit }) {
            baza.getSubscription()
                .then(res => {
                    console.log(res)
                    commit('setSubscription', res.data)
                })
        },

        getFavorites({ state, commit }) {
            if (!state.favorites.loaded) {
                baza.getFavoriteArticles({ limit: 0 })
                    .then(res => {
                        console.log(res)
                        commit('setFavoritesCount', res.data.meta.count)
                    })
            }
        }
    }
}
