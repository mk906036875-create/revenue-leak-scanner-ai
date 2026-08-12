document.addEventListener("DOMContentLoaded", function () {

  const scannerForm = document.getElementById("scannerForm");

  const results = document.getElementById("results");

  const lostRevenue = document.getElementById("lostRevenue");
  const missedLeads = document.getElementById("missedLeads");
  const potentialDeals = document.getElementById("potentialDeals");
  const currentDeals = document.getElementById("currentDeals");

  const recoveryBtn = document.getElementById("recoveryBtn");
  const recoveryPlan = document.getElementById("recoveryPlan");
  const planContent = document.getElementById("planContent");

  const resetBtn = document.getElementById("resetBtn");

  const recoveryText = document.getElementById("recoveryText");


  /* =========================
     FORMAT MONEY
  ========================= */

  function formatMoney(number) {
    return Math.round(number).toLocaleString("en-US");
  }


  /* =========================
     SCAN BUSINESS
  ========================= */

  scannerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const leads =
      Number(document.getElementById("leads").value);

    const responseRate =
      Number(document.getElementById("response").value);

    const conversionRate =
      Number(document.getElementById("conversion").value);

    const dealValue =
      Number(document.getElementById("dealValue").value);


    /* Validation */

    if (
      leads <= 0 ||
      dealValue <= 0 ||
      responseRate < 0 ||
      responseRate > 100 ||
      conversionRate < 0 ||
      conversionRate > 100
    ) {

      alert("Please enter valid business numbers.");

      return;
    }


    /*
      LEAK CALCULATION

      Example:

      100 leads
      60% response
      10% conversion
      $1000 deal

      Current responding leads = 60
      Current deals = 6

      Missed leads = 40

      Potential recovered leads =
      40 × 50% recovery assumption

      Potential deals =
      recovered leads × conversion rate

      Revenue opportunity =
      potential deals × deal value
    */


    const respondingLeads =
      leads * (responseRate / 100);


    const missed =
      leads - respondingLeads;


    const current =
      respondingLeads * (conversionRate / 100);


    /*
      We estimate that an improved
      follow-up system can recover
      around 50% of currently missed leads.
    */

    const recoverableLeads =
      missed * 0.50;


    const additionalDeals =
      recoverableLeads * (conversionRate / 100);


    const revenueOpportunity =
      additionalDeals * dealValue;


    /* =========================
       DISPLAY RESULTS
    ========================= */

    missedLeads.textContent =
      Math.round(missed).toLocaleString("en-US");


    currentDeals.textContent =
      Math.round(current).toLocaleString("en-US");


    potentialDeals.textContent =
      Math.round(additionalDeals).toLocaleString("en-US");


    lostRevenue.textContent =
      formatMoney(revenueOpportunity);


    recoveryText.textContent =
      "Your business may have approximately $" +
      formatMoney(revenueOpportunity) +
      " in monthly recoverable revenue opportunity.";


    results.style.display = "block";


    recoveryPlan.style.display = "none";


    /* Scroll to results */

    setTimeout(function () {

      results.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 200);

  });


  /* =========================
     GENERATE RECOVERY PLAN
  ========================= */

  recoveryBtn.addEventListener("click", function () {

    const leads =
      Number(document.getElementById("leads").value);

    const responseRate =
      Number(document.getElementById("response").value);

    const conversionRate =
      Number(document.getElementById("conversion").value);

    const dealValue =
      Number(document.getElementById("dealValue").value);


    const missed =
      leads * (1 - responseRate / 100);


    const recoverable =
      missed * 0.50;


    const additionalDeals =
      recoverable * (conversionRate / 100);


    const revenue =
      additionalDeals * dealValue;


    let priority = "Medium";


    if (responseRate < 50) {

      priority = "HIGH";

    } else if (responseRate < 75) {

      priority = "MEDIUM";

    } else {

      priority = "LOW";

    }


    /* =========================
       RECOVERY PLAN HTML
    ========================= */

    planContent.innerHTML = `

      <ul>

        <li>
          <strong>Priority Level:</strong>
          ${priority}
        </li>

        <li>
          <strong>Lead Response:</strong>
          Contact new leads as quickly as possible,
          ideally within 5 minutes.
        </li>

        <li>
          <strong>Missed Lead Recovery:</strong>
          Create an automatic follow-up sequence
          for approximately ${Math.round(missed)} missed leads.
        </li>

        <li>
          <strong>Follow-up System:</strong>
          Use multiple follow-ups instead of relying
          on a single contact attempt.
        </li>

        <li>
          <strong>Revenue Opportunity:</strong>
          Potential additional revenue is approximately
          $${formatMoney(revenue)} per month.
        </li>

        <li>
          <strong>Automation Opportunity:</strong>
          Connect your lead forms, CRM, email and
          messaging workflow so no new lead is forgotten.
        </li>

      </ul>

    `;


    recoveryPlan.style.display = "block";


    recoveryPlan.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  });


  /* =========================
     RESET SCANNER
  ========================= */

  resetBtn.addEventListener("click", function () {

    scannerForm.reset();

    results.style.display = "none";

    recoveryPlan.style.display = "none";

    lostRevenue.textContent = "0";

    missedLeads.textContent = "0";

    potentialDeals.textContent = "0";

    currentDeals.textContent = "0";

    window.scrollTo({
      top: document.getElementById("scanner").offsetTop - 80,
      behavior: "smooth"
    });

  });


  /* =========================
     SMOOTH SCROLL
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId =
        this.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });

      }

    });

  });

});
