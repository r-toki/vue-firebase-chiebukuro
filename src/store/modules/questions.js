import firebase from '@/firebaseInit'
const db = firebase.firestore()

const state = () => ({
  all: []
})

const getters = {
  all(state) {
    return state.all
  }
}

const actions = {
  async fetchAll({ dispatch, commit }) {
    const all = []
    const snapshot = await dispatch('getAll')
    snapshot.forEach(doc => {
      all.push({ id: doc.id, title: doc.data().title })
    })
    commit('SET_ALL', all)
  },

  getAll() {
    return db.collection('questions').get()
  }
}

const mutations = {
  SET_ALL(state, all) {
    state.all = all
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
