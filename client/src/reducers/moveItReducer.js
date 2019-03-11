function moveItReducer(state = {
  gameStarted: false,
  catPosition: {left: 14, bottom: 14},
  mousePosition: { }
  }, action) {
  switch (action.type) {
    case 'START_GAME':
      return Object.assign({}, state, {gameStarted: true})
    case 'UPDATE_CAT_POSITION':
      return Object.assign({}, state, {catPosition: action.payload})
    case 'RESTART_CAT_POSITION':
      return {
        left: 14,
        bottom: 14
        }
    default:
      return state
  }
}

export default moveItReducer
