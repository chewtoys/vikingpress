<template>
    <div id="already-signed-in">
        <header class="mb-3">
            <h1>You're already signed in.</h1>
             <!-- Add user information here. -->
            <button class="btn btn-primary" @click="signOut">Sign Out</button>
        </header>
    </div>
</template>

<script>
    export default {
        name: 'alreadySignedIn',
        props: ['user'],
        methods: {
            signOut() {
                this.$store.commit('UPDATE_USER', 'SIGN_OUT')
                this.$store.commit('UPDATE_SIGNINSTATE', 0)
            }
        }
    }
</script>
