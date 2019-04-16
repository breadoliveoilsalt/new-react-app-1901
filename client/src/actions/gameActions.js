
export function startGame() {
  return {
    type: 'START_GAME'
  }
}

export function resetGame() {
  return {
    type: 'RESET_GAME'
  }
}

export function restartGame() {
  return {
    type: 'RESTART_GAME'
  }
}

export function continueGame() {
  return {
    type: 'CONTINUE_GAME'
  }
}

export function updateCatPosition(coordinates) {
  return {
    type: 'UPDATE_CAT_POSITION',
    payload: coordinates
  }
}

export function setMousePosition(coordinates) {
  return {
    type: 'SET_MOUSE_POSITION',
    payload: coordinates
  }
}

export function setCatPosition(coordinates) {
  return {
    type: 'SET_CAT_POSITION',
    payload: coordinates
  }
}


export function setGameWon() {
  return {
    type: 'GAME_WON'
  }
}

export function setGameLost() {
  return {
    type: 'GAME_LOST'
  }
}

export function catchMouse() {
  return {
    type: 'CATCH_MOUSE'
  }
}

export function touchRain() {
  return {
    type: 'TOUCH_RAIN'
  }
}

export function increaseScore(num) {
  return {
    type: 'INCREASE_SCORE',
    payload: num
  }
}

export function populateScores(scores) {
  return {
    type: 'POPULATE_SCORES',
    payload: scores
  }
}

export function getTopScores() {
  return function(dispatch) {
    fetch('/api/scores')
      .then(response => response.json())
      .then(scores => dispatch(populateScores(scores)))
  }
}

export function updateTopScores() {
  return function(dispatch, getState) {

    let currentScore = getState().game.score
    let currentTopScores = getState().game.topScores

    if (currentTopScores.includes(currentScore)) {
      return
    }

    if (currentTopScores[4] === undefined || currentScore > currentTopScores[4]) {
      debugger
      let tempScores = [...currentTopScores, currentScore]
      tempScores.sort((a,b) => b - a)
      tempScores.splice(4)
      dispatch(populateScores(tempScores))

      fetch('/api/scores', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({points: currentScore})
      })
      .then(res => {
        if (res.errors) {
          throw res.errors
        }})
      .catch(err => {
        console.log("Sorry, the following error occured: ", err)
      })
    }
  }
}
