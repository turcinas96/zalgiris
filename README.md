# Zalgiris Score Predictions

A dashboard where two friends predict the scores of Zalgiris Kaunas's
EuroLeague games, compared against the live actual results.

## How it works

- Edit [data.js](data.js) to add upcoming games and each person's predicted score.
- Actual results are fetched automatically from ESPN's EuroLeague schedule for
  Zalgiris Kaunas and matched to your games by date.
- Points are awarded once a game is completed:
  - **3 points** for an exact score
  - **1 point** for predicting the correct winner
  - **0 points** for an incorrect prediction
- Total points per predictor are shown at the top and update automatically.

## Updating games

Add an entry to the `games` array in `data.js`:

```js
{
  date: "2026-11-06",       // must match the actual game date (YYYY-MM-DD)
  opponent: "Olympiacos Piraeus",
  homeAway: "away",          // "home" or "away", from Zalgiris's perspective
  predictions: {
    a: { zalgiris: 80, opponent: 78 },
    b: { zalgiris: 75, opponent: 82 }
  }
}
```

Until ESPN publishes/completes a game, the "Actual" column shows a dash and no
points are awarded for it yet.

## Running locally

Open [index.html](index.html) directly in a browser, or serve the folder:

```powershell
python -m http.server 8000
```

## Publishing publicly (GitHub Pages)

1. Push this folder to a GitHub repository (on a `gh-pages` branch, or `main`
   with root as the Pages source).
2. In the repo's **Settings → Pages**, set the source to that branch.
3. The dashboard will be live at
   `https://<your-username>.github.io/<repo-name>/`.
