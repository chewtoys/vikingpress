<template>
    <main>
        <header class="mb-3">
            <h1>Sign in</h1>
            <p>or <nuxt-link to="/accounts/create">create an account</nuxt-link></p>
        </header>
        <div @keydown.enter="verifyUsername">
            <div class="form-group mb-3">
                <label for="username" class="sr-only">Username or email address</label>
                <input type="text" class="form-control" placeholder="Username or email address"
                    required="" autofocus="" autocomplete="off" v-model.trim="usernameInput">
            </div>
            <div class="text-center">
            <button class="btn btn-primary btn-block" @click="verifyUsername">Next</button></div>
        </div>
        <hr>
        <div class="">
                <nuxt-link to="/create-account">Sign in with Google</nuxt-link>
        </div>
    </main>
</template>

<script>

    export default {
        layout: 'auth',
        data() {
            return {
                usernameInput: ''
            }
        },
        methods: {
            async verifyUsername() {
                console.log(this.usernameInput)
                let account = await this.$axios.$post('/api/accounts/verify', {
                    username: this.usernameInput
                })
                if (!account) {
                    // Make them fix their mistake?
                }
                else if (account.provider === 'Local') {
            // console.log('%cAbout to run SET_USER', 'font-weight:bold;color:lime;')
                    this.$store.commit('SET_USER', {
                        username: account.username,
                        firstName: account.firstName || null
                    })
                    // console.log(this.$store.state.user)
                    this.$router.push({path:'/accounts/enter-password'})
                } 
                else if (account) {
                    // Tell the user to go away...
                }
            }
        }
    }
</script>

<style>
@media only screen and (min-width: 441px) {
        #align-right-lg {
            text-align: right;
        }
    }
    
@media only screen and (max-width: 440px) {
        .col-md-6 {
            margin-bottom: 1rem;
        }
    }
</style>