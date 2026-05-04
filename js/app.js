function showPlans(plans) {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";

  plans.forEach((plan, index) => {
    const planElement = document.createElement("div");
    planElement.classList.add("plan__card");

    if (index === 1) {
      planElement.classList.add("plan__card--highlighted");
    }

    const annualHidden = showPrice ? "is-hidden" : "";
    const monthlyHidden = !showPrice ? "is-hidden" : "";

    planElement.innerHTML = `
     
      <h2 class="plan__name">${plan.name}</h2>

      <p class="price  price--yearly ${annualHidden}">&dollar; ${plan.yearly} </p>
      <p class="price  price--monthly ${monthlyHidden}">&dollar; ${plan.monthly} </p>
      
      <ul class="features">
          ${plan.features
            .map((feature) => `<li class="feature__item">${feature}</li>`)
            .join("")}
      </ul>

      <a href="#" class="primary-btn">Learn more</a>
  
    `;

    cards.appendChild(planElement);
  });
}

function updateToggle() {
  const monthlyLabel = document.getElementById("monthly-label");
  const yearlyLabel = document.getElementById("yearly-label");

  monthlyLabel.classList.toggle("active", showPrice);
  yearlyLabel.classList.toggle("active", !showPrice);
}

function renderApp(data) {
  showPlans(data);
  updateToggle();
}

let showPrice = false;

function initialize(data) {
  const toggle = document.getElementById("price-toggle");

  showPrice = toggle.checked;

  renderApp(data);

  toggle.addEventListener("change", (e) => {
    showPrice = e.target.checked;

    renderApp(data);
  });
}

fetch("./js/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error");
    }
    return response.json();
  })
  .then((data) => {
    initialize(data.plans);
  })
  .catch((error) => {
    console.error("Error", error);
  });
