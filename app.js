const TEAM_ID = "125610"; // Zalgiris Kaunas (ESPN EuroLeague team id)
const SCHEDULE_URL = `https://site.api.espn.com/apis/site/v2/sports/basketball/euroleague/teams/${TEAM_ID}/schedule`;
const STORAGE_KEY = "zalgiris-predictions-overrides-v1";

let latestActualByDate = new Map();

function normalizeOpponentName(name) {
  return name.trim().toLowerCase();
}

function loadOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function saveOverride(date, predictor, zalgiris, opponent) {
  const overrides = loadOverrides();
  overrides[date] = overrides[date] ?? {};
  overrides[date][predictor] = { zalgiris, opponent };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function applyOverrides() {
  const overrides = loadOverrides();
  DATA.games.forEach((game) => {
    const override = overrides[game.date];
    if (!override) return;
    if (override.a) game.predictions.a = override.a;
    if (override.b) game.predictions.b = override.b;
  });
}

function toDateKey(isoOrDate) {
  return new Date(isoOrDate).toISOString().slice(0, 10);
}

function pointsFor(prediction, actual) {
  if (!actual) return null;

  const predictedWinner = prediction.zalgiris === prediction.opponent
    ? "draw"
    : prediction.zalgiris > prediction.opponent ? "zalgiris" : "opponent";
  const actualWinner = actual.zalgiris > actual.opponent ? "zalgiris" : "opponent";

  if (prediction.zalgiris === actual.zalgiris && prediction.opponent === actual.opponent) {
    return { points: 3, cls: "exact" };
  }
  if (predictedWinner === actualWinner) {
    return { points: 1, cls: "winner" };
  }
  return { points: 0, cls: "wrong" };
}

function renderScoreCell(date, predictor, prediction, actual) {
  const result = pointsFor(prediction, actual);
  const cls = result ? `prediction ${result.cls}` : "";
  return `
    <td class="${cls}">
      <input type="number" min="0" class="score-input" data-date="${date}" data-predictor="${predictor}" data-field="zalgiris" value="${prediction.zalgiris}" />
      -
      <input type="number" min="0" class="score-input" data-date="${date}" data-predictor="${predictor}" data-field="opponent" value="${prediction.opponent}" />
    </td>
  `;
}

function renderGamesTable(actualByDate) {
  document.getElementById("header-a").textContent = DATA.predictorA.name;
  document.getElementById("header-b").textContent = DATA.predictorB.name;

  const tbody = document.getElementById("games-rows");
  tbody.innerHTML = "";

  let totalA = 0;
  let totalB = 0;

  DATA.games.forEach((game) => {
    const actual = actualByDate.get(game.date);
    const actualLabel = actual
      ? `${actual.zalgiris} - ${actual.opponent}`
      : "–";

    const resultA = pointsFor(game.predictions.a, actual);
    const resultB = pointsFor(game.predictions.b, actual);
    if (resultA) totalA += resultA.points;
    if (resultB) totalB += resultB.points;

    const matchup = game.homeAway === "home"
      ? `${DATA.team} - ${game.opponent}`
      : `${game.opponent} - ${DATA.team}`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${game.date}</td>
      <td>${matchup}</td>
      ${renderScoreCell(game.date, "a", game.predictions.a, actual)}
      <td>${actualLabel}</td>
      ${renderScoreCell(game.date, "b", game.predictions.b, actual)}
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("points-a").textContent = totalA;
  document.getElementById("points-b").textContent = totalB;

  tbody.querySelectorAll(".score-input").forEach((input) => {
    input.addEventListener("change", handleScoreInputChange);
  });
}

function handleScoreInputChange(event) {
  const input = event.target;
  const date = input.dataset.date;
  const predictor = input.dataset.predictor;
  const field = input.dataset.field;
  const value = Math.max(0, Number(input.value) || 0);

  const game = DATA.games.find((g) => g.date === date);
  if (!game) return;

  game.predictions[predictor][field] = value;
  saveOverride(date, predictor, game.predictions[predictor].zalgiris, game.predictions[predictor].opponent);

  renderGamesTable(latestActualByDate);
}

function render(actualByDate) {
  document.getElementById("team-heading").textContent = `${DATA.team} Score Predictions`;
  document.getElementById("season-label").textContent = DATA.season;
  document.getElementById("name-a").textContent = DATA.predictorA.name;
  document.getElementById("name-b").textContent = DATA.predictorB.name;

  renderGamesTable(actualByDate);
}

function extractActualScore(event) {
  const competition = event.competitions?.[0];
  const isCompleted = competition?.status?.type?.completed;
  if (!isCompleted) return null;

  const zalgirisSide = competition.competitors?.find((c) => c.team?.id === TEAM_ID);
  const opponentSide = competition.competitors?.find((c) => c.team?.id !== TEAM_ID);
  if (!zalgirisSide || !opponentSide) return null;

  const zalgirisScore = Number(zalgirisSide.score?.value ?? zalgirisSide.score);
  const opponentScore = Number(opponentSide.score?.value ?? opponentSide.score);
  if (Number.isNaN(zalgirisScore) || Number.isNaN(opponentScore)) return null;

  return { zalgiris: zalgirisScore, opponent: opponentScore };
}

async function loadLiveResults() {
  const response = await fetch(SCHEDULE_URL);
  if (!response.ok) throw new Error(`Schedule request failed: ${response.status}`);

  const payload = await response.json();
  const events = Array.isArray(payload.events) ? payload.events : [];

  const actualByDate = new Map();
  events.forEach((event) => {
    const actual = extractActualScore(event);
    if (actual) actualByDate.set(toDateKey(event.date), actual);
  });

  return actualByDate;
}

async function initializeDashboard() {
  applyOverrides();
  render(latestActualByDate);

  try {
    latestActualByDate = await loadLiveResults();
    render(latestActualByDate);
  } catch {
    render(latestActualByDate);
  }
}

initializeDashboard();
