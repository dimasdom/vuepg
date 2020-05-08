<template>
    <div class="container">
        <div class="container">
            <p class="text-center display-4">Databases on server:{{getCurrentServer.hostname}}</p>
            <div class="row">
                <div class="col-5">Database name</div>
                <div class="col-5">Id</div>
                <div class="col-1"></div>
            </div>
            <div class="row mt-2 border-bottom" v-for="(dbs,index) in getDataBases.data " :key="index">
                <div class="col-5">{{dbs.datname}}</div>
                <div class="col-5">{{dbs.oid}}</div>
                <div class="col-1"></div>

            </div>
            <paginate
                    :page-count="getDataBases.lastPage"
                    :click-handler="(page)=>{fetchDataBasesAPI({DBid:getCurrentServer.id,page})}"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination mt-2'"
                    :page-class="'page-item'"
                    :page-range="5"
                    :page-link-class="'page-link'"
                    :prev-link-class="'page-link'"
                    :next-link-class="'page-link'"
            ></paginate>
        </div>
        <div class="container mt-5">
            <p class="text-center display-4">PgBadgerReports</p>
            <div class="row mt-4 mb-4">
                <div class="col mt-1">
                    Database: <br/>
                    <select class="border-0" v-on:change="(e)=>{setdatname(e.target.value)}">
                        <option value="all" selected>All databases</option>
                        <option v-for="(dbs,index) in getDataBases.data" :value="dbs.oid" :key="index">{{dbs.datname}}
                        </option>
                    </select>
                </div>
                <div class="col">From
                    <datetime type="datetime" format="yyyy-MM-dd HH:mm:ss" v-model="firstdate"/>
                </div>
                <div class="col">To
                    <datetime type="datetime" format="yyyy-MM-dd HH:mm:ss" v-model="lastdate"/>
                </div>
                <div class="col mt-3 ">
                    <button class="btn btn-primary   " v-on:click="sendRequestForNewPgBadger">Add new report request
                    </button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-3">Server</div>
            <div class="col-3">Database</div>
            <div class="col-3">TimeFrame</div>
            <div class="col-2">Status</div>
        </div>
        <PGBadger v-for="(pgBadger,index) in getpgBadger"
                  :key="index"
                  :alias="pgBadger.alias"
                  :status="pgBadger.status"
                  :datname="pgBadger.datname"
                  :begin="pgBadger.Begin_time"
                  :end="pgBadger.End_time"
                  :id="pgBadger.id"
                  :filename="pgBadger.filename"/>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from "vuex";
    import PGBadger from "@/components/PGBadger";
    import {Datetime} from 'vue-datetime'

    export default {
        name: 'DBsPage',
        components: {
            "PGBadger": PGBadger,
            "datetime": Datetime
        },
        data: function () {
            return {
                status: "ready",
                firstdate: "",
                lastdate: "",
                dbid: "all"
            }
        },
        methods: {
            ...mapActions(['fetchDataBasesAPI', 'fetchpgBadgerAPI', 'putNewpgBadgerAPI']),
            setdatname: function (n) {
                console.log(n)
                this.dbid = n
            },
            sendRequestForNewPgBadger: function () {
                this.putNewpgBadgerAPI({
                    firstdate: this.firstdate,
                    lastdate: this.lastdate,
                    dbid: this.dbid,
                    srvid: this.getCurrentServer.id,
                    url: this.getUrl
                })
            }
        },

        computed: {
            ...mapGetters(['getDataBases', 'getCurrentServer', 'getpgBadger',]),
        },
        async mounted() {
            setTimeout(() => {
                console.log(this.getUrl)
                this.fetchDataBasesAPI({DBid: this.getCurrentServer.id, page: 1});
                this.fetchpgBadgerAPI(this.getCurrentServer.id)
            }, 20)

        }
    }
</script>
<style>
    .display-4 {
        font-size: 36px;
    }
</style>