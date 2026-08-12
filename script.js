 document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("scannerForm");
  const results = document.getElementById("results");

  const lostRevenue = document.getElementById("lostRevenue");
  const missedLeads = document.getElementById("missedLeads");
  const potentialDeals = document.getElementById("potentialDeals");
  const currentDeals = document.getElementById("currentDeals");

  const recoveryBtn = document.getElementById("recoveryBtn");
  const recoveryPlan = document.getElementById("recoveryPlan");
  const planContent = document.getElementById("planContent");

  const recoveryText = document.getElementById("recoveryText");
  const resetBtn = document.getElementById("resetBtn");


  // =========================
  // REVENUE SCAN
  // =========================

  form.addEventListener("submit", function (event) {

    event.preventDefault();

    const leads = parseFloat(document.getElementById("leads").value);
    const response = parseFloat(document.getElementById("response").value);
    const conversion = parseFloat(document.getElementById("conversion").value);
    const dealValue = parseFloat(document.getElementById("dealValue").value);


    // Validation
    if (
      isNaN(leads) ||
      isNaN(response) ||
      isNaN(conversion) ||
      isNaN(dealValue)
    ) {
      alert("Please enter all business numbers.");
      return;
    }

    if (leads <= 0 || dealValue <= 0) {
      alert("Leads and deal value must be greater than 0.");
      return;
    }

    if (response < 0 || response > 100) {
      alert("Response rate must be between 0% and 100%.");
      return;
    }

    if (conversion < 0 || conversion > 100) {
      alert("Conversion rate must be between 0% and 100%.");
      return;
    }


    // =========================
    // CALCULATIONS
    // =========================

    const respondingLeads =
      leads * (response / 100);

    const missed =
      Math.max(0, leads - respondingLeads);

    const current =
      respondingLeads * (conversion / 100);

    // Assume 50% of missed leads can potentially be recovered
    const recoverableLeads =
      missed * 0.50;

    const extraDeals =
      recoverableLeads * (conversion / 100);

    const revenue =
      extraDeals * dealValue;


    // =========================
    // SHOW RESULTS
    // =========================

    missedLeads.textContent =
      Math.round(missed).toLocaleString("en-US");

    currentDeals.textContent =
      Math.round(current).toLocaleString("en-US");

    potentialDeals.textContent =
      Math.round(extraDeals).toLocaleString("en-US");

    lostRevenue.textContent =
      Math.round(revenue).toLocaleString("en-US");


    recoveryText.innerHTML =
      `Estimated recoverable revenue:
      <strong>$${Math.round(revenue).toLocaleString("en-US")}</strong>
      per month.`;


    // Show result section
    results.style.display = "block";

    // Hide previous recovery plan
    recoveryPlan.style.display = "none";

    planContent.innerHTML = "";


    // Scroll to results
    setTimeout(() => {
      results.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);

  });


  // =========================
  // GENERATE RECOVERY PLAN
  // =========================

  recoveryBtn.addEventListener("click", function () {

    planContent.innerHTML = `

      <div class="plan-item">
        <strong>1. ⚡ Speed Up Lead Response</strong>
        <p>
          Respond to new leads as quickly as possible,
          especially during the first few minutes.
        </p>
      </div>

      <div class="plan-item">
        <strong>2. 🔁 Automate Follow-ups</strong>
        <p>
          Create automated follow-up messages for leads
          who did not respond to the first contact.
        </p>
      </div>

      <div class="plan-item">
        <strong>3. 🎯 Prioritize Hot Leads</strong>
        <p>
          Focus your sales team on prospects with the
          highest buying intent and deal value.
        </p>
      </div>

      <div class="plan-item">
        <strong>4. 📅 Build a Follow-up Sequence</strong>
        <p>
          Use multiple follow-up steps instead of
          contacting a prospect only once.
        </p>
      </div>

      <div class="plan-item">
        <strong>5. 📊 Track Every Lead</strong>
        <p>
          Monitor lead status, response time,
          follow-ups and conversion inside your CRM.
        </p>
      </div>

      <div class="plan-recommendation">
        🚀 <strong>Recommended Action:</strong><br>
        Automate lead response and follow-up to
        recover more opportunities from your existing
        lead database.
      </div>

    `;

    recoveryPlan.style.display = "block";


    setTimeout(() => {
      recoveryPlan.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);

  });


  // =========================
  // RESET SCANNER
  // =========================

  resetBtn.addEventListener("click", function () {

    form.reset();

    results.style.display = "none";

    recoveryPlan.style.display = "none";

    planContent.innerHTML = "";

    window.scrollTo({
      top: document.getElementById("scanner").offsetTop,
      behavior: "smooth"
    });

  });

});
