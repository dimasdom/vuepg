import * as axios from 'axios'

export default {
    actions: {
        async fetchServers(ctx, page) {
            let servers = await axios.get(`https://localhost:6309/servers/${page}`).then(response => {
                return response.data
            })
            ctx.commit('putServers', servers)

        },
        setCurrentServerA(ctx, {id, hostname}) {
            ctx.commit('setServerIdM', {id, hostname})
        },
    },
    mutations: {
        putServers(state, servers) {
            state.servers = servers
        },
        setServerIdM(state, {id, hostname}) {
            state.currentServer = {id, hostname}
        },
    },
    getters: {
        getServers(state) {
            return state.servers
        },
        getCurrentServer(state) {
            return state.currentServer
        },
        getLoginStatus(state) {
            return state.servers[2] ? "true" : "none"
        },
        getUrl(state) {
            return state.url
        }

    },
    state: {
        servers: {},
        currentServer: {},
    }
}