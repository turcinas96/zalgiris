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

  // Full 2026-27 EuroLeague regular-season schedule, sourced from the official EuroLeague API.
  games: [
    { date: "2026-09-24", opponent: "Crvena Zvezda Meridianbet Belgrade", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-09-29", opponent: "Olympiacos Piraeus", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-10-01", opponent: "Paris Basketball", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-10-09", opponent: "Fc Barcelona", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-10-13", opponent: "Fenerbahce Tarfin Istanbul", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-10-16", opponent: "Anadolu Efes Istanbul", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-10-23", opponent: "Ldlc Asvel Villeurbanne", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-10-28", opponent: "Virtus Bologna", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-10-30", opponent: "Partizan Mozzart Bet Belgrade", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-11-06", opponent: "Besiktas Istanbul", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-11-12", opponent: "Armani Olimpia Milan", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-11-17", opponent: "Fc Bayern Munich", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-11-19", opponent: "Panathinaikos Aktor Athens", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-11-25", opponent: "Real Madrid", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-12-04", opponent: "Dubai Basketball", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-12-10", opponent: "Kosner Baskonia Vitoria-Gasteiz", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-12-15", opponent: "Maccabi Rapyd Tel Aviv", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-12-17", opponent: "Hapoel Ibi Tel Aviv", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-12-23", opponent: "Valencia Basket", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2026-12-29", opponent: "Partizan Mozzart Bet Belgrade", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-01-07", opponent: "Paris Basketball", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-01-12", opponent: "Ldlc Asvel Villeurbanne", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-01-14", opponent: "Crvena Zvezda Meridianbet Belgrade", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-01-22", opponent: "Virtus Bologna", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-01-28", opponent: "Kosner Baskonia Vitoria-Gasteiz", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-02-02", opponent: "Anadolu Efes Istanbul", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-02-04", opponent: "Besiktas Istanbul", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-02-12", opponent: "Real Madrid", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-03-04", opponent: "Valencia Basket", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-03-09", opponent: "Fc Barcelona", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-03-12", opponent: "Armani Olimpia Milan", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-03-18", opponent: "Panathinaikos Aktor Athens", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-03-24", opponent: "Maccabi Rapyd Tel Aviv", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-03-26", opponent: "Fc Bayern Munich", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-03-31", opponent: "Hapoel Ibi Tel Aviv", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-04-07", opponent: "Dubai Basketball", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-04-09", opponent: "Olympiacos Piraeus", homeAway: "away", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } },
    { date: "2027-04-15", opponent: "Fenerbahce Tarfin Istanbul", homeAway: "home", predictions: { a: { zalgiris: 0, opponent: 0 }, b: { zalgiris: 0, opponent: 0 } } }
  ]
};
