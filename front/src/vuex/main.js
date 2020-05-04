import Vue from 'vue'
import Vuex from 'vuex'
import DBs from './modules/databases'
import Servers from './modules/servers'
import PGBadger from "./modules/pgBadger";
Vue.use(Vuex)

export default new Vuex.Store(
    {
        modules:{
            DBs,
            Servers,
            PGBadger
        }
    }
)