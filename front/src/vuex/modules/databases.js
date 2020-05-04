import * as axios from 'axios'

export default {
    actions: {
        async fetchDataBasesAPI(ctx, {DBid,page}) {
            let DBs = await axios.get(`https://localhost:6309/server/databases/${DBid}/${page}`).then(response => {
                return response.data
            })
            ctx.commit('fetchDataBases', DBs)
        }
    },
    mutations: {
        fetchDataBases(state, DBs) {
            state.DBs = DBs
        }
    },
    getters: {
        getDataBases(state) {
            return state.DBs
        }
    },
    state: {
        DBs: []

    }
}