<template>
    <div class="text-center">
        <input v-model="urltoconnect" class="input-group"/>
        <button @click="()=>{fetchServers(urltoconnect);setUrlA(urltoconnect)}" class="btn btn-default">
            Connect
        </button>
        <p v-if="getLoginStatus === 'true'">All okay</p>
        <p v-if="getLoginStatus === 'none'">You are not connected</p>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "LoginForm",
        data() {
            return {
                urltoconnect: ''
            }
        },
        computed: mapGetters(['getLoginStatus']),
        methods: {
            ...mapActions(['fetchServers', 'setUrlA'])
        },
        updated() {
            if (this.getLoginStatus === 'true') {
                console.log("WE TRY")
                this.$router.push({path: '/servers'})
            }
        }
    }
</script>