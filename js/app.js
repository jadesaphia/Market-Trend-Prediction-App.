// ------------------------------------
// DEMO MARKET DATA
// ------------------------------------

const marketData = {
  AAPL: {
    name: "Apple Inc.",
    price: 229.42,
    change: 1.82,
    trend: "Increasing",
    confidence: 72,
    prediction: 2.4,
    data: [
      198, 202, 199, 207, 211, 210,
      216, 218, 221, 219, 224, 229
    ]
  },

  TSLA: {
    name: "Tesla Inc.",
    price: 238.18,
    change: -1.16,
    trend: "Decreasing",
    confidence: 66,
    prediction: -1.8,
    data: [
      262, 258, 268, 255, 249, 252,
      247, 245, 242, 241, 239, 238
    ]
  },

  SPY: {
    name: "S&P 500 ETF",
    price: 649.31,
    change: 0.44,
    trend: "Increasing",
    confidence: 78,
    prediction: 1.2,
    data: [
      612, 617, 621, 619, 626, 631,
      628, 636, 640, 642, 646, 649
    ]
  },

  NVDA: {
    name: "NVIDIA Corp.",
    price: 181.64,
    change: 2.31,
    trend: "Increasing",
    confidence: 81,
    prediction: 3.1,
    data: [
      151, 155, 160, 158, 165, 168,
      170, 173, 171, 177, 179, 182
    ]
  },

  AMZN: {
    name: "Amazon.com Inc.",
    price: 225.08,
    change: 0.18,
    trend: "Stable",
    confidence: 61,
    prediction: 0.4,
    data: [
      218, 220, 217, 221, 223, 221,
      224, 225, 223, 224, 226, 225
    ]
  }
};

let selected = "AAPL";

// ------------------------------------
// HELPER FUNCTIONS
// ------------------------------------

function money(value) {
  return "$" + Number(value).toFixed(2);
}

function changeClass(value) {
  if (value > 0) {
    return "up";
  }

  if (value < 0) {
    return "down";
  }

  return "flat";
}

function changeText(value) {
  let symbol = "●";

  if (value > 0) {
    symbol = "▲";
  } else if (value < 0) {
    symbol = "▼";
  }

  return `${symbol} ${Math.abs(value).toFixed(2)}% today`;
}

// ------------------------------------
// MARKET LIST
// ------------------------------------

function renderMarketList(targetId) {
  const element = document.getElementById(targetId);

  element.innerHTML = "";

  Object.entries(marketData).forEach(([symbol, market]) => {
    const row = document.createElement("div");

    row.className = "market-item";

    row.innerHTML = `
      <div>
        <div class="symbol">${symbol}</div>
        <div class="company">${market.name}</div>
      </div>

      <div class="price">
        ${money(market.price)}
      </div>

      <div class="mini ${changeClass(market.change)}">
        ${changeText(market.change)}
      </div>
    `;

    row.style.cursor = "pointer";

    row.addEventListener("click", () => {
      selectMarket(symbol, true);
    });

    element.appendChild(row);
  });
}

// ------------------------------------
// SELECT MARKET
// ------------------------------------

function selectMarket(symbol, jump = false) {
  selected = symbol;

  const market = marketData[symbol];

  document.getElementById("selectedSymbol").textContent =
    symbol;

  const selectedChange =
    document.getElementById("selectedChange");

  selectedChange.className =
    "change " + changeClass(market.change);

  selectedChange.textContent =
    changeText(market.change);

  document.getElementById("currentPrice").textContent =
    money(market.price);

  document.getElementById("trendLabel").textContent =
    market.trend;

  document.getElementById("confidence").textContent =
    market.confidence + "%";

  document.getElementById("predictionValue").textContent =
    (market.prediction > 0 ? "+" : "") +
    market.prediction.toFixed(1) +
    "%";

  const pill =
    document.getElementById("predictionPill");

  if (market.prediction > 0) {
    pill.textContent = "Likely Increase";
    pill.style.color = "#86efac";
    pill.style.background =
      "rgba(34, 197, 94, 0.12)";
  } else if (market.prediction < 0) {
    pill.textContent = "Possible Decrease";
    pill.style.color = "#fda4af";
    pill.style.background =
      "rgba(239, 68, 68, 0.12)";
  } else {
    pill.textContent = "Likely Stable";
  }

  drawChart(market.data);

  if (jump) {
    showSection("dashboard");
  }
}

// ------------------------------------
// DRAW MARKET CHART
// ------------------------------------

function drawChart(values) {
  const canvas =
    document.getElementById("trendChart");

  const rect =
    canvas.getBoundingClientRect();

  const dpr =
    window.devicePixelRatio || 1;

  canvas.width =
    rect.width * dpr;

  canvas.height =
    rect.height * dpr;

  const ctx =
    canvas.getContext("2d");

  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const padding = 26;

  ctx.clearRect(
    0,
    0,
    width,
    height
  );

  const minimum =
    Math.min(...values);

  const maximum =
    Math.max(...values);

  function x(index) {
    return (
      padding +
      index *
        ((width - padding * 2) /
          (values.length - 1))
    );
  }

  function y(value) {
    return (
      height -
      padding -
      ((value - minimum) /
        (maximum - minimum || 1)) *
        (height - padding * 2)
    );
  }

  // Grid lines
  ctx.strokeStyle =
    "rgba(255, 255, 255, 0.08)";

  ctx.lineWidth = 1;

  for (let i = 0; i < 5; i++) {
    const gridY =
      padding +
      i *
        ((height - padding * 2) / 4);

    ctx.beginPath();

    ctx.moveTo(
      padding,
      gridY
    );

    ctx.lineTo(
      width - padding,
      gridY
    );

    ctx.stroke();
  }

  // Gradient
  const gradient =
    ctx.createLinearGradient(
      0,
      padding,
      0,
      height - padding
    );

  gradient.addColorStop(
    0,
    "rgba(124, 58, 237, 0.45)"
  );

  gradient.addColorStop(
    1,
    "rgba(124, 58, 237, 0)"
  );

  ctx.beginPath();

  values.forEach((value, index) => {
    if (index === 0) {
      ctx.moveTo(
        x(index),
        y(value)
      );
    } else {
      ctx.lineTo(
        x(index),
        y(value)
      );
    }
  });

  ctx.lineTo(
    x(values.length - 1),
    height - padding
  );

  ctx.lineTo(
    x(0),
    height - padding
  );

  ctx.closePath();

  ctx.fillStyle =
    gradient;

  ctx.fill();

  // Main chart line
  ctx.beginPath();

  values.forEach((value, index) => {
    if (index === 0) {
      ctx.moveTo(
        x(index),
        y(value)
      );
    } else {
      ctx.lineTo(
        x(index),
        y(value)
      );
    }
  });

  ctx.strokeStyle =
    "#a78bfa";

  ctx.lineWidth = 3;

  ctx.stroke();

  // Data points
  values.forEach((value, index) => {
    ctx.beginPath();

    ctx.arc(
      x(index),
      y(value),
      3.5,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      "#ddd6fe";

    ctx.fill();
  });
}

// ------------------------------------
// WEBSITE NAVIGATION
// ------------------------------------

function showSection(id) {
  document
    .querySelectorAll(".section")
    .forEach((section) => {
      section.classList.toggle(
        "active",
        section.id === id
      );
    });

  document
    .querySelectorAll("nav button")
    .forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.section === id
      );
    });

  const titles = {
    dashboard: [
      "Market Dashboard",
      "Track trends, compare data, and explore simple forecasts."
    ],

    markets: [
      "Market Explorer",
      "Browse and select from the available demo markets."
    ],

    predictions: [
      "Prediction Overview",
      "See how the prediction feature will work in the full capstone."
    ],

    about: [
      "About the Project",
      "Capstone goals, audience, and future development."
    ]
  };

  document.getElementById(
    "pageTitle"
  ).textContent =
    titles[id][0];

  document.getElementById(
    "pageSubtitle"
  ).textContent =
    titles[id][1];

  if (id === "dashboard") {
    requestAnimationFrame(() => {
      drawChart(
        marketData[selected].data
      );
    });
  }
}

document
  .querySelectorAll("nav button")
  .forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        showSection(
          button.dataset.section
        );
      }
    );
  });

// ------------------------------------
// SEARCH
// ------------------------------------

document
  .getElementById("searchBtn")
  .addEventListener(
    "click",
    searchMarket
  );

function searchMarket() {
  const search =
    document
      .getElementById("searchInput")
      .value
      .trim()
      .toUpperCase();

  const banner =
    document.getElementById(
      "resultBanner"
    );

  if (marketData[search]) {
    selectMarket(search);

    banner.innerHTML = `
      Showing <strong>${search}</strong>
      — ${marketData[search].name}
    `;
  } else {
    banner.innerHTML = `
      No demo result found for
      <strong>${search || "that search"}</strong>.
      Try AAPL, TSLA, SPY, NVDA, or AMZN.
    `;
  }

  banner.classList.add("show");
}

// Search with Enter key
document
  .getElementById("searchInput")
  .addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        searchMarket();
      }
    }
  );

// ------------------------------------
// REFRESH BUTTON
// ------------------------------------

document
  .getElementById("refreshBtn")
  .addEventListener(
    "click",
    () => {
      const button =
        document.getElementById(
          "refreshBtn"
        );

      button.textContent =
        "Updated ✓";

      setTimeout(() => {
        button.textContent =
          "Refresh Data";
      }, 1200);
    }
  );

// ------------------------------------
// LOGIN MODAL
// ------------------------------------

const modal =
  document.getElementById(
    "loginModal"
  );

document
  .getElementById("loginBtn")
  .addEventListener(
    "click",
    () => {
      modal.classList.add("show");
    }
  );

document
  .getElementById("cancelLogin")
  .addEventListener(
    "click",
    () => {
      modal.classList.remove("show");
    }
  );

document
  .getElementById("submitLogin")
  .addEventListener(
    "click",
    () => {
      const email =
        document
          .getElementById("email")
          .value
          .trim();

      if (!email) {
        alert(
          "Enter an email for the demo login."
        );

        return;
      }

      document.getElementById(
        "loginBtn"
      ).textContent =
        "Logged In";

      modal.classList.remove("show");
    }
  );

// Close modal if background clicked
modal.addEventListener(
  "click",
  (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  }
);

// ------------------------------------
// INITIAL WEBSITE LOAD
// ------------------------------------

renderMarketList(
  "popularMarkets"
);

renderMarketList(
  "allMarkets"
);

selectMarket(
  "AAPL"
);

// Redraw chart if window changes size
window.addEventListener(
  "resize",
  () => {
    const dashboard =
      document.getElementById(
        "dashboard"
      );

    if (
      dashboard.classList.contains(
        "active"
      )
    ) {
      drawChart(
        marketData[selected].data
      );
    }
  }
);

Add market dashboard JavaScript
