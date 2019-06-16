export const CREATE_GAME = "CREATE_GAME";
export const TICK_CLOCK_GAME = "TICK_CLOCK_GAME";
export const SET_POINTS_MUSIC_GAME = "SET_POINTS_MUSIC_GAME";

export const createGame = (
  teamCardinality,
  roundSeconds,
  musicCardinality
) => dispatch => {
  return dispatch({
    type: CREATE_GAME,
    payload: {
      teamCardinality,
      roundSeconds,
      musicCardinality
    }
  });
};

export const tickClock = (gameId, teamId) => dispatch => {
  gameId--;
  teamId--;
  return dispatch({
    type: TICK_CLOCK_GAME,
    payload: {
      gameId,
      teamId
    }
  });
};

export const setPoints = (gameId, teamId, musicIndex, params) => dispatch => {
  gameId--;
  teamId--;
  return dispatch({
    type: SET_POINTS_MUSIC_GAME,
    payload: {
      gameId,
      teamId,
      musicIndex,
      ...params
    }
  });
};
