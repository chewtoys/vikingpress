import Vue from 'vue'

export default {
    /* Account State */
    state: () => {
        /** Set default values for state. */
        const state = {
            user: {},
            signInState: 0
        }

        return state
    },
    
    /* Account Actions */
    actions: {
        /** Get user info from store. */
        FETCH_USER({ state }) {
            return state.user
        },
        /** Get sign in state from store. */
        GET_SIGNIN_STATE({ state }) {
            return state.signInState
        }
    },
    
    /* Account Mutations */
    mutations: {
        /** Update user info in store. */
        UPDATE_USER: (state, user) => {
            /** If the user is being signed out, set all info in user object to null. */
            if (user === 'SIGN_OUT') {
                Object.keys(state.user).forEach(key => {
                    state.user[key] = null
                })
            }
            /** If no information is provided, don't change anything. */
            else if (!user) {
            }
            /** Update the state with the information provided. */
            else {
                state.user = user
            }
        },
        /** Update the sign in state. */
        UPDATE_SIGNINSTATE: (state, newState) => {
            state.signInState = newState
        }
    }
}
