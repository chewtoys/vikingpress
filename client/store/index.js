import Vue from "vue"

export default {
    // =================================================
    // State
    // =================================================
    state: () => {
        const state = {
            user: {}
        }

        return state
    },
    actions: {
        FETCH_USER({ state }) {
            console.log('%cBegin FETCH_USER', 'font-weight:bold;color:cyan;')
            console.log(state)
            console.log('%cEnd FETCH_USER', 'font-weight:bold;color:cyan;')
            return state.user
        }
    },
    mutations: {
        SET_USER: (state, { username, firstName }) => {
            let a = Object.assign({ username, firstName }, state.user)
            state.user = a
            console.log('%cBegin SET_USER', 'font-weight:bold;color:green;')
            console.log(state.user, a)
            console.log('%cEnd SET_USER', 'font-weight:bold;color:green;')
        }
    }
}
