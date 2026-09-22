// Edit this file to add games and update predictions.
// "date" must be in YYYY-MM-DD format and should match the actual game date.
// "homeAway" is from Zalgiris's perspective: "home" or "away".
// Live results are fetched automatically from ESPN and matched by date + opponent.
// Until a game is played (or before ESPN publishes it), only the predictions are shown.

const DATA = {
  team: "Zalgiris Kaunas",
  season: "2026/27 EuroLeague",

  predictorA: {
    name: "Ignas"
  },

  predictorB: {
    name: "Augustinas"
  },

  games: [
    {
      date: "2026-10-02",
      opponent: "Fenerbahce Ulker Istanbul",
      homeAway: "home",
      predictions: {
        a: { zalgiris: 88, opponent: 82 },
        b: { zalgiris: 85, opponent: 90 }
      }
    },
    {
      date: "2026-10-09",
      opponent: "Real Madrid",
      homeAway: "away",
      predictions: {
        a: { zalgiris: 75, opponent: 85 },
        b: { zalgiris: 80, opponent: 88 }
      }
    },
    {
      date: "2026-10-16",
      opponent: "Panathinaikos Athens",
      homeAway: "home",
      predictions: {
        a: { zalgiris: 90, opponent: 80 },
        b: { zalgiris: 84, opponent: 79 }
      }
    }
  ]
};
