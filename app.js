const TEAM_ID = "125610"; // Zalgiris Kaunas (ESPN EuroLeague team id)
const SCHEDULE_URL = `https://site.api.espn.com/apis/site/v2/sports/basketball/euroleague/teams/${TEAM_ID}/schedule`;

function normalizeOpponentName(name) {
  return name.trim().toLowerCase();
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

function renderScoreCell(prediction, actual) {
  const result = pointsFor(prediction, actual);
  const label = `${prediction.zalgiris} - ${prediction.opponent}`;
  if (!result) return `<td>${label}</td>`;
  return `<td class="prediction ${result.cls}">${label}</td>`;
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
      ${renderScoreCell(game.predictions.a, actual)}
      <td>${actualLabel}</td>
      ${renderScoreCell(game.predictions.b, actual)}
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("points-a").textContent = totalA;
  document.getElementById("points-b").textContent = totalB;
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
  render(new Map());

  try {
    const actualByDate = await loadLiveResults();
    render(actualByDate);
  } catch {
    render(new Map());
  }
}

initializeDashboard();
