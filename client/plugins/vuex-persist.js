/* This plugin allows the Vuex state to persist between reloads. */

import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  return new VuexPersistence({
    // Insert options here.
  }).plugin(store)
}
