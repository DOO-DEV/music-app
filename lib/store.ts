import { createStore, action } from 'easy-peasy'

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  isPlaying: false,
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload
  }),
  setPlaying: action((state: any, payload: boolean) => {
    state.isPlaying = payload
  })
})
