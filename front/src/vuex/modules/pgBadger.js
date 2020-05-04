import * as axios from 'axios'

export default {
    actions: {
        async fetchpgBadgerAPI(ctx, id) {
            let pgBadger = await axios.get(`https://localhost:6309/server/database/pgBadger/${id}`).then(response => {
                return response.data
            })
            ctx.commit('fetchpgBadger', pgBadger)
        },
        async putNewpgBadgerAPI(ctx, {firstdate, lastdate, dbid, srvid}) {
            let pgBadger = await axios.put(`https://localhost:6309/PutDataForNewpgBadger`, {
                firstdate,
                lastdate,
                dbid,
                srvid
            }).then(response => {
                return response.data
            })
            ctx.commit('fetchpgBadger', pgBadger)
        },
    },
        mutations: {
            fetchpgBadger(state, pgBadger) {
                state.pgBadger = pgBadger
            }
        },
        getters: {
            getpgBadger(state) {
                return state.pgBadger
            }
        },
        state: {
            pgBadger: {},
        }
    }