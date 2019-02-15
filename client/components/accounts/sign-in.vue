<template>
    <div id="sign-in-start">
        <header class="mb-3">
            <h1>Sign in</h1>
            <p>or <nuxt-link to="/accounts/create">create an account</nuxt-link></p>
        </header>
        <form @submit.prevent="verifyUsername">
            <div class="form-group mb-3">
                <label for="username" class="sr-only">Username or email address</label>
                <input type="text" id="username" class="form-control" placeholder="Username or email address"
                    required="" autofocus="" autocomplete="off" v-model.trim="usernameInput">
            </div>
            <div class="row">
                <div class="col-8 d-flex"></div>
                <div class="col-4"><button class="btn btn-primary btn-block">Next</button></div>
            </div>
        </form>
        <hr role="presentation">
        <a href="/api/accounts/google/start">Sign in with Google</a>
    </div>
</template>

<script>
    export default {
        name: 'signIn',
        data() {
            return {
                usernameInput: ''
            }
        },
        methods: {
            async verifyUsername() {
                /** Verify given username with server. */
                let account = await this.$axios.$post('/api/accounts/verify', {
                    username: this.usernameInput
                })
                /** If no account is found, show an error message. */
                if (!account) {
                    // Insert error message logic here.
                }
                /** If the account exists and it's not local account, send them to their account provider. */
                else if (account.provider !== 'Local') {
                    // Insert account provider logic here.
                }
                /** If the account exists and it's a local account, let them enter their password. */
                else if (account.provider === 'Local') {
                    this.$store.commit('user/UPDATE_USER', {
                        username: account.username,
                        firstName: account.firstName,
                        authenticated: false
                    })
                    this.$store.commit('user/UPDATE_SIGNINSTATE', 1)
                }
                /** If we've made it here, something has gone wrong. Handle the error. */
                else {
                    // Uh oh. Handle the error.
                }
            }
        }
    }
</script>
