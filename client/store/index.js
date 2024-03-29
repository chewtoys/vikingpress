export default {
  // Account State
  state: () => {
    // Set default values for state.
    const state = {
      user: {},
      signInState: 0,
      loading: false
    }

    return state
  },

  // Account Actions
  actions: {
    // Get user info from store.
    FETCH_USER ({ state }) {
      return state.user
    },
    // Get sign in state from store.
    GET_SIGNIN_STATE ({ state }) {
      return state.signInState
    },
    IS_LOADING ({ state }) {
      return state.loading
    }
  },

  // Account Mutations
  mutations: {
    // Update user info in store.
    UPDATE_USER: (state, user) => {
      if (user === 'SIGN_OUT') {
        // If the user is being signed out, set all info in user object to null.
        Object.keys(state.user).forEach(key => {
          state.user[key] = null
        })
      } else if (!user) {
        // If no information is provided, don't change anything.
      } else {
        // Update the state with the information provided.
        state.user = { ...state.user, ...user }
      }
    },
    // Update the sign in state.
    UPDATE_SIGNINSTATE: (state, newState) => {
      state.signInState = newState
    },
    START_LOADING: (state) => {
      state.loading = true
    },
    STOP_LOADING: (state) => {
      state.loading = false
    }
  }
}
