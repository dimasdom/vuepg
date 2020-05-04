<template>
    <div>
        <div class="row mt-3">
            <div class="col-3">{{alias}}</div>
            <div class="col-3">{{datname}}</div>
            <div class="col-3">{{begin}}\{{end}} </div>
            <div class="col-2">
                <a v-if="status === 'Ready'" v-on:click="()=>{downloadWithAxios(id,filename)}">Ready</a>
                <a v-if="status === 'Pending'" >Pending</a>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from "vuex";
    import * as axios from 'axios'
    export default {
        name:'PGBadger',
        props:{
            alias:String,
            datname:String,
            begin:String,
            end:String,
            status:String,
            id:Number,
            filename:String,
        },
        computed:{
        ...mapGetters(['getpgBadger','getCurrentServer'])
        },
        methods:{
            ...mapActions(['fetchpgBadgerAPI']),

            forceFileDownload(response,filename){
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `${filename}.gz`) //or any other extension
                document.body.appendChild(link)
                link.click()
            },
            downloadWithAxios(id,filename){
                axios({
                    method: 'get',
                    url: `https://localhost:6309/getfile/${id}`,
                    responseType: 'arraybuffer'
                })
                    .then(response => {

                        this.forceFileDownload(response,filename)
                        console.log(response)
                    })
                    .catch(() => console.log('error occured'))
            }
        },
        mounted() {
            if (this.$props.status === 'Pending') {
                setInterval(() => {
                    this.fetchpgBadgerAPI(this.getCurrentServer.id)
                }, 5000)
            }
        },
        destroyed() {
            clearInterval()
        }

    }
</script>
<style>

</style>