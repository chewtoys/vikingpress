<template>
    <main>
        <header>
            <h1>Welcome!</h1>
            <p>Please sign in.</p>
        </header>
        <form>
            <div class="form-group mb-3">
                <label for="username" class="sr-only">Username or email address</label>
                <input type="text" id="username" name="username" class="form-control" placeholder="Username or email address"
                    required="" autofocus="" autocomplete="off">
            </div>
            <button class="btn btn-primary btn-block" type="submit">Next</button>
        </form>
        <hr>
        <div class="row small">
            <div class="col text-left">
                <a href="/api/auth/google/start">Sign in with Google</a>
            </div>
            <div class="col text-right">
                <nuxt-link to="/create-account">Create an account</nuxt-link>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        layout: 'vv-auth'
    }
</script>

<style>
</style>