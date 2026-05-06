const DATA_URL = "./js/data.json";

function showPlans(plans) {
  const cards = document.getElementById("cards");

  cards.innerHTML = "";

  plans.forEach((plan) => {
    const planElement = document.createElement("div");
    planElement.classList.add("plan__card");

    planElement.innerHTML = `
     
      <h2 class="plan__name">${plan.name}</h2>

      <p class="price  price--yearly ${
        !showPrice ? "active" : ""
      }">&dollar; ${plan.yearly} </p>

      <p class="price  price--monthly ${
        showPrice ? "active" : ""
      } ">&dollar; ${plan.monthly} </p>
      
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

  if (showPrice) {
    monthlyLabel.classList.add("active");
    yearlyLabel.classList.remove("active");
  } else {
    monthlyLabel.classList.remove("active");
    yearlyLabel.classList.add("active");
  }
}

let showPrice = false;

function initialize(data) {
  showPlans(data);
  updateToggle();

  const toggle = document.getElementById("price-toggle");

  toggle.addEventListener("change", function () {
    showPrice = this.checked;

    showPlans(data);
    updateToggle();
  });
}

fetch(DATA_URL)
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
