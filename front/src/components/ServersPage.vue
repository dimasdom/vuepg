<template>
    <div class="container mt-2 ">
        <div class="row">
            <div class="col-3">Servername</div>
            <div class="col-3">Alias</div>
            <div class="col-3">Id</div>
        </div>
        <div v-for="server in getServers.data" v-bind:key="server.id" class="row mt-1 mb-1  ">
            <div class="col-3" @click="()=>{setCurrentServerA({id:server.id,hostname:server.hostname})}">
                <router-link to="/databases">{{server.hostname }}</router-link>
            </div>
            <div class="col-3">{{server.alias}}</div>
            <div class="col-3">{{server.id}}</div>
        </div>
        <paginate
                :page-count="getServers.lastPage"
                :click-handler="(page)=>{fetchServers(page)}"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page-item'"
                :page-range="5"
                :page-link-class="'page-link'"
                :prev-link-class="'page-link'"
                :next-link-class="'page-link'"
        ></paginate>
    </div>
</template>

<script>

    import {mapActions, mapGetters} from "vuex";

    export default {
        name: 'ServersPage',
        methods: {
            ...mapActions(['setCurrentServerA', 'fetchServers']),
        },
        computed: {
            ...mapGetters(['getServers', 'getUrl'])
        },
        created() {
            this.fetchServers(1)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
