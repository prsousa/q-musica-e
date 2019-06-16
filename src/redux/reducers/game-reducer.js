import {
  CREATE_GAME,
  TICK_CLOCK_GAME,
  SET_POINTS_MUSIC_GAME
} from "../actions/game-actions";
import Rules from "../../rules";

const emptyGameList = {
  list: []
};

const initialState = {
  ...emptyGameList,
  ...JSON.parse(localStorage.getItem("GAMES"))
};

const create_game = (
  state,
  { teamCardinality = 2, roundSeconds = 120, musicCardinality = 0 }
) => {
  const musicIdx = [...Array(musicCardinality).keys()];
  musicIdx.sort(() => Math.random() - 0.5); // shuffles the array
  const musicsPerTeam = Math.floor(musicCardinality / teamCardinality);

  return {
    ...state,
    list: [
      ...state.list,
      {
        id: state.list.length + 1,
        roundSeconds,
        teams: Array.from(Array(teamCardinality), (v, i) => ({
          id: i + 1,
          elapsedSeconds: 0,
          completed: false,
          points: 0,
          musics: musicIdx
            .slice(i * musicsPerTeam, (i + 1) * musicsPerTeam)
            .map(musicId => ({
              musicId,
              listened: false,
              guessedMusic: false,
              guessedArtist: false,
              bonus: false
            }))
        }))
      }
    ]
  };
};

const tick_clock_game = (state, { gameId, teamId }) => {
  const list = [...state.list];
  const teams = [...list[gameId].teams];
  const elapsedSeconds = teams[teamId].elapsedSeconds++;

  if (elapsedSeconds >= list[gameId].roundSeconds)
    teams[teamId].completed = true;

  list[gameId] = {
    ...list[gameId],
    teams
  };

  return { ...state, list };
};

const set_points = (state, params) => {
  const { gameId, teamId, musicIndex } = params;

  const list = [...state.list];
  const teams = [...list[gameId].teams];
  const musics = [...teams[teamId].musics];
  musics[musicIndex] = { ...musics[musicIndex], ...params };
  if (musics[musicIndex].guessedArtist && musics[musicIndex].guessedMusic) {
    musics[musicIndex].listened = true;
  }

  teams[teamId].musics = musics;
  teams[teamId].points = musics.reduce(
    (acc, m) =>
      acc +
      m.guessedArtist * Rules.artist +
      m.guessedMusic * Rules.music +
      m.bonus * Rules.bonus,
    0
  );

  teams[teamId].completed = musics.reduce((acc, m) => acc && m.listened, true);

  list[gameId] = {
    ...list[gameId],
    teams
  };

  return { ...state, list };
};

const gameList = (state = initialState, action) => {
  let res;

  switch (action.type) {
    case CREATE_GAME:
      res = create_game(state, action.payload);
      break;
    case TICK_CLOCK_GAME:
      res = tick_clock_game(state, action.payload);
      break;
    case SET_POINTS_MUSIC_GAME:
      res = set_points(state, action.payload);
      break;

    default:
      res = state;
      break;
  }

  const toPersist = {
    list: res.list
  };

  if (res !== state) localStorage.setItem("GAMES", JSON.stringify(toPersist));

  return res;
};

export default gameList;
