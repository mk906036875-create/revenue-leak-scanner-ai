const scannerForm = document.getElementById("scannerForm");
const result = document.getElementById("result");

scannerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get user inputs
  const leads = Number(document.getElementById("leads").value);
  const dealValue = Number(document.getElementById("dealValue").value);
  const responseTime = Number(
    document.getElementById("responseTime").value
  );
  const followUpRate = Number(
    document.getElementById("followUpRate").value
  );

  // Basic validation
  if (
    leads <= 0 ||
    dealValue <= 0 ||
    responseTime < 0 ||
    followUpRate < 0 ||
    followUpRate > 100
  ) {
    alert("Please enter valid business numbers.");
    return;
  }

  /*
    Revenue Leak Analysis
    This is a demo estimation model.
    It is not a financial forecast.
  */

  // Response-time risk
  let responseRisk = 0;

  if (responseTime <= 1) {
    responseRisk = 5;
  } else if (responseTime <= 3) {
    responseRisk = 12;
  } else if (responseTime <= 6) {
    responseRisk = 22;
  } else if (responseTime <= 12) {
    responseRisk = 30;
  } else {
    responseRisk = 38;
  }

  // Follow-up risk
  const followUpRisk = Math.max(0, 35 - (followUpRate * 0.35));

  // Lead volume factor
  let leadRisk = 5;

  if (leads >= 1000) {
    leadRisk = 15;
  } else if (leads >= 500) {
    leadRisk = 12;
  } else if (leads >= 200) {
    leadRisk = 8;
  }

  // Total risk score
  let riskScore = Math.round(
    responseRisk + followUpRisk + leadRisk
  );

  riskScore = Math.min(100, Math.max(1, riskScore));

  // Risk level
  let riskLevel = "LOW";

  if (riskScore >= 70) {
    riskLevel = "HIGH";
  } else if (riskScore >= 40) {
    riskLevel = "MEDIUM";
  }

  // Estimated opportunity leakage
  const missedFollowUps = Math.round(
    leads * ((100 - followUpRate) / 100)
  );

  const estimatedRecoveredLeads = Math.max(
    1,
    Math.round(missedFollowUps * 0.25)
  );

  const estimatedLeakage =
    estimatedRecoveredLeads * dealValue;

  const lowEstimate = Math.round(
    estimatedLeakage * 0.7
  );

  const highEstimate = Math.round(
    estimatedLeakage * 1.3
  );

  // Format currency
  const formatCurrency = (amount) => {
    return "$" + amount.toLocaleString("en-US");
  };

  // Top revenue leaks
  const leaks = [];

  if (responseTime > 3) {
    leaks.push(
      "⚡ Slow lead response may be causing opportunities to cool down."
    );
  }

  if (followUpRate < 80) {
    leaks.push(
      "🔁 Missed follow-ups are leaving potential opportunities unattended."
    );
  }

  if (missedFollowUps > 0) {
    leaks.push(
      `📉 Approximately ${missedFollowUps.toLocaleString(
        "en-US"
      )} leads may need additional follow-up.`
    );
  }

  if (leads >= 500) {
    leaks.push(
      "📊 High lead volume increases the risk of manual follow-up gaps."
    );
  }

  // Ensure at least 3 insights
  while (leaks.length < 3) {
    leaks.push(
      "🎯 Your sales process may have opportunities for additional automation."
    );
  }

  // Recommendation
  let recommendation =
    "Focus on recovering existing opportunities before increasing your advertising spend.";

  if (responseTime > 6) {
    recommendation =
      "Prioritize faster
