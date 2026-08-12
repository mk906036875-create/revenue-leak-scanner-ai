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

  let scanData = null;


  /* =========================
     HELPERS
  ========================= */

  function money(value) {
    return Math.round(value).toLocaleString("en-US");
  }

  function number(value) {
    return Math.round(value).toLocaleString("en-US");
  }


  /* =========================
     SCAN
  ========================= */

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    const leads = Number(
      document.getElementById("leads").value
    );

    const responseRate = Number(
      document.getElementById("response").value
    );

    const conversionRate = Number(
      document.getElementById("conversion").value
    );

    const dealValue = Number(
      document.getElementById("dealValue").value
    );


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


    /* Current performance */

    const respondingLeads =
      leads * responseRate / 100;

    const missed =
      leads - respondingLeads;

    const current =
      respondingLeads * conversionRate / 100;


    /*
      Demo recovery assumption:
      50% of missed leads can potentially
      be recovered with better follow-up.
    */

    const recoverableLeads =
      missed * 0.50;

    const additionalDeals =
      recoverableLeads * conversionRate / 100;

    const revenueOpportunity =
      additionalDeals * dealValue;


    /* =========================
       LEAK SCORE
    ========================= */

    let score =
      Math.round(
        (100 - responseRate) * 0.6 +
        Math.min(conversionRate, 20) * 2
      );

    score = Math.max(0, Math.min(100, score));


    let risk;
    let riskIcon;

    if (score >= 60) {
      risk = "HIGH RISK";
      riskIcon = "🔴";
    } else if (score >= 30) {
      risk = "MEDIUM RISK";
      riskIcon = "🟡";
    } else {
      risk = "LOW RISK";
      riskIcon = "🟢";
    }


    /* =========================
       SAVE DATA
    ========================= */

    scanData = {
      leads,
      responseRate,
      conversionRate,
      dealValue,
      missed,
      current,
      additionalDeals,
      revenueOpportunity,
      score,
      risk
    };


    /* =========================
       DISPLAY
    ========================= */

    missedLeads.textContent = number(missed);

    currentDeals.textContent = number(current);

    potentialDeals.textContent =
      number(additionalDeals);

    lostRevenue.textContent =
      money(revenueOpportunity);


    recoveryText.innerHTML = `
      Your estimated monthly recovery
